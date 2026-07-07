import Image from 'next/image'

/**
 * A realistic split-screen auth page for a fictional travel app, "Voa".
 * Immersive travel photo on the left, a clean login form on the right.
 * Designed at 1200px wide.
 */
export function LoginMockup() {
  return (
    <div
      style={{
        width: 1200,
        height: 720,
        display: 'flex',
        fontFamily: 'var(--zco-mono)',
        background: '#ffffff',
        color: '#1c1917',
      }}
    >
      {/* image side */}
      <div style={{ position: 'relative', width: 560 }}>
        <Image
          src="/mockups/travel-scene.png"
          alt=""
          fill
          sizes="560px"
          style={{ objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(20,30,40,0.25), rgba(20,30,40,0.55))',
          }}
        />
        <span
          style={{
            position: 'absolute',
            top: 34,
            left: 40,
            fontFamily: 'var(--zco-display)',
            fontSize: 26,
            color: '#fff',
          }}
        >
          Voa
        </span>
        <div style={{ position: 'absolute', bottom: 44, left: 40, right: 40 }}>
          <div
            style={{
              fontFamily: 'var(--zco-display)',
              fontSize: 40,
              lineHeight: 1.05,
              color: '#fff',
              marginBottom: 14,
            }}
          >
            O próximo destino
            <br />
            começa aqui.
          </div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>
            Mais de 40 mil viajantes planejam suas viagens com a Voa.
          </div>
        </div>
      </div>

      {/* form side */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 76px',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--zco-display)',
            fontSize: 34,
            marginBottom: 8,
          }}
        >
          Bem-vindo de volta
        </div>
        <div style={{ fontSize: 15, color: '#78716c', marginBottom: 34 }}>
          Entre para continuar planejando.
        </div>

        {[
          { label: 'E-mail', value: 'marina@email.com' },
          { label: 'Senha', value: '••••••••••••' },
        ].map((f) => (
          <div key={f.label} style={{ marginBottom: 18 }}>
            <div
              style={{
                fontSize: 13,
                color: '#57534e',
                marginBottom: 8,
              }}
            >
              {f.label}
            </div>
            <div
              style={{
                height: 52,
                borderRadius: 12,
                border: '1px solid #e7e5e4',
                background: '#fafaf9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 18px',
                fontSize: 15,
                color: '#44403c',
              }}
            >
              {f.value}
              {f.label === 'Senha' && (
                <span style={{ fontSize: 13, color: '#a8a29e' }}>Mostrar</span>
              )}
            </div>
          </div>
        ))}

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 13,
            color: '#78716c',
            marginBottom: 26,
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                width: 18,
                height: 18,
                borderRadius: 5,
                background: '#0ea5e9',
                display: 'inline-block',
              }}
            />
            Lembrar de mim
          </span>
          <span style={{ color: '#0ea5e9' }}>Esqueceu a senha?</span>
        </div>

        <div
          style={{
            height: 54,
            borderRadius: 12,
            background: '#0ea5e9',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            fontWeight: 600,
            marginBottom: 20,
          }}
        >
          Entrar
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            marginBottom: 20,
          }}
        >
          <span style={{ flex: 1, height: 1, background: '#e7e5e4' }} />
          <span style={{ fontSize: 13, color: '#a8a29e' }}>ou continue com</span>
          <span style={{ flex: 1, height: 1, background: '#e7e5e4' }} />
        </div>

        <div style={{ display: 'flex', gap: 14 }}>
          {['Google', 'Apple'].map((b) => (
            <div
              key={b}
              style={{
                flex: 1,
                height: 50,
                borderRadius: 12,
                border: '1px solid #e7e5e4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 15,
              }}
            >
              {b}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
