import type { Metadata } from "next";
import { Geologica, Onest } from "next/font/google";
import { Footer, Header } from "@/components/Shell";
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
      </body>
    </html>
  );
}
