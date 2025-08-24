import { AbstractIntlMessages } from 'next-intl';
import { defaultMessages as consentDefaults } from '@kit/consent/i18n';

import {
    defaultLocale,
    locales,
    type Locale
} from '~/config/i18n.config';

// Types spécifiques à next-intl
type IntlMessages = AbstractIntlMessages;
type NamespacedMessages = Record<string, IntlMessages>;

interface PackageLoader {
    name: string;
    loadDefaults: (locale: string) => IntlMessages;
    supportedLocales?: readonly string[]; // Utiliser readonly pour correspondre au type de config
}

const PACKAGE_LOADERS: PackageLoader[] = [
    {
        name: 'consent',
        loadDefaults: (locale: string): IntlMessages => {
            const typedLocale = locale as keyof typeof consentDefaults;
            return consentDefaults[typedLocale] || consentDefaults[defaultLocale as keyof typeof consentDefaults];
        },
        supportedLocales: locales, // Plus d'erreur TypeScript
    },
];

const FALLBACK_LOCALE = defaultLocale;

async function loadPackageMessages(
    packageName: string,
    locale: string,
    loadDefaults: (locale: string) => IntlMessages
): Promise<IntlMessages> {
    try {
        const defaults = loadDefaults(locale);
        const appOverrides = await loadAppOverrides(packageName, locale);

        return {
            ...defaults,
            ...appOverrides,
        };
    } catch (error) {
        console.warn(`Failed to load ${packageName} messages for locale ${locale}:`, error);
        return loadDefaults(FALLBACK_LOCALE);
    }
}

async function loadAppOverrides(
    packageName: string,
    locale: string
): Promise<IntlMessages> {
    try {
        const overridesModule = await import(`../../public/locales/${locale}/${packageName}.json`);
        return overridesModule.default || {};
    } catch {
        return {};
    }
}

/**
 * Vérifie si une locale est supportée par le package
 */
function isLocaleSupported(locale: string, supportedLocales?: readonly string[]): boolean {
    if (!supportedLocales) return true;
    return supportedLocales.includes(locale);
}

export async function loadKitMessages(locale: Locale): Promise<NamespacedMessages> {
    const messages: NamespacedMessages = {};

    const loadingPromises = PACKAGE_LOADERS.map(async (loader) => {
        // Vérifier si la locale est supportée par ce package
        const effectiveLocale = isLocaleSupported(locale, loader.supportedLocales)
            ? locale
            : FALLBACK_LOCALE;

        const packageMessages = await loadPackageMessages(
            loader.name,
            effectiveLocale,
            loader.loadDefaults
        );

        return {
            name: loader.name,
            messages: packageMessages,
        };
    });

    try {
        const results = await Promise.all(loadingPromises);

        results.forEach(({ name, messages: packageMessages }) => {
            messages[name] = packageMessages;
        });

        return messages;
    } catch (error) {
        console.error('Failed to load kit messages:', error);

        PACKAGE_LOADERS.forEach((loader) => {
            messages[loader.name] = loader.loadDefaults(FALLBACK_LOCALE);
        });

        return messages;
    }
}

export function registerPackageLoader(loader: PackageLoader): void {
    PACKAGE_LOADERS.push(loader);
}

/**
 * Utilitaire pour obtenir la liste des locales supportées
 */
export function getSupportedLocales(): readonly string[] {
    return locales;
}

/**
 * Utilitaire pour obtenir la locale par défaut
 */
export function getDefaultLocale(): string {
    return defaultLocale;
}

/**
 * Utilitaire pour vérifier si une locale est supportée globalement
 */
export function isGloballySupported(locale: string): locale is Locale {
    return locales.includes(locale as Locale);
}