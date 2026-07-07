/** Miniature authentication screen inside a browser frame. */
export function LoginMockup() {
  return (
    <div
      style={{
        minHeight: 320,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        background:
          'radial-gradient(90% 70% at 50% 0%, rgba(199,237,79,0.10), transparent 60%), var(--bgColor-default)',
      }}
    >
      <div
        style={{
          width: 240,
          border: '1px solid var(--borderColor-default)',
          borderRadius: 14,
          background: 'var(--bgColor-inset)',
          padding: '22px 22px 20px',
          boxShadow: '0 24px 60px -30px rgba(0,0,0,0.8)',
        }}
      >
        <div
          className="zco-display"
          style={{
            fontSize: 16,
            color: 'var(--fgColor-default)',
            textAlign: 'center',
            marginBottom: 4,
          }}
        >
          Bem-vindo de volta
        </div>
        <div
          style={{
            fontSize: 9,
            color: 'var(--fgColor-muted)',
            textAlign: 'center',
            marginBottom: 18,
          }}
        >
          Entre para continuar na sua conta
        </div>

        {[
          { label: 'E-mail', value: 'voce@email.com' },
          { label: 'Senha', value: '••••••••••' },
        ].map((f) => (
          <div key={f.label} style={{ marginBottom: 10 }}>
            <div
              style={{
                fontSize: 8,
                color: 'var(--fgColor-muted)',
                marginBottom: 4,
                fontFamily: 'var(--zco-mono)',
                letterSpacing: '0.08em',
              }}
            >
              {f.label.toUpperCase()}
            </div>
            <div
              style={{
                height: 30,
                borderRadius: 8,
                border: '1px solid var(--borderColor-default)',
                background: 'var(--bgColor-default)',
                display: 'flex',
                alignItems: 'center',
                padding: '0 10px',
                fontSize: 10,
                color: 'var(--fgColor-muted)',
              }}
            >
              {f.value}
            </div>
          </div>
        ))}

        <div
          style={{
            height: 32,
            borderRadius: 8,
            background: 'var(--zco-lime)',
            color: 'var(--bgColor-default)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 10,
            fontWeight: 700,
            marginTop: 6,
            marginBottom: 14,
          }}
        >
          Entrar
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 14,
          }}
        >
          <span
            style={{ flex: 1, height: 1, background: 'var(--borderColor-muted)' }}
          />
          <span style={{ fontSize: 8, color: 'var(--fgColor-muted)' }}>ou</span>
          <span
            style={{ flex: 1, height: 1, background: 'var(--borderColor-muted)' }}
          />
        </div>

        <div
          style={{
            height: 30,
            borderRadius: 8,
            border: '1px solid var(--borderColor-default)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 9,
            color: 'var(--fgColor-default)',
          }}
        >
          Continuar com Google
        </div>
      </div>
    </div>
  )
}
