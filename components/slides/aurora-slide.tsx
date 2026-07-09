'use client'

import { ArrowRightIcon } from '@primer/octicons-react'

const DENTAL_URL = '/sites/odontologia/index.html'
const LAW_URL = '/sites/advocacia/index.html'

export function AuroraSlide({ active }: { active: boolean }) {
  return (
    <section className={`zco-slide zco-case zco-case-aurora zco-case-services ${active ? 'is-active' : ''}`}>
      <div className="zco-ambient zco-ambient-gold" aria-hidden="true" />

      <div className="zco-case-copy">
        <h2 data-reveal>LANDING PAGE</h2>
        <p data-reveal>Explica o que você faz e pede o contato na hora certa.</p>
        <div data-reveal className="zco-actions">
          <a className="zco-case-cta" href={DENTAL_URL} target="_blank" rel="noreferrer">
            Ver odontologia
            <ArrowRightIcon size={18} />
          </a>
          <a className="zco-case-cta zco-case-cta-muted" href={LAW_URL} target="_blank" rel="noreferrer">
            Ver advocacia
            <ArrowRightIcon size={18} />
          </a>
        </div>
      </div>

      <div data-reveal className="zco-service-showcase">
        <a href={DENTAL_URL} target="_blank" rel="noreferrer" className="zco-service-browser" aria-label="Sorriso Elevado">
          <div className="zco-browser-top">
            <span />
            <span />
            <span />
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/case-dental.png" alt="Preview desktop da landing page Sorriso Elevado" />
        </a>

        <a href={LAW_URL} target="_blank" rel="noreferrer" className="zco-service-phone" aria-label="Mendes Advocacia">
          <div className="zco-phone-speaker" aria-hidden="true" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/case-law-phone-focus.png" alt="Preview mobile da landing page Mendes Advocacia" />
        </a>
      </div>
    </section>
  )
}
