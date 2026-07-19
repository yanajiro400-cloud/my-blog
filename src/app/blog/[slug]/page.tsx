import { compile, run } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import remarkFrontmatter from "remark-frontmatter";
import rehypeHighlight from "rehype-highlight";
import type { Metadata } from "next";
import BackButton from "./BackButton";
import { formatDate } from "@/lib/date";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "記事が見つかりません" };

  const { data } = post;
  return {
    title: data.title,
    openGraph: {
      title: data.title,
      images: data.img ? [{ url: data.img }] : [],
    },
    twitter: {
      card: "summary_large_image",
      images: data.img ? [data.img] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="article-wrap">
        <BackButton />
        <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>記事が見つかりませんでした。</p>
      </div>
    );
  }

  const { data, content } = post;

  const compiled = await compile(content, {
    outputFormat: "function-body",
    remarkPlugins: [remarkFrontmatter],
    rehypePlugins: [rehypeHighlight],
  });

  const { default: Content } = await run(String(compiled), {
    ...runtime,
    baseUrl: import.meta.url,
  }) as { default: React.ComponentType };

  return (
    <div className="article-wrap">
      <BackButton />
      <div className="article-card">
        <div className="article-card-thumb">
          {data.img
            ? <img src={data.img} alt={data.title} />
            : <span className="card-thumb-placeholder">No image</span>
          }
        </div>
        <div className="article-card-body">
          <div className="article-card-meta">
            {data.cat && <span className="article-card-cat">{data.cat}</span>}
            {data.date && <span>{formatDate(data.date)}</span>}
            {data.tags && (
              <div className="article-card-tags">
                {(data.tags as string[]).map((tag: string) => (
                  <span key={tag} className="article-card-tag">{tag}</span>
                ))}
              </div>
            )}
          </div>
          <h1 className="article-card-title">{data.title}</h1>
          <div className="article-card-content">
            <Content />
          </div>
        </div>
      </div>
    </div>
  );
}
