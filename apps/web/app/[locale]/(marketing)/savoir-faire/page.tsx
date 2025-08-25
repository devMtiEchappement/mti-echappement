import { use } from 'react';

import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import { ConsentBanner } from '@kit/consent';

import { Footer } from '~/[locale]/(marketing)/_components/footer';
import InConstructionPage from '~/[locale]/(marketing)/_components/InConstruction';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata() {
  return {
    title: 'Savoir-faire',
  };
}

function SavoirFairePage({ params }: Props) {
  const { locale } = use(params);

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <>
      <ConsentBanner />
      <div className={'container mx-auto'}>
        <InConstructionPage />
      </div>
      <Footer />
    </>
  );
}

export default SavoirFairePage;
