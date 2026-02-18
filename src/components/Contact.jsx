import emailjs from '@emailjs/browser';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  PiEnvelopeSimpleBold,
  PiMapPinBold,
  PiPaperPlaneRightBold,
  PiPhoneBold,
} from 'react-icons/pi';
import { SiGithub, SiLinkedin, SiWhatsapp } from 'react-icons/si';
import { z } from 'zod';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import SectionHeader from './SectionHeader.jsx';

const SUCCESS_AUTOHIDE_MS = 5000;

const schema = z.object({
  name: z.string().min(2, 'Informe seu nome completo.'),
  email: z.string().email('Use um e-mail válido.'),
  message: z.string().min(10, 'Conte um pouco mais sobre o seu desafio.'),
  website: z.string().max(0).optional(),
});

const emailConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_jbsyv7l',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_ahonab8',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'IcSov-EgznR__YE5f',
};

export default function Contact({ contact }) {
  const { t } = useLanguage();
  const [status, setStatus] = useState({ type: 'idle', message: '' });

  useEffect(() => {
    if (status.type !== 'success') return;

    const timeoutId = window.setTimeout(() => {
      setStatus({ type: 'idle', message: '' });
    }, SUCCESS_AUTOHIDE_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [status.type]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', message: '', website: '' },
    mode: 'onTouched',
  });

  const onSubmit = async (data) => {
    if (data.website) return;

    setStatus({ type: 'loading', message: 'Enviando mensagem...' });

    try {
      await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        {
          name: data.name,
          email: data.email,
          message: data.message,
          subject: `Nova mensagem do portfólio - ${data.name}`,
        },
        emailConfig.publicKey
      );

      setStatus({ type: 'success', message: 'Mensagem enviada com sucesso!' });
      reset();
    } catch (_error) {
      setStatus({
        type: 'error',
        message: 'Não foi possível enviar agora. Tente novamente em instantes.',
      });
    }
  };

  return (
    <section id="contato" className="section section--contrast contact-section" data-reveal>
      <div className="container">
        <SectionHeader
          eyebrow="Contato"
          title="Vamos conversar?"
          description="Estou disponível para novos projetos e oportunidades."
          centered
        />

        <div className="contact-wrapper">
          <div className="contact-info-side">
            {contact.availability?.length > 0 && (
              <div className="contact-availability">
                <span className="contact-availability-label">{t('Disponível para')}</span>
                <div className="contact-availability-tags">
                  {contact.availability.map((item) => (
                    <span key={item} className="contact-availability-tag">
                      {t(item)}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="contact-info-grid">
              <a href={`mailto:${contact.email}`} className="contact-card">
                <div className="contact-card-icon contact-card-icon--email">
                  <PiEnvelopeSimpleBold aria-hidden="true" />
                </div>
                <div className="contact-card-content">
                  <span className="contact-card-label">{t('E-mail')}</span>
                  <span className="contact-card-value">{contact.email}</span>
                </div>
              </a>

              <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="contact-card">
                <div className="contact-card-icon contact-card-icon--phone">
                  <PiPhoneBold aria-hidden="true" />
                </div>
                <div className="contact-card-content">
                  <span className="contact-card-label">{t('Telefone')}</span>
                  <span className="contact-card-value">{contact.phone}</span>
                </div>
              </a>

              <a
                href={`https://wa.me/${contact.phone.replace(/[^\d]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card contact-card--whatsapp"
              >
                <div className="contact-card-icon contact-card-icon--whatsapp">
                  <SiWhatsapp aria-hidden="true" />
                </div>
                <div className="contact-card-content">
                  <span className="contact-card-label">{t('WhatsApp')}</span>
                  <span className="contact-card-value">{t('Enviar mensagem')}</span>
                </div>
              </a>

              <div className="contact-card">
                <div className="contact-card-icon contact-card-icon--location">
                  <PiMapPinBold aria-hidden="true" />
                </div>
                <div className="contact-card-content">
                  <span className="contact-card-label">{t('Localização')}</span>
                  <span className="contact-card-value">{contact.location}</span>
                </div>
              </div>

              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card"
              >
                <div className="contact-card-icon contact-card-icon--linkedin">
                  <SiLinkedin aria-hidden="true" />
                </div>
                <div className="contact-card-content">
                  <span className="contact-card-label">{t('LinkedIn')}</span>
                  <span className="contact-card-value">{t('Conectar')}</span>
                </div>
              </a>

              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card"
              >
                <div className="contact-card-icon contact-card-icon--github">
                  <SiGithub aria-hidden="true" />
                </div>
                <div className="contact-card-content">
                  <span className="contact-card-label">{t('GitHub')}</span>
                  <span className="contact-card-value">{t('Ver perfil')}</span>
                </div>
              </a>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <h3 className="contact-form-title">{t('Envie uma mensagem')}</h3>

            <div className="form-hp" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                type="text"
                autoComplete="off"
                tabIndex={-1}
                {...register('website')}
              />
            </div>

            <div className="form-group">
              <label htmlFor="name">{t('Nome')}</label>
              <input
                id="name"
                type="text"
                placeholder={t('Seu nome completo')}
                {...register('name')}
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name ? (
                <span className="form-error" id="name-error">
                  {t(errors.name.message)}
                </span>
              ) : null}
            </div>

            <div className="form-group">
              <label htmlFor="email">{t('E-mail')}</label>
              <input
                id="email"
                type="email"
                placeholder={t('voce@email.com')}
                {...register('email')}
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email ? (
                <span className="form-error" id="email-error">
                  {t(errors.email.message)}
                </span>
              ) : null}
            </div>

            <div className="form-group">
              <label htmlFor="message">{t('Mensagem')}</label>
              <textarea
                id="message"
                rows="5"
                placeholder={t('Conte sobre o projeto ou oportunidade...')}
                {...register('message')}
                aria-invalid={errors.message ? 'true' : 'false'}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message ? (
                <span className="form-error" id="message-error">
                  {t(errors.message.message)}
                </span>
              ) : null}
            </div>

            <button className="btn btn--primary btn--lg" type="submit" disabled={isSubmitting}>
              <PiPaperPlaneRightBold aria-hidden="true" />
              {isSubmitting ? t('Enviando...') : t('Enviar mensagem')}
            </button>

            {status.message ? (
              <output className={`form-status form-status--${status.type}`} aria-live="polite">
                {t(status.message)}
              </output>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}
