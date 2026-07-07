const BARS = [42, 58, 36, 70, 52, 84, 61, 92, 74, 66, 88, 78]
const NAV = ['Visão geral', 'Vendas', 'Clientes', 'Relatórios', 'Ajustes']

/** Miniature analytics dashboard inside a browser frame. */
export function DashboardMockup() {
  return (
    <div style={{ display: 'flex', minHeight: 300 }}>
      {/* sidebar */}
      <div
        style={{
          width: 130,
          background: 'var(--bgColor-inset)',
          borderRight: '1px solid var(--borderColor-muted)',
          padding: '16px 12px',
        }}
      >
        <div
          className="zco-display"
          style={{
            fontSize: 13,
            color: 'var(--fgColor-default)',
            marginBottom: 18,
          }}
        >
          órbita
          <span className="zco-accent">.</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {NAV.map((n, i) => (
            <span
              key={n}
              style={{
                fontSize: 9,
                padding: '6px 8px',
                borderRadius: 6,
                color: i === 1 ? 'var(--fgColor-default)' : 'var(--fgColor-muted)',
                background: i === 1 ? 'var(--zco-lime-dim)' : 'transparent',
                borderLeft:
                  i === 1
                    ? '2px solid var(--zco-lime)'
                    : '2px solid transparent',
              }}
            >
              {n}
            </span>
          ))}
        </div>
      </div>

      {/* main */}
      <div style={{ flex: 1, padding: '16px 18px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: 14,
          }}
        >
          <span
            className="zco-display"
            style={{ fontSize: 15, color: 'var(--fgColor-default)' }}
          >
            Vendas
          </span>
          <span
            style={{
              fontSize: 8,
              color: 'var(--fgColor-muted)',
              fontFamily: 'var(--zco-mono)',
            }}
          >
            Últimos 12 meses
          </span>
        </div>

        {/* stat cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 8,
            marginBottom: 16,
          }}
        >
          {[
            { k: 'Receita', v: 'R$ 128k', d: '+12%' },
            { k: 'Pedidos', v: '2.940', d: '+6%' },
            { k: 'Ticket', v: 'R$ 43', d: '+3%' },
          ].map((s) => (
            <div
              key={s.k}
              style={{
                border: '1px solid var(--borderColor-muted)',
                borderRadius: 8,
                padding: '8px 10px',
                background: 'var(--bgColor-inset)',
              }}
            >
              <div style={{ fontSize: 8, color: 'var(--fgColor-muted)' }}>
                {s.k}
              </div>
              <div
                className="zco-display"
                style={{
                  fontSize: 16,
                  color: 'var(--fgColor-default)',
                  margin: '2px 0',
                }}
              >
                {s.v}
              </div>
              <div style={{ fontSize: 8, color: 'var(--zco-lime)' }}>{s.d}</div>
            </div>
          ))}
        </div>

        {/* chart */}
        <div
          style={{
            border: '1px solid var(--borderColor-muted)',
            borderRadius: 10,
            padding: '14px 14px 10px',
            background: 'var(--bgColor-inset)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: 6,
              height: 90,
            }}
          >
            {BARS.map((h, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${h}%`,
                  borderRadius: 3,
                  background:
                    i === 7
                      ? 'var(--zco-lime)'
                      : 'var(--borderColor-emphasis)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
