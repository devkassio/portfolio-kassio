import { useKeenSlider } from 'keen-slider/react';
import { Suspense, lazy, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import {
  PiArrowLeftBold,
  PiArrowRightBold,
  PiArrowSquareOutBold,
  PiCertificateBold,
  PiDownloadSimpleBold,
  PiEyeBold,
  PiFileTextBold,
  PiXBold,
} from 'react-icons/pi';
import { createAutoplay } from '../utils/keenAutoplay.js';
import SectionHeader from './SectionHeader.jsx';

const PdfViewer = lazy(() => import('./PdfViewer.jsx'));

/* ── Scroll lock helpers ── */

const lockBodyScroll = () => {
  document.body.style.overflow = 'hidden';
};

const unlockBodyScroll = () => {
  document.body.style.overflow = '';
};

/* ── Certificate Modal ── */

function CertificateModal({ certificate, onClose }) {
  const dialogRef = useRef(null);
  const previousFocusRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    previousFocusRef.current = document.activeElement;

    const dialog = dialogRef.current;
    if (!dialog) return;

    if (typeof dialog.showModal === 'function') {
      try {
        if (!dialog.open) dialog.showModal();
      } catch {
        /* already open */
      }
    }

    requestAnimationFrame(() => dialog.focus());

    return () => {
      try {
        if (dialog.open) dialog.close();
      } catch {
        /* noop */
      }
      previousFocusRef.current?.focus?.();
    };
  }, []);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    },
    [onClose]
  );

  const handleCancel = (e) => {
    e.preventDefault();
    onClose();
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
      <div className="certificate-modal" role="document">
        {/* Header */}
        <div className="certificate-modal-header">
          <div className="certificate-modal-title">
            <PiCertificateBold aria-hidden="true" />
            <div>
              <h3 id={titleId}>{certificate.title}</h3>
              <span>
                {certificate.issuer} · {certificate.year}
              </span>
            </div>
          </div>
          <div className="certificate-modal-actions">
            {certificate.isPdf && (
              <a
                href={certificate.image}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--ghost btn--sm"
                aria-label="Abrir PDF em nova aba"
              >
                <PiArrowSquareOutBold aria-hidden="true" />
                <span className="btn-label-desktop">Nova aba</span>
              </a>
            )}
            <a
              href={certificate.image}
              download
              className="btn btn--ghost btn--sm"
              aria-label={`Baixar certificado ${certificate.title}`}
            >
              <PiDownloadSimpleBold aria-hidden="true" />
              <span className="btn-label-desktop">Baixar</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              className="certificate-modal-close"
              aria-label="Fechar visualização"
            >
              <PiXBold aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="certificate-modal-content">
          {certificate.isPdf ? (
            <Suspense
              fallback={
                <div className="certificate-loading">
                  <div className="certificate-loading-spinner" />
                  <span>Carregando visualizador…</span>
                </div>
              }
            >
              <PdfViewer url={certificate.image} title={certificate.title} />
            </Suspense>
          ) : (
            <img
              src={certificate.image}
              alt={`Certificado ${certificate.title}`}
              className="certificate-modal-image"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          )}
        </div>
      </div>
    </dialog>
  );
}

/* ── Certificate Card ── */

function CertificateCard({ certificate, onView }) {
  return (
    <article className="keen-slider__slide">
      <div className="certificate-card">
        <div className="certificate-media">
          {certificate.isPdf ? (
            <div className="certificate-pdf-preview">
              <PiFileTextBold className="certificate-pdf-icon" aria-hidden="true" />
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
            onClick={() => onView(certificate)}
            aria-label={`Visualizar certificado ${certificate.title}`}
          >
            <PiEyeBold aria-hidden="true" />
            <span>Visualizar</span>
          </button>
        </div>
        <div className="certificate-body">
          <div className="certificate-title">
            <PiCertificateBold aria-hidden="true" />
            <h3>{certificate.title}</h3>
          </div>
          <p>{certificate.issuer}</p>
          <span className="certificate-year">{certificate.year}</span>
        </div>
      </div>
    </article>
  );
}

/* ── Main Component ── */

export default function CertificatesCarousel({ certificates, reduceMotion = false }) {
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const autoplayPlugin = useMemo(() => {
    if (reduceMotion) return null;
    return createAutoplay(4600);
  }, [reduceMotion]);

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: !reduceMotion,
      slides: { perView: 1, spacing: 20 },
      breakpoints: {
        '(min-width: 700px)': { slides: { perView: 2, spacing: 24 } },
        '(min-width: 1100px)': { slides: { perView: 3, spacing: 28 } },
      },
    },
    autoplayPlugin ? [autoplayPlugin] : []
  );

  const openCertificate = useCallback((certificate) => {
    setSelectedCertificate(certificate);
    lockBodyScroll();
  }, []);

  const closeCertificate = useCallback(() => {
    setSelectedCertificate(null);
    unlockBodyScroll();
  }, []);

  useEffect(() => {
    return () => unlockBodyScroll();
  }, []);

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
                <CertificateCard
                  key={certificate.title}
                  certificate={certificate}
                  onView={openCertificate}
                />
              ))}
            </section>

            <div className="carousel-controls">
              <button
                type="button"
                onClick={() => instanceRef.current?.prev()}
                aria-label="Certificado anterior"
              >
                <PiArrowLeftBold aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => instanceRef.current?.next()}
                aria-label="Próximo certificado"
              >
                <PiArrowRightBold aria-hidden="true" />
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
