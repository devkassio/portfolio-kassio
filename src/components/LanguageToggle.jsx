import { useLanguage } from '../contexts/LanguageContext.jsx';

/**
 * Pill-shaped language toggle — mobile only.
 * PT-BR ↔ EN, neumorphic capsule design.
 * Hidden on desktop via CSS (display:none above 768px).
 */
export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  const isEn = lang === 'en';

  return (
    <fieldset className="lang-toggle" data-lang={lang} aria-label="Idioma do site">
      <button
        type="button"
        className={`lang-toggle-option ${!isEn ? 'lang-toggle-option--active' : ''}`}
        aria-pressed={!isEn}
        onClick={() => setLang('pt')}
      >
        PT
      </button>
      <button
        type="button"
        className={`lang-toggle-option ${isEn ? 'lang-toggle-option--active' : ''}`}
        aria-pressed={isEn}
        onClick={() => setLang('en')}
      >
        EN
      </button>
      <span
        className="lang-toggle-slider"
        style={{ transform: isEn ? 'translateX(100%)' : 'translateX(0)' }}
        aria-hidden="true"
      />
    </fieldset>
  );
}
