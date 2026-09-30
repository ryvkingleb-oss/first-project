import Link from "next/link";

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function Breadcrumbs({
  items,
}: {
  items: { name: string; href?: string }[];
}) {
  return (
    <nav className="breadcrumbs" aria-label="Хлебные крошки">
      <ol>
        {items.map((item, i) => (
          <li key={`${item.name}-${i}`}>
            {item.href ? <Link href={item.href}>{item.name}</Link> : <span>{item.name}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  if (!items.length) return null;
  return (
    <div className="faq">
      {items.map((item) => (
        <details key={item.q} className="faq-item">
          <summary>{item.q}</summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  );
}

export function CtaBlock({
  title = "Нужен сайт под спрос и заявки?",
  text = "Разберём задачу, предложим структуру и ориентир по срокам. Без воды и «продающих» слайдов.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="cta-band">
      <div className="cta-band-inner">
        <h2>{title}</h2>
        <p>{text}</p>
        <div className="btn-row">
          <Link className="btn" href="/kontakty">
            Обсудить задачу
          </Link>
          <Link className="btn btn-ghost" href="/ceny">
            Смотреть цены
          </Link>
        </div>
      </div>
    </section>
  );
}
