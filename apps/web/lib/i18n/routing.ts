import { defineRouting } from 'next-intl/routing';

import {
  localeDetection,
  localePrefixMode,
  locales, localPrefixPrefixes
} from '~/config/i18n.config';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales,
  // Used when no locale matches
  defaultLocale: locales[0],
  // Don't use a locale prefix for the default locale
  localePrefix: {
    mode: localePrefixMode,
    prefixes: localPrefixPrefixes,
  },
  localeDetection,

});
