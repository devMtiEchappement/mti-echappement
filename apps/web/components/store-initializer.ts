'use client';

import { useEffect } from 'react';
import { useConsentStore } from '@kit/consent';

export function StoreInitializer() {
  useEffect(() => {
    // Cette ligne force l'hydratation du store
    useConsentStore.persist.rehydrate();
  }, []);

  return null; // Ce composant ne rend rien
}
