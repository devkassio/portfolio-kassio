import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const LanguageContext = createContext(null);

const STORAGE_KEY = 'portfolio-lang';

function readSavedLang() {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === 'en' ? 'en' : 'pt';
  } catch (_e) {
    return 'pt';
  }
}

/**
 * Ultra-lightweight i18n provider.
 *
 * - `lang`    → 'pt' | 'en'
 * - `setLang` → toggle language
 * - `t(str)`  → returns translated string (EN) or passthrough (PT)
 *
 * In PT mode `t()` is a no-op (zero overhead).
 * In EN mode it's a single O(1) object lookup.
 */
export function LanguageProvider({ translations, children }) {
  const [lang, setLangRaw] = useState(readSavedLang);

  const setLang = useCallback((next) => {
    setLangRaw(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (_e) {
      /* quota — ignore */
    }
  }, []);

  const t = useCallback(
    (ptStr) => {
      if (lang === 'pt') return ptStr;
      return translations[ptStr] || ptStr;
    },
    [lang, translations]
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
