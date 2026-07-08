'use client'

import { ArrowLeftIcon, LinkExternalIcon } from '@primer/octicons-react'
import Link from 'next/link'

type CasePageProps = {
  title: string
  label: string
  description: string
  image: string
  imageAlt: string
  accent?: 'green' | 'blue' | 'gold'
}

export function CasePage({
  title,
  label,
  description,
  image,
  imageAlt,
  accent = 'green',
}: CasePageProps) {
  return (
    <main className={`zco-case-page zco-case-page-${accent}`}>
      <header className="zco-case-page-nav">
        <Link href="/" aria-label="Voltar para ZCompany">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/zco-logo.png" alt="ZCompany" />
        </Link>
      </header>

      <section className="zco-case-page-hero">
        <div className="zco-case-page-copy">
          <span>{label}</span>
          <h1>{title}</h1>
          <p>{description}</p>
          <Link className="zco-case-page-back" href="/">
            <ArrowLeftIcon size={18} />
            Voltar para o portfólio
          </Link>
        </div>

        <a className="zco-case-page-browser" href={image} target="_blank" rel="noreferrer">
          <div className="zco-browser-top">
            <span />
            <span />
            <span />
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={imageAlt} />
          <i aria-hidden="true">
            <LinkExternalIcon size={18} />
          </i>
        </a>
      </section>
    </main>
  )
}
