'use client'

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import gsap from 'gsap'
import { ArrowUpRightIcon, XIcon } from '@primer/octicons-react'
import { BrowserFrame } from './frames'
import { Screen } from './screen'

/**
 * Renders a tilted preview of a mockup with a "Ver essa página" button.
 * On click, a portal overlay animates from the preview's exact on-screen
 * position out to (near) fullscreen — as if stepping through the screen —
 * then lets the user scroll the full page. Closing reverses the motion.
 */
export function ExpandableMockup({
  url,
  designWidth,
  label,
  children,
}: {
  url: string
  designWidth: number
  label: string
  children: ReactNode
}) {
  const previewRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const reduced = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Animate open: FLIP from preview rect to target rect.
  useLayoutEffect(() => {
    if (!open) return
    const frame = frameRef.current
    const overlay = overlayRef.current
    const preview = previewRef.current
    if (!frame || !overlay || !preview) return

    const start = preview.getBoundingClientRect()
    const target = frame.getBoundingClientRect()

    const dx = start.left - target.left
    const dy = start.top - target.top
    const sx = start.width / target.width
    const sy = start.height / target.height

    if (reduced()) {
      gsap.set(overlay, { autoAlpha: 1 })
      return
    }

    gsap.set(overlay, { autoAlpha: 0 })
    gsap.to(overlay, { autoAlpha: 1, duration: 0.35, ease: 'power2.out' })
    gsap.fromTo(
      frame,
      {
        x: dx,
        y: dy,
        scaleX: sx,
        scaleY: sy,
        transformOrigin: 'top left',
        opacity: 1,
      },
      {
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        duration: 0.85,
        ease: 'power4.inOut',
      },
    )
  }, [open])

  const close = useCallback(() => {
    const frame = frameRef.current
    const overlay = overlayRef.current
    const preview = previewRef.current
    if (!frame || !overlay || !preview || reduced()) {
      setOpen(false)
      return
    }
    const start = preview.getBoundingClientRect()
    const target = frame.getBoundingClientRect()
    const dx = start.left - target.left
    const dy = start.top - target.top
    const sx = start.width / target.width
    const sy = start.height / target.height

    gsap.to(overlay, { autoAlpha: 0, duration: 0.5, delay: 0.2 })
    gsap.to(frame, {
      x: dx,
      y: dy,
      scaleX: sx,
      scaleY: sy,
      transformOrigin: 'top left',
      duration: 0.6,
      ease: 'power4.inOut',
      onComplete: () => setOpen(false),
    })
  }, [])

  // Esc to close + freeze the gallery navigation while open.
  useEffect(() => {
    if (!open) return
    document.body.dataset.zcoOverlay = 'open'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        close()
      }
    }
    window.addEventListener('keydown', onKey, true)
    return () => {
      window.removeEventListener('keydown', onKey, true)
      delete document.body.dataset.zcoOverlay
    }
  }, [open, close])

  return (
    <>
      {/* Tilted preview */}
      <div className="zco-stage" style={{ width: '100%' }}>
        <div className="zco-float">
          <div className="zco-tilt">
            <div ref={previewRef}>
              <BrowserFrame url={url}>
                <Screen designWidth={designWidth}>{children}</Screen>
              </BrowserFrame>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="zco-see-btn"
          onClick={() => setOpen(true)}
          aria-label={`Ver a página completa: ${label}`}
        >
          Ver essa página
          <ArrowUpRightIcon size={16} />
        </button>
      </div>

      {/* Fullscreen overlay */}
      {mounted &&
        open &&
        createPortal(
          <div
            ref={overlayRef}
            className="zco-overlay"
            role="dialog"
            aria-modal="true"
            aria-label={`Prévia da página: ${label}`}
            onClick={(e) => {
              if (e.target === e.currentTarget) close()
            }}
          >
            <div className="zco-overlay-top">
              <span className="zco-overlay-label">{label}</span>
              <button
                type="button"
                className="zco-overlay-close"
                onClick={close}
                aria-label="Fechar prévia"
              >
                <XIcon size={16} />
                Fechar
              </button>
            </div>

            <div ref={frameRef} className="zco-overlay-frame">
              <BrowserFrame url={url} radius={16}>
                <div ref={scrollRef} className="zco-overlay-scroll">
                  <Screen designWidth={designWidth}>{children}</Screen>
                </div>
              </BrowserFrame>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
