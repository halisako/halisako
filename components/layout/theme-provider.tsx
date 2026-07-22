"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Thin wrapper so app/layout.tsx (a Server Component) can render a
 * client-only provider without itself becoming a client component.
 * darkMode: ["class"] in tailwind.config.ts pairs with attribute="class"
 * here — next-themes toggles the .dark class on <html>.
 *
 * Props are inferred directly from NextThemesProvider rather than
 * importing a dist/types subpath, which some next-themes versions
 * don't expose through package "exports".
 */
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem {...props}>
      {children}
    </NextThemesProvider>
  );
}
