import 'styles/globals.css';
import { ReactNode } from "react";

/**
 * Represents the root layout of an application.
 * Since we have a `not-found.tsx` page on the root, a layout file
 * is required, even if it's just passing children through.
 */

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return children;
}
