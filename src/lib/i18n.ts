import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nextProvider } from 'react-i18next';
import en from '../assets/locales/en.json';
import es from '../assets/locales/es.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
      },
      es: {
        translation: es,
      },
    },
    fallbackLng: 'es', 
    interpolation: {
      escapeValue: false,
    },
  });

export { i18n, I18nextProvider };
