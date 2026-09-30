import Link from "next/link";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="hero" aria-label="Сигнал — главная">
      <div className="hero-stage" aria-hidden="true">
        <div className="hero-atmosphere" />
        <div className="hero-mesh" />

        <svg className="hero-net" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="netStroke" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(243,250,246,0.55)" />
              <stop offset="55%" stopColor="rgba(196,92,38,0.45)" />
              <stop offset="100%" stopColor="rgba(243,250,246,0.2)" />
            </linearGradient>
            <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(243,250,246,0.9)" />
              <stop offset="100%" stopColor="rgba(243,250,246,0)" />
            </radialGradient>
          </defs>

          <g className="hero-net-lines" fill="none" stroke="url(#netStroke)" strokeWidth="1.25">
            <path className="net-line net-line-a" d="M180 520 C320 420, 420 380, 560 360 S820 300, 980 220" />
            <path className="net-line net-line-b" d="M120 280 C280 300, 400 420, 560 360 S780 240, 1040 340" />
            <path className="net-line net-line-c" d="M260 160 C380 240, 480 300, 560 360 S700 520, 900 620" />
            <path className="net-line net-line-d" d="M80 640 C240 580, 420 500, 560 360 S760 160, 1100 120" />
            <path className="net-line net-line-e" d="M340 700 C460 560, 520 440, 560 360 S640 280, 860 180" />
          </g>

          <g className="hero-net-nodes">
            {[
              [180, 520],
              [120, 280],
              [260, 160],
              [560, 360],
              [980, 220],
              [1040, 340],
              [900, 620],
              [860, 180],
              [1100, 120],
              [340, 700],
            ].map(([x, y], i) => (
              <g key={`${x}-${y}`} className={`net-node net-node-${i}`} transform={`translate(${x} ${y})`}>
                <circle className="net-node-halo" r="18" fill="url(#nodeGlow)" />
                <circle className="net-node-core" r="4.5" />
              </g>
            ))}
          </g>

          <g className="hero-packets">
            <circle className="packet packet-a" r="3.5" />
            <circle className="packet packet-b" r="3" />
            <circle className="packet packet-c" r="2.5" />
          </g>
        </svg>

        <div className="hero-sites">
          <article className="site-frame site-frame-a">
            <header className="site-chrome">
              <span />
              <span />
              <span />
              <em>signal.pro</em>
            </header>
            <div className="site-body">
              <div className="site-nav-bar" />
              <div className="site-hero-block" />
              <div className="site-cols">
                <i />
                <i />
                <i />
              </div>
            </div>
          </article>

          <article className="site-frame site-frame-b">
            <header className="site-chrome">
              <span />
              <span />
              <span />
              <em>/uslugi</em>
            </header>
            <div className="site-body site-body-list">
              <div className="site-row" />
              <div className="site-row" />
              <div className="site-row short" />
              <div className="site-graph">
                <b />
                <b />
                <b />
                <b />
                <b />
              </div>
            </div>
          </article>

          <article className="site-frame site-frame-c">
            <header className="site-chrome">
              <span />
              <span />
              <span />
              <em>/blog · SEO</em>
            </header>
            <div className="site-body">
              <div className="site-map">
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
            </div>
          </article>
        </div>

        <div className="hero-orbit">
          <span className="orbit-ring" />
          <span className="orbit-arm">
            <span className="orbit-dot" />
          </span>
        </div>
      </div>

      <div className="hero-scrim" aria-hidden="true" />

      <div className="hero-content">
        <p className="brand-inline">{site.name}</p>
        <h1>{site.tagline}</h1>
        <p className="lead">
          Создаём, дорабатываем и продвигаем сайты под семантическое ядро — от первой услуги до тысяч статей.
        </p>
        <div className="btn-row">
          <Link className="btn" href="/kontakty">
            Обсудить задачу
          </Link>
          <Link className="btn btn-ghost" href="/uslugi">
            Смотреть услуги
          </Link>
        </div>
      </div>
    </section>
  );
}
