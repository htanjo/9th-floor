import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          'Loading...': 'Loading...',
          'You have wandered into a mysterious mansion.':
            'You have wandered into a mysterious mansion.',
          'Find a way to escape.': 'Find a way to escape.',
          'Scroll to Play': 'Scroll to Play',
          Fullscreen: 'Fullscreen',
          'Exit Fullscreen': 'Exit Fullscreen',
          'Congratulations! You have escaped!':
            'Congratulations! You have escaped!',
        },
      },
      ja: {
        translation: {
          'Loading...': 'ロード中...',
          'You have wandered into a mysterious mansion.':
            '不思議な屋敷に迷い込んでしまった。',
          'Find a way to escape.': 'なんとかして脱出しよう。',
          'Scroll to Play': 'スクロールしてプレイ',
          Fullscreen: '全画面表示',
          'Exit Fullscreen': '全画面表示を終了',
          'Congratulations! You have escaped!': 'おめでとう！脱出に成功した！',
        },
      },
    },
    supportedLngs: ['en', 'ja'],
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already safes from XSS.
    },
  });

document.documentElement.lang = i18n.language;
i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
});
