'use client'

import { Stack, Text, Heading, Button, Label } from '@primer/react'
import { StarFillIcon, PackageIcon, SyncIcon } from '@primer/octicons-react'

const PERKS = [
  { icon: PackageIcon, label: 'Free worldwide shipping' },
  { icon: SyncIcon, label: '30-day returns' },
]

export function MeridianSlide() {
  return (
    <Stack
      direction="vertical"
      justify="center"
      style={{
        position: 'relative',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: 'var(--bgColor-inset)',
      }}
    >
      {/* Indigo accent wash */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 50% 60% at 75% 50%, var(--bgColor-accent-muted), transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 'var(--breakpoint-xlarge, 1280px)',
          margin: '0 auto',
          paddingInline: 'var(--base-size-24)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'var(--base-size-32)',
          alignItems: 'center',
        }}
      >
        {/* Product copy */}
        <Stack direction="vertical" gap="normal" align="start">
          <div data-reveal>
            <Stack direction="horizontal" gap="condensed" align="center">
              <Label variant="accent">Case 01 — E-commerce</Label>
              <Text
                size="small"
                style={{
                  fontFamily: 'var(--fontStack-monospace)',
                  color: 'var(--fgColor-muted)',
                }}
              >
                meridian.audio
              </Text>
            </Stack>
          </div>

          <div data-reveal>
            <h2
              style={{
                fontFamily: 'var(--fontStack-sansSerifDisplay)',
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                fontWeight: 600,
                color: 'var(--fgColor-default)',
              }}
            >
              Meridian One
            </h2>
          </div>

          <div data-reveal>
            <Text as="p" style={{ color: 'var(--fgColor-muted)', maxWidth: '40ch' }}>
              Studio-grade sound, sculpted for every day. A conversion-first
              storefront where the product never stops being the hero.
            </Text>
          </div>

          <div data-reveal>
            <Stack direction="horizontal" gap="condensed" align="center">
              <Stack direction="horizontal" gap="none" align="center" aria-label="Rated 5 out of 5 stars">
                {[0, 1, 2, 3, 4].map((i) => (
                  <StarFillIcon key={i} size={16} fill="var(--fgColor-accent)" />
                ))}
              </Stack>
              <Text size="small" style={{ color: 'var(--fgColor-muted)' }}>
                2,417 reviews
              </Text>
            </Stack>
          </div>

          <div data-reveal>
            <Stack direction="horizontal" gap="normal" align="center">
              <Heading as="h3" variant="medium">
                $349
              </Heading>
              <Text
                size="small"
                style={{
                  color: 'var(--fgColor-muted)',
                  textDecoration: 'line-through',
                }}
              >
                $429
              </Text>
              <Label variant="success">In stock</Label>
            </Stack>
          </div>

          <div data-reveal>
            <Stack direction="horizontal" gap="condensed">
              <Button variant="primary" size="large">
                Add to cart
              </Button>
              <Button variant="default" size="large">
                Listen in store
              </Button>
            </Stack>
          </div>

          <div data-reveal>
            <Stack direction="horizontal" gap="normal" wrap="wrap">
              {PERKS.map(({ icon: Icon, label }) => (
                <Stack key={label} direction="horizontal" gap="condensed" align="center">
                  <Icon size={16} fill="var(--fgColor-muted)" />
                  <Text size="small" style={{ color: 'var(--fgColor-muted)' }}>
                    {label}
                  </Text>
                </Stack>
              ))}
            </Stack>
          </div>
        </Stack>

        {/* Product visual */}
        <div data-reveal style={{ position: 'relative' }}>
          <div
            className="zco-card"
            style={{
              backgroundColor: 'var(--bgColor-default)',
              border: '1px solid var(--borderColor-muted)',
              borderRadius: 'var(--borderRadius-large)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-resting-medium)',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/meridian-headphones.png"
              alt="Meridian One over-ear wireless headphones in midnight blue"
              style={{ display: 'block', width: '100%', height: 'auto' }}
            />
            <Stack
              direction="horizontal"
              justify="space-between"
              align="center"
              padding="normal"
              style={{ borderTop: '1px solid var(--borderColor-muted)' }}
            >
              <Text
                size="small"
                style={{
                  fontFamily: 'var(--fontStack-monospace)',
                  color: 'var(--fgColor-muted)',
                }}
              >
                MERIDIAN ONE — MIDNIGHT
              </Text>
              <Label variant="accent">New</Label>
            </Stack>
          </div>
        </div>
      </div>
    </Stack>
  )
}
