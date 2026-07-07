'use client'

export function GalleryProgress({
  labels,
  activeIndex,
  onNavigate,
}: {
  labels: string[]
  activeIndex: number
  onNavigate: (index: number) => void
}) {
  return (
    <nav
      aria-label="Gallery progress"
      style={{
        position: 'fixed',
        right: 'var(--base-size-24)',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--base-size-8)',
        alignItems: 'flex-end',
      }}
    >
      {labels.map((label, i) => (
        <button
          key={label}
          type="button"
          className="zco-dot"
          data-active={activeIndex === i}
          onClick={() => onNavigate(i)}
          aria-label={`Go to ${label}`}
          aria-current={activeIndex === i ? 'true' : undefined}
        >
          <span
            style={{
              fontFamily: 'var(--fontStack-monospace)',
              fontSize: 'var(--text-caption-size)',
            }}
          >
            {String(i + 1).padStart(2, '0')}
          </span>
          <span className="zco-dot-bar" aria-hidden="true" />
        </button>
      ))}
    </nav>
  )
}
