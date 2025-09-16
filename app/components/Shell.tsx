"use client";

import Link from "next/link";
import { Share2, MessageCircle } from "lucide-react";
import { SITE_TITLE } from "@/lib/config";
import { WHATSAPP_NUMBER } from "@/lib/config";

export default function Shell({ children }: { children: React.ReactNode }) {
  async function handleShare() {
    const shareData = {
      title: SITE_TITLE,
      text: "Schau dir meine Galerie an",
      url: typeof window !== "undefined" ? window.location.href : "/",
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // ignore
      }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareData.url);
      alert("Link kopiert");
    }
  }

  return (
    <div className="min-h-dvh flex flex-col">
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b">
        <div className="container flex items-center justify-between h-14">
          <h1 className="font-semibold">{SITE_TITLE}</h1>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full hover:bg-gray-100 active:opacity-80" onClick={handleShare} aria-label="Teilen">
              <Share2 className="w-5 h-5" />
            </button>
            {WHATSAPP_NUMBER ? (
              <Link href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, ich habe eine allgemeine Anfrage zu den Artikeln.")}`} target="_blank" className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-900 text-white text-sm active:opacity-90">
                <MessageCircle className="w-4 h-4" />
                Kontakt
              </Link>
            ) : null}
          </div>
        </div>
      </header>
      <main className="flex-1 container py-3">{children}</main>
    </div>
  );
}


