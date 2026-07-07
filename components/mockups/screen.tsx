'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Renders `children` at a fixed design width, then uniformly scales it to the
 * parent's width. The exact same "webpage" markup is reused in two modes:
 *
 * - `preview`: clips to a fixed browser-window aspect (shows the top of the
 *   page), so a very tall page still yields a tidy, consistent card.
 * - `full`: renders the entire page at natural (scaled) height so it can be
 *   scrolled inside the fullscreen overlay.
 *
 * Reusing one component across both modes is the core trick behind the
 * "step into the screen" illusion.
 */
export function Screen({
  designWidth,
  mode = 'preview',
  fold = 760,
  children,
}: {
  designWidth: number
  mode?: 'preview' | 'full'
  /** Visible design-height (px) shown in preview mode before clipping. */
  fold?: number
  children: ReactNode
}) {
  const outer = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0)
  const [fullHeight, setFullHeight] = useState(0)

  useEffect(() => {
    const o = outer.current
    const i = inner.current
    if (!o || !i) return
    const update = () => {
      const s = o.clientWidth / designWidth
      setScale(s)
      setFullHeight(i.offsetHeight * s)
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(o)
    ro.observe(i)
    return () => ro.disconnect()
  }, [designWidth])

  const previewHeight = (outer.current?.clientWidth || 0) * (fold / designWidth)
  const height =
    mode === 'preview'
      ? previewHeight || undefined
      : fullHeight || undefined

  return (
    <div
      ref={outer}
      style={{
        width: '100%',
        height,
        aspectRatio:
          mode === 'preview' && !previewHeight
            ? `${designWidth} / ${fold}`
            : undefined,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        ref={inner}
        style={{
          width: designWidth,
          transform: `scale(${scale || 0.0001})`,
          transformOrigin: 'top left',
        }}
      >
        {children}
      </div>
    </div>
  )
}
