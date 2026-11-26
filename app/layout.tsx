import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Serif, Manrope } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site/header";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { ThemeSync } from "@/components/site/theme-toggle";
import { InlineScript } from "@/components/site/inline-script";
import { themeInitScript } from "@/lib/theme-script";
import { cn } from "@/lib/utils";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic", "normal"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The ABIS Architects | Architects & Builders in Silchar",
  description:
    "Architects and builders from Silchar since 2014. One team for your plan, 3D design, construction and interiors across Assam and the Northeast.",
};

export const viewport: Viewport = {
  // Light by default (the site opens in light mode whatever the device setting).
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("antialiased", archivo.variable, instrumentSerif.variable, manrope.variable)}
      // The <head> script sets data-mode before React hydrates.
      suppressHydrationWarning
    >
      <head>
        {/* Sets <html data-mode> before first paint: saved choice, else the system (no flash). */}
        <InlineScript html={themeInitScript} />
      </head>
      {/* Browser extensions inject attributes on <body> before hydration; ignore those attribute diffs only. */}
      <body className="min-h-svh" suppressHydrationWarning>
        <ThemeSync />
        <ScrollProgress />
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
