import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import { getLanguage } from './common/utils';
import zh_CN from './locales/zh_cn.js';
import en from './locales/en.js';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  zh: {
    translation: zh_CN
  },
  en: {
    translation: en
  },
};

i18n.use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: localStorage.getItem('I18N_LANGUAGE') || "en",
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    detection: {
      order: ["localStorage", "navigator"],
      lookupQuerystring: "lng",
      lookupLocalStorage: "I18N_LANGUAGE",
      caches: ["localStorage"]
    }
  });

export default i18n;