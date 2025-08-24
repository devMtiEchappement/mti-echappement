import enUS from './en-us.json';
import frFR from './fr-fr.json';

export const defaultMessages = {
    'fr-fr': frFR,
    'en-us': enUS
} as const;

export type ConsentMessages = typeof frFR;
export type ConsentLocale = keyof typeof defaultMessages;

// Helper pour obtenir les messages par défaut d'une locale
export function getDefaultMessages(locale: ConsentLocale): ConsentMessages {
    return defaultMessages[locale] || defaultMessages['fr-fr'];
}
