// src/stores/consent-store.ts
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type ConsentState = {
  isGiven: boolean;
  state: {
    analytics: boolean;
    marketing: boolean;
  };
};

type ConsentActions = {
  setConsentGiven: (isGiven: boolean) => void;
  setAnalyticsConsent: (value: boolean) => void;
  setMarketingConsent: (value: boolean) => void;
  setAllConsents: (analytics: boolean, marketing: boolean) => void;
};

// Store Zustand avec middleware de persistance
export const useConsentStore = create<ConsentState & ConsentActions>()(
  persist(
    (set) => ({
      // État initial
      isGiven: false,
      state: {
        analytics: false,
        marketing: false,
      },

      // Actions
      setConsentGiven: (isGiven) =>
        set(() => ({ isGiven })),

      setAnalyticsConsent: (analytics) =>
        set((state) => ({
          state: { ...state.state, analytics }
        })),

      setMarketingConsent: (marketing) =>
        set((state) => ({
          state: { ...state.state, marketing }
        })),

      setAllConsents: (analytics, marketing) =>
        set(() => ({
          state: { analytics, marketing }
        })),
    }),
    {
      name: 'user-consent-storage', // nom de la clé dans localStorage
      storage: createJSONStorage(() =>
        typeof window !== 'undefined'
          ? localStorage
          : {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          }
      ),      // Sécurité pour SSR/SSG
      skipHydration: true,
    }
  )
);

// Hook pour utiliser le store de manière sécurisée côté client et serveur
export function useConsent() {
  const store = useConsentStore();

  // Pour éviter les erreurs d'hydratation, on peut retourner un état par défaut côté serveur
  if (typeof window === 'undefined') {
    return {
      consent: {
        isGiven: false,
        state: {
          analytics: false,
          marketing: false,
        },
      },
      setConsentGiven: () => {},
      setAnalyticsConsent: () => {},
      setMarketingConsent: () => {},
      setAllConsents: () => {},
    };
  }

  // Côté client, on retourne l'état et les actions du store
  return {
    consent: {
      isGiven: store.isGiven,
      state: store.state,
    },
    setConsentGiven: store.setConsentGiven,
    setAnalyticsConsent: store.setAnalyticsConsent,
    setMarketingConsent: store.setMarketingConsent,
    setAllConsents: store.setAllConsents,
  };
}