import Shell from "./components/Shell";
import FilterBar from "./components/FilterBar";
import GalleryGrid from "./components/GalleryGrid";
import type { Item } from "@/lib/types";
import { Suspense } from "react";

async function loadItems(): Promise<Item[]> {
  // Static import to enable static optimization; falls back to fetch if needed
  const data = await import("../data/items.json");
  return (data.default as Item[]) ?? [];
}

export default async function Page() {
  const items = await loadItems();
  return (
    <Shell>
      <Suspense>
        {/* Client Filter wrapper */}
        <ClientGallery items={items} />
      </Suspense>
    </Shell>
  );
}

"use client";
import { useMemo, useState } from "react";

function ClientGallery({ items }: { items: Item[] }) {
  const [selectedCategory, setSelectedCategory] = useState<Item["category"] | "all">("all");
  const [selectedSize, setSelectedSize] = useState("");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((it) => {
      if (selectedCategory !== "all" && it.category !== selectedCategory) return false;
      if (selectedSize && it.size !== selectedSize) return false;
      if (q) {
        const hay = `${it.title} ${it.brand ?? ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [items, selectedCategory, selectedSize, query]);

  return (
    <>
      <FilterBar
        items={items}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        query={query}
        setQuery={setQuery}
      />
      <GalleryGrid items={filtered} />
    </>
  );
}


