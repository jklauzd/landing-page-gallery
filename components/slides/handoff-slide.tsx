'use client'

import { ScrollHint } from './scroll-hint'

export function HandoffSlide() {
  return (
    <section className="zco-slide zco-handoff">
      <div className="zco-ambient zco-ambient-green" aria-hidden="true" />

      <div className="zco-handoff-copy">
        <h2 data-reveal>SEM DOR DE CABEÇA</h2>
        <p data-reveal>
          Domínio, hospedagem, design da página e codificação — cuidamos de toda a parte técnica para o seu negócio ficar online.
        </p>
      </div>

      <div data-reveal className="zco-handoff-stage" aria-label="Entrega completa">
        <div className="zco-handoff-diagram" aria-hidden="true">
          <div className="zco-handoff-plane">
            <span className="zco-handoff-route zco-handoff-route-a" />
            <span className="zco-handoff-route zco-handoff-route-b" />
            <span className="zco-handoff-route zco-handoff-route-c" />
            <span className="zco-handoff-route zco-handoff-route-d" />
          </div>

          <div className="zco-handoff-node zco-handoff-node-domain">
            <i />
            <span>Domínio</span>
          </div>
          <div className="zco-handoff-node zco-handoff-node-design">
            <i />
            <span>Design</span>
          </div>
          <div className="zco-handoff-node zco-handoff-node-build">
            <i />
            <span>Código</span>
          </div>

          <div className="zco-handoff-live">
            <span className="zco-handoff-live-pulse" />
            <strong>online</strong>
            <small>publicado</small>
          </div>
        </div>
      </div>

      <ScrollHint />
    </section>
  )
}
