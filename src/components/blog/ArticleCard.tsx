import Image from "next/image";
import Link from "next/link";
import type { PostMeta } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export function ArticleCard({ post }: { post: PostMeta }) {
  const coverImage =
    post.coverImage?.startsWith("http")
      ? post.coverImage
      : "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="card group block overflow-hidden"
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={coverImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <span className="absolute top-3 left-3 badge-primary text-xs">
          {post.category}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold text-stone-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-stone-500 text-sm mb-4 line-clamp-2">
          {post.description}
        </p>
        <div className="flex items-center gap-2 text-xs text-stone-400">
          <span>{formatDate(post.date)}</span>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>
      </div>
    </Link>
  );
}
