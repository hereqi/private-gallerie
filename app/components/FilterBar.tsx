"use client";

import { useMemo } from "react";
import { CATEGORIES, type Item } from "@/lib/types";

type Props = {
  items: Item[];
  selectedCategory: Item["category"] | "all";
  setSelectedCategory: (c: Item["category"] | "all") => void;
  selectedSize: string;
  setSelectedSize: (s: string) => void;
  query: string;
  setQuery: (q: string) => void;
};

export default function FilterBar({ items, selectedCategory, setSelectedCategory, selectedSize, setSelectedSize, query, setQuery }: Props) {
  const sizes = useMemo(() => {
    const set = new Set<string>();
    for (const it of items) if (it.size) set.add(it.size);
    return Array.from(set).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  }, [items]);

  return (
    <div className="sticky top-14 z-10 bg-white/90 backdrop-blur py-2 border-b">
      <div className="flex flex-wrap items-center gap-2">
        <button className={`px-3 py-1.5 rounded-full text-sm border ${selectedCategory === "all" ? "bg-gray-900 text-white" : "bg-white"}`} onClick={() => setSelectedCategory("all")}>All</button>
        {CATEGORIES.map((c) => (
          <button key={c} className={`px-3 py-1.5 rounded-full text-sm border capitalize ${selectedCategory === c ? "bg-gray-900 text-white" : "bg-white"}`} onClick={() => setSelectedCategory(c)}>
            {c}
          </button>
        ))}

        <select className="ml-auto px-3 py-1.5 border rounded-full text-sm" value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
          <option value="">Alle Größen</option>
          {sizes.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <input className="flex-1 min-w-[140px] px-3 py-1.5 border rounded-full text-sm" placeholder="Suche Titel/Brand" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>
    </div>
  );
}


