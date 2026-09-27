import React from "react";
import { Link, useParams } from "react-router-dom";
import { portalPageByPath } from "@shared/portal-pages.mjs";
import { AdSlot } from "./AdSlot.jsx";

function InlineText({ text }) {
  const re = /\[([^\]]+)\]\(([^)\s]+)\)/g;
  const nodes = [];
  let last = 0;
  let match;
  let key = 0;
  const str = String(text || "");
  while ((match = re.exec(str))) {
    if (match.index > last) nodes.push(str.slice(last, match.index));
    const href = match[2];
    const label = match[1];
    if (href.startsWith("/")) {
      nodes.push(
        <Link key={`l${key++}`} to={href}>
          {label}
        </Link>,
      );
    } else if (href.startsWith("https://")) {
      nodes.push(
        <a key={`a${key++}`} href={href} rel="noopener noreferrer">
          {label}
        </a>,
      );
    } else {
      nodes.push(label);
    }
    last = match.index + match[0].length;
  }
  if (last < str.length) nodes.push(str.slice(last));
  return <>{nodes}</>;
}

function RichParagraph({ text }) {
  const bold = /^\*\*(.+?)\*\*\s*(.*)$/.exec(String(text || ""));
  if (bold) {
    return (
      <p>
        <strong>{bold[1]}</strong> <InlineText text={bold[2]} />
      </p>
    );
  }
  return (
    <p>
      <InlineText text={text} />
    </p>
  );
}

function Block({ block }) {
  return (
    <section className="stack portal-block">
      {block.heading ? <h2>{block.heading}</h2> : null}
      {block.warn ? <p className="warn">{block.warn}</p> : null}
      {(block.paragraphs || []).map((p) => (
        <RichParagraph key={p.slice(0, 48)} text={p} />
      ))}
      {block.items?.length ? (
        <ul className="list">
          {block.items.map((item) => (
            <li key={item}>
              <InlineText text={item} />
            </li>
          ))}
        </ul>
      ) : null}
      {block.faq?.length ? (
        <dl className="portal-faq">
          {block.faq.map((f) => (
            <React.Fragment key={f.q}>
              <dt>{f.q}</dt>
              <dd>
                <InlineText text={f.a} />
              </dd>
            </React.Fragment>
          ))}
        </dl>
      ) : null}
    </section>
  );
}

export function PortalPage({ path: fixedPath }) {
  const params = useParams();
  const path = fixedPath || (params.slug ? `/statyi/${params.slug}` : null);
  const page = path ? portalPageByPath(path) : null;

  if (!page) {
    return (
      <div className="stack-lg">
        <h1>Статья не найдена</h1>
        <p>Такой страницы нет. Смотрите список статей.</p>
        <Link className="btn" to="/statyi">
          К статьям
        </Link>
      </div>
    );
  }

  if (page.groups?.length) {
    return (
      <div className="catalog-page">
        <nav className="breadcrumbs" aria-label="Хлебные крошки">
          <ol>
            {(page.breadcrumbs || []).map((crumb, i, arr) => (
              <li key={`${crumb.name}-${i}`}>
                {crumb.path && i < arr.length - 1 ? (
                  <Link to={crumb.path}>{crumb.name}</Link>
                ) : (
                  <span aria-current={i === arr.length - 1 ? "page" : undefined}>{crumb.name}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <header className="stack">
          {page.kicker ? <p className="kicker">{page.kicker}</p> : null}
          <h1>{page.h1}</h1>
          {page.lead ? <p className="lead">{page.lead}</p> : null}
        </header>
        {page.groups.map((group) => (
          <section key={group.heading} className="catalog-group" aria-labelledby={`g-${group.heading}`}>
            <h2 id={`g-${group.heading}`}>{group.heading}</h2>
            <div className="cards">
              {group.cards.map((card) =>
                card.soon ? (
                  <article key={card.title} className="card card-soon">
                    <p className="tag">Скоро</p>
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                  </article>
                ) : (
                  <article key={card.title} className="card offer-card">
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                    <div className="offer-actions">
                      {card.download ? (
                        <a className="btn" href={card.download}>
                          Скачать
                        </a>
                      ) : null}
                      {card.to ? (
                        <Link className={card.download ? "btn-quiet" : "btn"} to={card.to}>
                          {card.action || "Заполнить онлайн"}
                        </Link>
                      ) : null}
                      {card.blank ? (
                        <a className="btn-quiet" href={card.blank}>
                          Пустой бланк
                        </a>
                      ) : null}
                    </div>
                  </article>
                ),
              )}
            </div>
          </section>
        ))}
        {page.cta ? (
          <p className="portal-cta">
            <Link className="btn-quiet" to={page.cta.to}>
              {page.cta.label}
            </Link>
          </p>
        ) : null}
      </div>
    );
  }

  const showAds = page.type === "hub" || page.type === "article" || page.type === "index";
  const mid = Math.max(1, Math.floor((page.blocks || []).length / 2));

  return (
    <div className="portal-layout">
      <article className="stack-lg portal-article">
        <nav className="breadcrumbs" aria-label="Хлебные крошки">
          <ol>
            {(page.breadcrumbs || []).map((crumb, i, arr) => (
              <li key={`${crumb.name}-${i}`}>
                {crumb.path && i < arr.length - 1 ? (
                  <Link to={crumb.path}>{crumb.name}</Link>
                ) : (
                  <span aria-current={i === arr.length - 1 ? "page" : undefined}>{crumb.name}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <header className="stack">
          {page.kicker ? <p className="kicker">{page.kicker}</p> : null}
          <h1>{page.h1}</h1>
          {page.lead ? (
            <p className="lead">
              <InlineText text={page.lead} />
            </p>
          ) : null}
        </header>
        {(page.blocks || []).map((block, i) => (
          <React.Fragment key={`${block.heading || "b"}-${i}`}>
            {showAds && i === mid ? <AdSlot placement="in-article" /> : null}
            <Block block={block} />
          </React.Fragment>
        ))}
        {page.cta ? (
          <p className="portal-cta">
            <Link className="btn" to={page.cta.to}>
              {page.cta.label}
            </Link>
          </p>
        ) : null}
      </article>
      {showAds ? (
        <div className="portal-aside">
          <AdSlot placement="aside" />
        </div>
      ) : null}
    </div>
  );
}
