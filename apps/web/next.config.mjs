import withBundleAnalyzer from '@next/bundle-analyzer';
import createNextIntlPlugin from 'next-intl/plugin';

// Créer le plugin next-intl
const withNextIntl = createNextIntlPlugin("./lib/i18n/request.ts");

const ENABLE_REACT_COMPILER = process.env.ENABLE_REACT_COMPILER === 'true';

const INTERNAL_PACKAGES = [
  '@kit/ui',
  '@kit/shared',
  '@kit/next',
  '@kit/cms',
  '@kit/consent',
  '@kit/mailers',
  '@kit/email-templates'
];

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: INTERNAL_PACKAGES,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  serverExternalPackages: [],
  // needed for supporting dynamic imports for local content
  outputFileTracingIncludes: {
    '/*': ['./content/**/*'],
  },

  experimental: {
    mdxRs: true,
    reactCompiler: ENABLE_REACT_COMPILER,
    turbo: {
      resolveExtensions: ['.ts', '.tsx', '.js', '.jsx'],
      resolveAlias: getModulesAliases(),
    },
    optimizePackageImports: [
      'recharts',
      'lucide-react',
      '@radix-ui/react-icons',
      '@radix-ui/react-avatar',
      '@radix-ui/react-select',
      'date-fns',
      ...INTERNAL_PACKAGES,
    ],
  },
  modularizeImports: {
    lodash: {
      transform: 'lodash/{{member}}',
    },
  },
  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true }
};

// Appliquer les plugins dans l'ordre : d'abord next-intl, puis bundle-analyzer
export default withNextIntl(
  withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
  })(config)
);

/**
 * @description Aliases modules based on the environment variables
 * This will speed up the development server by not loading the modules that are not needed
 * @returns {Record<string, string>}
 */
function getModulesAliases() {
  if (process.env.NODE_ENV !== 'development') {
    return {};
  }

  const mailerProvider = process.env.MAILER_PROVIDER;

  // exclude the modules that are not needed
  const excludeNodemailer = mailerProvider !== 'nodemailer';

  /** @type {Record<string, string>} */
  const aliases = {};

  // the path to the noop module
  const noopPath = '~/lib/dev-mock-modules';

  if (excludeNodemailer) {
    aliases['nodemailer'] = noopPath;
  }

  return aliases;
}