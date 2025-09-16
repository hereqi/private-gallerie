"use client";

import Image from "next/image";
import { formatPriceCHF } from "@/lib/format";
import type { Item } from "@/lib/types";
import { X, Share2, MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/config";

type Props = {
  item: Item | null;
  onClose: () => void;
};

export default function ItemDetail({ item, onClose }: Props) {
  if (!item) return null;
  const waUrl = WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        `Hi ich interessiere mich für ${item.title} (${item.size ?? "?"}) – noch verfügbar?`
      )}`
    : "";

  async function handleShare() {
    const url = typeof window !== "undefined" ? window.location.href : "/";
    const text = `${item.title} ${item.price ? `– ${formatPriceCHF(item.price)}` : ""}`.trim();
    if (navigator.share) {
      try {
        await navigator.share({ title: item.title, text, url });
        return;
      } catch {}
    }
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      alert("Details kopiert");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="card w-full md:max-w-xl md:mx-auto max-h-[90vh] overflow-auto rounded-t-2xl md:rounded-2xl">
        <div className="flex items-center justify-between p-3 border-b sticky top-0 bg-white z-10">
          <div className="font-medium line-clamp-1">{item.title}</div>
          <div className="flex items-center gap-1">
            <button className="p-2 rounded-full hover:bg-gray-100" onClick={handleShare} aria-label="Teilen">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100" onClick={onClose} aria-label="Schließen">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="relative aspect-[4/5] w-full">
          <Image src={item.image} alt={item.title} fill sizes="100vw" className="object-cover" />
        </div>
        <div className="p-4 space-y-2">
          <div className="text-lg font-semibold">{item.title}</div>
          <div className="text-sm text-gray-600 flex flex-wrap gap-3">
            <span className="capitalize">{item.category}</span>
            {item.size && <span>Gr. {item.size}</span>}
            {item.condition && <span>Zustand: {item.condition}</span>}
            {item.brand && <span>Brand: {item.brand}</span>}
          </div>
          {item.notes && <p className="text-sm text-gray-700">{item.notes}</p>}
          <div className="pt-2 flex items-center justify-between">
            <div className="text-base font-medium">{formatPriceCHF(item.price)}</div>
            {WHATSAPP_NUMBER ? (
              <a href={waUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-600 text-white">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}


