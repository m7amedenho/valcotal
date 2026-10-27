import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, IBM_Plex_Sans_Arabic, Playfair_Display, Source_Code_Pro } from "next/font/google";
import Preloader from "./preloader";
import "./globals.css";

const ibmArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

const ibmLatin = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-latin-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sourceCode = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-code",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#242529",
  width: "device-width",
  initialScale: 1,
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://valcotal.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "فالكوتال | حلول الألومنيوم والزجاج والواجهات المعمارية",
  description:
    "فالكوتال لتجارة وتصنيع قطاعات الألومنيوم والزجاج والـ UPVC والشتر وسلك البليسيه - حلول معمارية وهندسية متكاملة للمباني والمنشآت.",
  applicationName: "VALCOTAL",
  keywords: [
    "فالكوتال",
    "VALCOTAL",
    "ألومنيوم",
    "قطاعات ألومنيوم",
    "واجهات زجاجية",
    "UPVC",
    "شتر",
    "سلك بليسيه",
    "واجهات معمارية",
    "تجهيز واجهات",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: "/",
    siteName: "فالكوتال | VALCOTAL",
    title: "فالكوتال | حلول الألومنيوم والزجاج والواجهات المعمارية",
    description:
      "فالكوتال لتجارة وتصنيع قطاعات الألومنيوم والزجاج والـ UPVC والشتر وسلك البليسيه - دقة هندسية وتصنيع متطور للواجهات المعمارية.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "VALCOTAL - فالكوتال للحلول المعمارية",
      },
      {
        url: "/valcotal-og.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "VALCOTAL - فالكوتال للحلول المعمارية",
      },
      {
        url: "/VALCOTAL%20Gradient%20Tech%20Logo.png",
        width: 1627,
        height: 967,
        alt: "VALCOTAL Gradient Tech Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "فالكوتال | حلول الألومنيوم والزجاج والواجهات المعمارية",
    description:
      "فالكوتال لتجارة وتصنيع قطاعات الألومنيوم والزجاج والـ UPVC والشتر وسلك البليسيه.",
    images: ["/valcotal-og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${ibmArabic.variable} ${ibmLatin.variable} ${playfair.variable} ${sourceCode.variable}`}
    >
      <body>
        <Preloader />
        {children}
      </body>
    </html>
  );
}
