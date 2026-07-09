'use client'

export function HandoffSlide() {
  return (
    <section className="zco-slide zco-handoff">
      <div className="zco-ambient zco-ambient-green" aria-hidden="true" />

      <div className="zco-handoff-copy">
        <h2 data-reveal>SEM DOR DE CABEÇA</h2>
        <p data-reveal>
          Cuidamos da publicação: domínio, hospedagem, ajustes finais e site no ar.
        </p>
      </div>

      <div data-reveal className="zco-handoff-stage" aria-label="Entrega completa">
        <div className="zco-deploy-window">
          <div className="zco-browser-top">
            <span />
            <span />
            <span />
          </div>
          <div className="zco-deploy-body">
            <div>
              <small>zcompany.com.br</small>
              <strong>Pronto para publicar</strong>
            </div>
            <i />
            <i />
            <i />
          </div>
        </div>

        <div className="zco-launch-card zco-launch-domain">
          <span>Domínio</span>
          <strong>conectado</strong>
        </div>

        <div className="zco-launch-card zco-launch-host">
          <span>Hospedagem</span>
          <strong>configurada</strong>
        </div>

        <div className="zco-handoff-list">
          <span>Publicação</span>
          <span>Ajustes finais</span>
          <span>Suporte inicial</span>
        </div>
      </div>
    </section>
  )
}
