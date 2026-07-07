'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { GalleryNav } from './nav'
import { GalleryProgress } from './progress'
import { HeroSlide } from '@/components/slides/hero-slide'
import { ShowcaseSlide } from '@/components/slides/showcase-slide'
import { ContactSlide } from '@/components/slides/contact-slide'
import { ExpandableMockup } from '@/components/mockups/expandable-mockup'
import { LandingMockup } from '@/components/mockups/landing-mockup'
import { EcommerceMockup } from '@/components/mockups/ecommerce-mockup'
import { DashboardMockup } from '@/components/mockups/dashboard-mockup'
import { LoginMockup } from '@/components/mockups/login-mockup'

const SLIDE_LABELS = [
  'Início',
  'Landing pages',
  'E-commerce',
  'Dashboards',
  'Login',
  'Contato',
]

const TRANSITION = 1.0 // seconds
const WHEEL_THRESHOLD = 40
const TOUCH_THRESHOLD = 50

export function Gallery() {
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
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

    gsap.set(inEl, { yPercent: 100 * dir, autoAlpha: 1, scale: 1, zIndex: 2 })
    gsap.set(outEl, { zIndex: 1 })

    const reveals = inEl.querySelectorAll('[data-reveal]')
    gsap.set(reveals, { y: 48, opacity: 0 })

    gsap
      .timeline({
        defaults: { ease: 'power3.inOut' },
        onComplete: () => {
          gsap.set(outEl, { autoAlpha: 0, scale: 1, yPercent: 100 })
          window.setTimeout(() => {
            lockRef.current = false
          }, 250)
          wheelAccum.current = 0
        },
      })
      .to(outEl, { yPercent: -35 * dir, scale: 0.96, autoAlpha: 0, duration }, 0)
      .to(inEl, { yPercent: 0, duration }, 0)
      .to(
        reveals,
        {
          y: 0,
          opacity: 1,
          duration: prefersReduced ? 0 : 0.7,
          stagger: prefersReduced ? 0 : 0.07,
          ease: 'power3.out',
        },
        duration * 0.45,
      )
  }, [])

  const step = useCallback(
    (dir: 1 | -1) => goTo(activeRef.current + dir),
    [goTo],
  )

  useEffect(() => {
    slideRefs.current.forEach((el, i) => {
      if (!el) return
      gsap.set(
        el,
        i === 0 ? { yPercent: 0, autoAlpha: 1 } : { yPercent: 100, autoAlpha: 0 },
      )
    })
    const first = slideRefs.current[0]
    if (first) {
      const reveals = first.querySelectorAll('[data-reveal]')
      gsap.fromTo(
        reveals,
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.09,
          ease: 'power3.out',
          delay: 0.2,
        },
      )
    }
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    const overlayOpen = () => document.body.dataset.zcoOverlay === 'open'
    const onWheel = (e: WheelEvent) => {
      if (overlayOpen()) return
      e.preventDefault()
      if (lockRef.current) return
      wheelAccum.current += e.deltaY
      if (Math.abs(wheelAccum.current) >= WHEEL_THRESHOLD) {
        step(wheelAccum.current > 0 ? 1 : -1)
        wheelAccum.current = 0
      }
    }
    const onTouchStart = (e: TouchEvent) => {
      if (overlayOpen()) return
      touchStartY.current = e.touches[0].clientY
    }
    const onTouchEnd = (e: TouchEvent) => {
      if (overlayOpen() || touchStartY.current === null || lockRef.current)
        return
      const delta = touchStartY.current - e.changedTouches[0].clientY
      if (Math.abs(delta) >= TOUCH_THRESHOLD) step(delta > 0 ? 1 : -1)
      touchStartY.current = null
    }
    const onKey = (e: KeyboardEvent) => {
      if (overlayOpen()) return
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

  const total = String(SLIDE_LABELS.length - 2).padStart(2, '0')

  return (
    <main
      aria-label="zcompany — vitrine de produtos digitais"
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        backgroundColor: 'var(--bgColor-default)',
      }}
    >
      <GalleryNav activeIndex={activeIndex} onNavigate={goTo} />
      <GalleryProgress
        labels={SLIDE_LABELS}
        activeIndex={activeIndex}
        onNavigate={goTo}
      />

      <section ref={setSlideRef(0)} style={slideStyle} aria-hidden={activeIndex !== 0}>
        <HeroSlide onExplore={() => goTo(1)} />
      </section>

      <section ref={setSlideRef(1)} style={slideStyle} aria-hidden={activeIndex !== 1}>
        <ShowcaseSlide
          index="01"
          total={total}
          eyebrow="Landing pages"
          title={
            <>
              Primeiras
              <br />
              impressões que
              <br />
              convertem<span className="zco-accent">.</span>
            </>
          }
          description="Páginas rápidas, elegantes e feitas para transformar visitantes em clientes."
          mockup={
            <ExpandableMockup
              url="aureola.com.br"
              designWidth={1200}
              label="Auréola — Landing page"
            >
              <LandingMockup />
            </ExpandableMockup>
          }
        />
      </section>

      <section ref={setSlideRef(2)} style={slideStyle} aria-hidden={activeIndex !== 2}>
        <ShowcaseSlide
          index="02"
          total={total}
          eyebrow="E-commerce"
          title={
            <>
              Lojas que
              <br />
              vendem<span className="zco-accent">.</span>
            </>
          }
          description="Vitrines completas com catálogo, carrinho e checkout — prontas para escalar."
          mockup={
            <ExpandableMockup
              url="marcenaria.store"
              designWidth={1200}
              label="Marcenaria — E-commerce"
            >
              <EcommerceMockup />
            </ExpandableMockup>
          }
        />
      </section>

      <section ref={setSlideRef(3)} style={slideStyle} aria-hidden={activeIndex !== 3}>
        <ShowcaseSlide
          index="03"
          total={total}
          eyebrow="Dashboards"
          title={
            <>
              Dados que
              <br />
              viram decisão<span className="zco-accent">.</span>
            </>
          }
          description="Painéis claros e em tempo real para você acompanhar o que importa."
          mockup={
            <ExpandableMockup
              url="app.fluxo.io"
              designWidth={1200}
              label="Fluxo — Dashboard"
            >
              <DashboardMockup />
            </ExpandableMockup>
          }
        />
      </section>

      <section ref={setSlideRef(4)} style={slideStyle} aria-hidden={activeIndex !== 4}>
        <ShowcaseSlide
          index="04"
          total={total}
          eyebrow="Sistemas de login"
          title={
            <>
              Acesso
              <br />
              seguro e
              <br />
              sem atrito<span className="zco-accent">.</span>
            </>
          }
          description="Autenticação robusta com uma experiência de entrada simples e confiável."
          mockup={
            <ExpandableMockup
              url="voa.app/entrar"
              designWidth={1200}
              label="Voa — Sistema de login"
            >
              <LoginMockup />
            </ExpandableMockup>
          }
        />
      </section>

      <section ref={setSlideRef(5)} style={slideStyle} aria-hidden={activeIndex !== 5}>
        <ContactSlide />
      </section>
    </main>
  )
}
