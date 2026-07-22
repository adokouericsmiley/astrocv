import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AstroCV — Créateur de CV professionnel",
  description:
    "Créez votre CV professionnel en quelques minutes avec AstroCV. Éditeur en temps réel, templates modernes, export PDF.",
  keywords: ["CV", "curriculum vitae", "créateur de CV", "CV en ligne", "AstroCV"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // data-theme sera géré dynamiquement côté client via le store
    <html lang="fr" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
