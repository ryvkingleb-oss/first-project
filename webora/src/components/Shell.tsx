import Link from "next/link";
import { nav, site } from "@/lib/site";

export function Header() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link className="brand" href="/" aria-label={`${site.name} — на главную`}>
          <span className="brand-mark" aria-hidden />
          <span className="brand-name">{site.name}</span>
        </Link>
        <nav className="site-nav" aria-label="Основная навигация">
          {nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link className="btn btn-compact" href="/kontakty">
          Заявка
        </Link>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div>
          <Link className="brand brand-footer" href="/">
            <span className="brand-mark" aria-hidden />
            <span className="brand-name">{site.name}</span>
          </Link>
          <p className="footer-tagline">{site.tagline}</p>
        </div>
        <div className="footer-cols">
          <div>
            <p className="footer-label">Услуги</p>
            <Link href="/uslugi/sozdanie-saitov">Создание сайтов</Link>
            <Link href="/uslugi/dorabotka-saitov">Доработка</Link>
            <Link href="/uslugi/seo-prodvizhenie">SEO-продвижение</Link>
          </div>
          <div>
            <p className="footer-label">Материалы</p>
            <Link href="/blog">Блог</Link>
            <Link href="/kejsy">Кейсы</Link>
            <Link href="/ceny">Цены</Link>
            <Link href="/o-nas">О студии</Link>
          </div>
          <div>
            <p className="footer-label">Контакты</p>
            <a href={site.phoneHref}>{site.phone}</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <span>{site.city}</span>
          </div>
        </div>
      </div>
      <p className="footer-copy">© {new Date().getFullYear()} {site.name}. Создание, доработка и SEO сайтов.</p>
    </footer>
  );
}
