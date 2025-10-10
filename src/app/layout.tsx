import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import "aos/dist/aos.css";

const poppins = Poppins({
  variable: "--font-m-poppins",
  subsets: ["latin"],
  weight: ["300","400","600", "500", "700"],
  display: "swap",
});


const siteName = "LYV | Estética y Nutrición Integral";
const siteUrl  = "https://esteticaynutricion.com"; // dominio final
const ogImage  = `${siteUrl}/og/og-home.jpg`; // TODO: imagen 1200x630
// const logo     = `${siteUrl}/logo.svg`;       // TODO: ruta real

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description:
    "Nutrición, salud y estética para una mejor versión de ti. Planes nutricionales, tratamientos faciales y corporales, y venta de suplementos. Atendemos en San Borja y Los Olivos. +300 pacientes confían en nosotros.",
  keywords: [
    "nutricionista", "planes nutricionales", "estética", "tratamientos faciales",
    "tratamientos corporales", "PRP", "maderoterapia", "carboxiterapia",
    "ultracavitación", "suplementos", "San Borja", "Los Olivos", "Lima"
  ],
  applicationName: siteName,
  creator: "LYV",
  publisher: "LYV",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: siteName,
    description:
      "Especialistas en estética y nutrición personalizada. Logra tus objetivos en menos tiempo con planes presenciales y online.",
    images: [{ url: ogImage, width: 1200, height: 630, alt: "LYV Estética y Nutrición Integral" }],
    locale: "es_PE",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description:
      "Nutrición, salud y estética para una mejor versión de ti. +300 pacientes confían en nosotros.",
    images: [ogImage],
  },
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
  robots: { index: true, follow: true },
  category: "health",
  verification: {
    // google: "TU-CODIGO-SEARCH-CONSOLE", // opcional
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
