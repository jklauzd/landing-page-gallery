'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

const LINE_1 = 'criamos páginas'
const LINE_2 = 'para o seu negócio'
const LINE_3_EMPH = 'vender'
const LINE_3_END = '.'

function CharLine({
  text,
  emphasize,
}: {
  text: string
  emphasize?: boolean
}) {
  return (
    <span>
      {text.split('').map((char, i) => (
        <span
          key={`${char}-${i}`}
          className={`zco-hero-char${emphasize ? ' is-emph' : ''}${char === ' ' ? ' is-space' : ''}`}
          aria-hidden="true"
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}

export function HeroSlide({ onExplore }: { onExplore: () => void }) {
  const mockRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const cueRef = useRef<HTMLButtonElement | null>(null)

  useLayoutEffect(() => {
    const mock = mockRef.current
    const title = titleRef.current
    const cue = cueRef.current
    if (!mock || !title || !cue) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const chars = title.querySelectorAll<HTMLElement>('.zco-hero-char')

    if (prefersReduced) {
      gsap.set([mock, cue, chars], { opacity: 1, y: 0, scale: 1, rotateX: 0, filter: 'none' })
      return
    }

    gsap.set(mock, {
      y: 130,
      opacity: 0,
      scale: 0.92,
      rotateX: 16,
      transformOrigin: '50% 100%',
      filter: 'blur(14px)',
    })
    gsap.set(chars, { opacity: 0, y: 12, scale: 0.97 })
    gsap.set(cue, { opacity: 0, y: 18 })

    const line1Chars = Array.from(chars).slice(0, LINE_1.length)
    const line2Chars = Array.from(chars).slice(LINE_1.length, LINE_1.length + LINE_2.length)
    const line3Chars = Array.from(chars).slice(LINE_1.length + LINE_2.length)

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      delay: 0.12,
    })

    // Mockup rises from below
    tl.to(
      mock,
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotateX: 0,
        filter: 'blur(0px)',
        duration: 1.4,
        ease: 'power4.out',
      },
      0,
    )

    // Letters appear in sequence (no caret)
    tl.to(
      line1Chars,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.035,
        stagger: 0.024,
        ease: 'none',
      },
      0.55,
    )

    tl.to(
      line2Chars,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.035,
        stagger: 0.024,
        ease: 'none',
      },
      '+=0.08',
    )

    tl.to(
      line3Chars,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.035,
        stagger: 0.03,
        ease: 'none',
      },
      '+=0.08',
    )

    tl.to(
      cue,
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: 'power3.out',
      },
      '+=0.12',
    )

    return () => {
      tl.kill()
    }
  }, [])

  const fullLabel = `${LINE_1} ${LINE_2} ${LINE_3_EMPH}${LINE_3_END}`

  return (
    <section className="zco-slide zco-hero">
      <div className="zco-ambient zco-ambient-a" aria-hidden="true" />

      <div className="zco-hero-copy">
        <h1 ref={titleRef} className="zco-hero-title" aria-label={fullLabel}>
          <span className="zco-hero-line">
            <CharLine text={LINE_1} />
          </span>
          <span className="zco-hero-line">
            <CharLine text={LINE_2} />
          </span>
          <span className="zco-hero-line">
            <CharLine text={LINE_3_EMPH} emphasize />
            <CharLine text={LINE_3_END} />
          </span>
        </h1>
      </div>

      <div
        ref={mockRef}
        className="zco-hero-reel"
        aria-label="Prévia animada das landing pages da ZCompany"
        style={{ perspective: '1400px' }}
      >
        <div className="zco-browser-mock zco-reel-main">
          <div className="zco-browser-top">
            <span />
            <span />
            <span />
          </div>
          <div className="zco-shot-grid">
            <div className="zco-shot zco-shot-product">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/meridian-headphones.png" alt="" />
            </div>
            <div className="zco-shot zco-shot-dashboard">
              <div className="zco-chart-line" />
              <div className="zco-chart-bars">
                <i />
                <i />
                <i />
                <i />
              </div>
            </div>
            <div className="zco-shot zco-shot-brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/kinetic-sneaker.png" alt="" />
            </div>
          </div>
        </div>
      </div>

      <button
        ref={cueRef}
        type="button"
        className="zco-scroll-cue"
        onClick={onExplore}
        aria-label="Rolar para ver os projetos"
      >
        <span className="zco-scroll-cue-label">Ver projetos</span>
        <span className="zco-scroll-cue-line" aria-hidden="true" />
        <span className="zco-scroll-cue-chevron" aria-hidden="true">
          <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
            <path
              d="M1 1.5L9 8.5L17 1.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
    </section>
  )
}
