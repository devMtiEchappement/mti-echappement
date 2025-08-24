import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import createMiddleware from 'next-intl/middleware';

import { routing } from '~/lib/i18n/routing';

const NEXT_ACTION_HEADER = 'next-action';

// Créer le middleware de routage next-intl
const intlMiddleware = createMiddleware(routing);

export const config = {
  matcher: ['/((?!_next/static|_next/image|images|locales|assets|api/*).*)'],
};

export async function middleware(request: NextRequest) {
  // D'abord, laisser next-intl gérer le routage
  const response:NextResponse = intlMiddleware(request);

  // Définir un ID de requête unique
  setRequestId(request);

  // Ajouter le chemin d'action aux en-têtes de requête pour les Server Actions
  if (isServerAction(request)) {
    response.headers.set('x-action-path', request.nextUrl.pathname);
  }

  return response;
}

function isServerAction(request: NextRequest) {
  const headers = new Headers(request.headers);
  return headers.has(NEXT_ACTION_HEADER);
}

/**
 * Set a unique request ID for each request.
 * @param request
 */
function setRequestId(request: Request) {
  request.headers.set('x-correlation-id', crypto.randomUUID());
}