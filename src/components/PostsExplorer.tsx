"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { formatDate } from "@/lib/date";
import type { Post } from "@/lib/posts";

export function PostsExplorer({ title, posts, categories }: { title: string; posts: Post[]; categories: string[] }) {
  const [active, setActive] = useState<string | null>(null);
  const visiblePosts = useMemo(
    () =>
      posts.filter(
        (post) => active === null || post.cat === active || post.tags?.includes(active)
      ),
    [posts, active]
  );

  return (
    <>
      <div className="home-posts-heading">
        <Reveal as="h2" className="home-posts-title">{title}</Reveal>
        {categories.length > 0 && (
          <div className="home-pill-row">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`home-pill ${active === cat ? "home-pill--active" : ""}`}
                onClick={() => setActive((c) => (c === cat ? null : cat))}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="home-posts-grid">
        {visiblePosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="home-post-card"
          >
            <div className="home-post-thumb">
              {post.img
                ? <img src={post.img} alt={post.title} />
                : <span className="card-thumb-placeholder">No image</span>
              }
            </div>
            <div className="home-post-body">
              <div className="home-post-textgroup">
                <p className="home-post-title">{post.title}</p>
                <p className="home-post-date">{formatDate(post.date)}</p>
              </div>
              {post.tags?.[0] && <p className="home-post-tag">#{post.tags[0]}</p>}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
