'use client'

import { Stack, Text, Button, Label } from '@primer/react'
import {
  ShieldLockIcon,
  LockIcon,
  VerifiedIcon,
  CreditCardIcon,
} from '@primer/octicons-react'

const TRUST = [
  { icon: ShieldLockIcon, label: 'Assets held 1:1 in segregated custody' },
  { icon: LockIcon, label: 'Hardware-backed key ceremonies' },
  { icon: VerifiedIcon, label: 'Audited quarterly, published openly' },
]

export function VaultSlide() {
  return (
    <Stack
      direction="vertical"
      justify="center"
      style={{
        position: 'relative',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: 'var(--bgColor-emphasis)',
      }}
    >
      {/* Emerald glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 55% 50% at 78% 60%, var(--bgColor-success-muted), transparent 70%)',
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
          gap: 'var(--base-size-48, 48px)',
          alignItems: 'center',
        }}
      >
        {/* Copy */}
        <Stack direction="vertical" gap="normal" align="start">
          <div data-reveal>
            <Stack direction="horizontal" gap="condensed" align="center">
              <Label variant="success">Case 03 — Fintech</Label>
              <Text
                size="small"
                style={{
                  fontFamily: 'var(--fontStack-monospace)',
                  color: 'var(--fgColor-onEmphasis)',
                  opacity: 0.6,
                }}
              >
                vault.capital
              </Text>
            </Stack>
          </div>

          <div data-reveal>
            <h2
              className="text-balance"
              style={{
                fontFamily: 'var(--fontStack-sansSerifDisplay)',
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
                fontWeight: 600,
                color: 'var(--fgColor-onEmphasis)',
                maxWidth: '16ch',
                textWrap: 'balance',
              }}
            >
              Private banking, without the marble lobby
            </h2>
          </div>

          <div data-reveal>
            <Text
              as="p"
              style={{
                color: 'var(--fgColor-onEmphasis)',
                opacity: 0.7,
                maxWidth: '42ch',
              }}
            >
              Vault is invitation-only wealth infrastructure. Discretion,
              security, and access — engineered for the few who need all three.
            </Text>
          </div>

          <div data-reveal>
            <Stack direction="vertical" gap="condensed">
              {TRUST.map(({ icon: Icon, label }) => (
                <Stack key={label} direction="horizontal" gap="condensed" align="center">
                  <Icon size={16} fill="var(--fgColor-success)" />
                  <Text
                    size="small"
                    style={{ color: 'var(--fgColor-onEmphasis)', opacity: 0.85 }}
                  >
                    {label}
                  </Text>
                </Stack>
              ))}
            </Stack>
          </div>

          <div data-reveal>
            <Stack direction="horizontal" gap="condensed" align="center">
              <Button variant="primary" size="large">
                Request invitation
              </Button>
              <Text
                size="small"
                style={{
                  fontFamily: 'var(--fontStack-monospace)',
                  color: 'var(--fgColor-onEmphasis)',
                  opacity: 0.55,
                }}
              >
                Waitlist: 4,200
              </Text>
            </Stack>
          </div>
        </Stack>

        {/* Card visual, built entirely from tokens */}
        <div data-reveal style={{ perspective: '1200px' }}>
          <div
            className="zco-card"
            style={{
              maxWidth: '420px',
              margin: '0 auto',
              aspectRatio: '1.586',
              borderRadius: 'var(--borderRadius-large)',
              border: '1px solid var(--borderColor-success-emphasis)',
              background:
                'linear-gradient(135deg, var(--bgColor-neutral-emphasis), var(--bgColor-emphasis) 60%), var(--bgColor-emphasis)',
              boxShadow: 'var(--shadow-floating-large)',
              transform: 'rotateX(6deg) rotateY(-8deg)',
              display: 'flex',
            }}
          >
            <Stack
              direction="vertical"
              justify="space-between"
              padding="normal"
              style={{ flex: 1 }}
            >
              <Stack direction="horizontal" justify="space-between" align="center">
                <Text
                  weight="semibold"
                  style={{
                    fontFamily: 'var(--fontStack-sansSerifDisplay)',
                    color: 'var(--fgColor-onEmphasis)',
                    letterSpacing: '0.08em',
                  }}
                >
                  VAULT
                </Text>
                <CreditCardIcon size={20} fill="var(--fgColor-success)" />
              </Stack>

              <Stack direction="vertical" gap="condensed">
                <Text
                  style={{
                    fontFamily: 'var(--fontStack-monospace)',
                    color: 'var(--fgColor-onEmphasis)',
                    letterSpacing: '0.2em',
                  }}
                >
                  •••• •••• •••• 0001
                </Text>
                <Stack direction="horizontal" justify="space-between" align="center">
                  <Text
                    size="small"
                    style={{
                      fontFamily: 'var(--fontStack-monospace)',
                      color: 'var(--fgColor-onEmphasis)',
                      opacity: 0.6,
                    }}
                  >
                    MEMBER SINCE 2024
                  </Text>
                  <Label variant="success">Obsidian tier</Label>
                </Stack>
              </Stack>
            </Stack>
          </div>
        </div>
      </div>
    </Stack>
  )
}
