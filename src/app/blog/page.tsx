import { formatDate } from "@/lib/date";
import { getAllPosts } from "@/lib/posts";
import { Reveal } from "@/components/Reveal";
import BackButton from "./[slug]/BackButton";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="section">
      <BackButton href="/" />
      <div className="section-header">
        <span className="section-label">All posts</span>
      </div>
      <div className="posts-grid">
        {posts.map((post, i) => (
          <Reveal
            as="a"
            key={post.slug}
            href={`/blog/${post.slug}`}
            delay={(i % 6) * 80}
            className="card"
          >
            <div className="card-thumb">
              {post.img
                ? <img src={post.img} alt={post.title} />
                : <span className="card-thumb-placeholder">No image</span>
              }
            </div>
            <div className="card-body">
              {post.cat && <p className="card-cat">{post.cat}</p>}
              <p className="card-title">{post.title}</p>
              <div className="card-footer">
                <div className="card-tags">
                  {post.tags?.map((tag) => (
                    <span key={tag} className="card-tag">{tag}</span>
                  ))}
                </div>
                <span className="card-date">{formatDate(post.date)}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
