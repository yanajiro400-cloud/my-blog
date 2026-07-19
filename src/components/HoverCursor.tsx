"use client";

import { useEffect, useRef, useState } from "react";

export function HoverCursor({ targetSelector }: { targetSelector: string }) {
  const [visible, setVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const el = cursorRef.current;
      if (el) el.style.translate = `${e.clientX}px ${e.clientY}px`;
    };

    const handleOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(targetSelector)) setVisible(true);
    };

    const handleOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(targetSelector);
      if (!target) return;
      const related = e.relatedTarget as HTMLElement | null;
      if (!related || !related.closest(targetSelector)) setVisible(false);
    };

    // Navigating to an article and back uses plain <a href> links, so the
    // browser may restore the home page from bfcache (a frozen snapshot)
    // rather than re-running React's effects. Reset to a clean state
    // whenever the page is (re-)shown so the cursor can't stay stuck.
    const handlePageShow = () => setVisible(false);

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);
    window.addEventListener("pageshow", handlePageShow);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, [targetSelector]);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={`hover-cursor ${visible ? "hover-cursor--visible" : ""}`}
    />
  );
}
