import { BrandLogo } from "@/components/BrandLogo";
import { MessengerIcons } from "@/components/Messengers";

export function Hero() {
  return (
    <section className="hero" aria-label="Сигнал — главная">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-bg-wash" />
        <div className="hero-bg-grid" />
        <svg className="hero-bg-signal" viewBox="0 0 800 600" preserveAspectRatio="xMaxYMid slice">
          <defs>
            <linearGradient id="sigLine" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#c45c26" stopOpacity="0.15" />
              <stop offset="40%" stopColor="#1f4d3a" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#f3faf6" stopOpacity="0.35" />
            </linearGradient>
          </defs>
          <g fill="none" stroke="url(#sigLine)" strokeWidth="1.6">
            <path className="sig-path" d="M40 480 C180 420 260 300 400 280 C540 260 620 180 760 120" />
            <path className="sig-path sig-path-2" d="M80 120 C220 160 300 260 400 280 C520 310 640 420 760 500" />
            <path className="sig-path sig-path-3" d="M20 300 C160 280 280 240 400 280 C560 340 680 300 780 260" />
          </g>
          {[
            [400, 280],
            [760, 120],
            [760, 500],
            [80, 120],
            [40, 480],
            [780, 260],
          ].map(([x, y], i) => (
            <circle key={i} className={`sig-node sig-node-${i}`} cx={x} cy={y} r="5" />
          ))}
        </svg>
      </div>

      <div className="hero-layout">
        <div className="hero-copy">
          <BrandLogo size="hero" asLink={false} className="hero-brand" />
          <h1 className="visually-hidden">Создание и доработка сайтов</h1>
          <p className="lead">Свяжитесь со мной любым удобным методом</p>
          <MessengerIcons size="lg" className="hero-messengers" />
        </div>

        <div className="hero-scene" aria-hidden="true">
          <div className="scene-glow" />

          <div className="scene-window scene-window-main">
            <div className="win-chrome">
              <i />
              <i />
              <i />
              <span>cignalpro.ru</span>
            </div>
            <div className="win-screen">
              <div className="win-topbar" />
              <div className="win-hero-art">
                <span className="win-signal-wave" />
                <span className="win-signal-wave win-signal-wave-2" />
                <span className="win-signal-core" />
              </div>
              <div className="win-lines">
                <b />
                <b />
                <b className="short" />
              </div>
              <div className="win-cards">
                <em />
                <em />
                <em />
              </div>
            </div>
          </div>

          <div className="scene-window scene-window-side">
            <div className="win-chrome">
              <i />
              <i />
              <i />
              <span>поиск · рост</span>
            </div>
            <div className="win-screen win-screen-chart">
              <div className="chart-bars">
                <span style={{ ["--h" as string]: "34%" }} />
                <span style={{ ["--h" as string]: "52%" }} />
                <span style={{ ["--h" as string]: "41%" }} />
                <span style={{ ["--h" as string]: "68%" }} />
                <span style={{ ["--h" as string]: "58%" }} />
                <span style={{ ["--h" as string]: "84%" }} />
                <span style={{ ["--h" as string]: "72%" }} />
              </div>
              <div className="chart-trend" />
            </div>
          </div>

          <div className="scene-window scene-window-mini">
            <div className="win-chrome">
              <i />
              <i />
              <i />
              <span>сеть</span>
            </div>
            <div className="win-screen win-screen-net">
              <svg viewBox="0 0 160 90">
                <g stroke="rgba(31,77,58,0.45)" strokeWidth="1.2" fill="none">
                  <path d="M20 70 L50 30 L90 50 L130 20" />
                  <path d="M50 30 L90 20 L130 55" />
                  <path d="M20 70 L90 50 L130 55" />
                </g>
                <g fill="#1f4d3a">
                  <circle className="mini-node" cx="20" cy="70" r="3.5" />
                  <circle className="mini-node" cx="50" cy="30" r="3.5" />
                  <circle className="mini-node" cx="90" cy="50" r="3.5" />
                  <circle className="mini-node" cx="90" cy="20" r="3.5" />
                  <circle className="mini-node" cx="130" cy="20" r="3.5" />
                  <circle className="mini-node" cx="130" cy="55" r="3.5" />
                </g>
                <circle className="mini-pulse" cx="90" cy="50" r="3" fill="#c45c26" />
              </svg>
            </div>
          </div>

          <div className="scene-packet scene-packet-1" />
          <div className="scene-packet scene-packet-2" />
          <div className="scene-packet scene-packet-3" />
        </div>
      </div>
    </section>
  );
}
