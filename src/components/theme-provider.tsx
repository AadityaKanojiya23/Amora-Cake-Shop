"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  // Fix for React 19 next-themes hydration error
  React.useEffect(() => {
    const originalError = console.error;
    console.error = (...args: any[]) => {
      if (args[0]?.includes?.('Encountered a script tag while rendering')) return;
      originalError.apply(console, args);
    };
    return () => {
      console.error = originalError;
    };
  }, []);

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
