import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

import PageLoader from "@/components/layout/PageLoader";
import Navbar from "@/components/layout/Navbar";
import { Providers } from "./providers";
import JsonLd from "@/components/seo/JsonLd";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://senotza.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "SENOTZA SOLUTIONS | Transforming Ideas Into Digital Experiences",
    template: "%s | SENOTZA SOLUTIONS",
  },
  description: "SENOTZA SOLUTIONS builds modern websites, web applications, digital identities and technology solutions designed around real business goals.",
  keywords: ["Website Development", "Web Applications", "UI/UX Design", "Branding", "SEO", "Digital Solutions", "Tamil Nadu Web Development"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    title: "SENOTZA SOLUTIONS",
    description: "Transforming Ideas Into Digital Experiences. Modern websites and web applications.",
    siteName: "SENOTZA SOLUTIONS",
  },
  twitter: {
    card: "summary_large_image",
    title: "SENOTZA SOLUTIONS",
    description: "Transforming Ideas Into Digital Experiences.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} dark antialiased`}>
      <head>
        <JsonLd />
      </head>
      <body className="min-h-full flex flex-col font-sans selection:bg-primary/30 selection:text-primary overflow-x-hidden">
        <Providers>
          <PageLoader />

          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}

