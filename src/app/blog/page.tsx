import { createMetadata } from "@/lib/metadata";
import Link from "next/link";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { getAllPosts } from "@/lib/blog";

export const metadata = createMetadata({
  title: "Blog de viajes — Viajar Mejor",
  description:
    "Consejos prácticos, guías de destinos, tips de logística y todo lo que necesitás para viajar mejor. Desde Argentina para el mundo.",
  path: "/blog",
});

const CATEGORIAS = [
  "Todos",
  "Errores comunes",
  "Logística",
  "Destinos",
  "Trámites",
  "Seguridad",
  "Eventos",
];

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { categoria } = await searchParams;
  const allPosts = getAllPosts();
  const posts =
    !categoria || categoria === "Todos"
      ? allPosts
      : allPosts.filter((p) => p.category === categoria);
  const featuredPost = allPosts.find((p) => p.featured) || allPosts[0];

  const featuredCover =
    featuredPost?.coverImage?.startsWith("http")
      ? featuredPost.coverImage
      : "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200";

  return (
    <main>
      <section className="section bg-white">
        <div className="container-site">
          <SectionHeader
            badge="Blog"
            title="Viajá mejor con cada artículo"
            subtitle="Consejos prácticos de alguien que ya estuvo ahí."
          />

          {/* Filtros */}
          <div className="mt-12 flex flex-wrap gap-2">
            {CATEGORIAS.map((cat) => (
              <Link
                key={cat}
                href={cat === "Todos" ? "/blog" : `/blog?categoria=${encodeURIComponent(cat)}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  (!categoria && cat === "Todos") || categoria === cat
                    ? "bg-primary-600 text-white"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>

          {/* Featured article */}
          {featuredPost && (posts.length === 0 ? true : posts.some((p) => p.slug === featuredPost.slug)) && (
            <div className="mt-12">
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="group block md:grid md:grid-cols-2 gap-8 p-6 rounded-2xl bg-stone-50 hover:bg-stone-100 transition-colors"
              >
                <div className="relative aspect-video md:aspect-auto md:min-h-[300px] rounded-xl overflow-hidden">
                  <Image
                    src={featuredCover}
                    alt={featuredPost.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <span className="absolute top-3 left-3 badge-primary">
                    {featuredPost.category}
                  </span>
                </div>
                <div className="flex flex-col justify-center mt-4 md:mt-0">
                  <h2 className="text-2xl md:text-3xl font-display font-semibold text-stone-900 group-hover:text-primary-600 transition-colors mb-2">
                    {featuredPost.title}
                  </h2>
                  <p className="text-stone-600 mb-4 line-clamp-2">
                    {featuredPost.description}
                  </p>
                  <div className="text-sm text-stone-500 mb-4">
                    Andy · {featuredPost.readingTime}
                  </div>
                  <span className="text-primary-600 font-medium">
                    Leer artículo →
                  </span>
                </div>
              </Link>
            </div>
          )}

          {/* Grid */}
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts
              .filter((p) => p.slug !== featuredPost?.slug)
              .map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
