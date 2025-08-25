import { ReactNode } from 'react';

import { notFound } from 'next/navigation';

import { Locale, hasLocale } from 'next-intl';
import { getMessages, getTimeZone, setRequestLocale } from 'next-intl/server';

import { Toaster } from '@kit/ui/sonner';

import Navigation from '~/[locale]/(marketing)/_components/navigation';
import { RootProviders } from '~/components/root-providers';
import { getFontsClassName } from '~/lib/fonts';
import { routing } from '~/lib/i18n/routing';
import { generateRootMetadata } from '~/lib/root-metdata';
import { getRootTheme } from '~/lib/root-theme';

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const generateMetadata = () => {
  return generateRootMetadata();
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Récupérer les messages et timezone
  const messages = await getMessages();
  const timeZone = await getTimeZone();

  const theme = await getRootTheme();
  const className = getFontsClassName(theme);

  return (
    <html lang={locale} className={className}>
      <body>
        <RootProviders
          theme={theme}
          locale={locale}
          messages={messages}
          timeZone={timeZone}
        >
          <div className={'flex min-h-screen flex-col'}>
            <Navigation></Navigation>
            {children}
          </div>
        </RootProviders>

        <Toaster richColors={true} theme={theme} position="top-center" />
      </body>
    </html>
  );
}
