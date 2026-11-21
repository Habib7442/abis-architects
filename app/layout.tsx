import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Serif, Manrope } from "next/font/google";
import "./globals.css";
import { ScrollProgress } from "@/components/site/scroll-progress";
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
  themeColor: "#f7f7f5",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("antialiased", archivo.variable, instrumentSerif.variable, manrope.variable)}
    >
      {/* Browser extensions inject attributes on <body> before hydration; ignore those attribute diffs only. */}
      <body className="min-h-svh" suppressHydrationWarning>
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
