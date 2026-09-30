import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { MessengerIcons } from "@/components/Messengers";
import { MobileMenu } from "@/components/MobileMenu";
import { nav, site } from "@/lib/site";

export function Header() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <BrandLogo size="md" />
        <nav className="site-nav" aria-label="Основная навигация">
          {nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <MessengerIcons size="md" className="header-messengers" />
          <Link className="btn" href="/kontakty">
            Заявка
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div>
          <BrandLogo size="md" className="brand-footer" />
          <p className="footer-tagline">{site.tagline}</p>
          <p className="footer-legal muted">
            {site.legal.form}. ИНН {site.legal.inn}
          </p>
          <MessengerIcons size="lg" className="footer-messengers" />
        </div>
        <div className="footer-cols">
          <div>
            <p className="footer-label">Услуги</p>
            <Link href="/uslugi/sozdanie-saitov">Создание сайтов</Link>
            <Link href="/uslugi/dorabotka-saitov">Доработка</Link>
            <Link href="/uslugi/seo-prodvizhenie">SEO-продвижение</Link>
          </div>
          <div>
            <p className="footer-label">CMS</p>
            <Link href="/uslugi/dorabotka-wordpress">WordPress</Link>
            <Link href="/uslugi/dorabotka-php">PHP</Link>
            <Link href="/uslugi/dorabotka-1c-bitrix">1С-Битрикс</Link>
            <Link href="/uslugi/dorabotka-tilda">Tilda</Link>
            <Link href="/uslugi/dorabotka-opencart">OpenCart</Link>
          </div>
          <div>
            <p className="footer-label">Материалы</p>
            <Link href="/blog">Блог</Link>
            <Link href="/ceny">Цены</Link>
            <Link href="/o-nas">О студии</Link>
            <Link href="/politika-konfidencialnosti">Конфиденциальность</Link>
          </div>
          <div>
            <p className="footer-label">Связь</p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <span>{site.city}</span>
            <span>{site.domain}</span>
          </div>
        </div>
      </div>
      <p className="footer-copy">
        © {new Date().getFullYear()} {site.name} · {site.legal.form} · ИНН {site.legal.inn}. Создание,
        доработка и SEO сайтов. {site.city}.
      </p>
    </footer>
  );
}
