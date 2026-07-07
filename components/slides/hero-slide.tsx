'use client'

import Image from 'next/image'
import { ArrowDownIcon } from '@primer/octicons-react'

export function HeroSlide({ onExplore }: { onExplore: () => void }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '0 24px',
        backgroundColor: 'var(--bgColor-default)',
      }}
    >
      <div data-reveal className="zco-eyebrow" style={{ marginBottom: 8 }}>
        Estúdio de produtos digitais
      </div>

      <div
        data-reveal
        style={{ width: 'min(440px, 68vw)', marginBottom: 4, marginTop: 4 }}
      >
        <Image
          src="/images/zcompany-logo.png"
          alt="zcompany"
          width={1000}
          height={560}
          priority
          style={{ width: '100%', height: 'auto' }}
        />
      </div>

      <p
        data-reveal
        className="zco-display"
        style={{
          fontSize: 'clamp(18px, 2.4vw, 26px)',
          color: 'var(--fgColor-muted)',
          maxWidth: 620,
          margin: 0,
          lineHeight: 1.35,
          fontWeight: 400,
        }}
      >
        Landing pages, e-commerces, dashboards e sistemas de login — desenhados
        e construídos sob medida.
      </p>

      <button
        data-reveal
        type="button"
        onClick={onExplore}
        className="zco-cta-underline"
        style={{ marginTop: 32, fontSize: 15 }}
      >
        Ver nossos produtos
        <span
          className="zco-scroll-hint"
          style={{ display: 'inline-flex', color: 'var(--zco-lime)' }}
        >
          <ArrowDownIcon size={16} />
        </span>
      </button>
    </div>
  )
}
