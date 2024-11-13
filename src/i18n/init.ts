import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import enTranslation from './translations/en.json';
import jaTranslation from './translations/ja.json';

export interface Language {
  name: string;
  displayName: string;
}

export type Languages = Language[];

export const supportedLanguages: Languages = [
  {
    name: 'en',
    displayName: 'English',
  },
  {
    name: 'ja',
    displayName: '日本語',
  },
];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      ja: {
        translation: jaTranslation,
      },
    },
    supportedLngs: supportedLanguages.map((language) => language.name),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already safes from XSS.
    },
  });

document.documentElement.lang = i18n.language;
i18n.on('languageChanged', (language) => {
  document.documentElement.lang = language;
});
