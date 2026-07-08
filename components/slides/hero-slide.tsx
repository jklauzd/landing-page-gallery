'use client'

import { Button } from '@primer/react'
import { ArrowDownIcon } from '@primer/octicons-react'

export function HeroSlide({ onExplore }: { onExplore: () => void }) {
  return (
    <section className="zco-slide zco-hero">
      <div className="zco-ambient zco-ambient-a" aria-hidden="true" />

      <div className="zco-hero-copy">
        <div data-reveal className="zco-kicker">
          ZCompany
        </div>
        <h1 data-reveal>Páginas que vendem.</h1>
        <div data-reveal className="zco-actions">
          <Button variant="primary" size="large" trailingVisual={ArrowDownIcon} onClick={onExplore}>
            Ver projetos
          </Button>
        </div>
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
    </section>
  )
}
