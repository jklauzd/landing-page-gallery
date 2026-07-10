'use client'

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent as ReactFocusEvent,
} from 'react'
import { flushSync } from 'react-dom'
import gsap from 'gsap'

const LINE_1 = 'criamos páginas'
const LINE_2 = 'para o seu negócio'
const LINE_3_EMPH = 'vender'
const LINE_3_END = '.'

const HERO_PROJECTS = [
  {
    name: 'Faro',
    href: '/sites/faro/index.html',
    image: '/images/faro-home-print.png',
    alt: 'Landing page Faro',
    accent: '#8fd694',
  },
  {
    name: 'Aether Nexus',
    href: '/sites/dashboard/index.html',
    image: '/images/aether-dashboard.png',
    alt: 'Dashboard Aether Nexus',
    accent: '#7657ff',
  },
  {
    name: 'Sorriso Elevado',
    href: '/sites/odontologia/index.html',
    image: '/images/case-dental.png',
    alt: 'Landing page Sorriso Elevado',
    accent: '#d7aa67',
  },
  {
    name: 'AURA',
    href: '/sites/aura/index.html',
    image: '/images/aura-products.png',
    alt: 'E-commerce AURA',
    accent: '#cbbba7',
  },
] as const

type HeroFaces = {
  front: number
  back: number
}

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

function HeroTurntable({ ready }: { ready: boolean }) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const rotorRef = useRef<HTMLDivElement | null>(null)
  const screenRef = useRef<HTMLDivElement | null>(null)
  const shadowRef = useRef<HTMLDivElement | null>(null)
  const orbitRef = useRef<HTMLSpanElement | null>(null)
  const autoplayRef = useRef<gsap.core.Timeline | null>(null)
  const orbitTweenRef = useRef<gsap.core.Tween | null>(null)
  const manualTweenRef = useRef<gsap.core.Timeline | null>(null)
  const activeIndexRef = useRef(0)
  const pendingTargetRef = useRef<number | null>(null)
  const spinningRef = useRef(false)

  const [faces, setFaces] = useState<HeroFaces>({ front: 0, back: 1 })
  const [isSpinning, setIsSpinning] = useState(false)
  const [isUserPaused, setIsUserPaused] = useState(false)
  const [isInteracting, setIsInteracting] = useState(false)
  const [isSlideVisible, setIsSlideVisible] = useState(true)
  const [isDocumentVisible, setIsDocumentVisible] = useState(true)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [assetsReady, setAssetsReady] = useState(false)

  const activeProject = HERO_PROJECTS[faces.front]
  const frontProject = HERO_PROJECTS[faces.front]
  const backProject = HERO_PROJECTS[faces.back]
  const stageStyle = {
    '--zco-turntable-accent': activeProject.accent,
  } as CSSProperties

  const markSpinning = useCallback((value: boolean) => {
    spinningRef.current = value
    setIsSpinning(value)
  }, [])

  const commitProject = useCallback(
    (target: number) => {
      const rotor = rotorRef.current
      if (!rotor) return

      activeIndexRef.current = target
      flushSync(() => {
        setFaces({
          front: target,
          back: (target + 1) % HERO_PROJECTS.length,
        })
      })
      gsap.set(rotor, { rotationY: 0 })
      pendingTargetRef.current = null
    },
    [],
  )

  useEffect(() => {
    let cancelled = false
    const preload = HERO_PROJECTS.map((project) => {
      const image = new Image()
      image.src = project.image
      return image.decode()
    })
    void Promise.allSettled(preload).then(() => {
      if (!cancelled) setAssetsReady(true)
    })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setPrefersReducedMotion(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const onVisibilityChange = () => {
      setIsDocumentVisible(document.visibilityState === 'visible')
    }
    onVisibilityChange()
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => document.removeEventListener('visibilitychange', onVisibilityChange)
  }, [])

  useEffect(() => {
    const root = rootRef.current
    const slide = root?.closest<HTMLElement>('section[aria-hidden]')
    if (!slide) return

    let resumeTimer: number | null = null
    let hasBeenHidden = false
    const update = () => {
      const visible = slide.getAttribute('aria-hidden') !== 'true'
      if (resumeTimer !== null) window.clearTimeout(resumeTimer)
      if (!visible) {
        hasBeenHidden = true
        setIsSlideVisible(false)
        return
      }
      if (!hasBeenHidden) {
        setIsSlideVisible(true)
        return
      }
      resumeTimer = window.setTimeout(() => setIsSlideVisible(true), 1050)
    }
    update()
    const observer = new MutationObserver(update)
    observer.observe(slide, { attributes: true, attributeFilter: ['aria-hidden'] })
    return () => {
      observer.disconnect()
      if (resumeTimer !== null) window.clearTimeout(resumeTimer)
    }
  }, [])

  useLayoutEffect(() => {
    const rotor = rotorRef.current
    const screen = screenRef.current
    const shadow = shadowRef.current
    const orbit = orbitRef.current
    if (!rotor || !screen || !shadow || !orbit) return

    const autoplay = gsap.timeline({ paused: true, repeat: -1, repeatRefresh: true })
    autoplay
      .to({}, { duration: 3.15 })
      .call(() => {
        pendingTargetRef.current = (activeIndexRef.current + 1) % HERO_PROJECTS.length
        markSpinning(true)
      })
      .to(screen, { y: -5, duration: 0.16, ease: 'power2.out' })
      .to(rotor, { rotationY: 180, duration: 1.05, ease: 'power3.inOut' }, '<')
      .to(
        shadow,
        {
          scaleX: 0.7,
          opacity: 0.34,
          duration: 0.525,
          repeat: 1,
          yoyo: true,
          ease: 'sine.inOut',
        },
        '<',
      )
      .call(() => {
        const next = pendingTargetRef.current ?? (activeIndexRef.current + 1) % HERO_PROJECTS.length
        commitProject(next)
      })
      .to(screen, { y: 0, duration: 0.24, ease: 'power2.out' }, '<')
      .call(() => markSpinning(false))

    const orbitTween = gsap.to(orbit, {
      rotation: 360,
      duration: 20,
      ease: 'none',
      repeat: -1,
      paused: true,
    })

    autoplayRef.current = autoplay
    orbitTweenRef.current = orbitTween

    return () => {
      autoplay.kill()
      orbitTween.kill()
      manualTweenRef.current?.kill()
      autoplayRef.current = null
      orbitTweenRef.current = null
      manualTweenRef.current = null
    }
  }, [commitProject, markSpinning])

  const shouldAutoplay =
    ready &&
    assetsReady &&
    !prefersReducedMotion &&
    !isUserPaused &&
    !isInteracting &&
    isSlideVisible &&
    isDocumentVisible

  useEffect(() => {
    const autoplay = autoplayRef.current
    const orbitTween = orbitTweenRef.current
    if (!autoplay || !orbitTween) return

    if (shouldAutoplay) {
      autoplay.resume()
      orbitTween.resume()
    } else if (!isSpinning) {
      autoplay.pause()
      orbitTween.pause()
    } else {
      orbitTween.pause()
    }
  }, [isSpinning, shouldAutoplay])

  useEffect(() => {
    const manualTween = manualTweenRef.current
    if (!manualTween) return
    if (isSlideVisible && isDocumentVisible) manualTween.resume()
    else manualTween.pause()
  }, [isDocumentVisible, isSlideVisible])

  useEffect(() => {
    if (!prefersReducedMotion) return

    const rotor = rotorRef.current
    const screen = screenRef.current
    const shadow = shadowRef.current
    autoplayRef.current?.pause(0, true)
    orbitTweenRef.current?.pause()
    manualTweenRef.current?.kill()
    manualTweenRef.current = null

    if (!rotor || !screen || !shadow || !spinningRef.current) return

    const target = pendingTargetRef.current ?? activeIndexRef.current
    gsap.killTweensOf([rotor, screen, shadow])
    activeIndexRef.current = target
    pendingTargetRef.current = null
    setFaces({
      front: target,
      back: (target + 1) % HERO_PROJECTS.length,
    })
    gsap.set(rotor, { rotationY: 0 })
    gsap.set(screen, { y: 0 })
    gsap.set(shadow, { scaleX: 1, opacity: 0.72 })
    markSpinning(false)
  }, [markSpinning, prefersReducedMotion])

  const showProject = useCallback(
    (target: number) => {
      const rotor = rotorRef.current
      const screen = screenRef.current
      const shadow = shadowRef.current
      if (
        !rotor ||
        !screen ||
        !shadow ||
        target === activeIndexRef.current ||
        spinningRef.current
      )
        return

      autoplayRef.current?.pause(0, true)
      manualTweenRef.current?.kill()

      if (prefersReducedMotion) {
        activeIndexRef.current = target
        pendingTargetRef.current = null
        setFaces({
          front: target,
          back: (target + 1) % HERO_PROJECTS.length,
        })
        gsap.set(rotor, { rotationY: 0 })
        markSpinning(false)
        return
      }

      flushSync(() => {
        setFaces((current) => ({ ...current, back: target }))
        markSpinning(true)
      })
      pendingTargetRef.current = target
      gsap.set(rotor, { rotationY: 0 })

      const manual = gsap.timeline({
        onComplete: () => {
          autoplayRef.current?.pause(0, true)
          manualTweenRef.current = null
        },
      })
      manual
        .to(screen, { y: -5, duration: 0.16, ease: 'power2.out' })
        .to(rotor, { rotationY: 180, duration: 1.05, ease: 'power3.inOut' }, '<')
        .to(
          shadow,
          {
            scaleX: 0.7,
            opacity: 0.34,
            duration: 0.525,
            repeat: 1,
            yoyo: true,
            ease: 'sine.inOut',
          },
          '<',
        )
        .call(() => commitProject(target))
        .to(screen, { y: 0, duration: 0.24, ease: 'power2.out' }, '<')
        .call(() => markSpinning(false))

      manualTweenRef.current = manual
    },
    [commitProject, markSpinning, prefersReducedMotion],
  )

  const handleBlur = (event: ReactFocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setIsInteracting(false)
  }

  return (
    <div
      ref={rootRef}
      className={`zco-turntable${isSpinning ? ' is-spinning' : ''}`}
      style={stageStyle}
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
      onFocusCapture={() => setIsInteracting(true)}
      onBlurCapture={handleBlur}
    >
      <div ref={shadowRef} className="zco-turntable-shadow" aria-hidden="true" />

      <div className="zco-turntable-plinth" aria-hidden="true">
        <div className="zco-turntable-plinth-side" />
        <div className="zco-turntable-plinth-top">
          <span className="zco-turntable-core" />
          <span className="zco-turntable-orbit-plane">
            <span ref={orbitRef} className="zco-turntable-orbit" />
          </span>
        </div>
      </div>

      <div className="zco-turntable-screen">
        <div ref={screenRef} className="zco-turntable-screen-motion">
          <a
            className="zco-turntable-link"
            href={activeProject.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`Abrir ${activeProject.name}`}
            aria-disabled={isSpinning || undefined}
            tabIndex={isSlideVisible && !isSpinning ? 0 : -1}
            onClick={(event) => {
              if (isSpinning) event.preventDefault()
            }}
          >
            <div ref={rotorRef} className="zco-turntable-rotor">
              <div className="zco-turntable-face zco-turntable-face-front">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={frontProject.image} alt={frontProject.alt} />
              </div>
              <div className="zco-turntable-face zco-turntable-face-back">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={backProject.image} alt={backProject.alt} />
              </div>
            </div>
          </a>
        </div>
      </div>

      <div className="zco-turntable-controls" role="group" aria-label="Selecionar projeto">
        <button
          type="button"
          className="zco-turntable-toggle"
          onClick={() => {
            setIsInteracting(false)
            setIsUserPaused((paused) => !paused)
          }}
          aria-label={isUserPaused ? 'Continuar rotação' : 'Pausar rotação'}
          disabled={prefersReducedMotion}
          tabIndex={isSlideVisible ? 0 : -1}
        >
          <span
            className={`zco-turntable-toggle-icon${isUserPaused ? ' is-play' : ''}`}
            aria-hidden="true"
          />
        </button>

        <span className="zco-turntable-dots">
          {HERO_PROJECTS.map((project, index) => (
            <button
              key={project.name}
              type="button"
              onClick={() => showProject(index)}
              aria-label={`Mostrar ${project.name}`}
              aria-current={faces.front === index ? 'true' : undefined}
              disabled={isSpinning || !assetsReady}
              tabIndex={isSlideVisible ? 0 : -1}
            >
              <span aria-hidden="true" />
            </button>
          ))}
        </span>
      </div>
    </div>
  )
}

export function HeroSlide({ onExplore }: { onExplore: () => void }) {
  const mockRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const cueRef = useRef<HTMLButtonElement | null>(null)
  const [turntableReady, setTurntableReady] = useState(false)

  useLayoutEffect(() => {
    const mock = mockRef.current
    const title = titleRef.current
    const cue = cueRef.current
    if (!mock || !title || !cue) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const chars = title.querySelectorAll<HTMLElement>('.zco-hero-char')

    if (prefersReduced) {
      gsap.set([mock, cue, chars], { opacity: 1, y: 0, scale: 1, rotateX: 0, filter: 'none' })
      setTurntableReady(true)
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
      onComplete: () => setTurntableReady(true),
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
        role="region"
        aria-label="Projetos da ZCompany em uma plataforma 3D rotativa"
        style={{ perspective: '1400px' }}
      >
        <HeroTurntable ready={turntableReady} />
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
