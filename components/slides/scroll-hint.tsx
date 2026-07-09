'use client'

export function ScrollHint({ label = 'Próximo' }: { label?: string }) {
  return (
    <div className="zco-scroll-cue zco-slide-scroll-cue" aria-hidden="true">
      <span className="zco-scroll-cue-label">{label}</span>
      <span className="zco-scroll-cue-line" />
      <span className="zco-scroll-cue-chevron">
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
    </div>
  )
}
