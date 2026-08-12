import enTranslations from '../locales/en.json';
import arTranslations from '../locales/ar.json';

const translations = {
  en: enTranslations,
  ar: arTranslations
};

export const useTranslationNew = (language) => {
  return (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    // Navigate through nested object
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English
        let fallbackValue = translations['en'];
        for (const fk of keys) {
          if (fallbackValue && typeof fallbackValue === 'object' && fk in fallbackValue) {
            fallbackValue = fallbackValue[fk];
          } else {
            return key; // Return key as-is if not found
          }
        }
        return fallbackValue;
      }
    }
    
    return value || key;
  };
};

// Shorthand function
export const t = (language, key) => {
  const translator = useTranslationNew(language);
  return translator(key);
};

