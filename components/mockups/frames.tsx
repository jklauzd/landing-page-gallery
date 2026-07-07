import type { ReactNode } from 'react'

export function BrowserFrame({
  url,
  children,
  radius = 14,
}: {
  url: string
  children: ReactNode
  radius?: number
}) {
  return (
    <div className="zco-browser" style={{ width: '100%', borderRadius: radius }}>
      <div className="zco-browser-bar">
        <span className="zco-browser-dot" />
        <span className="zco-browser-dot" />
        <span className="zco-browser-dot" />
        <span className="zco-url">{url}</span>
      </div>
      <div style={{ background: 'var(--bgColor-default)' }}>{children}</div>
    </div>
  )
}

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="zco-phone" style={{ width: '100%' }}>
      <div style={{ background: 'var(--bgColor-default)' }}>{children}</div>
    </div>
  )
}
