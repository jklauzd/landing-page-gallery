'use client'

import { ScrollHint } from './scroll-hint'

const PILLARS = [
  {
    id: 'domain',
    title: 'Domínio',
    desc: 'Nome profissional para o seu site',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3 12h18M12 3c2.5 2.8 3.8 5.8 3.8 9s-1.3 6.2-3.8 9c-2.5-2.8-3.8-5.8-3.8-9S9.5 5.8 12 3Z" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    id: 'design',
    title: 'Design',
    desc: 'Layout limpo, moderno e pensado para vender',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3l1.8 5.5L19.5 10l-5.7 1.5L12 17l-1.8-5.5L4.5 10l5.7-1.5L12 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M18 15l.9 2.6L21.5 18.5l-2.6.9L18 22l-.9-2.6-2.6-.9 2.6-.9L18 15Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'hosting',
    title: 'Hospedagem',
    desc: 'Site rápido, estável e no ar 24h',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3.5" y="4" width="17" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <rect x="3.5" y="10.5" width="17" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <rect x="3.5" y="17" width="17" height="3.5" rx="1.2" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="7" cy="6.5" r="0.9" fill="currentColor" />
        <circle cx="7" cy="13" r="0.9" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'code',
    title: 'Codificação',
    desc: 'Código limpo, leve e fácil de manter',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M8.5 7.5 4 12l4.5 4.5M15.5 7.5 20 12l-4.5 4.5M13.2 5.5 10.8 18.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'security',
    title: 'Segurança',
    desc: 'HTTPS, proteção e boas práticas',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3.5 5 6.5v5.2c0 4.3 2.9 7.8 7 8.8 4.1-1 7-4.5 7-8.8V6.5L12 3.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M9.2 12.1 11 13.9l3.8-3.9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
] as const

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

      <div data-reveal className="zco-handoff-stage" aria-label="Tudo que entregamos para o seu site ficar no ar">
        <div className="zco-handoff-orbit" aria-hidden="true">
          <span className="zco-handoff-ring zco-handoff-ring-a" />
          <span className="zco-handoff-ring zco-handoff-ring-b" />
          <span className="zco-handoff-glow" />

          <div className="zco-handoff-browser">
            <div className="zco-handoff-browser-top">
              <span />
              <span />
              <span />
              <em>seunegocio.com.br</em>
            </div>
            <div className="zco-handoff-browser-body">
              <div className="zco-handoff-browser-media" />
              <div className="zco-handoff-browser-lines">
                <i />
                <i />
                <i />
                <b />
              </div>
            </div>
          </div>

          {PILLARS.map((pillar) => (
            <article key={pillar.id} className={`zco-handoff-card zco-handoff-card-${pillar.id}`}>
              <span className="zco-handoff-card-icon">{pillar.icon}</span>
              <strong>{pillar.title}</strong>
              <small>{pillar.desc}</small>
            </article>
          ))}
        </div>
      </div>

      <ScrollHint />
    </section>
  )
}
