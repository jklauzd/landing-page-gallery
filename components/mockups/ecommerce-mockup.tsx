import Image from 'next/image'

const PRODUCTS = [
  { name: 'Poltrona Bouclé Nima', price: 'R$ 1.290', img: '/mockups/furniture-chair.png', tag: 'Novo' },
  { name: 'Sofá Clay 3 lugares', price: 'R$ 3.450', img: '/mockups/furniture-sofa.png' },
  { name: 'Luminária Terra', price: 'R$ 690', img: '/mockups/furniture-lamp.png' },
  { name: 'Vaso Orgânico Sálvia', price: 'R$ 240', img: '/mockups/furniture-vase.png', tag: '-15%' },
]

/**
 * A realistic furniture storefront, "Marcenaria". Bright, product-forward, with
 * real catalog photography — a clearly different business from the zcompany site.
 * Designed at 1200px wide.
 */
export function EcommerceMockup() {
  return (
    <div
      style={{
        width: 1200,
        fontFamily: 'var(--zco-mono)',
        background: '#faf7f2',
        color: '#2a2a28',
      }}
    >
      {/* top bar */}
      <div
        style={{
          fontSize: 12,
          textAlign: 'center',
          background: '#2a2a28',
          color: '#faf7f2',
          padding: '9px',
          letterSpacing: '0.12em',
        }}
      >
        FRETE GRÁTIS ACIMA DE R$ 999 · ATÉ 10X SEM JUROS
      </div>

      {/* header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '22px 44px',
          borderBottom: '1px solid #e7e0d5',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--zco-display)',
            fontSize: 26,
            letterSpacing: '0.04em',
          }}
        >
          Marcenaria
        </span>
        <div style={{ display: 'flex', gap: 30, fontSize: 14, color: '#5f594e' }}>
          {['Sala', 'Quarto', 'Escritório', 'Decoração'].map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 18, alignItems: 'center', fontSize: 14 }}>
          <span style={{ color: '#5f594e' }}>Buscar</span>
          <span
            style={{
              display: 'inline-flex',
              gap: 8,
              alignItems: 'center',
              background: '#2a2a28',
              color: '#faf7f2',
              borderRadius: 999,
              padding: '9px 16px',
            }}
          >
            Sacola
            <span
              style={{
                background: '#c96b3f',
                borderRadius: 999,
                width: 20,
                height: 20,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 11,
              }}
            >
              3
            </span>
          </span>
        </div>
      </div>

      {/* hero banner */}
      <div
        style={{
          position: 'relative',
          margin: '28px 44px',
          borderRadius: 22,
          overflow: 'hidden',
          height: 300,
          background: '#efe7da',
        }}
      >
        <Image
          src="/mockups/furniture-sofa.png"
          alt=""
          fill
          sizes="1120px"
          style={{ objectFit: 'cover', objectPosition: 'right center' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, rgba(250,247,242,0.96) 0%, rgba(250,247,242,0.7) 34%, transparent 60%)',
          }}
        />
        <div style={{ position: 'absolute', top: 60, left: 44, maxWidth: 420 }}>
          <div
            style={{
              fontSize: 13,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#a08c72',
              marginBottom: 16,
            }}
          >
            Coleção Inverno
          </div>
          <div
            style={{
              fontFamily: 'var(--zco-display)',
              fontSize: 52,
              lineHeight: 1,
              marginBottom: 20,
            }}
          >
            Conforto que
            <br />
            fica em casa.
          </div>
          <span
            style={{
              background: '#2a2a28',
              color: '#faf7f2',
              borderRadius: 999,
              padding: '14px 28px',
              fontSize: 14,
              display: 'inline-block',
            }}
          >
            Ver coleção
          </span>
        </div>
      </div>

      {/* filter + grid */}
      <div style={{ padding: '8px 44px 48px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 22,
          }}
        >
          <div style={{ display: 'flex', gap: 10 }}>
            {['Tudo', 'Assentos', 'Iluminação', 'Mesas', 'Decor'].map((f, i) => (
              <span
                key={f}
                style={{
                  fontSize: 13,
                  padding: '8px 18px',
                  borderRadius: 999,
                  color: i === 0 ? '#faf7f2' : '#5f594e',
                  background: i === 0 ? '#2a2a28' : 'transparent',
                  border: i === 0 ? 'none' : '1px solid #ddd4c6',
                }}
              >
                {f}
              </span>
            ))}
          </div>
          <span style={{ fontSize: 13, color: '#8a8172' }}>Ordenar: Relevância</span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 22,
          }}
        >
          {PRODUCTS.map((p) => (
            <div key={p.name}>
              <div
                style={{
                  position: 'relative',
                  aspectRatio: '4 / 5',
                  borderRadius: 16,
                  overflow: 'hidden',
                  background: '#f0e9dd',
                  marginBottom: 14,
                }}
              >
                <Image
                  src={p.img}
                  alt=""
                  fill
                  sizes="280px"
                  style={{ objectFit: 'cover' }}
                />
                {p.tag && (
                  <span
                    style={{
                      position: 'absolute',
                      top: 12,
                      left: 12,
                      background: p.tag.includes('%') ? '#c96b3f' : '#2a2a28',
                      color: '#faf7f2',
                      fontSize: 11,
                      padding: '5px 12px',
                      borderRadius: 999,
                    }}
                  >
                    {p.tag}
                  </span>
                )}
                <span
                  style={{
                    position: 'absolute',
                    bottom: 12,
                    right: 12,
                    width: 34,
                    height: 34,
                    borderRadius: 999,
                    background: '#faf7f2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 16,
                    boxShadow: '0 6px 14px -6px rgba(0,0,0,0.3)',
                  }}
                >
                  +
                </span>
              </div>
              <div style={{ fontSize: 15, marginBottom: 5 }}>{p.name}</div>
              <div
                style={{
                  fontFamily: 'var(--zco-display)',
                  fontSize: 18,
                  color: '#2a2a28',
                }}
              >
                {p.price}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
