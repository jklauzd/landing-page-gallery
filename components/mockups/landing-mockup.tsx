/**
 * A miniature landing page rendered inside a browser frame — the
 * "landing page within the landing page". Pure presentation, Primer tokens.
 */
export function LandingMockup() {
  return (
    <div style={{ padding: '18px 22px 24px' }}>
      {/* mini nav */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 26,
        }}
      >
        <span
          className="zco-display"
          style={{ fontSize: 15, color: 'var(--fgColor-default)' }}
        >
          lumen
          <span className="zco-accent">.</span>
        </span>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          {['Produto', 'Preços', 'Sobre'].map((l) => (
            <span
              key={l}
              style={{ fontSize: 9, color: 'var(--fgColor-muted)' }}
            >
              {l}
            </span>
          ))}
          <span
            style={{
              fontSize: 9,
              color: 'var(--bgColor-default)',
              background: 'var(--zco-lime)',
              borderRadius: 999,
              padding: '4px 10px',
              fontWeight: 600,
            }}
          >
            Começar
          </span>
        </div>
      </div>

      {/* hero */}
      <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
        <div style={{ flex: 1.1 }}>
          <div
            style={{
              fontSize: 9,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: 'var(--zco-lime)',
              marginBottom: 12,
              fontFamily: 'var(--zco-mono)',
            }}
          >
            Nova coleção
          </div>
          <div
            className="zco-display"
            style={{
              fontSize: 30,
              color: 'var(--fgColor-default)',
              lineHeight: 1.05,
              marginBottom: 12,
            }}
          >
            Luz que
            <br />
            desenha o dia
          </div>
          <div
            style={{
              fontSize: 10,
              color: 'var(--fgColor-muted)',
              lineHeight: 1.6,
              maxWidth: 200,
              marginBottom: 16,
            }}
          >
            Iluminação inteligente que se adapta ao seu ritmo, do amanhecer ao
            fim da noite.
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <span
              style={{
                fontSize: 9,
                color: 'var(--bgColor-default)',
                background: 'var(--fgColor-default)',
                borderRadius: 8,
                padding: '7px 14px',
                fontWeight: 600,
              }}
            >
              Comprar agora
            </span>
            <span
              style={{
                fontSize: 9,
                color: 'var(--fgColor-default)',
                border: '1px solid var(--borderColor-default)',
                borderRadius: 8,
                padding: '7px 14px',
              }}
            >
              Ver demo
            </span>
          </div>
        </div>
        <div
          style={{
            flex: 0.9,
            aspectRatio: '3 / 4',
            borderRadius: 12,
            background:
              'radial-gradient(120% 90% at 30% 15%, rgba(199,237,79,0.22), transparent 55%), linear-gradient(160deg, var(--bgColor-inset), var(--bgColor-muted))',
            border: '1px solid var(--borderColor-muted)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: '18% 30% 40% 22%',
              borderRadius: 999,
              background:
                'radial-gradient(circle at 40% 35%, rgba(255,255,255,0.5), rgba(199,237,79,0.35) 45%, transparent 70%)',
              filter: 'blur(1px)',
            }}
          />
        </div>
      </div>

      {/* logo strip */}
      <div
        style={{
          display: 'flex',
          gap: 22,
          justifyContent: 'center',
          marginTop: 22,
          paddingTop: 16,
          borderTop: '1px solid var(--borderColor-muted)',
        }}
      >
        {[36, 28, 40, 24, 32].map((w, i) => (
          <span
            key={i}
            style={{
              width: w,
              height: 8,
              borderRadius: 4,
              background: 'var(--borderColor-default)',
            }}
          />
        ))}
      </div>
    </div>
  )
}
