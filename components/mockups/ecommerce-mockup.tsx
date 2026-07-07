const PRODUCTS = [
  { name: 'Cadeira Arco', price: 'R$ 1.290', hue: 'rgba(199,237,79,0.20)' },
  { name: 'Luminária Sol', price: 'R$ 690', hue: 'rgba(120,170,255,0.20)' },
  { name: 'Mesa Nórdica', price: 'R$ 2.150', hue: 'rgba(255,150,120,0.18)' },
  { name: 'Tapete Dunas', price: 'R$ 880', hue: 'rgba(220,180,255,0.18)' },
]

/** Miniature e-commerce storefront inside a browser frame. */
export function EcommerceMockup() {
  return (
    <div style={{ padding: '16px 20px 22px' }}>
      {/* header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}
      >
        <span
          className="zco-display"
          style={{ fontSize: 15, color: 'var(--fgColor-default)' }}
        >
          casa nova
        </span>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontSize: 9, color: 'var(--fgColor-muted)' }}>
            Móveis
          </span>
          <span style={{ fontSize: 9, color: 'var(--fgColor-muted)' }}>
            Decor
          </span>
          <span
            style={{
              fontSize: 9,
              color: 'var(--fgColor-default)',
              border: '1px solid var(--borderColor-default)',
              borderRadius: 999,
              padding: '4px 10px',
              display: 'inline-flex',
              gap: 6,
              alignItems: 'center',
            }}
          >
            Sacola
            <span
              style={{
                background: 'var(--zco-lime)',
                color: 'var(--bgColor-default)',
                borderRadius: 999,
                width: 14,
                height: 14,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 8,
                fontWeight: 700,
              }}
            >
              3
            </span>
          </span>
        </div>
      </div>

      {/* filter row */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {['Tudo', 'Sala', 'Quarto', 'Escritório'].map((f, i) => (
          <span
            key={f}
            style={{
              fontSize: 8,
              padding: '4px 10px',
              borderRadius: 999,
              color: i === 0 ? 'var(--bgColor-default)' : 'var(--fgColor-muted)',
              background: i === 0 ? 'var(--fgColor-default)' : 'transparent',
              border:
                i === 0 ? 'none' : '1px solid var(--borderColor-muted)',
            }}
          >
            {f}
          </span>
        ))}
      </div>

      {/* product grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 12,
        }}
      >
        {PRODUCTS.map((p) => (
          <div key={p.name}>
            <div
              style={{
                aspectRatio: '1 / 1',
                borderRadius: 10,
                background: `radial-gradient(120% 100% at 50% 0%, ${p.hue}, transparent 60%), var(--bgColor-inset)`,
                border: '1px solid var(--borderColor-muted)',
                marginBottom: 8,
                position: 'relative',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: 6,
                  right: 6,
                  width: 18,
                  height: 18,
                  borderRadius: 999,
                  background: 'var(--bgColor-default)',
                  border: '1px solid var(--borderColor-muted)',
                }}
              />
            </div>
            <div
              style={{
                fontSize: 9,
                color: 'var(--fgColor-default)',
                marginBottom: 2,
              }}
            >
              {p.name}
            </div>
            <div
              style={{
                fontSize: 9,
                color: 'var(--fgColor-muted)',
                fontFamily: 'var(--zco-mono)',
              }}
            >
              {p.price}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
