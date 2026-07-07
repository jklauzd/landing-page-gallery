'use client'

import { useState } from 'react'
import { Stack, Text, Button, Label } from '@primer/react'
import { FlameIcon, CheckIcon } from '@primer/octicons-react'

/** Colorways map to Primer role tokens; hue-rotate re-tints the base purple shot. */
const COLORWAYS = [
  {
    id: 'hype',
    word: 'HYPE',
    name: 'Ultraviolet',
    swatch: 'var(--bgColor-done-emphasis)',
    fg: 'var(--fgColor-done)',
    hue: 0,
  },
  {
    id: 'rise',
    word: 'RISE',
    name: 'Solar Red',
    swatch: 'var(--bgColor-danger-emphasis)',
    fg: 'var(--fgColor-danger)',
    hue: 90,
  },
  {
    id: 'bold',
    word: 'BOLD',
    name: 'Blaze Orange',
    swatch: 'var(--bgColor-severe-emphasis)',
    fg: 'var(--fgColor-severe)',
    hue: 130,
  },
  {
    id: 'jump',
    word: 'JUMP',
    name: 'Volt Green',
    swatch: 'var(--bgColor-success-emphasis)',
    fg: 'var(--fgColor-success)',
    hue: 220,
  },
] as const

const SIZES = ['8', '9', '10', '11', '12']

export function KineticSlide() {
  const [colorway, setColorway] = useState<(typeof COLORWAYS)[number]>(
    COLORWAYS[0],
  )
  const [size, setSize] = useState('10')

  return (
    <Stack
      direction="vertical"
      justify="center"
      style={{
        position: 'relative',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: 'var(--bgColor-default)',
      }}
    >
      {/* Colorway wash follows selection */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse 60% 55% at 50% 45%, ${colorway.swatch}, transparent 72%)`,
          opacity: 0.25,
          transition: 'background 0.6s ease',
          pointerEvents: 'none',
        }}
      />

      {/* Giant keyword behind the product */}
      <div
        aria-hidden="true"
        data-reveal
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--fontStack-sansSerifDisplay)',
            fontSize: 'clamp(6rem, 24vw, 22rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: colorway.fg,
            opacity: 0.16,
            lineHeight: 1,
            userSelect: 'none',
            transition: 'color 0.6s ease',
          }}
        >
          {colorway.word}
        </span>
      </div>

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
        {/* Product image, re-tinted per colorway */}
        <div data-reveal style={{ order: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/kinetic-sneaker.png"
            alt={`Kinetic Flux sneaker in ${colorway.name}`}
            style={{
              display: 'block',
              width: '100%',
              maxWidth: '520px',
              margin: '0 auto',
              filter: `hue-rotate(${colorway.hue}deg) saturate(1.15) drop-shadow(0 24px 48px var(--shadow-color, transparent))`,
              transition: 'filter 0.6s ease, transform 0.6s ease',
              transform: 'rotate(-6deg)',
            }}
          />
        </div>

        {/* Configurator */}
        <Stack direction="vertical" gap="normal" align="start">
          <div data-reveal>
            <Stack direction="horizontal" gap="condensed" align="center">
              <Label variant="danger">Case 04 — Lifestyle</Label>
              <Text
                size="small"
                style={{
                  fontFamily: 'var(--fontStack-monospace)',
                  color: 'var(--fgColor-muted)',
                }}
              >
                kinetic.run
              </Text>
            </Stack>
          </div>

          <div data-reveal>
            <h2
              style={{
                fontFamily: 'var(--fontStack-sansSerifDisplay)',
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                lineHeight: 1.02,
                letterSpacing: '-0.02em',
                fontWeight: 700,
                color: 'var(--fgColor-default)',
              }}
            >
              Kinetic Flux
            </h2>
          </div>

          <div data-reveal>
            <Text as="p" style={{ color: 'var(--fgColor-muted)', maxWidth: '38ch' }}>
              Built for the streets, tuned for the track. Pick your energy —
              the page reacts.
            </Text>
          </div>

          {/* Colorway picker */}
          <div data-reveal>
            <Stack direction="vertical" gap="condensed">
              <Text
                size="small"
                weight="semibold"
                style={{
                  fontFamily: 'var(--fontStack-monospace)',
                  letterSpacing: '0.1em',
                  color: 'var(--fgColor-muted)',
                }}
              >
                COLORWAY — {colorway.name.toUpperCase()}
              </Text>
              <Stack direction="horizontal" gap="condensed">
                {COLORWAYS.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setColorway(c)}
                    aria-label={`Colorway ${c.name}`}
                    aria-pressed={colorway.id === c.id}
                    style={{
                      width: 'var(--base-size-32)',
                      height: 'var(--base-size-32)',
                      borderRadius: 'var(--borderRadius-full)',
                      background: c.swatch,
                      border:
                        colorway.id === c.id
                          ? '2px solid var(--fgColor-default)'
                          : '2px solid var(--borderColor-default)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'border-color 0.2s ease, transform 0.2s ease',
                      transform: colorway.id === c.id ? 'scale(1.1)' : 'scale(1)',
                    }}
                  >
                    {colorway.id === c.id && (
                      <CheckIcon size={16} fill="var(--fgColor-onEmphasis)" />
                    )}
                  </button>
                ))}
              </Stack>
            </Stack>
          </div>

          {/* Size picker */}
          <div data-reveal>
            <Stack direction="vertical" gap="condensed">
              <Text
                size="small"
                weight="semibold"
                style={{
                  fontFamily: 'var(--fontStack-monospace)',
                  letterSpacing: '0.1em',
                  color: 'var(--fgColor-muted)',
                }}
              >
                SIZE — US
              </Text>
              <Stack direction="horizontal" gap="condensed">
                {SIZES.map((s) => (
                  <Button
                    key={s}
                    variant={size === s ? 'primary' : 'default'}
                    size="small"
                    onClick={() => setSize(s)}
                    aria-pressed={size === s}
                  >
                    {s}
                  </Button>
                ))}
              </Stack>
            </Stack>
          </div>

          <div data-reveal>
            <Stack direction="horizontal" gap="condensed" align="center">
              <Button variant="primary" size="large" leadingVisual={FlameIcon}>
                Cop the pair — $189
              </Button>
              <Text
                size="small"
                style={{
                  fontFamily: 'var(--fontStack-monospace)',
                  color: 'var(--fgColor-muted)',
                }}
              >
                Drop 04 / limited
              </Text>
            </Stack>
          </div>
        </Stack>
      </div>
    </Stack>
  )
}
