/**
 * We force it to static because we want to cache for as long as the build is live.
 */
export const dynamic = 'force-static';

// please provide your own implementation
// if you're not using Vercel or Cloudflare Pages
const KNOWN_GIT_ENV_VARS = [
  'CF_PAGES_COMMIT_SHA',
  'VERCEL_GIT_COMMIT_SHA',
  'GIT_HASH',
];

export const GET = async () => {
  const currentGitHash = await getGitHash();

  return new Response(currentGitHash, {
    headers: {
      'content-type': 'text/plain',
    },
  });
};

async function getGitHash() {
  for (const envVar of KNOWN_GIT_ENV_VARS) {
    if (process.env[envVar]) {
      return process.env[envVar];
    }
  }

  try {
    return await getHashFromProcess();
  } catch (error) {
    console.warn(
      `[WARN] Could not find git hash: ${JSON.stringify(error)}. You may want to provide a fallback.`,
    );

    return '';
  }
}

async function getHashFromProcess() {
  // avoid calling a Node.js command in the edge runtime
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Vérifier d'abord si un dépôt Git existe
    if (!(await isGitRepository())) {
      if (process.env.NODE_ENV === 'development') {
        console.info('[INFO] No git repository found. Skipping git hash retrieval.');
      }
      return '';
    }

    if (process.env.NODE_ENV !== 'development') {
      console.warn(
        `[WARN] Could not find git hash in environment variables. Falling back to git command. Supply a known git hash environment variable to avoid this warning.`,
      );
    }

    const { execSync } = await import('child_process');

    return execSync('git log --pretty=format:"%h" -n1').toString().trim();
  }

  console.log(
    `[INFO] Could not find git hash in environment variables. Falling back to git command. Supply a known git hash environment variable to avoid this warning.`,
  );
  
  return '';
}

async function isGitRepository(): Promise<boolean> {
  try {
    const { execSync } = await import('child_process');
    const { existsSync } = await import('fs');
    const { resolve } = await import('path');
    
    // Vérifier si le dossier .git existe
    if (existsSync(resolve(process.cwd(), '.git'))) {
      return true;
    }
    
    // Vérifier avec git rev-parse (plus robuste pour les sous-modules, etc.)
    execSync('git rev-parse --git-dir', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}