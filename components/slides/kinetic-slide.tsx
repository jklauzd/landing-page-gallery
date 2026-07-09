'use client'

import { ArrowRightIcon } from '@primer/octicons-react'
import { ScrollHint } from './scroll-hint'

const PETSHOP_URL = '/sites/petluxe/index.html'

export function KineticSlide() {
  return (
    <section className="zco-slide zco-case zco-case-kinetic zco-case-petshop">
      <div className="zco-ambient zco-ambient-gold" aria-hidden="true" />

      <div className="zco-case-copy">
        <h2 data-reveal>LOJA ONLINE</h2>
        <p data-reveal>Colocamos seu catálogo na web para mostrar os produtos com clareza e receber o pedido do cliente.</p>
        <div data-reveal className="zco-actions">
          <a className="zco-case-cta" href={PETSHOP_URL} target="_blank" rel="noreferrer">
            Ver demonstração
            <ArrowRightIcon size={18} />
          </a>
        </div>
      </div>

      <div data-reveal className="zco-petshop-stage">
        <a href={PETSHOP_URL} target="_blank" rel="noreferrer" className="zco-petshop-browser" aria-label="Abrir PETLUXE">
          <div className="zco-browser-top">
            <span />
            <span />
            <span />
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/petluxe-products.png" alt="Produtos da loja PETLUXE" />
        </a>
      </div>

      <ScrollHint />
    </section>
  )
}
