'use client'

import { ArrowRightIcon } from '@primer/octicons-react'
import { ScrollHint } from './scroll-hint'

const FARO_URL = '/sites/faro/index.html'

export function FaroSlide() {
  return (
    <section className="zco-slide zco-case zco-case-faro">
      <div className="zco-faro-aurora zco-faro-aurora-one" aria-hidden="true" />
      <div className="zco-faro-aurora zco-faro-aurora-two" aria-hidden="true" />

      <div className="zco-case-copy zco-faro-copy">
        <span data-reveal className="zco-faro-kicker"><i /> Novo case · SaaS</span>
        <h2 data-reveal>FARO</h2>
        <p data-reveal>Uma landing premium para uma plataforma que transforma intenção em movimento — com clareza, ritmo e presença.</p>
        <div data-reveal className="zco-actions">
          <a className="zco-case-cta zco-faro-cta" href={FARO_URL} target="_blank" rel="noreferrer">
            Abrir experiência
            <ArrowRightIcon size={18} />
          </a>
          <span className="zco-faro-note">estratégia · produto · motion</span>
        </div>
      </div>

      <div data-reveal className="zco-faro-stage">
        <a href={FARO_URL} target="_blank" rel="noreferrer" className="zco-faro-browser" aria-label="Abrir case Faro">
          <div className="zco-faro-browser-top">
            <span className="zco-faro-brand"><i /><b>faro</b></span>
            <span className="zco-faro-top-label">Clareza em movimento</span>
            <span className="zco-faro-top-dot" />
          </div>
          <div className="zco-faro-screen">
            <div className="zco-faro-screen-copy">
              <span>O sistema operacional da clareza</span>
              <strong>A clareza encontra<br /><em>velocidade.</em></strong>
              <small>Foco para tudo que vem agora.</small>
              <i className="zco-faro-screen-button">Começar <b>↗</b></i>
            </div>
            <div className="zco-faro-product">
              <div className="zco-faro-product-top"><span>Faro / Produto</span><i>•••</i></div>
              <div className="zco-faro-product-body">
                <div className="zco-faro-rail"><i /><i /><i /><i /></div>
                <div className="zco-faro-workspace">
                  <small>Terça-feira, 9 de julho</small>
                  <b>Bom dia, Lia.</b>
                  <div className="zco-faro-focus"><span><i /> Foco desta semana <b>72%</b></span><strong>Reduzir o tempo entre insight e entrega.</strong><em><i /></em></div>
                  <div className="zco-faro-mini-grid"><i /><i /></div>
                </div>
              </div>
            </div>
          </div>
        </a>
        <div className="zco-faro-float zco-faro-float-left" aria-hidden="true"><i>✦</i><span>Sinal detectado<b>3 decisões alinhadas</b></span></div>
        <div className="zco-faro-float zco-faro-float-right" aria-hidden="true"><i>↗</i><span>Ritmo da equipe<b>Melhor que ontem</b></span></div>
      </div>

      <ScrollHint label="Próximo" />
    </section>
  )
}
