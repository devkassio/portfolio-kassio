import { useKeenSlider } from 'keen-slider/react';
import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import {
  BsArrowLeft,
  BsArrowRight,
  BsAward,
  BsBoxArrowUpRight,
  BsDownload,
  BsEye,
  BsFileEarmarkText,
  BsXLg,
} from 'react-icons/bs';
import { createAutoplay } from '../utils/keenAutoplay.js';
import SectionHeader from './SectionHeader.jsx';

function CertificateModal({ certificate, onClose }) {
  const dialogRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (typeof dialog.showModal === 'function') {
      try {
        if (!dialog.open) dialog.showModal();
      } catch {
        // Ignora (ex: já está aberto)
      }
    }

    requestAnimationFrame(() => dialog.focus());

    return () => {
      try {
        if (dialog.open) dialog.close();
      } catch {
        // noop
      }
    };
  }, []);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  const handleCancel = (e) => {
    e.preventDefault();
    onClose();
  };

  // Para PDFs, abre em nova aba
  const openPdfInNewTab = () => {
    window.open(certificate.image, '_blank');
  };

  return (
    <dialog
      ref={dialogRef}
      className="certificate-modal-backdrop"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      onCancel={handleCancel}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <div className="certificate-modal">
        <div className="certificate-modal-header">
          <div className="certificate-modal-title">
            <BsAward aria-hidden="true" />
            <div>
              <h3 id={titleId}>{certificate.title}</h3>
              <span>
                {certificate.issuer} · {certificate.year}
              </span>
            </div>
          </div>
          <div className="certificate-modal-actions">
            {certificate.isPdf ? (
              <>
                <button
                  type="button"
                  onClick={openPdfInNewTab}
                  className="btn btn--primary btn--sm"
                >
                  <BsBoxArrowUpRight aria-hidden="true" />
                  Abrir PDF
                </button>
                <a
                  href={certificate.image}
                  download
                  className="btn btn--outline btn--sm"
                  aria-label="Baixar certificado"
                >
                  <BsDownload aria-hidden="true" />
                  Baixar
                </a>
              </>
            ) : (
              <a
                href={certificate.image}
                download
                className="btn btn--outline btn--sm"
                aria-label="Baixar certificado"
              >
                <BsDownload aria-hidden="true" />
                Baixar
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              className="certificate-modal-close"
              aria-label="Fechar modal"
            >
              <BsXLg />
            </button>
          </div>
        </div>

        <div className="certificate-modal-content">
          {certificate.isPdf ? (
            <object
              data={certificate.image}
              type="application/pdf"
              className="certificate-pdf-iframe"
              aria-label={`Certificado ${certificate.title}`}
            >
              <iframe
                src={`${certificate.image}#toolbar=1&view=FitH`}
                title={`Certificado ${certificate.title}`}
                className="certificate-pdf-iframe"
              />
            </object>
          ) : (
            <img
              src={certificate.image}
              alt={`Certificado ${certificate.title}`}
              className="certificate-modal-image"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          )}
        </div>
      </div>
    </dialog>
  );
}

export default function CertificatesCarousel({ certificates, reduceMotion = false }) {
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const autoplayPlugin = useMemo(() => {
    if (reduceMotion) {
      return null;
    }
    return createAutoplay(4600);
  }, [reduceMotion]);

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: !reduceMotion,
      slides: {
        perView: 1,
        spacing: 20,
      },
      breakpoints: {
        '(min-width: 700px)': {
          slides: { perView: 2, spacing: 24 },
        },
        '(min-width: 1100px)': {
          slides: { perView: 3, spacing: 28 },
        },
      },
    },
    autoplayPlugin ? [autoplayPlugin] : []
  );

  const openCertificate = (certificate) => {
    setSelectedCertificate(certificate);
    document.body.style.overflow = 'hidden';
  };

  const closeCertificate = () => {
    setSelectedCertificate(null);
    document.body.style.overflow = '';
  };

  return (
    <>
      <section
        id="certificados"
        className="section section--surface certificates-section"
        data-reveal
      >
        <div className="container">
          <SectionHeader
            eyebrow="Certificados"
            title="Certificações e validações"
            description="Formação contínua e domínio das principais tecnologias do mercado."
          />

          <div className="carousel">
            <section
              ref={sliderRef}
              className="keen-slider certificate-slider"
              aria-label="Certificados"
            >
              {certificates.map((certificate) => (
                <article className="keen-slider__slide" key={certificate.title}>
                  <div className="certificate-card">
                    <div className="certificate-media">
                      {certificate.isPdf ? (
                        <div className="certificate-pdf-preview">
                          <BsFileEarmarkText className="certificate-pdf-icon" aria-hidden="true" />
                          <span>PDF</span>
                        </div>
                      ) : (
                        <img
                          src={certificate.image}
                          alt={`Certificado ${certificate.title}`}
                          loading="lazy"
                          decoding="async"
                          width="520"
                          height="320"
                        />
                      )}
                      <button
                        type="button"
                        className="certificate-view-btn"
                        onClick={() => openCertificate(certificate)}
                        aria-label={`Visualizar certificado ${certificate.title}`}
                      >
                        <BsEye aria-hidden="true" />
                        <span>Visualizar</span>
                      </button>
                    </div>
                    <div className="certificate-body">
                      <div className="certificate-title">
                        <BsAward aria-hidden="true" />
                        <h3>{certificate.title}</h3>
                      </div>
                      <p>{certificate.issuer}</p>
                      <span className="certificate-year">{certificate.year}</span>
                    </div>
                  </div>
                </article>
              ))}
            </section>

            <div className="carousel-controls">
              <button
                type="button"
                onClick={() => instanceRef.current?.prev()}
                aria-label="Certificado anterior"
              >
                <BsArrowLeft aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => instanceRef.current?.next()}
                aria-label="Próximo certificado"
              >
                <BsArrowRight aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {selectedCertificate && (
        <CertificateModal certificate={selectedCertificate} onClose={closeCertificate} />
      )}
    </>
  );
}
