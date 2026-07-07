'use client'

import { useEffect, useRef } from 'react'
import { Stack, Text, Button, Label } from '@primer/react'
import {
  ZapIcon,
  GraphIcon,
  ShieldCheckIcon,
  PulseIcon,
} from '@primer/octicons-react'
import gsap from 'gsap'

const STATS = [
  { value: 99.99, suffix: '%', label: 'Uptime SLA', decimals: 2 },
  { value: 42, suffix: 'ms', label: 'p99 latency', decimals: 0 },
  { value: 18000, suffix: '+', label: 'Teams shipping', decimals: 0 },
]

const FEATURES = [
  {
    icon: ZapIcon,
    title: 'Instant pipelines',
    body: 'Zero-config data pipelines that deploy in seconds, not sprints.',
  },
  {
    icon: GraphIcon,
    title: 'Live analytics',
    body: 'Every metric streams in real time — no nightly batch jobs.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'SOC 2 by default',
    body: 'Compliance guardrails baked into every environment.',
  },
  {
    icon: PulseIcon,
    title: 'Anomaly alerts',
    body: 'Signal over noise: alerts that only fire when it matters.',
  },
]

export function AuroraSlide({ active }: { active: boolean }) {
  const statsRef = useRef<HTMLDivElement>(null)
  const playedRef = useRef(false)

  useEffect(() => {
    if (!active || playedRef.current || !statsRef.current) return
    playedRef.current = true
    const nodes = statsRef.current.querySelectorAll<HTMLElement>('[data-count]')
    nodes.forEach((node) => {
      const target = Number(node.dataset.count)
      const decimals = Number(node.dataset.decimals ?? 0)
      const obj = { v: 0 }
      gsap.to(obj, {
        v: target,
        duration: 1.6,
        delay: 0.5,
        ease: 'power3.out',
        onUpdate: () => {
          node.textContent = obj.v.toLocaleString('en-US', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })
        },
      })
    })
  }, [active])

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
      {/* Amber wash + geometric grid */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 45% 40% at 20% 20%, var(--bgColor-attention-muted), transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(var(--borderColor-muted) 1px, transparent 1px), linear-gradient(90deg, var(--borderColor-muted) 1px, transparent 1px)',
          backgroundSize: 'var(--base-size-64, 64px) var(--base-size-64, 64px)',
          opacity: 0.35,
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 40%, black, transparent)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 70% at 50% 40%, black, transparent)',
          pointerEvents: 'none',
        }}
      />

      <Stack
        direction="vertical"
        gap="spacious"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 'var(--breakpoint-xlarge, 1280px)',
          margin: '0 auto',
          paddingInline: 'var(--base-size-24)',
        }}
      >
        <Stack direction="vertical" gap="normal" align="start">
          <div data-reveal>
            <Stack direction="horizontal" gap="condensed" align="center">
              <Label variant="attention">Case 02 — SaaS</Label>
              <Text
                size="small"
                style={{
                  fontFamily: 'var(--fontStack-monospace)',
                  color: 'var(--fgColor-muted)',
                }}
              >
                aurora.dev
              </Text>
            </Stack>
          </div>

          <div data-reveal>
            <h2
              className="text-balance"
              style={{
                fontFamily: 'var(--fontStack-sansSerifDisplay)',
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                fontWeight: 600,
                color: 'var(--fgColor-default)',
                maxWidth: '20ch',
                textWrap: 'balance',
              }}
            >
              Infrastructure your data team actually loves
            </h2>
          </div>

          <div data-reveal>
            <Stack direction="horizontal" gap="condensed">
              <Button variant="primary">Start free</Button>
              <Button variant="invisible">Read the docs</Button>
            </Stack>
          </div>
        </Stack>

        {/* Animated stats */}
        <div
          data-reveal
          ref={statsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 'var(--base-size-16)',
          }}
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              style={{
                borderLeft: '2px solid var(--borderColor-attention-emphasis)',
                paddingLeft: 'var(--base-size-16)',
              }}
            >
              <Stack direction="vertical" gap="none">
                <Stack direction="horizontal" gap="none" align="baseline">
                  <span
                    data-count={stat.value}
                    data-decimals={stat.decimals}
                    style={{
                      fontFamily: 'var(--fontStack-sansSerifDisplay)',
                      fontSize: 'clamp(1.75rem, 3vw, 2.75rem)',
                      fontWeight: 600,
                      letterSpacing: '-0.02em',
                      color: 'var(--fgColor-default)',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    0
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--fontStack-sansSerifDisplay)',
                      fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                      fontWeight: 600,
                      color: 'var(--fgColor-attention)',
                    }}
                  >
                    {stat.suffix}
                  </span>
                </Stack>
                <Text size="small" style={{ color: 'var(--fgColor-muted)' }}>
                  {stat.label}
                </Text>
              </Stack>
            </div>
          ))}
        </div>

        {/* Feature grid */}
        <div
          data-reveal
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'var(--base-size-16)',
          }}
        >
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="zco-card"
              style={{
                backgroundColor: 'var(--bgColor-muted)',
                border: '1px solid var(--borderColor-muted)',
                borderRadius: 'var(--borderRadius-large)',
              }}
            >
              <Stack direction="vertical" gap="condensed" padding="normal">
                <Icon size={20} fill="var(--fgColor-attention)" />
                <Text weight="semibold">{title}</Text>
                <Text size="small" style={{ color: 'var(--fgColor-muted)' }}>
                  {body}
                </Text>
              </Stack>
            </div>
          ))}
        </div>
      </Stack>
    </Stack>
  )
}
