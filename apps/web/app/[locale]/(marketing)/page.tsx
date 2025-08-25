import { use } from 'react';

import Link from 'next/link';

import { Settings, Trophy, Wrench, Zap } from 'lucide-react';
import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import type { HeroImage } from '~/[locale]/(marketing)/_components/hero';

import { ConsentBanner } from '@kit/consent';
import {
  CtaButton,
  FeatureCard,
  FeatureGrid,
  FeatureShowcase,
} from '@kit/ui/marketing';

import { Footer } from '~/[locale]/(marketing)/_components/footer';
import { Hero } from '~/[locale]/(marketing)/_components/hero';

type Props = {
  params: Promise<{ locale: Locale }>;
};

function Home({ params }: Props) {
  const { locale } = use(params);

  // Enable static rendering
  setRequestLocale(locale);

  const heroImages: HeroImage[] = [
    {
      src: '/images/hero-1.jpg',
      alt: 'Image de présentation 1',
      title: 'Innovation technologique',
      theme: 'dark',
    },
    {
      src: '/images/hero-2.jpg',
      alt: 'Image de présentation 2',
      title: '7000 références en échappements serie',
      theme: 'light',
    },
    {
      src: '/images/hero-3.jpg',
      alt: 'Image de présentation 3',
      title: 'Du stock dans la gamme serie',
      theme: 'dark',
    },
  ];

  return (
    <>
      <ConsentBanner />
      <div className={'mx-0 w-full'}>
        <Hero
          title={
            <>
              Trouvez votre{' '}
              <span className={'text-mti-orange'}>échappement inox </span>
              sur mesure ou de série{' '}
            </>
          }
          subtitle={
            <span>
              Catback, ligne complète, collecteur, silencieux, tube Afrique…
              Trouvez l’échappement inox qui vous convient dans notre catalogue
              « série » ou contactez-nous pour une fabrication 100% sur mesure.
              Chaque pièce est conçue et fabriquée dans notre atelier en
              Haute-Loire, avec 25 ans de savoir-faire et des procédés haut de
              gamme.{' '}
            </span>
          }
          cta={<MainCallToActionButton />}
          images={heroImages}
        />
      </div>
      <div className={'container mx-auto'}>
        <div className={'flex flex-col py-16'}>
          <FeatureShowcase
            heading={
              <p className={'text-center text-3xl'}>
                <b className="text-mti-foreground font-semibold">
                  Le savoir-faire MTI.
                </b>{' '}
                <span className="text-muted-foreground font-normal">
                  Chaque échappement inox est conçu et fabriqué dans notre
                  atelier de Laussonne (Haute-Loire), avec une finition
                  irréprochable. Forts de 25 ans d’expérience, nous réalisons
                  des modèles en petite série à prix maîtrisé et développons des
                  pièces sur mesure, adaptées à votre besoin et votre chaque
                  véhicule.
                </span>
              </p>
            }
          >
            <FeatureGrid>
              <FeatureCard
                icon={<Trophy className="h-10 w-10" />}
                className={'relative overflow-hidden'}
                label={"25 ans d'expérience en échappement racing"}
                description={`MTI échappement est une entreprise avec une expérience de plus de 25 ans acquise dés 1988 (Madac). C'est aussi une fabrication 100% française, ici dans notre atelier de Laussonne ( Haute-loire), qui nous permet un contrôle entier sur tout le processus de fabrication et donc, d'en assurer la meilleure qualité.`}
              />

              <FeatureCard
                icon={<Zap className="h-10 w-10" />}
                className={'relative w-full overflow-hidden lg:col-span-1'}
                label={'Soudure TIG sous gaz argon'}
                description={`Tous nos échappements sont fabriqués sur gabarit ULTRA précis, au millimètre. Nos soudures sont réalisés au TIG sous gaz ARGON avec un procédé HP pulsé. C’est le résultat de notre engagement et l’assurance de votre satisfaction.`}
              />

              <FeatureCard
                icon={<Settings className="h-10 w-10" />}
                className={'relative overflow-hidden lg:col-span-1'}
                label={'Procédé de Cintrage à commande numérique'}
                description={`Notre atelier est entièrement consacré à l’échappement haut de gamme. Nous disposons d’un équipement ULTRA moderne (comprenant bras de mesure tri-dimensionnel, cintreuse à commande numérique, presse hydraulique...).`}
              />

              <FeatureCard
                icon={<Wrench className="h-10 w-10" />}
                className={'relative overflow-hidden'}
                label={'Atelier de montage sur place'}
                description={`Nous disposons sur place d’un atelier de montage directement en sortie d’usine. Deux stations entièrement équipées permettent la pose rapide de vos échappements. Aussitôt fabriqué, aussitôt monté.`}
              />
            </FeatureGrid>
          </FeatureShowcase>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;

function MainCallToActionButton() {

  return (
    <div className={'flex space-x-4'}>
      <CtaButton variant={'mti-orange'}>
        <Link href={'/auth/sign-up'}>
          <span className={'flex items-center space-x-0.5'}>
            <span>{`Échappements serie`}</span>
          </span>
        </Link>
      </CtaButton>

      <CtaButton variant={'mti-outline'}>
        <Link href={'/contact'}>Échappement sur mesure</Link>
      </CtaButton>
    </div>
  );
}
