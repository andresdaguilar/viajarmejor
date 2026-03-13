"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { PostMeta } from "@/lib/blog";

interface BlogPreviewProps {
  posts?: PostMeta[];
}

export function BlogPreview({ posts = [] }: BlogPreviewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const displayPosts = posts.slice(0, 3);

  return (
    <section ref={ref} className="section bg-stone-50">
      <div className="container-site">
        <SectionHeader
          badge="Blog"
          title="Consejos y guías para "
          titleHighlight="viajar mejor"
          subtitle="Artículos basados en experiencia real para planificar tu próximo viaje."
        />

        {displayPosts.length > 0 ? (
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {displayPosts.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-stone-200 mb-4">
                    <Image
                      src={
                        post.coverImage?.startsWith("http")
                          ? post.coverImage
                          : "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600"
                      }
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  {post.category && (
                    <span className="badge-primary text-xs mb-2 inline-block">
                      {post.category}
                    </span>
                  )}
                  <h3 className="text-lg font-semibold text-stone-900 group-hover:text-primary-600 transition-colors">
                    {post.title}
                  </h3>
                  {post.description && (
                    <p className="mt-1 text-sm text-stone-500 line-clamp-2">
                      {post.description}
                    </p>
                  )}
                  {post.readingTime && (
                    <p className="mt-2 text-xs text-stone-400">
                      {post.readingTime}
                    </p>
                  )}
                </Link>
              </motion.article>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="mt-16 text-center py-16 bg-white rounded-2xl border border-stone-200"
          >
            <p className="text-stone-500">
              Próximamente: artículos de viaje, guías y consejos.
            </p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link href="/blog" className="btn-secondary">
            Ver todos los artículos
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
