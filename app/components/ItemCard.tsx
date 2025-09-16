"use client";

import Image from "next/image";
import { formatPriceCHF } from "@/lib/format";
import type { Item } from "@/lib/types";

type Props = {
  item: Item;
  onClick: () => void;
};

export default function ItemCard({ item, onClick }: Props) {
  return (
    <button className="card overflow-hidden text-left active:opacity-90" onClick={onClick} aria-label={item.title}>
      <div className="relative aspect-[4/5] w-full">
        <Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
        {item.price !== undefined && (
          <span className="absolute top-2 right-2 px-2 py-1 text-xs rounded-full bg-white/90 shadow">
            {formatPriceCHF(item.price)}
          </span>
        )}
      </div>
      <div className="p-3">
        <div className="font-medium leading-tight line-clamp-2">{item.title}</div>
        <div className="text-xs text-gray-500 mt-1 flex gap-2">
          <span className="capitalize">{item.category}</span>
          {item.size && <span>Gr. {item.size}</span>}
          {item.condition && <span>{item.condition}</span>}
        </div>
      </div>
    </button>
  );
}


