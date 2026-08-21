import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/lib/products";

const CATEGORIES = [
  {
    label: "Maillots",
    href: "/products?category=maillots",
    image: "https://images.unsplash.com/photo-1626248801379-51a0748a5f96?w=800&q=80",
  },
  {
    label: "Montres de luxe",
    href: "/products?category=montres-luxe",
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800&q=80",
  },
  {
    label: "Montres personnalisables",
    href: "/products?category=montres-personnalisables",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80",
  },
  {
    label: "Bijoux",
    href: "/products?category=bijoux",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80",
  },
  {
    label: "Parfums",
    href: "/products?category=parfums",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80",
  },
];

export default async function Home() {
  const products = await getAllProducts();
  const featured = products.filter((p) => p.isNew).slice(0, 4);
  const bestSellers = products.slice(0, 8);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-klk-maroon text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-white/70">
              Nouvelle collection
            </p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
              L&apos;excellence.
              <br />
              <span className="klk-gradient-text">Un seul KLK.</span>
            </h1>
            <p className="mt-4 max-w-md text-white/70">
              Maillots, montres, bijoux et parfums d&apos;exception, avec des
              pièces personnalisables rien que pour toi.
            </p>
            <Link
              href="/products"
              className="mt-8 inline-block rounded-full klk-gradient-bg px-8 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition hover:opacity-90"
            >
              Découvrir la boutique
            </Link>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-md">
            <Image
              src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=1000&q=80"
              alt="Montre de luxe en vedette"
              fill
              className="rounded-2xl object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-neutral-900">Acheter par catégorie</h2>
        <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl"
            >
              <Image
                src={cat.image}
                alt={cat.label}
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <span className="absolute bottom-4 left-4 text-lg font-bold text-white">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* New arrivals */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-neutral-900">Nouveautés</h2>
          <Link href="/products" className="text-sm font-semibold text-klk-crimson hover:underline">
            Voir tout
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      {/* Best sellers */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-neutral-900">Meilleures ventes</h2>
          <Link href="/products" className="text-sm font-semibold text-klk-crimson hover:underline">
            Voir tout
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {bestSellers.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
