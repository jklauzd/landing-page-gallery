'use client'

import { Stack } from '@primer/react'

export function GalleryNav({
  activeIndex,
  onNavigate,
}: {
  activeIndex: number
  onNavigate: (index: number) => void
}) {
  const scrolled = activeIndex > 0

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        backgroundColor: scrolled
          ? 'rgba(10, 12, 16, 0.72)'
          : 'rgba(10, 12, 16, 0.24)',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled
          ? '1px solid var(--borderColor-muted)'
          : '1px solid transparent',
        transition:
          'background-color 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
      }}
    >
      <Stack
        className="zco-nav-inner"
        direction="horizontal"
        justify="center"
        align="center"
        style={{
          maxWidth: 'var(--breakpoint-xlarge, 1280px)',
          margin: '0 auto',
          paddingInline: 'var(--base-size-24)',
          paddingBlock: 'var(--base-size-16)',
        }}
        >
          <button
            type="button"
            onClick={() => onNavigate(0)}
          className="zco-logo-button"
          aria-label="ZCompany home"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="zco-logo" src="/images/zco-logo.png" alt="ZCompany" />
        </button>
      </Stack>
    </header>
  )
}
