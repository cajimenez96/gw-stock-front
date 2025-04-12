import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nextProvider } from 'react-i18next';
import en from '../assets/locales/en.json';
import es from '../assets/locales/es.json';

interface Resources {
  en: { translation: typeof en };
  es: { translation: typeof es };
}

i18n
  .use(initReactI18next)
  .init<Resources>({
    resources: {
      es: { translation: es },
      en: { translation: en },
    },
    lng: 'es',
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false
    },
  });

export { i18n, I18nextProvider };
