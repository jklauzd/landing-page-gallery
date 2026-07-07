'use client'

const LINKS = [
  { label: 'Landing', slide: 1 },
  { label: 'E-commerce', slide: 2 },
  { label: 'Dashboards', slide: 3 },
  { label: 'Login', slide: 4 },
]

export function GalleryNav({
  activeIndex,
  onNavigate,
}: {
  activeIndex: number
  onNavigate: (index: number) => void
}) {
  const scrolled = activeIndex > 0

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        backgroundColor: scrolled
          ? 'color-mix(in srgb, var(--bgColor-default) 72%, transparent)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled
          ? '1px solid var(--borderColor-muted)'
          : '1px solid transparent',
        transition:
          'background-color 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
      }}
    >
      <div
        style={{
          maxWidth: 1240,
          margin: '0 auto',
          padding: '18px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <button
          type="button"
          onClick={() => onNavigate(0)}
          aria-label="zcompany — início"
          className="zco-display"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            fontSize: 22,
            color: 'var(--fgColor-default)',
            lineHeight: 1,
          }}
        >
          zcompany<span className="zco-accent">.</span>
        </button>

        <nav aria-label="Seções">
          <div
            style={{ display: 'flex', gap: 28, alignItems: 'center' }}
          >
            {LINKS.map((link) => (
              <button
                key={link.label}
                type="button"
                className="zco-link"
                data-active={activeIndex === link.slide}
                onClick={() => onNavigate(link.slide)}
              >
                {link.label}
              </button>
            ))}
          </div>
        </nav>

        <button
          type="button"
          onClick={() => onNavigate(5)}
          style={{
            cursor: 'pointer',
            border: 'none',
            borderRadius: 999,
            padding: '9px 18px',
            background: 'var(--zco-lime)',
            color: 'var(--bgColor-default)',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.02em',
          }}
        >
          Fale conosco
        </button>
      </div>
    </header>
  )
}
