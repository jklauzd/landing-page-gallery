'use client'

import { Stack, Text, Button } from '@primer/react'

const LINKS = [
  { label: 'Work', slide: 1 },
  { label: 'Approach', slide: 2 },
  { label: 'Services', slide: 3 },
  { label: 'Contact', slide: 5 },
]

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
        backgroundColor: scrolled ? 'var(--overlay-bgColor, var(--bgColor-default))' : 'transparent',
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
        direction="horizontal"
        justify="space-between"
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
          aria-label="ZCompany home"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          <Text
            weight="semibold"
            style={{
              fontFamily: 'var(--fontStack-monospace)',
              fontSize: 'var(--text-body-size-large)',
              letterSpacing: '0.06em',
              color: 'var(--fgColor-default)',
            }}
          >
            ZCO
          </Text>
        </button>

        <nav aria-label="Gallery sections">
          <Stack direction="horizontal" gap="spacious" align="center">
            {LINKS.map((link) => (
              <button
                key={link.label}
                type="button"
                className="zco-link"
                data-active={activeIndex === link.slide}
                onClick={() => onNavigate(link.slide)}
              >
                {link.label}
              </button>
            ))}
          </Stack>
        </nav>

        <Button variant="primary" onClick={() => onNavigate(5)}>
          Start a Project
        </Button>
      </Stack>
    </header>
  )
}
