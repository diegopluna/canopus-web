import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import EnglishTranslation from '@/translation/en/translation.json'
import SpanishTranslation from '@/translation/es/translation.json'
import FrenchTranslation from '@/translation/fr/translation.json'
import PortugueseTranslation from '@/translation/pt/translation.json'

const resources = {
    en: EnglishTranslation,
    es: SpanishTranslation,
    fr: FrenchTranslation,
    pt: PortugueseTranslation
}

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        resources: resources,
    })

export default i18n;
