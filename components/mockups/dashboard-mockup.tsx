const NAV = ['Visão geral', 'Transações', 'Carteiras', 'Cartões', 'Relatórios', 'Config']

// smooth area-chart path (design coords: 720 wide x 220 tall plot)
const LINE =
  'M0,170 C60,150 90,90 150,110 C210,130 250,60 320,80 C390,100 420,40 490,55 C560,70 600,30 660,20 L720,25'
const AREA = `${LINE} L720,220 L0,220 Z`

/**
 * A realistic dark fintech dashboard, "Fluxo", with a smooth revenue chart,
 * KPI cards, and a transactions table. Uses a cool teal accent — a different
 * visual identity from both the zcompany site and the other mockups.
 * Designed at 1200px wide.
 */
export function DashboardMockup() {
  return (
    <div
      style={{
        width: 1200,
        display: 'flex',
        fontFamily: 'var(--zco-mono)',
        background: '#0e1116',
        color: '#e6edf3',
        minHeight: 720,
      }}
    >
      {/* sidebar */}
      <div
        style={{
          width: 220,
          background: '#0b0e12',
          borderRight: '1px solid #1b212b',
          padding: '26px 18px',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--zco-display)',
            fontSize: 22,
            marginBottom: 30,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span
            style={{
              width: 22,
              height: 22,
              borderRadius: 7,
              background: 'linear-gradient(135deg,#2dd4bf,#3b82f6)',
              display: 'inline-block',
            }}
          />
          Fluxo
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {NAV.map((n, i) => (
            <span
              key={n}
              style={{
                fontSize: 14,
                padding: '11px 14px',
                borderRadius: 9,
                color: i === 0 ? '#0b0e12' : '#8b949e',
                background: i === 0 ? '#2dd4bf' : 'transparent',
                fontWeight: i === 0 ? 600 : 400,
              }}
            >
              {n}
            </span>
          ))}
        </div>
      </div>

      {/* main */}
      <div style={{ flex: 1, padding: '26px 32px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 26,
          }}
        >
          <div>
            <div style={{ fontSize: 13, color: '#8b949e', marginBottom: 4 }}>
              Bom dia, Marina
            </div>
            <div style={{ fontFamily: 'var(--zco-display)', fontSize: 28 }}>
              Visão geral
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <span
              style={{
                fontSize: 13,
                padding: '10px 16px',
                borderRadius: 9,
                border: '1px solid #1b212b',
                color: '#8b949e',
              }}
            >
              Últimos 30 dias
            </span>
            <span
              style={{
                fontSize: 13,
                padding: '10px 16px',
                borderRadius: 9,
                background: '#2dd4bf',
                color: '#0b0e12',
                fontWeight: 600,
              }}
            >
              Exportar
            </span>
          </div>
        </div>

        {/* KPI cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 16,
            marginBottom: 20,
          }}
        >
          {[
            { k: 'Saldo total', v: 'R$ 482.900', d: '+8,2%', up: true },
            { k: 'Entradas', v: 'R$ 128.430', d: '+12,4%', up: true },
            { k: 'Saídas', v: 'R$ 64.210', d: '-3,1%', up: false },
          ].map((s) => (
            <div
              key={s.k}
              style={{
                border: '1px solid #1b212b',
                borderRadius: 14,
                padding: '18px 20px',
                background: '#12161c',
              }}
            >
              <div style={{ fontSize: 13, color: '#8b949e', marginBottom: 8 }}>
                {s.k}
              </div>
              <div style={{ fontFamily: 'var(--zco-display)', fontSize: 28, marginBottom: 8 }}>
                {s.v}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: s.up ? '#2dd4bf' : '#f0883e',
                }}
              >
                {s.d} vs. mês anterior
              </div>
            </div>
          ))}
        </div>

        {/* chart */}
        <div
          style={{
            border: '1px solid #1b212b',
            borderRadius: 14,
            padding: '22px 24px',
            background: '#12161c',
            marginBottom: 20,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 18,
            }}
          >
            <span style={{ fontFamily: 'var(--zco-display)', fontSize: 18 }}>
              Fluxo de caixa
            </span>
            <span style={{ fontSize: 13, color: '#8b949e' }}>
              Receita acumulada
            </span>
          </div>
          <svg viewBox="0 0 720 220" width="100%" height="220" preserveAspectRatio="none">
            <defs>
              <linearGradient id="fluxoFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={AREA} fill="url(#fluxoFill)" />
            <path
              d={LINE}
              fill="none"
              stroke="#2dd4bf"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="660" cy="20" r="6" fill="#2dd4bf" />
            <circle cx="660" cy="20" r="11" fill="#2dd4bf" fillOpacity="0.2" />
          </svg>
        </div>

        {/* transactions */}
        <div
          style={{
            border: '1px solid #1b212b',
            borderRadius: 14,
            background: '#12161c',
            overflow: 'hidden',
          }}
        >
          {[
            { n: 'Assinatura Figma', c: 'Software', v: '- R$ 96,00', up: false },
            { n: 'Pagamento Cliente Acme', c: 'Receita', v: '+ R$ 12.400', up: true },
            { n: 'Anúncios Meta', c: 'Marketing', v: '- R$ 2.180', up: false },
          ].map((t, i) => (
            <div
              key={t.n}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 22px',
                borderTop: i === 0 ? 'none' : '1px solid #1b212b',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: t.up ? 'rgba(45,212,191,0.15)' : 'rgba(240,136,62,0.15)',
                  }}
                />
                <div>
                  <div style={{ fontSize: 15 }}>{t.n}</div>
                  <div style={{ fontSize: 12, color: '#8b949e' }}>{t.c}</div>
                </div>
              </div>
              <span
                style={{
                  fontFamily: 'var(--zco-display)',
                  fontSize: 16,
                  color: t.up ? '#2dd4bf' : '#e6edf3',
                }}
              >
                {t.v}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
