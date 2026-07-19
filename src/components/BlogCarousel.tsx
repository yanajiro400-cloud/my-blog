"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import styles from "./BlogCarousel.module.css";

export type BlogCarouselArticle = {
  id: string;
  title: string;
  thumbnail?: string;
  url: string;
};

type Props = {
  articles: BlogCarouselArticle[];
};

const GAP_PX = 16;

export function BlogCarousel({ articles }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(0);

  const maxIndex = Math.max(articles.length - 1, 0);

  const measure = useCallback(() => {
    const firstCard = trackRef.current?.firstElementChild as HTMLElement | null;
    if (firstCard) {
      setStep(firstCard.getBoundingClientRect().width + GAP_PX);
    }
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure, articles.length]);

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const goTo = (next: number) => setIndex(Math.min(Math.max(next, 0), maxIndex));

  if (articles.length === 0) return null;

  return (
    <div
      className={styles.carousel}
      role="region"
      aria-roledescription="carousel"
      aria-label="ブログ記事カルーセル"
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") goTo(index - 1);
        if (e.key === "ArrowRight") goTo(index + 1);
      }}
    >
      <div className={styles.clip}>
        <div className={styles.viewport}>
          <div
            className={styles.track}
            ref={trackRef}
            style={{ transform: `translateX(${-index * step}px)` }}
          >
            {articles.map((article, i) => (
              <Link
                key={article.id}
                href={article.url}
                className={`${styles.card} ${i === index ? styles.cardActive : ""}`}
                data-hover-target
                aria-roledescription="slide"
                aria-label={`${i + 1} / ${articles.length}: ${article.title}`}
                aria-current={i === index}
                tabIndex={-1}
              >
                <div className={styles.thumb}>
                  {article.thumbnail
                    ? <img src={article.thumbnail} alt="" />
                    : <span className="card-thumb-placeholder">No image</span>
                  }
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      {articles.length > 1 && (
        <div className={styles.nav}>
          <button
            type="button"
            className={styles.navButton}
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            aria-label="前の記事"
          >
            <ArrowLeft size={24} strokeWidth={2} />
          </button>
          <button
            type="button"
            className={styles.navButton}
            onClick={() => goTo(index + 1)}
            disabled={index === maxIndex}
            aria-label="次の記事"
          >
            <ArrowRight size={24} strokeWidth={2} />
          </button>
        </div>
      )}
    </div>
  );
}
