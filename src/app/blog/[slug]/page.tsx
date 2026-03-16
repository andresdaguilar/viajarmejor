import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { CONTACT } from "@/lib/constants";

const WHATSAPP_URL = `${CONTACT.whatsappUrl}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`;

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Artículo no encontrado" };
  const coverUrl = post.coverImage?.startsWith("http")
    ? post.coverImage
    : undefined;
  return {
    title: post.title,
    description: post.description,
    openGraph: coverUrl ? { images: [coverUrl] } : undefined,
  };
}

function BlogPostingJsonLd({
  post,
}: {
  post: { title: string; description: string; date: string; slug: string; coverImage?: string };
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    url: `https://viajarmejor.travel/blog/${post.slug}`,
    image: post.coverImage,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return (
      <main className="section">
        <div className="container-site text-center">
          <h1>Artículo no encontrado</h1>
          <Link href="/blog" className="btn-primary mt-4 inline-flex">
            Volver al blog
          </Link>
        </div>
      </main>
    );
  }

  const coverImage =
    post.coverImage?.startsWith("http")
      ? post.coverImage
      : "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200";

  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  return (
    <main>
      <BlogPostingJsonLd post={post} />
      <article>
        {/* Header */}
        <header className="section bg-white">
          <div className="container-site max-w-4xl">
            <span className="badge-primary mb-4 inline-block">
              {post.category}
            </span>
            <h1 className="text-display-lg font-display text-stone-900 mb-4">
              {post.title}
            </h1>
            <p className="text-xl text-stone-600 mb-8">{post.description}</p>
            <div className="flex items-center gap-4 mb-8">
              <Image
                src="/images/andy.jpg"
                alt="Andy"
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
              <div>
                <span className="font-medium text-stone-900">Andy</span>
                <span className="text-stone-500 ml-2">
                  {formatDate(post.date)} · {post.readingTime}
                </span>
              </div>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden">
              <Image
                src={coverImage}
                alt={post.title}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>
          </div>
        </header>

        {/* Content + Sidebar */}
        <div className="section bg-stone-50">
          <div className="container-site">
            <div className="grid lg:grid-cols-[1fr_320px] gap-12">
              {/* Content */}
              <div className="prose-viajarmejor max-w-2xl mx-auto lg:mx-0">
                <MDXRemote
                  source={post.content}
                  components={{
                    a: ({ href, children }) => (
                      <Link
                        href={href || "#"}
                        className="text-primary-600 hover:underline"
                      >
                        {children}
                      </Link>
                    ),
                  }}
                />
              </div>

              {/* Sidebar */}
              <aside className="lg:sticky lg:top-24 h-fit">
                <div className="card p-6">
                  <h3 className="font-semibold text-stone-900 mb-2">
                    ¿Querés que te ayude a planificar tu viaje?
                  </h3>
                  <Link
                    href="/reservar"
                    className="btn-primary w-full justify-center mb-3 inline-flex"
                  >
                    Reservar llamada
                  </Link>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp w-full justify-center inline-flex"
                  >
                    WhatsApp
                  </a>
                </div>
                {relatedPosts.length > 0 && (
                  <div className="mt-8">
                    <h3 className="font-semibold text-stone-900 mb-4">
                      Artículos relacionados
                    </h3>
                    <ul className="space-y-3">
                      {relatedPosts.map((p) => (
                        <li key={p.slug}>
                          <Link
                            href={`/blog/${p.slug}`}
                            className="text-stone-600 hover:text-primary-600 transition-colors"
                          >
                            {p.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </aside>
            </div>
          </div>
        </div>

        {/* Footer - Tags, Share, CTA */}
        <footer className="section bg-white">
          <div className="container-site max-w-2xl">
            {post.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="badge-sand text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div className="border-t border-stone-200 pt-8">
              <h3 className="font-semibold text-stone-900 mb-4">
                ¿Te fue útil? Reservá tu asesoría personalizada
              </h3>
              <Link
                href="/reservar"
                className="btn-primary inline-flex"
              >
                Reservar llamada de asesoría
              </Link>
            </div>
          </div>
        </footer>
      </article>
    </main>
  );
}
