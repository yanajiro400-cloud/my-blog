import { Reveal } from "@/components/Reveal";
import { BlogCarousel, type BlogCarouselArticle } from "@/components/BlogCarousel";
import { PostsExplorer } from "@/components/PostsExplorer";
import { HoverCursor } from "@/components/HoverCursor";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();
  const categories = Array.from(
    new Set(posts.flatMap((p) => [p.cat, ...(p.tags ?? [])]).filter(Boolean))
  ) as string[];

  const articles: BlogCarouselArticle[] = posts.map((post) => ({
    id: post.slug,
    title: post.title,
    thumbnail: post.img,
    url: `/blog/${post.slug}`,
  }));

  return (
    <>
      <HoverCursor targetSelector=".home-post-card, [data-hover-target]" />
      <section className="home-hero">
        <div className="home-hero-grid" aria-hidden="true" />
        <div className="home-hero-inner">
          <Reveal as="div" className="home-hero-intro">
            <h1 className="home-hero-title">
              <span className="home-hero-title-accent">Jiro</span>Blog
            </h1>
            <p className="home-hero-desc">
              UIデザイナーをしています。
              <br />
              デザインのこと、気になったこと、思ったことをゆるく書いています。
            </p>
          </Reveal>
          <Reveal as="div" delay={120}>
            <BlogCarousel articles={articles} />
          </Reveal>
        </div>
      </section>

      <section className="home-posts">
        <div className="home-posts-inner">
          <PostsExplorer title="Posts" posts={posts} categories={categories} />
        </div>
      </section>
    </>
  );
}
