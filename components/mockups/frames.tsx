import type { ReactNode } from 'react'

export function BrowserFrame({
  url,
  children,
  width = 640,
}: {
  url: string
  children: ReactNode
  width?: number
}) {
  return (
    <div className="zco-browser" style={{ width }}>
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

export function PhoneFrame({
  children,
  width = 300,
}: {
  children: ReactNode
  width?: number
}) {
  return (
    <div className="zco-phone" style={{ width }}>
      <div style={{ background: 'var(--bgColor-default)' }}>{children}</div>
    </div>
  )
}
