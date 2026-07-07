'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Renders `children` at a fixed design width, then uniformly scales the whole
 * thing to fill its parent's width. Natural height is measured automatically,
 * so the exact same "webpage" can render crisp inside a tiny tilted preview
 * frame AND be blown up to fullscreen without reflowing — the core trick
 * behind the "step into the screen" illusion.
 */
export function Screen({
  designWidth,
  children,
}: {
  designWidth: number
  children: ReactNode
}) {
  const outer = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  const [state, setState] = useState({ scale: 0, height: 0 })

  useEffect(() => {
    const o = outer.current
    const i = inner.current
    if (!o || !i) return
    const update = () => {
      const scale = o.clientWidth / designWidth
      setState({ scale, height: i.offsetHeight * scale })
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(o)
    ro.observe(i)
    return () => ro.disconnect()
  }, [designWidth])

  return (
    <div
      ref={outer}
      style={{
        width: '100%',
        height: state.height || undefined,
        aspectRatio: state.height ? undefined : '16 / 10',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        ref={inner}
        style={{
          width: designWidth,
          transform: `scale(${state.scale || 0.0001})`,
          transformOrigin: 'top left',
        }}
      >
        {children}
      </div>
    </div>
  )
}
