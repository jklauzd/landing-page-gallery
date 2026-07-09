'use client'

export function HeroSlide({ onExplore }: { onExplore: () => void }) {
  return (
    <section className="zco-slide zco-hero">
      <div className="zco-ambient zco-ambient-a" aria-hidden="true" />

      <div className="zco-hero-copy">
        <h1 data-reveal>
          Páginas que <em>vendem</em>.
        </h1>
      </div>

      <div data-reveal className="zco-hero-reel" aria-label="Prévia animada das landing pages da ZCompany">
        <div className="zco-browser-mock zco-reel-main">
          <div className="zco-browser-top">
            <span />
            <span />
            <span />
          </div>
          <div className="zco-shot-grid">
            <div className="zco-shot zco-shot-product">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/meridian-headphones.png" alt="" />
            </div>
            <div className="zco-shot zco-shot-dashboard">
              <div className="zco-chart-line" />
              <div className="zco-chart-bars">
                <i />
                <i />
                <i />
                <i />
              </div>
            </div>
            <div className="zco-shot zco-shot-brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/kinetic-sneaker.png" alt="" />
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        data-reveal
        className="zco-scroll-cue"
        onClick={onExplore}
        aria-label="Rolar para ver os projetos"
      >
        <span className="zco-scroll-cue-label">Ver projetos</span>
        <span className="zco-scroll-cue-line" aria-hidden="true" />
        <span className="zco-scroll-cue-chevron" aria-hidden="true">
          <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
            <path
              d="M1 1.5L9 8.5L17 1.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
    </section>
  )
}
