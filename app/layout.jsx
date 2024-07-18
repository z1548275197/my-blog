"use client";
import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import useDarkMode from "use-dark-mode";
import { Navbar } from "@/components/navbar";

// export const metadata = {
//   title: {
//     default: siteConfig.name,
//     template: `%s - ${siteConfig.name}`,
//   },
//   description: siteConfig.description,
//   icons: {
//     icon: "/favicon.ico",
//   },
// };


export default function RootLayout({
  children,
}) {
  const darkMode = useDarkMode(false);
  return (
    <html lang="en">
      <head />
      <body
        className={clsx(
          `min-h-screen bg-background font-sans antialiased text-default-foreground border-b-slate-200`,
          darkMode.value ? 'dark' : 'light',
        )}
      >
        <div className="relative flex flex-col h-screen">
          <Navbar />
          <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
