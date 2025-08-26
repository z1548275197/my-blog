"use client";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/navigation";
import { AuthProvider } from "@/contexts/AuthContext";

export function Providers({ children, themeProps }) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider attribute="class" defaultTheme="light">
        <AuthProvider>
          {children}
        </AuthProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
