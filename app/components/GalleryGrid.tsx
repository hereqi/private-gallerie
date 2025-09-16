"use client";

import type { Item } from "@/lib/types";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ItemCard from "./ItemCard";
import ItemDetail from "./ItemDetail";
import { useInfiniteScroll } from "@/lib/useInfiniteScroll";

type Props = {
  items: Item[];
};

export default function GalleryGrid({ items }: Props) {
  const [active, setActive] = useState<Item | null>(null);
  const { sentinelRef, visibleItems } = useInfiniteScroll<Item>({ items, pageSize: 24 });

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <AnimatePresence>
          {visibleItems.map((it) => (
            <motion.div key={it.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ItemCard item={it} onClick={() => setActive(it)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div ref={sentinelRef} className="h-10" />
      <ItemDetail item={active} onClose={() => setActive(null)} />
    </>
  );
}


