import { Suspense, lazy, memo, useCallback, useEffect, useRef, useState } from 'react';
import {
  PiArrowCounterClockwiseBold,
  PiArrowLeftBold,
  PiArrowRightBold,
  PiArrowSquareOutBold,
  PiArrowsOutBold,
  PiMagnifyingGlassMinusBold,
  PiMagnifyingGlassPlusBold,
  PiWarningBold,
} from 'react-icons/pi';

const LazyDocument = lazy(() =>
  import('react-pdf').then((mod) => {
    mod.pdfjs.GlobalWorkerOptions.workerSrc = new URL(
      'pdfjs-dist/build/pdf.worker.min.mjs',
      import.meta.url
    ).toString();
    return { default: mod.Document };
  })
);

const LazyPage = lazy(() => import('react-pdf').then((mod) => ({ default: mod.Page })));

const SCALE_STEP = 0.2;
const SCALE_MIN = 0.5;
const SCALE_MAX = 3;
const INITIAL_SCALE = 1.2;

function LoadingSkeleton() {
  return (
    <div className="pdf-viewer-skeleton" aria-live="polite" aria-label="Carregando PDF...">
      <div className="pdf-skeleton-page">
        <div className="pdf-skeleton-line pdf-skeleton-line--title" />
        <div className="pdf-skeleton-line" />
        <div className="pdf-skeleton-line" />
        <div className="pdf-skeleton-line pdf-skeleton-line--short" />
        <div className="pdf-skeleton-line" />
        <div className="pdf-skeleton-line pdf-skeleton-line--medium" />
      </div>
      <span className="pdf-skeleton-label">Carregando documento…</span>
    </div>
  );
}

function ErrorFallback({ url, onRetry }) {
  return (
    <div className="pdf-viewer-error" role="alert">
      <PiWarningBold className="pdf-viewer-error-icon" aria-hidden="true" />
      <p>Não foi possível carregar o PDF.</p>
      <div className="pdf-viewer-error-actions">
        <button type="button" onClick={onRetry} className="btn btn--primary btn--sm">
          <PiArrowCounterClockwiseBold aria-hidden="true" />
          Tentar novamente
        </button>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--outline btn--sm"
        >
          <PiArrowSquareOutBold aria-hidden="true" />
          Abrir em nova aba
        </a>
      </div>
    </div>
  );
}

function PdfViewer({ url }) {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(INITIAL_SCALE);
  const [hasError, setHasError] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  const containerRef = useRef(null);

  const onDocumentLoadSuccess = useCallback(({ numPages: total }) => {
    setNumPages(total);
    setCurrentPage(1);
    setHasError(false);
  }, []);

  const onDocumentLoadError = useCallback(() => {
    setHasError(true);
  }, []);

  const handleRetry = useCallback(() => {
    setHasError(false);
    setRetryKey((k) => k + 1);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentPage((p) => Math.max(1, p - 1));
  }, []);

  const goToNext = useCallback(() => {
    setCurrentPage((p) => Math.min(numPages || 1, p + 1));
  }, [numPages]);

  const zoomIn = useCallback(() => {
    setScale((s) => Math.min(SCALE_MAX, +(s + SCALE_STEP).toFixed(1)));
  }, []);

  const zoomOut = useCallback(() => {
    setScale((s) => Math.max(SCALE_MIN, +(s - SCALE_STEP).toFixed(1)));
  }, []);

  const toggleFullscreen = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      el.requestFullscreen?.();
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.closest('input, textarea, select')) return;
      switch (e.key) {
        case 'ArrowLeft':
          goToPrev();
          e.preventDefault();
          break;
        case 'ArrowRight':
          goToNext();
          e.preventDefault();
          break;
        case '+':
        case '=':
          zoomIn();
          e.preventDefault();
          break;
        case '-':
          zoomOut();
          e.preventDefault();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [goToPrev, goToNext, zoomIn, zoomOut]);

  if (hasError) {
    return <ErrorFallback url={url} onRetry={handleRetry} />;
  }

  return (
    <div className="pdf-viewer" ref={containerRef}>
      <div className="pdf-viewer-toolbar">
        <div className="pdf-toolbar-group">
          <button
            type="button"
            onClick={goToPrev}
            disabled={currentPage <= 1}
            className="pdf-toolbar-btn"
            aria-label="Página anterior"
          >
            <PiArrowLeftBold aria-hidden="true" />
          </button>
          <span className="pdf-toolbar-pages" aria-live="polite">
            {currentPage} / {numPages || '—'}
          </span>
          <button
            type="button"
            onClick={goToNext}
            disabled={!numPages || currentPage >= numPages}
            className="pdf-toolbar-btn"
            aria-label="Próxima página"
          >
            <PiArrowRightBold aria-hidden="true" />
          </button>
        </div>

        <div className="pdf-toolbar-group">
          <button
            type="button"
            onClick={zoomOut}
            disabled={scale <= SCALE_MIN}
            className="pdf-toolbar-btn"
            aria-label="Diminuir zoom"
          >
            <PiMagnifyingGlassMinusBold aria-hidden="true" />
          </button>
          <span className="pdf-toolbar-zoom">{Math.round(scale * 100)}%</span>
          <button
            type="button"
            onClick={zoomIn}
            disabled={scale >= SCALE_MAX}
            className="pdf-toolbar-btn"
            aria-label="Aumentar zoom"
          >
            <PiMagnifyingGlassPlusBold aria-hidden="true" />
          </button>
        </div>

        <div className="pdf-toolbar-group">
          <button
            type="button"
            onClick={toggleFullscreen}
            className="pdf-toolbar-btn"
            aria-label="Tela cheia"
          >
            <PiArrowsOutBold aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="pdf-viewer-canvas">
        <Suspense fallback={<LoadingSkeleton />}>
          <LazyDocument
            key={retryKey}
            file={url}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={<LoadingSkeleton />}
            className="pdf-document"
          >
            <LazyPage
              pageNumber={currentPage}
              scale={scale}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              loading={<LoadingSkeleton />}
              className="pdf-page"
            />
          </LazyDocument>
        </Suspense>
      </div>
    </div>
  );
}

export default memo(PdfViewer);
