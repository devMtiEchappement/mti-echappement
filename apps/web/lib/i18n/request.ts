import { hasLocale } from 'next-intl';
import { getRequestConfig } from "next-intl/server";
import { loadKitMessages } from './loadKitMessages';
import { routing } from '~/lib/i18n/routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
      ? requested
      : routing.defaultLocale;

  // Charger les messages des packages avec l'approche hybride
  const kitMessages = await loadKitMessages(locale);

  // Mapping des locales aux fuseaux horaires
  const timeZoneMap = {
    'fr-fr': 'Europe/Paris',
    'en-us': 'America/New_York'
  };

  return {
    locale,
    timeZone: timeZoneMap[locale as keyof typeof timeZoneMap] || 'Europe/Paris', // Fallback global

    // Ajoutez un fuseau horaire par défaut global
    defaultTimeZone: 'Europe/Paris',

    experimental: {
      createMessagesDeclaration: [
        '../../public/locales/en/common.json',
        '../../public/locales/en/auth.json',
        '../../public/locales/en/account.json',
      ]
    },
    messages: {
      // Messages principaux de l'app
      common: (await import(`../../public/locales/${locale}/common.json`)).default,
      auth: (await import(`../../public/locales/${locale}/auth.json`)).default,
      account: (await import(`../../public/locales/${locale}/account.json`)).default,
      ...kitMessages
      // Messages des packages avec approche hybride (consent, etc.)

    }
  };
});
