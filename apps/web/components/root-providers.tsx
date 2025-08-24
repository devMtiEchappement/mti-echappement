'use client';

import { Locale, NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from 'next-themes';

import { If } from '@kit/ui/if';
import { VersionUpdater } from '@kit/ui/version-updater';
import { StoreInitializer } from '~/components/store-initializer';

import appConfig from '~/config/app.config';
import featuresFlagConfig from '~/config/feature-flags.config';

import { ReactQueryProvider } from './react-query-provider';

export function RootProviders({
  theme = appConfig.theme,
  children,
  locale,
  messages,
  timeZone,
}: React.PropsWithChildren<{
  theme?: string;
  locale: Locale;
  messages?: Record<string, string>;
  timeZone?: string;
}>) {
  return (
    <ReactQueryProvider>
      <NextIntlClientProvider locale={locale} messages={messages} timeZone={timeZone}>
        <ThemeProvider
          attribute="class"
          enableSystem
          disableTransitionOnChange
          defaultTheme={theme}
          enableColorScheme={false}
        >
          <StoreInitializer />
          {children}
        </ThemeProvider>
      </NextIntlClientProvider>

      <If condition={featuresFlagConfig.enableVersionUpdater}>
        <VersionUpdater />
      </If>
    </ReactQueryProvider>
  );
}
