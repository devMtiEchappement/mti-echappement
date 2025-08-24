import { use } from 'react';

import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import { ConsentBanner } from '@kit/consent';

import { Footer } from '~/[locale]/(marketing)/_components/footer';

type Props = {
  params: Promise<{ locale: Locale }>;
};

function EchappementsSurMesurePage({ params }: Props) {
  const { locale } = use(params);

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <>
      <ConsentBanner />
      <div className={'mx-0 w-full'}>toto</div>
      <div className={'container mx-auto'}></div>
      <Footer />
    </>
  );
}

export default EchappementsSurMesurePage;
