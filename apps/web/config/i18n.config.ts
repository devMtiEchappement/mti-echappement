// apps/web/config/i18n.config.ts
export const locales = ['fr-fr', 'en-us'] as const;
export const defaultLocale = 'fr-fr';

export const localePrefixMode = "as-needed";
export const localeDetection = false;
export const localPrefixPrefixes = {
  'fr-fr': '/fr',
  'en-us': '/en'
}

// Ajoutez cette ligne pour le fuseau horaire
export const timeZone = 'Europe/Paris'; // ou votre fuseau horaire préféré

export type Locale = (typeof locales)[number];

