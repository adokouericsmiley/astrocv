import type { Metadata } from "next";
import {
  Inter,
  Poppins,
  Montserrat,
  Roboto,
  Lato,
  Open_Sans,
  Raleway,
  Nunito,
  Source_Sans_3,
  DM_Sans,
  Playfair_Display,
  Merriweather,
  Lora,
} from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
  weight: ["400", "500", "700", "900"],
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  display: "swap",
  weight: ["400", "700", "900"],
});

const opensans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-opensans",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const sourcesans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sourcesans",
  display: "swap",
});

const dmsans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dmsans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-merriweather",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

// Polices proposées dans « Personnaliser » : toutes exposées en variables CSS
const fontVariables = [inter.variable, poppins.variable, montserrat.variable, roboto.variable, lato.variable, opensans.variable, raleway.variable, nunito.variable, sourcesans.variable, dmsans.variable, playfair.variable, merriweather.variable, lora.variable].join(" ");

export const metadata: Metadata = {
  title: "AstroCV — Créateur de CV professionnel et compatible ATS",
  description:
    "Créez votre CV en quelques minutes, quel que soit votre métier : 26 modèles dont des modèles compatibles ATS, exemples par profession, couleurs et polices personnalisables, export PDF.",
  keywords: ["CV", "curriculum vitae", "créateur de CV", "CV ATS", "modèle de CV", "CV en ligne", "AstroCV"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // data-theme sera géré dynamiquement côté client via le store
    <html lang="fr" className={fontVariables}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
