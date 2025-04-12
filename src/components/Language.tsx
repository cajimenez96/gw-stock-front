import { useState } from 'react'
import { useTranslation } from 'react-i18next';
import ReactCountryFlag from 'react-country-flag';
import { FloatButton, message } from 'antd';
import { i18n } from '../lib/i18n';

type LanguageProps = 'es' | 'en';

const Language = () => {
  const { t } = useTranslation();
  const [language, setLanguage] = useState<LanguageProps>('es');

  const handleMenuClick: (lang: LanguageProps) => void = (lang) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
    message.success(t('language_changed'));
  };
  
  return (
    <FloatButton.Group
      trigger='hover'
      icon={<ReactCountryFlag countryCode={language === 'en' ? 'us' : language} svg />}
    >
      <FloatButton icon={<ReactCountryFlag countryCode={'us'} svg />} onClick={() => handleMenuClick('en')} />
      <FloatButton icon={<ReactCountryFlag countryCode={'es'} svg />} onClick={() => handleMenuClick('es')} />
    </FloatButton.Group>
  )
}

export default Language;