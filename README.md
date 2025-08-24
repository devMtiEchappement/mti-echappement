
# Next.js Starter Kit (mondo bongo)

## What's Included

### Core Architecture
- 🏗️ Next.js 15 + Turborepo monorepo setup
- 🎨 Shadcn UI components with TailwindCSS v4
- 🌐 i18n translations (client + server)
- ✨ Full TypeScript + ESLint v9 + Prettier configuration

### Technologies

This starter kit provides core foundations:

🛠️ **Technology Stack**:
- [Next.js 15](https://nextjs.org/): A React-based framework for server-side rendering and static site generation.
- [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for rapidly building custom designs.
- [Supabase](https://supabase.com/): A realtime database for web and mobile applications.
- [i18next](https://www.i18next.com/): A popular internationalization framework for JavaScript.
- [Turborepo](https://turborepo.org/): A monorepo tool for managing multiple packages and applications.
- [Shadcn UI](https://shadcn.com/): A collection of components built using Tailwind CSS.
- [Zod](https://github.com/colinhacks/zod): A TypeScript-first schema validation library.
- [React Query](https://tanstack.com/query/v4): A powerful data fetching and caching library for React.
- [Prettier](https://prettier.io/): An opinionated code formatter for JavaScript, TypeScript, and CSS.
- [Eslint](https://eslint.org/): A powerful linting tool for JavaScript and TypeScript.
- [Playwright](https://playwright.dev/): A framework for end-to-end testing of web applications.





## Getting Started

### Prerequisites

- Node.js 18.x or later (preferably the latest LTS version)
- Docker
- PNPM

Please make sure you have a Docker daemon running on your machine. This is required for the Supabase CLI to work.

### Installation

#### 1. Install dependencies

```bash
pnpm install
```

#### 2. Start the Next.js application

```bash
pnpm run dev
```

The application will be available at http://localhost:3000.

#### 5. Code Health (linting, formatting, etc.)

To format your code, run the following command:

```bash
pnpm run format:fix
```

To lint your code, run the following command:

```bash
pnpm run lint
```

To validate your TypeScript code, run the following command:

```bash
pnpm run typecheck
```

Turborepo will cache the results of these commands, so you can run them as many times as you want without any performance impact.

## Project Structure

The project is organized into the following folders:

```
apps/
├── web/                  # Next.js application
│   ├── app/             # App Router pages
│   │   ├── (marketing)/ # Public marketing pages
│   └── config/          # App configuration
│
packages/
├── ui/                  # Shared UI components
└── features/           # Core feature packages
    └── ...
```

### Environment Variables

You can configure the application by setting environment variables in the `.env.local` file.

Here are the available variables:

| Variable Name | Description | Default Value|
| --- | --- |--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `NEXT_PUBLIC_SITE_URL` | The URL of your SaaS application | `http://localhost:3000`|
| `NEXT_PUBLIC_PRODUCT_NAME` | The name of your SaaS product | ``|
| `NEXT_PUBLIC_SITE_TITLE` | The title of your SaaS product | ``|
| `NEXT_PUBLIC_SITE_DESCRIPTION` | The description of your SaaS product | `` |
| `NEXT_PUBLIC_DEFAULT_THEME_MODE` | The default theme mode of your SaaS product | `light`|
| `NEXT_PUBLIC_THEME_COLOR` | The default theme color of your SaaS product | `#ffffff`|
| `NEXT_PUBLIC_THEME_COLOR_DARK` | The default theme color of your SaaS product in dark mode | `#0a0a0a`|


## Architecture

This starter kit uses a monorepo architecture.

1. The `apps/web` directory is the Next.js application.
2. The `packages` directory contains all the packages used by the application.
3. The `packages/features` directory contains all the features of the application.
4. The `packages/ui` directory contains all the UI components.

### Marketing Pages

Marketing pages are located in the `apps/web/app/(marketing)` directory. These pages are used to showcase the features of the SaaS and provide information about the product.

