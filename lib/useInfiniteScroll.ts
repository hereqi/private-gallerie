"use client";

import { useEffect, useRef, useState } from "react";

export function useInfiniteScroll<T>(options: {
  items: T[];
  pageSize?: number;
}) {
  const { items, pageSize = 24 } = options;
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setVisibleCount(pageSize);
  }, [items, pageSize]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisibleCount((c) => c + pageSize);
          }
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [pageSize]);

  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  return { sentinelRef, visibleItems, hasMore };
}


