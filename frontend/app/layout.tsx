import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "@/app/globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { QueryProvider } from "@/components/query-provider";
import { Toaster } from "@/components/ui/toaster";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "EdgeUp AI | UPSC Learning Platform",
  description: "An integrated UPSC preparation workspace featuring AI-driven mentoring, adaptive practice, and current affairs intelligence."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} min-h-screen bg-background text-foreground site-noise`}>
        <ThemeProvider>
          <QueryProvider>
            <div className="flex min-h-screen flex-col">
              <div className="pointer-events-none fixed inset-0 -z-10 opacity-60">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_55%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(35,54,107,0.25),_transparent_50%)]" />
              </div>
              <SiteHeader />
              <main className="container flex-1 py-12 md:py-16">{children}</main>
              <SiteFooter />
            </div>
            <Toaster />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
