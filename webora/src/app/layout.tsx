import type { Metadata } from "next";
import { Geologica, Onest } from "next/font/google";
import { CookieBanner } from "@/components/CookieBanner";
import { Footer, Header } from "@/components/Shell";
import { YandexMetrika } from "@/components/YandexMetrika";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import "./globals.css";

const body = Onest({
  subsets: ["cyrillic", "latin"],
  variable: "--font-body",
  display: "swap",
});

const display = Geologica({
  subsets: ["cyrillic", "latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  ...buildMetadata({
    title: `${site.name} — создание сайтов, доработка и SEO`,
    description: site.description,
    path: "/",
  }),
  metadataBase: new URL(site.url),
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  category: "technology",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className={`${body.variable} ${display.variable}`}>
        <div className="shell">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
        <CookieBanner />
        <YandexMetrika />
      </body>
    </html>
  );
}
