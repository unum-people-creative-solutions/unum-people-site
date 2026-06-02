import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TrackingInitializer } from "@/components/TrackingInitializer";

const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Unum People | Conectando Pessoas através da Tecnologia",
  description: "O caminho mais curto entre você e o seu cliente. Especialistas em Sites de Alta Performance, CRM e Gestão de Tráfego.",
  keywords: ["Unum People", "Creative Solutions", "Sites de Alta Performance", "Unum People CRM", "Google Ads", "Gestão de Tráfego", "Landing Pages"],
  authors: [{ name: "Unum People Team" }],
  metadataBase: new URL("https://unumpeople.com.br"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Unum People | Conectando Pessoas através da Tecnologia",
    description: "O caminho mais curto entre você e o seu cliente.",
    url: "https://unumpeople.com.br",
    siteName: "Unum People",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Unum People Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Unum People | Conectando Pessoas através da Tecnologia",
    description: "O caminho mais curto entre você e o seu cliente.",
    images: ["/images/logo.png"],
  },
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Unum People Creative Solutions",
    "url": "https://unumpeople.com.br",
    "logo": "https://unumpeople.com.br/images/logo.png",
    "description": "O caminho mais curto entre você e o seu cliente.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "BR"
    },
    "serviceType": [
      "Desenvolvimento de Sites",
      "Gestão de Unum People CRM",
      "Gestão de Tráfego Pago"
    ]
  };

  return (
    <html lang="pt-BR" className={`${poppins.variable} antialiased scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <TrackingInitializer />
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
