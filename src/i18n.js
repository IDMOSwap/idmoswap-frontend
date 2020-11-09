import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import { getLanguage } from './common/utils';
import zh_CN from './locales/zh_cn.js';
import en from './locales/en.js';
import LanguageDetector from 'i18next-browser-languagedetector';
import Cookies from 'js-cookie'
const resources = {
  cn: {
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
    lng: Cookies.get('language') || "en",
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    // detection: {
    //   order: ["cookie", 'subdomain', "navigator"],
    //   lookupCookie: 'language',
    //   lookupLocalStorage: "I18N_LANGUAGE",
    //   caches: ['cookie', "localStorage"],
    //   cookieDomain: 'idmoswap.com',
    // },
    detection: {
      order: ["cookie", 'localStorage '],
      lookupCookie: 'language',
      lookupLocalStorage: "I18N_LANGUAGE",
      caches: ['cookie', "localStorage"],
      cookieDomain: 'idmoswap.com',
    }
  });

export default i18n;