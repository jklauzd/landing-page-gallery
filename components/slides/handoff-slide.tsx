'use client'

import type { CSSProperties } from 'react'

const NODES = [
  { id: 'domain', label: 'Domínio', detail: 'conectado', angle: -90 },
  { id: 'host', label: 'Hospedagem', detail: 'pronta', angle: -18 },
  { id: 'publish', label: 'Publicação', detail: 'no ar', angle: 54 },
  { id: 'polish', label: 'Ajustes', detail: 'finais', angle: 126 },
  { id: 'support', label: 'Suporte', detail: 'inicial', angle: 198 },
] as const

export function HandoffSlide() {
  return (
    <section className="zco-slide zco-handoff">
      <div className="zco-ambient zco-ambient-green" aria-hidden="true" />

      <div className="zco-handoff-copy">
        <p data-reveal className="zco-kicker">
          Entrega completa
        </p>
        <h2 data-reveal>
          Sem dor de <em>cabeça</em>
        </h2>
        <p data-reveal>
          Você cuida do negócio. A gente cuida do site no ar — domínio, hospedagem,
          publicação e o ciclo de suporte inicial, tudo em um sistema só.
        </p>
      </div>

      <div
        data-reveal
        className="zco-symbiosis"
        aria-label="Ciclo de entrega: domínio, hospedagem, publicação, ajustes e suporte"
      >
        <svg className="zco-symbiosis-svg" viewBox="0 0 420 420" aria-hidden="true">
          <defs>
            <radialGradient id="zco-orbit-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(143, 214, 148, 0.22)" />
              <stop offset="70%" stopColor="rgba(143, 214, 148, 0.05)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <linearGradient id="zco-orbit-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(143, 214, 148, 0.55)" />
              <stop offset="50%" stopColor="rgba(118, 169, 255, 0.35)" />
              <stop offset="100%" stopColor="rgba(143, 214, 148, 0.5)" />
            </linearGradient>
          </defs>

          <circle cx="210" cy="210" r="168" fill="url(#zco-orbit-glow)" />
          <circle
            className="zco-orbit-ring"
            cx="210"
            cy="210"
            r="132"
            fill="none"
            stroke="url(#zco-orbit-stroke)"
            strokeWidth="1.25"
            strokeDasharray="4 10"
          />
          <circle
            className="zco-orbit-ring zco-orbit-ring-inner"
            cx="210"
            cy="210"
            r="78"
            fill="none"
            stroke="rgba(143, 214, 148, 0.28)"
            strokeWidth="1"
          />

          {NODES.map((node) => {
            const rad = ((node.angle - 90) * Math.PI) / 180
            const x = 210 + Math.cos(rad) * 132
            const y = 210 + Math.sin(rad) * 132
            return (
              <line
                key={node.id}
                className="zco-orbit-spoke"
                x1="210"
                y1="210"
                x2={x}
                y2={y}
                stroke="rgba(143, 214, 148, 0.28)"
                strokeWidth="1"
              />
            )
          })}
        </svg>

        <div className="zco-symbiosis-core">
          <span className="zco-symbiosis-pulse" aria-hidden="true" />
          <strong>Seu site</strong>
          <small>no ar, em ciclo</small>
        </div>

        {NODES.map((node) => (
          <div
            key={node.id}
            className={`zco-symbiosis-node zco-symbiosis-node--${node.id}`}
            style={{ '--node-angle': `${node.angle}deg` } as CSSProperties}
          >
            <span className="zco-symbiosis-dot" aria-hidden="true" />
            <div className="zco-symbiosis-node-text">
              <span>{node.label}</span>
              <strong>{node.detail}</strong>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
