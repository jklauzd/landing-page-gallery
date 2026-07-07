'use client'

import { useState } from 'react'
import {
  Stack,
  Text,
  Button,
  FormControl,
  TextInput,
  Textarea,
  Select,
  Flash,
} from '@primer/react'
import { PaperAirplaneIcon, MailIcon } from '@primer/octicons-react'

export function ContactSlide() {
  const [submitted, setSubmitted] = useState(false)

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
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 45% 40% at 25% 80%, var(--bgColor-accent-muted), transparent 70%)',
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
        {/* Massive prompt */}
        <Stack direction="vertical" gap="normal" align="start">
          <div data-reveal>
            <Text
              size="small"
              style={{
                fontFamily: 'var(--fontStack-monospace)',
                color: 'var(--fgColor-muted)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}
            >
              06 — Start something
            </Text>
          </div>

          <div data-reveal>
            <h2
              className="text-balance"
              style={{
                fontFamily: 'var(--fontStack-sansSerifDisplay)',
                fontSize: 'clamp(3rem, 7vw, 6rem)',
                lineHeight: 1.02,
                letterSpacing: '-0.02em',
                fontWeight: 600,
                color: 'var(--fgColor-default)',
                maxWidth: '12ch',
                textWrap: 'balance',
              }}
            >
              Have a project in mind?
            </h2>
          </div>

          <div data-reveal>
            <a
              href="mailto:hello@zcompany.com"
              className="zco-cta-underline"
              style={{ textDecoration: 'none' }}
            >
              <MailIcon size={20} fill="var(--fgColor-default)" />
              <Text size="large" weight="semibold">
                hello@zcompany.com
              </Text>
            </a>
          </div>

          <div data-reveal>
            <Text size="small" style={{ color: 'var(--fgColor-muted)' }}>
              We take on four projects per quarter. Tell us about yours.
            </Text>
          </div>
        </Stack>

        {/* Minimal form */}
        <div data-reveal>
          {submitted ? (
            <Flash variant="success">
              Thank you — we&apos;ll reply within two business days.
            </Flash>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setSubmitted(true)
              }}
            >
              <Stack direction="vertical" gap="normal">
                <Stack direction="horizontal" gap="normal" wrap="wrap">
                  <Stack.Item grow>
                    <FormControl required>
                      <FormControl.Label>Name</FormControl.Label>
                      <TextInput block placeholder="Ada Lovelace" />
                    </FormControl>
                  </Stack.Item>
                  <Stack.Item grow>
                    <FormControl required>
                      <FormControl.Label>Email</FormControl.Label>
                      <TextInput
                        block
                        type="email"
                        placeholder="ada@company.com"
                      />
                    </FormControl>
                  </Stack.Item>
                </Stack>

                <FormControl>
                  <FormControl.Label>Budget</FormControl.Label>
                  <Select block defaultValue="25-50">
                    <Select.Option value="10-25">$10k — $25k</Select.Option>
                    <Select.Option value="25-50">$25k — $50k</Select.Option>
                    <Select.Option value="50-100">$50k — $100k</Select.Option>
                    <Select.Option value="100+">$100k+</Select.Option>
                  </Select>
                </FormControl>

                <FormControl required>
                  <FormControl.Label>Message</FormControl.Label>
                  <Textarea
                    block
                    rows={4}
                    resize="vertical"
                    placeholder="What are we building together?"
                  />
                  <FormControl.Caption>
                    A few sentences is plenty — we&apos;ll dig in on a call.
                  </FormControl.Caption>
                </FormControl>

                <Stack direction="horizontal" justify="end">
                  <Button
                    type="submit"
                    variant="primary"
                    size="large"
                    trailingVisual={PaperAirplaneIcon}
                  >
                    Send inquiry
                  </Button>
                </Stack>
              </Stack>
            </form>
          )}
        </div>
      </div>

      {/* Footer strip */}
      <Stack
        direction="horizontal"
        justify="space-between"
        align="center"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          maxWidth: 'var(--breakpoint-xlarge, 1280px)',
          margin: '0 auto',
          paddingInline: 'var(--base-size-24)',
          paddingBottom: 'var(--base-size-24)',
        }}
      >
        <Text
          size="small"
          style={{
            fontFamily: 'var(--fontStack-monospace)',
            color: 'var(--fgColor-muted)',
          }}
        >
          © 2026 ZCOMPANY
        </Text>
        <Text
          size="small"
          style={{
            fontFamily: 'var(--fontStack-monospace)',
            color: 'var(--fgColor-muted)',
          }}
        >
          06 / 06
        </Text>
      </Stack>
    </Stack>
  )
}
