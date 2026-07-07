'use client'

import type { ReactNode } from 'react'

export function ShowcaseSlide({
  index,
  total,
  eyebrow,
  title,
  description,
  mockup,
}: {
  index: string
  total: string
  eyebrow: string
  title: ReactNode
  description: string
  mockup: ReactNode
}) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'var(--bgColor-default)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 1240,
          margin: '0 auto',
          padding: '96px 40px 64px',
          display: 'grid',
          gridTemplateColumns: 'minmax(260px, 0.85fr) 1.15fr',
          gap: 48,
          alignItems: 'center',
        }}
      >
        {/* text column */}
        <div>
          <div
            data-reveal
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 24,
            }}
          >
            <span className="zco-eyebrow">{eyebrow}</span>
            <span
              style={{
                fontFamily: 'var(--zco-mono)',
                fontSize: 12,
                color: 'var(--fgColor-muted)',
              }}
            >
              {index} / {total}
            </span>
          </div>

          <h2
            data-reveal
            className="zco-display"
            style={{
              fontSize: 'clamp(38px, 5vw, 66px)',
              color: 'var(--fgColor-default)',
              margin: 0,
              marginBottom: 20,
              fontWeight: 400,
            }}
          >
            {title}
          </h2>

          <p
            data-reveal
            style={{
              fontSize: 16,
              lineHeight: 1.6,
              color: 'var(--fgColor-muted)',
              maxWidth: 380,
              margin: 0,
            }}
          >
            {description}
          </p>
        </div>

        {/* mockup stage */}
        <div
          data-reveal
          className="zco-stage"
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <div className="zco-float">
            <div className="zco-tilt">{mockup}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
