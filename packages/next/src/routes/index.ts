import 'server-only';

import { NextRequest, NextResponse } from 'next/server';

import { z } from 'zod';

import { zodParseFactory } from '../utils';

interface Config<Schema> {
  captcha?: boolean;
  schema?: Schema;
}

interface HandlerParams<Schema extends z.ZodType | undefined> {
  request: NextRequest;
  body: Schema extends z.ZodType ? z.infer<Schema> : undefined;
  params: Record<string, string>;
}

/**
 * Enhanced route handler function.
 *
 * This function takes a request and parameters object as arguments and returns a route handler function.
 * The route handler function can be used to handle HTTP requests and apply additional enhancements
 * based on the provided parameters.
 *
 * Usage:
 * export const POST = enhanceRouteHandler(
 *   ({ request, body }) => {
 *     return new Response(`Hello, ${body.name}!`);
 *   },
 *   {
 *     schema: z.object({
 *       name: z.string(),
 *     }),
 *   },
 * );
 *
 */
export const enhanceRouteHandler = <
    Body,
    Params extends Config<z.ZodType<Body, z.ZodTypeDef>>,
>(
    // Route handler function
    handler:
        | ((
        params: HandlerParams<Params['schema']>,
    ) => NextResponse | Response)
        | ((
        params: HandlerParams<Params['schema']>,
    ) => Promise<NextResponse | Response>),
    // Parameters object
    params?: Params,
) => {
  /**
   * Route handler function.
   *
   * This function takes a request object as an argument and returns a response object.
   */
  return async function routeHandler(
      request: NextRequest,
      routeParams: {
        params: Promise<Record<string, string>>;
      },
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let body: any;

    if (params?.schema) {
      // clone the request to read the body
      // so that we can pass it to the handler safely
      const json = await request.clone().json();

      body = zodParseFactory(params.schema)(json);
    }

    return handler({
      request,
      body,
      params: await routeParams.params,
    });
  };
};