'use client'

import { ArrowRightIcon } from '@primer/octicons-react'

const DASHBOARD_URL = '/sites/dashboard/index.html'

export function VaultSlide() {
  return (
    <section className="zco-slide zco-case zco-case-vault zco-case-dashboard">
      <div className="zco-ambient zco-ambient-green" aria-hidden="true" />

      <div className="zco-case-copy">
        <h2 data-reveal>DASHBOARD</h2>
        <p data-reveal>Montamos um painel para você acompanhar vendas, pedidos e resultados do negócio em um único lugar.</p>
        <div data-reveal className="zco-actions">
          <a className="zco-case-cta" href={DASHBOARD_URL} target="_blank" rel="noreferrer">
            Ver demonstração
            <ArrowRightIcon size={18} />
          </a>
        </div>
      </div>

      <div data-reveal className="zco-dashboard-stage">
        <a href={DASHBOARD_URL} target="_blank" rel="noreferrer" className="zco-dashboard-browser" aria-label="Abrir dashboard Aether Nexus">
          <div className="zco-browser-top">
            <span />
            <span />
            <span />
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/aether-dashboard.png" alt="Dashboard Aether Nexus" />
        </a>
      </div>
    </section>
  )
}
