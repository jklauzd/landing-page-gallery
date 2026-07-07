'use client'

import { MailIcon, CommentDiscussionIcon } from '@primer/octicons-react'

const EMAIL = 'contato@zcompany.com'
const WHATSAPP_DISPLAY = '+55 (11) 99999-9999'
const WHATSAPP_LINK = 'https://wa.me/5511999999999'

function ContactCard({
  href,
  external,
  icon,
  label,
  value,
}: {
  href: string
  external?: boolean
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="zco-card"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '18px 22px',
        borderRadius: 12,
        border: '1px solid var(--borderColor-default)',
        background: 'var(--bgColor-inset)',
        textDecoration: 'none',
        minWidth: 260,
      }}
    >
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 40,
          height: 40,
          borderRadius: 10,
          background: 'var(--zco-lime-dim)',
          color: 'var(--zco-lime)',
        }}
      >
        {icon}
      </span>
      <span style={{ textAlign: 'left' }}>
        <span
          style={{
            display: 'block',
            fontSize: 11,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            fontFamily: 'var(--zco-mono)',
            color: 'var(--fgColor-muted)',
            marginBottom: 4,
          }}
        >
          {label}
        </span>
        <span style={{ fontSize: 15, color: 'var(--fgColor-default)' }}>
          {value}
        </span>
      </span>
    </a>
  )
}

export function ContactSlide() {
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
        padding: '96px 24px 48px',
        backgroundColor: 'var(--bgColor-default)',
      }}
    >
      <div data-reveal className="zco-eyebrow" style={{ marginBottom: 24 }}>
        Vamos conversar
      </div>

      <h2
        data-reveal
        className="zco-display"
        style={{
          fontSize: 'clamp(40px, 6vw, 82px)',
          color: 'var(--fgColor-default)',
          margin: 0,
          marginBottom: 18,
          fontWeight: 400,
        }}
      >
        Seu próximo produto
        <br />
        começa aqui<span className="zco-accent">.</span>
      </h2>

      <p
        data-reveal
        style={{
          fontSize: 16,
          color: 'var(--fgColor-muted)',
          maxWidth: 440,
          margin: '0 0 44px',
          lineHeight: 1.6,
        }}
      >
        Conte sua ideia. Respondemos por e-mail ou WhatsApp e retornamos com uma
        proposta sob medida.
      </p>

      <div
        data-reveal
        style={{
          display: 'flex',
          gap: 16,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <ContactCard
          href={`mailto:${EMAIL}`}
          icon={<MailIcon size={18} />}
          label="E-mail"
          value={EMAIL}
        />
        <ContactCard
          href={WHATSAPP_LINK}
          external
          icon={<CommentDiscussionIcon size={18} />}
          label="WhatsApp"
          value={WHATSAPP_DISPLAY}
        />
      </div>

      <div
        data-reveal
        className="zco-display"
        style={{ marginTop: 64, fontSize: 20, color: 'var(--fgColor-default)' }}
      >
        zcompany<span className="zco-accent">.</span>
      </div>
    </div>
  )
}
