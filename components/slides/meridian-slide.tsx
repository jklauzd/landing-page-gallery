'use client'

import { ArrowRightIcon } from '@primer/octicons-react'

const AURA_URL = '/sites/aura/index.html'

export function MeridianSlide() {
  return (
    <section className="zco-slide zco-case zco-case-meridian zco-case-aura">
      <div className="zco-ambient zco-ambient-blue" aria-hidden="true" />

      <div className="zco-case-copy">
        <h2 data-reveal>ECOMMERCE</h2>
        <p data-reveal>Uma loja bonita, clara e pronta para vender sem enrolação.</p>
        <div data-reveal className="zco-actions">
          <a className="zco-case-cta" href={AURA_URL} target="_blank" rel="noreferrer">
            Abrir AURA
            <ArrowRightIcon size={18} />
          </a>
        </div>
      </div>

      <div data-reveal className="zco-aura-stage">
        <a href={AURA_URL} target="_blank" rel="noreferrer" className="zco-aura-browser" aria-label="Abrir AURA">
          <div className="zco-browser-top">
            <span />
            <span />
            <span />
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/aura-products.png" alt="Produtos do e-commerce AURA" />
        </a>
      </div>
    </section>
  )
}
