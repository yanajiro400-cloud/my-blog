import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";

const postsDir = path.join(process.cwd(), "src/content/posts");

export type Post = {
  slug: string;
  title: string;
  date: string;
  cat?: string;
  tags?: string[];
  img?: string;
};

export const getAllPosts = cache((): Post[] => {
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const { data } = matter(fs.readFileSync(path.join(postsDir, file), "utf8"));
      return { slug, ...data } as Post;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
});

export const getPostBySlug = cache((slug: string) => {
  for (const ext of [".md", ".mdx"]) {
    try {
      return matter(fs.readFileSync(path.join(postsDir, `${slug}${ext}`), "utf8"));
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code !== "ENOENT") throw err;
    }
  }
  return null;
});
