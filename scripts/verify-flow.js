const base = process.env.BASE_URL || 'http://127.0.0.1:3000';
const token = `${Date.now().toString(36)}${Math.floor(Math.random() * 1000)}`;
const address = `проезд Нарядный ${token}, кв. 8`;
const summary = `заменить смеситель ${token}`;
const purchase = `Смеситель ${token}`;
const stage = `Разводка ${token}`;

function assert(cond, message) {
  if (!cond) {
    console.error(`FAIL ${message}`);
    process.exit(1);
  }
  console.log(`ok ${message}`);
}

function jar() {
  const cookies = new Map();
  return {
    async fetch(url, opts = {}) {
      const headers = new Headers(opts.headers || {});
      if (cookies.size) {
        headers.set('cookie', [...cookies].map(([key, value]) => `${key}=${value}`).join('; '));
      }
      const res = await fetch(url, { ...opts, headers, redirect: 'manual' });
      const list = typeof res.headers.getSetCookie === 'function' ? res.headers.getSetCookie() : [];
      for (const line of list) {
        const pair = line.split(';')[0];
        const index = pair.indexOf('=');
        const name = pair.slice(0, index).trim();
        const value = pair.slice(index + 1).trim();
        if (!value) cookies.delete(name);
        else cookies.set(name, value);
      }
      return res;
    },
  };
}

async function page(client, url, opts) {
  let current = new URL(url, base).toString();
  let res = await client.fetch(current, opts);
  for (let hop = 0; hop < 6 && [301, 302, 303, 307, 308].includes(res.status); hop += 1) {
    const loc = res.headers.get('location');
    assert(loc, `redirect without location from ${current}`);
    current = new URL(loc, current).toString();
    res = await client.fetch(current);
  }
  const body = await res.text();
  return { res, body, url: current };
}

function csrfOf(html) {
  const match = html.match(/name="_csrf" value="([^"]+)"/);
  assert(match, 'csrf token on page');
  return match[1];
}

function pretty(phone) {
  return `+7 ${phone.slice(1, 4)} ${phone.slice(4, 7)}-${phone.slice(7, 9)}-${phone.slice(9)}`;
}

let phoneSeq = 2000000 + Math.floor(Math.random() * 5000000);
function nextPhone() {
  phoneSeq += 1;
  return `7900${String(phoneSeq).slice(-7)}`;
}

async function register(role, name, specialty) {
  const client = jar();
  const phone = nextPhone();
  const first = await page(client, '/register');
  assert(first.res.status === 200, `register form ${role}`);
  const body = new URLSearchParams({
    _csrf: csrfOf(first.body),
    role,
    specialty: specialty || 'plumber',
    full_name: name,
    phone: pretty(phone),
    password: 'parol-naryad-1',
  });
  const done = await page(client, '/register', { method: 'POST', body });
  assert(done.res.status === 200, `registered ${role} landed`);
  assert(done.body.includes(name), `cabinet shows ${name}`);
  return { client, phone, name };
}

async function main() {
  const health = await fetch(`${base}/health`);
  assert((await health.text()) === 'ok', 'health');

  const landing = await fetch(`${base}/`);
  const landingHtml = await landing.text();
  assert(landingHtml.includes('Наряд'), 'landing title');
  assert(landingHtml.includes('690'), 'landing object price');
  assert(landingHtml.includes('490'), 'landing master price');
  assert(landingHtml.includes('не списываются'), 'landing says money is not taken');
  assert(!/оплата прошла|успешно оплачен/i.test(landingHtml), 'landing does not fake a charge');

  const anon = jar();
  const bad = await page(anon, '/login');
  const badPost = await page(anon, '/login', {
    method: 'POST',
    body: new URLSearchParams({
      _csrf: csrfOf(bad.body),
      phone: '+7 900 000-00-00',
      password: 'wrong-password',
    }),
  });
  assert(badPost.body.includes('Неверный телефон или пароль'), 'bad login error');

  const missing = await fetch(`${base}/no-such-page`);
  assert(missing.status === 404, 'unknown page status');
  assert((await missing.text()).includes('Такой страницы нет'), 'unknown page copy');

  const landingNoClient = !landingHtml.includes('Анна')
    && !/(?<!\d)0\s*₽/.test(landingHtml)
    && !/клиент/i.test(landingHtml)
    && !landingHtml.includes('value="client"');
  assert(landingNoClient, 'landing has no client');
  assert(landingHtml.includes('Я прораб'), 'landing foreman tile');
  assert(landingHtml.includes('Я мастер'), 'landing master tile');

  const regJar = jar();
  const reg = await page(regJar, '/register?role=client');
  assert(!reg.body.includes('value="client"'), 'register form has no client');
  const rejected = await page(regJar, '/register', {
    method: 'POST',
    body: new URLSearchParams({
      _csrf: csrfOf(reg.body),
      role: 'client',
      full_name: 'Клиент Проверка',
      phone: '+7 900 111-22-33',
      password: 'parol-naryad-1',
    }),
  });
  assert(rejected.body.includes('прораб или мастер'), 'client registration refused');

  const foreman = await register('foreman', 'Прораб Проверка');
  const master = await register('master', 'Мастер Проверка', 'plumber');
  const locked = await register('master', 'Мастер Закрытый', 'plumber');

  const forbidden = await page(foreman.client, '/master');
  assert(forbidden.res.status === 403, 'foreman cannot open master cabinet');

  const form = await page(foreman.client, '/foreman/tasks/new');
  assert(form.body.includes('690'), 'task form shows 690');
  assert(form.body.includes('Деньги не списываются'), 'task form says money is not taken');
  const refused = await page(foreman.client, '/foreman/tasks', {
    method: 'POST',
    body: new URLSearchParams({
      _csrf: csrfOf(form.body),
      specialty: 'plumber',
      address,
      summary,
    }),
  });
  assert(refused.body.includes('не списываются'), 'task blocked without unpaid confirmation');
  assert(!/\/foreman\/tasks\/\d+/.test(refused.url), 'refused task stays on the form');

  const created = await page(foreman.client, '/foreman/tasks', {
    method: 'POST',
    body: new URLSearchParams({
      _csrf: csrfOf(refused.body),
      specialty: 'plumber',
      address,
      summary,
      confirm_unpaid: '1',
    }),
  });
  const taskMatch = created.url.match(/\/foreman\/tasks\/(\d+)/);
  assert(taskMatch, 'task created');
  const taskId = taskMatch[1];
  assert(created.body.includes('Деньги не списаны'), 'task says money was not taken');
  assert(created.body.includes(address), 'foreman sees the address');
  assert(created.body.includes('Откликов пока нет'), 'foreman sees an empty response list');

  const hidden = await page(master.client, '/master');
  assert(!hidden.body.includes(address), 'unopened master does not see the task');
  const pay = await page(master.client, '/master/subscription');
  assert(pay.body.includes('490'), 'master price 490');
  assert(pay.body.includes('Деньги не списываются'), 'master paywall is honest');
  const opened = await page(master.client, '/master/subscription/open', {
    method: 'POST',
    body: new URLSearchParams({
      _csrf: csrfOf(pay.body),
      confirm_unpaid: '1',
    }),
  });
  assert(opened.body.includes('Деньги не списаны'), 'master cabinet keeps unpaid notice');
  const accepting = await page(master.client, '/master/accepting', {
    method: 'POST',
    body: new URLSearchParams({
      _csrf: csrfOf(opened.body),
      accepting_orders: '1',
    }),
  });
  assert(accepting.body.includes(address), 'master sees the open task');

  const lockedHome = await page(locked.client, '/master');
  assert(!lockedHome.body.includes(address), 'locked master does not see the task');

  const taskPage = await page(master.client, `/master/tasks/${taskId}`);
  assert(taskPage.body.includes('Откликнуться'), 'respond button');
  const responded = await page(master.client, `/master/tasks/${taskId}/respond`, {
    method: 'POST',
    body: new URLSearchParams({ _csrf: csrfOf(taskPage.body) }),
  });
  assert(responded.body.includes('Вы откликнулись'), 'master sees the response');
  const mine = await page(master.client, '/master');
  assert(mine.body.includes(address), 'master sees the task he took');

  const seen = await page(foreman.client, `/foreman/tasks/${taskId}`);
  assert(seen.body.includes('Мастер Проверка'), 'foreman sees who responded');

  console.log('FLOW OK');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
