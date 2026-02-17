import emailjs from '@emailjs/browser';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsEnvelope, BsGeoAlt, BsGithub, BsLinkedin, BsSend, BsTelephone } from 'react-icons/bs';
import { z } from 'zod';
import SectionHeader from './SectionHeader.jsx';

const SUCCESS_AUTOHIDE_MS = 5000;

const schema = z.object({
  name: z.string().min(2, 'Informe seu nome completo.'),
  email: z.string().email('Use um e-mail válido.'),
  message: z.string().min(10, 'Conte um pouco mais sobre o seu desafio.'),
});

const emailConfig = {
  serviceId: 'service_jbsyv7l',
  templateId: 'template_ahonab8',
  publicKey: 'IcSov-EgznR__YE5f',
};

export default function Contact({ contact }) {
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
    defaultValues: { name: '', email: '', message: '' },
  });

  const onSubmit = async (data) => {
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
    } catch (error) {
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
          <div className="contact-info-grid">
            <a href={`mailto:${contact.email}`} className="contact-card">
              <div className="contact-card-icon">
                <BsEnvelope aria-hidden="true" />
              </div>
              <div className="contact-card-content">
                <span className="contact-card-label">E-mail</span>
                <span className="contact-card-value">{contact.email}</span>
              </div>
            </a>

            <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="contact-card">
              <div className="contact-card-icon">
                <BsTelephone aria-hidden="true" />
              </div>
              <div className="contact-card-content">
                <span className="contact-card-label">Telefone</span>
                <span className="contact-card-value">{contact.phone}</span>
              </div>
            </a>

            <div className="contact-card">
              <div className="contact-card-icon">
                <BsGeoAlt aria-hidden="true" />
              </div>
              <div className="contact-card-content">
                <span className="contact-card-label">Localização</span>
                <span className="contact-card-value">{contact.location}</span>
              </div>
            </div>

            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card"
            >
              <div className="contact-card-icon">
                <BsLinkedin aria-hidden="true" />
              </div>
              <div className="contact-card-content">
                <span className="contact-card-label">LinkedIn</span>
                <span className="contact-card-value">Conectar</span>
              </div>
            </a>

            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card"
            >
              <div className="contact-card-icon">
                <BsGithub aria-hidden="true" />
              </div>
              <div className="contact-card-content">
                <span className="contact-card-label">GitHub</span>
                <span className="contact-card-value">Ver perfil</span>
              </div>
            </a>
          </div>

          <form className="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <h3 className="contact-form-title">Envie uma mensagem</h3>

            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                type="text"
                placeholder="Seu nome completo"
                {...register('name')}
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name ? (
                <span className="form-error" id="name-error">
                  {errors.name.message}
                </span>
              ) : null}
            </div>

            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                placeholder="voce@email.com"
                {...register('email')}
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email ? (
                <span className="form-error" id="email-error">
                  {errors.email.message}
                </span>
              ) : null}
            </div>

            <div className="form-group">
              <label htmlFor="message">Mensagem</label>
              <textarea
                id="message"
                rows="5"
                placeholder="Conte sobre o projeto ou oportunidade..."
                {...register('message')}
                aria-invalid={errors.message ? 'true' : 'false'}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message ? (
                <span className="form-error" id="message-error">
                  {errors.message.message}
                </span>
              ) : null}
            </div>

            <button className="btn btn--primary btn--lg" type="submit" disabled={isSubmitting}>
              <BsSend aria-hidden="true" />
              {isSubmitting ? 'Enviando...' : 'Enviar mensagem'}
            </button>

            {status.message ? (
              <output className={`form-status form-status--${status.type}`} aria-live="polite">
                {status.message}
              </output>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}
