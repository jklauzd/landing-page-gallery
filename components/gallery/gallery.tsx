'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { GalleryNav } from './nav'
import { HeroSlide } from '@/components/slides/hero-slide'
import { MeridianSlide } from '@/components/slides/meridian-slide'
import { AuroraSlide } from '@/components/slides/aurora-slide'
import { VaultSlide } from '@/components/slides/vault-slide'
import { KineticSlide } from '@/components/slides/kinetic-slide'
import { HandoffSlide } from '@/components/slides/handoff-slide'
import { ContactSlide } from '@/components/slides/contact-slide'

const SLIDE_LABELS = [
  'ZCompany',
  'E-commerce',
  'Landing',
  'Dashboard',
  'Loja',
  'Entrega',
  'Contato',
]

const TRANSITION = 1.0 // seconds
const WHEEL_THRESHOLD = 40
const TOUCH_THRESHOLD = 50

export function Gallery() {
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [ready, setReady] = useState(false)
  const activeRef = useRef(0)
  const lockRef = useRef(false)
  const wheelAccum = useRef(0)
  const touchStartY = useRef<number | null>(null)

  const goTo = useCallback((target: number) => {
    const current = activeRef.current
    if (
      lockRef.current ||
      target === current ||
      target < 0 ||
      target >= SLIDE_LABELS.length
    )
      return

    const outEl = slideRefs.current[current]
    const inEl = slideRefs.current[target]
    if (!outEl || !inEl) return

    lockRef.current = true
    activeRef.current = target
    setActiveIndex(target)

    const dir = target > current ? 1 : -1
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const duration = prefersReduced ? 0 : TRANSITION

    const offscreenY = window.innerHeight * dir

    gsap.set(inEl, { y: offscreenY, yPercent: 0, autoAlpha: 1, scale: 1, zIndex: 2 })
    gsap.set(outEl, { zIndex: 1 })

    const reveals = inEl.querySelectorAll('[data-reveal]')
    gsap.set(reveals, {
      y: 56,
      opacity: 0,
      filter: prefersReduced ? 'none' : 'blur(10px)',
      scale: prefersReduced ? 1 : 0.97,
    })

    gsap
      .timeline({
        defaults: { ease: 'power3.inOut' },
        onComplete: () => {
          gsap.set(inEl, { y: 0, yPercent: 0, autoAlpha: 1, scale: 1 })
          gsap.set(outEl, { autoAlpha: 0, scale: 1, y: window.innerHeight, yPercent: 0 })
          gsap.set(reveals, { clearProps: 'filter' })
          // brief cooldown so trackpad momentum doesn't chain slides
          window.setTimeout(() => {
            lockRef.current = false
          }, 250)
          wheelAccum.current = 0
        },
      })
      .to(outEl, { y: -window.innerHeight * 0.35 * dir, scale: 0.96, autoAlpha: 0, duration }, 0)
      .to(inEl, { y: 0, duration }, 0)
      .to(
        reveals,
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          scale: 1,
          duration: prefersReduced ? 0 : 0.85,
          stagger: prefersReduced ? 0 : 0.09,
          ease: 'power4.out',
        },
        duration * 0.42,
      )
  }, [])

  const step = useCallback(
    (dir: 1 | -1) => goTo(activeRef.current + dir),
    [goTo],
  )

  // Initial state: hide all but first, reveal first slide's content
  useEffect(() => {
    slideRefs.current.forEach((el, i) => {
      if (!el) return
      gsap.set(el, i === 0 ? { y: 0, yPercent: 0, autoAlpha: 1 } : { y: window.innerHeight, yPercent: 0, autoAlpha: 0 })
    })
    // Hero runs its own presentation intro; skip generic reveal on first slide
    const first = slideRefs.current[0]
    if (first) {
      const isHero = !!first.querySelector('.zco-hero')
      const reveals = first.querySelectorAll('[data-reveal]')
      if (!isHero && reveals.length) {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        gsap.fromTo(
          reveals,
          {
            y: 56,
            opacity: 0,
            filter: prefersReduced ? 'none' : 'blur(12px)',
            scale: prefersReduced ? 1 : 0.97,
          },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            scale: 1,
            duration: prefersReduced ? 0 : 1.05,
            stagger: prefersReduced ? 0 : 0.1,
            ease: 'power4.out',
            delay: prefersReduced ? 0 : 0.18,
            onComplete: () => gsap.set(reveals, { clearProps: 'filter' }),
          },
        )
      }
    }
    setReady(true)
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  // Wheel, touch, keyboard
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (lockRef.current) return
      wheelAccum.current += e.deltaY
      if (Math.abs(wheelAccum.current) >= WHEEL_THRESHOLD) {
        step(wheelAccum.current > 0 ? 1 : -1)
        wheelAccum.current = 0
      }
    }
    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
    }
    const onTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null || lockRef.current) return
      const delta = touchStartY.current - e.changedTouches[0].clientY
      if (Math.abs(delta) >= TOUCH_THRESHOLD) step(delta > 0 ? 1 : -1)
      touchStartY.current = null
    }
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT')
      )
        return
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault()
        step(1)
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        step(-1)
      } else if (e.key === 'Home') {
        e.preventDefault()
        goTo(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        goTo(SLIDE_LABELS.length - 1)
      }
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('keydown', onKey)
    }
  }, [step, goTo])

  const setSlideRef = (i: number) => (el: HTMLDivElement | null) => {
    slideRefs.current[i] = el
  }

  const slideStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    willChange: 'transform',
  }

  return (
    <main
      className={`zco-gallery-shell${ready ? ' is-ready' : ''}`}
      aria-label="Galeria de landing pages da ZCompany"
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        backgroundColor: 'var(--bgColor-default)',
      }}
    >
      <GalleryNav activeIndex={activeIndex} onNavigate={goTo} />
      <section ref={setSlideRef(0)} style={slideStyle} aria-hidden={activeIndex !== 0}>
        <HeroSlide onExplore={() => goTo(1)} />
      </section>
      <section ref={setSlideRef(1)} style={slideStyle} aria-hidden={activeIndex !== 1}>
        <MeridianSlide />
      </section>
      <section ref={setSlideRef(2)} style={slideStyle} aria-hidden={activeIndex !== 2}>
        <AuroraSlide active={activeIndex === 2} />
      </section>
      <section ref={setSlideRef(3)} style={slideStyle} aria-hidden={activeIndex !== 3}>
        <VaultSlide />
      </section>
      <section ref={setSlideRef(4)} style={slideStyle} aria-hidden={activeIndex !== 4}>
        <KineticSlide />
      </section>
      <section ref={setSlideRef(5)} style={slideStyle} aria-hidden={activeIndex !== 5}>
        <HandoffSlide />
      </section>
      <section ref={setSlideRef(6)} style={slideStyle} aria-hidden={activeIndex !== 6}>
        <ContactSlide />
      </section>
    </main>
  )
}
