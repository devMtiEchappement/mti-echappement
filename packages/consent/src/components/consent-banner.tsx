'use client';

import { useConsent } from '../stores/consent-store';
import { useTranslations } from 'next-intl';

export function ConsentBanner() {
  const {
    consent,
    setConsentGiven,
    setAllConsents
  } = useConsent();
  const t = useTranslations('consent');

  // Si l'utilisateur a déjà donné son consentement, ne pas afficher la bannière
  if (consent.isGiven) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background p-4 shadow-lg border-t">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">{t('title')}</h3>
            <p className="text-muted-foreground">
              {t('description')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                // Accepter tous les cookies
                setAllConsents(true, true);
                setConsentGiven(true);
              }}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md"
            >
              {t('acceptAll')}
            </button>

            <button
              onClick={() => {
                // Refuser tous les cookies sauf les essentiels
                setAllConsents(false, false);
                setConsentGiven(true);
              }}
              className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md"
            >
              {t('rejectAll')}
            </button>

            <button
              onClick={() => {
                // Ouvrir les paramètres de cookie
                // Logique de dialogue à implémenter
              }}
              className="bg-transparent border border-input px-4 py-2 rounded-md"
            >
              {t('customize')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}