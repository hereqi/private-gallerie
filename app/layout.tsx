import "./globals.css";
import type { Metadata, Viewport } from "next";
import { SITE_TITLE } from "@/lib/config";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: "Minimalistische, mobile-first Galerie – Kleidung & Schuhe.",
  openGraph: {
    title: SITE_TITLE,
    description: "Minimalistische, mobile-first Galerie – Kleidung & Schuhe.",
    url: "https://example.com",
    siteName: SITE_TITLE,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: "Minimalistische, mobile-first Galerie – Kleidung & Schuhe.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}


