import React from 'react';

import { Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-16">
      <div className="container mx-auto px-4">
        {/* Titre principal */}
        <div className="mb-12 text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            {``}
            Pour nous <span className="text-mti-orange">contacter</span> ou
            venir nous voir.
          </h2>
          <div className="mx-auto max-w-3xl">
            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              {`Besoin d'un tarif sur notre gamme "série", d'un devis pour un
              échappement sur mesure ?`}
              <br />
              {`D'un renseignement sur un produit ou pour toutes autres
              demandes...`}
              <br />
              {`Nous sommes joignables 7j/7j par mail ou téléphone.`}
            </p>
          </div>
        </div>

        {/* Informations de contact */}
        <div className="flex flex-col items-center justify-center gap-8 lg:flex-row lg:gap-16">
          {/* Plan d'accès */}
          <div className="group flex items-center space-x-3">
            <div className="bg-mti-orange/10 group-hover:bg-mti-orange/20 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full transition-colors">
              <MapPin className="text-mti-orange h-6 w-6" />
            </div>
            <div>
              <a
                href="https://www.google.fr/maps/place/Bec+de+Jat,+43150+Laussonne/@44.9808443,4.0349751,17z/data=!4m2!3m1!1s0x47f5f45f6300f2df:0xc5c7580771256c69"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-mti-orange text-lg font-medium transition-colors"
              >
                {`Plan d'accès`}
              </a>
              <p className="text-muted-foreground text-sm">
                {`Bec de Jat, 43150 Laussonne`}
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="group flex items-center space-x-3">
            <div className="bg-mti-orange/10 group-hover:bg-mti-orange/20 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full transition-colors">
              <Mail className="text-mti-orange h-6 w-6" />
            </div>
            <div>
              <a
                href="mailto:mtimichel@wanadoo.fr"
                className="hover:text-mti-orange text-lg font-medium text-gray-900 transition-colors dark:text-white"
              >
                {`mtimichel@wanadoo.fr`}
              </a>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {`Contact par email`}
              </p>
            </div>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-700">
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            <p> &copy; {`2025 MTI Échappement. Tous droits réservés.`}</p>
            <p className="mt-1">
              {`25 ans d'expérience • Fabrication française • Haute-Loire`}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
