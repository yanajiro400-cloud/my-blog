"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function BackButton({ href }: { href?: string }) {
  const router = useRouter();
  const label = (
    <>
      <ChevronLeft size={14} strokeWidth={2} />
      戻る
    </>
  );

  if (href) {
    return (
      <Link href={href} className="article-back flex items-center gap-0.5">
        {label}
      </Link>
    );
  }

  return (
    <button className="article-back flex items-center gap-0.5" onClick={() => router.back()}>
      {label}
    </button>
  );
}
