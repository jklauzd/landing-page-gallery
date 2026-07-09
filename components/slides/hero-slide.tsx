'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

const LINE_1 = 'Criamos páginas para'
const LINE_2_PRE = 'o seu negócio '
const LINE_2_EMPH = 'vender'
const LINE_2_END = '.'

function CharLine({
  text,
  className,
  emphasize,
}: {
  text: string
  className?: string
  emphasize?: boolean
}) {
  return (
    <span className={className}>
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
  const rootRef = useRef<HTMLElement | null>(null)
  const mockRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const cueRef = useRef<HTMLButtonElement | null>(null)
  const caretRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const root = rootRef.current
    const mock = mockRef.current
    const title = titleRef.current
    const cue = cueRef.current
    const caret = caretRef.current
    if (!root || !mock || !title || !cue) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const chars = title.querySelectorAll<HTMLElement>('.zco-hero-char')

    if (prefersReduced) {
      gsap.set([mock, title, cue, chars], { clearProps: 'all', opacity: 1, y: 0, x: 0, scale: 1, rotateX: 0 })
      if (caret) gsap.set(caret, { opacity: 0 })
      return
    }

    gsap.set(mock, {
      y: 120,
      opacity: 0,
      scale: 0.92,
      rotateX: 14,
      transformOrigin: '50% 100%',
      filter: 'blur(12px)',
    })
    gsap.set(chars, { opacity: 0, y: 10, display: 0.96 })
    gsap.set(title, { opacity: 1 })
    gsap.set(cue, { opacity: 0, y: 16 })
    if (caret) gsap.set(caret, { opacity: 0 })

    const line1Count = LINE_1.length
    const line1Chars = Array.from(chars).slice(0, line1Count)
    const line2Chars = Array.from(chars).slice(line1Count)

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      delay: 0.15,
    })

    // Mockup rises from below into place
    tl.to(
      mock,
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotateX: 0,
        filter: 'blur(0px)',
        duration: 1.35,
        ease: 'power4.out',
      },
      0,
    )

    // Caret appears as typing starts (slightly after mockup begins)
    if (caret) {
      tl.to(caret, { opacity: 1, duration: 0.2 }, 0.55)
    }

    // Type line 1
    tl.to(
      line1Chars,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.04,
        stagger: 0.028,
        ease: 'none',
        onUpdate: function () {
          // keep caret after last visible char of current wave via CSS position on title
        },
      },
      0.6,
    )

    // Type line 2
    tl.to(
      line2Chars,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.04,
        stagger: 0.03,
        ease: 'none',
      },
      '+=0.12',
    )

    // Soft settle on emphasis word
    const emph = title.querySelectorAll<HTMLElement>('.zco-hero-char.is-emph')
    tl.fromTo(
      emph,
      { color: 'rgba(244,246,248,0.9)' },
      {
        color: '',
        duration: 0.55,
        ease: 'power2.out',
        stagger: 0.02,
      },
      '-=0.25',
    )

    // Hide caret, show scroll cue
    if (caret) {
      tl.to(caret, { opacity: 0, duration: 0.25 }, '+=0.15')
    }
    tl.to(
      cue,
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
      },
      '-=0.05',
    )

    return () => {
      tl.kill()
    }
  }, [])

  const fullLabel = `${LINE_1} ${LINE_2_PRE}${LINE_2_EMPH}${LINE_2_END}`

  return (
    <section ref={rootRef} className="zco-slide zco-hero">
      <div className="zco-ambient zco-ambient-a" aria-hidden="true" />

      <div className="zco-hero-copy">
        <h1 ref={titleRef} className="zco-hero-title" aria-label={fullLabel}>
          <span className="zco-hero-line">
            <CharLine text={LINE_1} />
          </span>
          <span className="zco-hero-line">
            <CharLine text={LINE_2_PRE} />
            <CharLine text={LINE_2_EMPH} emphasize />
            <CharLine text={LINE_2_END} />
            <span ref={caretRef} className="zco-hero-caret" aria-hidden="true" />
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
