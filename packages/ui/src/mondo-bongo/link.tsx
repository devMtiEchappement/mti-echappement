'use client';

import React from 'react';

import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

import { VariantProps } from 'class-variance-authority';

import { cn, isRouteActive } from '../lib/utils';
import { buttonVariants } from '../shadcn/button';

interface LinkProps
  extends Omit<NextLinkProps, 'href'>,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
    VariantProps<typeof buttonVariants> {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    { className, variant, size, href, children, external = false, ...props },
    ref,
  ) => {
    const pathname = usePathname();
    console.log('pathname', pathname);
    console.log('href', href);

    const isActive = isRouteActive(href, pathname);
    // Vérifier si le lien est actif

    // Classes pour le lien actif quand variant est "link"
    const activeLinkClasses =
      variant === 'link' && isActive
        ? 'underline underline-offset-4 decoration-2 decoration-primary'
        : '';

    // Si c'est un lien externe, utiliser un élément <a> normal
    if (
      external ||
      href.startsWith('http') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:')
    ) {
      return (
        <a
          ref={ref}
          href={href}
          className={cn(
            buttonVariants({ variant, size }),
            activeLinkClasses,
            className,
          )}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          {...props}
        >
          {children}
        </a>
      );
    }

    // Pour les liens internes, utiliser Next.js Link
    return (
      <NextLink
        href={href}
        ref={ref}
        className={cn(
          buttonVariants({ variant, size }),
          activeLinkClasses,
          className,
        )}
        {...props}
      >
        {children}
      </NextLink>
    );
  },
);

Link.displayName = 'Link';

export { Link };
