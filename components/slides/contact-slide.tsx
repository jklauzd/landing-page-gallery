'use client'

import { MailIcon } from '@primer/octicons-react'

const EMAIL_LABEL = 'zcompany.digital@gmail.com'
const EMAIL = 'zcompany.digital@gmail.com'
const WHATSAPP_LABEL = '(62) 99182-5525'
const WHATSAPP_MESSAGE = 'Olá, vim do site da ZCompany e gostaria de um orçamento.'
const WHATSAPP_URL = `https://wa.me/5562991825525?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

export function ContactSlide() {
  return (
    <section className="zco-slide zco-contact">
      <div className="zco-ambient zco-ambient-a" aria-hidden="true" />

      <div className="zco-contact-copy">
        <h2 data-reveal>Vamos conversar.</h2>
        <p data-reveal>Entre em contato para um orçamento</p>
      </div>

      <div data-reveal className="zco-contact-panel">
        <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="zco-contact-option">
          <span className="zco-whatsapp-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" focusable="false">
              <path
                fill="currentColor"
                d="M16.1 4C9.5 4 4.2 9.3 4.2 15.8c0 2.2.6 4.2 1.7 6L4 28l6.4-1.8c1.7.9 3.6 1.4 5.7 1.4 6.5 0 11.8-5.3 11.8-11.8S22.6 4 16.1 4Zm0 21.6c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.8 1 1-3.6-.2-.4c-1-1.5-1.5-3.3-1.5-5.1 0-5.4 4.4-9.8 9.9-9.8 5.4 0 9.8 4.4 9.8 9.8 0 5.3-4.4 9.7-9.8 9.7Zm5.4-7.3c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.8-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.5-.6c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.3 5.2 4.6.7.3 1.3.5 1.8.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 1.9-1.3.2-.6.2-1.2.2-1.3-.1-.2-.3-.3-.6-.4Z"
              />
            </svg>
          </span>
          <strong>{WHATSAPP_LABEL}</strong>
        </a>

        <a href={`mailto:${EMAIL}`} className="zco-contact-option">
          <span aria-hidden="true">
            <MailIcon size={24} />
          </span>
          <strong>{EMAIL_LABEL}</strong>
        </a>
      </div>
    </section>
  )
}
