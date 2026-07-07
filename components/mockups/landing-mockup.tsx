import Image from 'next/image'

/**
 * A realistic full-size landing page for a fictional skincare brand, "Auréola".
 * Warm, light, editorial — deliberately nothing like the zcompany dark site,
 * so it reads as a real client project rather than a clone of our own page.
 * Designed at 1200px wide; the Screen wrapper scales it to any container.
 */
export function LandingMockup() {
  return (
    <div
      style={{
        width: 1200,
        fontFamily: 'var(--zco-mono)',
        background: '#f4ece1',
        color: '#3a3128',
      }}
    >
      {/* nav */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '26px 48px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--zco-display)',
            fontSize: 26,
            letterSpacing: '0.02em',
            color: '#2c241c',
          }}
        >
          Auréola
        </span>
        <div style={{ display: 'flex', gap: 34, alignItems: 'center', fontSize: 14 }}>
          {['Rotina', 'Produtos', 'Ciência', 'Sobre'].map((l) => (
            <span key={l} style={{ color: '#6b5f50' }}>
              {l}
            </span>
          ))}
          <span
            style={{
              background: '#2c241c',
              color: '#f4ece1',
              borderRadius: 999,
              padding: '11px 22px',
              fontSize: 13,
            }}
          >
            Comprar
          </span>
        </div>
      </div>

      {/* hero */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 40,
          alignItems: 'center',
          padding: '30px 48px 60px',
        }}
      >
        <div>
          <div
            style={{
              fontSize: 14,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#9c8b74',
              marginBottom: 22,
            }}
          >
            Skincare consciente
          </div>
          <div
            style={{
              fontFamily: 'var(--zco-display)',
              fontSize: 74,
              lineHeight: 0.98,
              color: '#2c241c',
              marginBottom: 26,
            }}
          >
            A pele
            <br />
            que respira.
          </div>
          <div
            style={{
              fontSize: 17,
              lineHeight: 1.7,
              color: '#6b5f50',
              maxWidth: 380,
              marginBottom: 34,
            }}
          >
            Fórmulas minimalistas com ativos naturais. Menos passos, mais
            resultado — para a sua rotina de todos os dias.
          </div>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <span
              style={{
                background: '#2c241c',
                color: '#f4ece1',
                borderRadius: 999,
                padding: '15px 30px',
                fontSize: 15,
              }}
            >
              Montar minha rotina
            </span>
            <span
              style={{
                fontFamily: 'var(--zco-display)',
                fontSize: 17,
                color: '#2c241c',
                borderBottom: '1px solid #2c241c',
                paddingBottom: 3,
              }}
            >
              Ver ingredientes
            </span>
          </div>
        </div>

        <div
          style={{
            position: 'relative',
            aspectRatio: '4 / 5',
            borderRadius: 24,
            overflow: 'hidden',
            boxShadow: '0 40px 80px -40px rgba(60,45,30,0.5)',
          }}
        >
          <Image
            src="/mockups/skincare-hero.png"
            alt=""
            fill
            sizes="600px"
            style={{ objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              left: 20,
              bottom: 20,
              background: 'rgba(244,236,225,0.92)',
              borderRadius: 16,
              padding: '14px 18px',
              display: 'flex',
              gap: 12,
              alignItems: 'center',
              backdropFilter: 'blur(6px)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--zco-display)',
                fontSize: 30,
                color: '#2c241c',
              }}
            >
              98%
            </span>
            <span style={{ fontSize: 12, color: '#6b5f50', lineHeight: 1.4 }}>
              relataram pele
              <br />
              mais macia em 14 dias
            </span>
          </div>
        </div>
      </div>

      {/* product strip */}
      <div
        style={{
          background: '#ece0d0',
          padding: '46px 48px 56px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: 30,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--zco-display)',
              fontSize: 34,
              color: '#2c241c',
            }}
          >
            Os favoritos
          </span>
          <span style={{ fontSize: 14, color: '#9c8b74' }}>Ver tudo →</span>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24,
          }}
        >
          {[
            { n: 'Sérum de Vitamina C', p: 'R$ 189' },
            { n: 'Hidratante Calêndula', p: 'R$ 129' },
            { n: 'Óleo Noturno de Rosa', p: 'R$ 215' },
          ].map((p) => (
            <div
              key={p.n}
              style={{
                background: '#f7f1e8',
                borderRadius: 18,
                padding: 20,
              }}
            >
              <div
                style={{
                  position: 'relative',
                  aspectRatio: '1 / 1',
                  borderRadius: 12,
                  overflow: 'hidden',
                  marginBottom: 16,
                  background: '#efe6d8',
                }}
              >
                <Image
                  src="/mockups/skincare-hero.png"
                  alt=""
                  fill
                  sizes="320px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div
                style={{
                  fontFamily: 'var(--zco-display)',
                  fontSize: 19,
                  color: '#2c241c',
                  marginBottom: 6,
                }}
              >
                {p.n}
              </div>
              <div style={{ fontSize: 15, color: '#6b5f50' }}>{p.p}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
