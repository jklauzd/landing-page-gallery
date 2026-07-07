'use client'

import { Stack, Text, Button } from '@primer/react'
import { ArrowDownIcon, SparkleFillIcon } from '@primer/octicons-react'

export function HeroSlide({ onExplore }: { onExplore: () => void }) {
  return (
    <Stack
      direction="vertical"
      justify="space-between"
      style={{
        position: 'relative',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: 'var(--bgColor-default)',
      }}
    >
      {/* Ambient token-colored mesh */}
      <div
        aria-hidden="true"
        className="zco-mesh"
        style={{
          position: 'absolute',
          inset: '-20%',
          background:
            'radial-gradient(ellipse 40% 35% at 30% 40%, var(--bgColor-accent-muted), transparent 70%), radial-gradient(ellipse 35% 30% at 70% 65%, var(--bgColor-done-muted), transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div />

      <Stack
        direction="vertical"
        gap="spacious"
        align="start"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 'var(--breakpoint-xlarge, 1280px)',
          margin: '0 auto',
          paddingInline: 'var(--base-size-24)',
        }}
      >
        <div data-reveal>
          <Stack direction="horizontal" gap="condensed" align="center">
            <SparkleFillIcon size={16} fill="var(--fgColor-accent)" />
            <Text
              size="small"
              style={{
                fontFamily: 'var(--fontStack-monospace)',
                color: 'var(--fgColor-muted)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}
            >
              ZCompany — Digital Atelier
            </Text>
          </Stack>
        </div>

        <h1
          data-reveal
          className="text-balance"
          style={{
            fontFamily: 'var(--fontStack-sansSerifDisplay)',
            fontSize: 'clamp(3rem, 8vw, 7.5rem)',
            lineHeight: 1.02,
            letterSpacing: '-0.02em',
            fontWeight: 600,
            color: 'var(--fgColor-default)',
            maxWidth: '14ch',
            textWrap: 'balance',
          }}
        >
          Digital experiences that define brands
        </h1>

        <div data-reveal>
          <Text
            as="p"
            size="large"
            style={{ color: 'var(--fgColor-muted)', maxWidth: '44ch' }}
          >
            We craft landing pages as living artifacts. Scroll down — every
            screen you pass through is a real case, built end to end by our
            studio.
          </Text>
        </div>

        <div data-reveal>
          <Stack direction="horizontal" gap="normal" align="center">
            <Button
              variant="primary"
              size="large"
              trailingVisual={ArrowDownIcon}
              onClick={onExplore}
            >
              Explore Our Work
            </Button>
            <Text
              size="small"
              style={{
                fontFamily: 'var(--fontStack-monospace)',
                color: 'var(--fgColor-muted)',
              }}
            >
              4 live cases
            </Text>
          </Stack>
        </div>
      </Stack>

      <Stack
        direction="horizontal"
        justify="space-between"
        align="center"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 'var(--breakpoint-xlarge, 1280px)',
          margin: '0 auto',
          paddingInline: 'var(--base-size-24)',
          paddingBottom: 'var(--base-size-32)',
        }}
      >
        <div data-reveal>
          <Text
            size="small"
            style={{
              fontFamily: 'var(--fontStack-monospace)',
              color: 'var(--fgColor-muted)',
            }}
          >
            01 / 06
          </Text>
        </div>
        <div data-reveal className="zco-scroll-hint" aria-hidden="true">
          <ArrowDownIcon size={16} fill="var(--fgColor-muted)" />
        </div>
      </Stack>
    </Stack>
  )
}
