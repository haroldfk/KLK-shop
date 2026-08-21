"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatPrice, type Product } from "@/lib/product-types";
import { useCart } from "@/lib/cart-context";

export default function ProductDetailClient({ product }: { product: Product }) {
  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState<string | null>(null);
  const [customization, setCustomization] = useState("");
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    if (!size) return;
    addItem({
      slug: product.slug,
      name: product.name,
      brand: product.brand,
      image: product.image,
      price: product.price,
      size,
      color,
      quantity: 1,
      customization: product.isCustomizable && customization.trim() ? customization.trim() : undefined,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-klk-cream">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        </div>

        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
            {product.brand}
          </p>
          <h1 className="mt-1 text-3xl font-extrabold text-neutral-900">{product.name}</h1>
          <div className="mt-3 flex items-center gap-3">
            <span className="text-xl font-bold text-neutral-900">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-base text-neutral-400 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          <p className="mt-6 leading-relaxed text-neutral-600">{product.description}</p>

          <div className="mt-8">
            <h3 className="text-sm font-semibold text-neutral-900">Couleur</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    color === c
                      ? "border-klk-crimson bg-klk-crimson/10 text-klk-crimson"
                      : "border-neutral-300 text-neutral-700 hover:border-neutral-400"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold text-neutral-900">Taille</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`min-w-12 rounded-lg border px-3 py-2 text-sm font-medium transition ${
                    size === s
                      ? "border-klk-crimson bg-klk-crimson/10 text-klk-crimson"
                      : "border-neutral-300 text-neutral-700 hover:border-neutral-400"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            {!size && (
              <p className="mt-2 text-xs text-neutral-400">Sélectionne une taille</p>
            )}
          </div>

          {product.isCustomizable && (
            <div className="mt-6 rounded-xl bg-klk-cream p-4">
              <h3 className="text-sm font-semibold text-neutral-900">
                Personnalisation (gravure / texte)
              </h3>
              <p className="mt-1 text-xs text-neutral-500">
                Précise le texte, les initiales ou le message à graver (optionnel).
              </p>
              <input
                type="text"
                value={customization}
                onChange={(e) => setCustomization(e.target.value)}
                maxLength={60}
                placeholder="Ex : H.F. — 21.08.26"
                className="mt-2 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-klk-crimson"
              />
            </div>
          )}

          <button
            onClick={handleAddToCart}
            disabled={!size}
            className="mt-8 w-full rounded-full klk-gradient-bg py-4 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {added ? "Ajouté au panier ✓" : "Ajouter au panier"}
          </button>

          {added && (
            <button
              onClick={() => router.push("/cart")}
              className="mt-3 w-full rounded-full border border-neutral-300 py-3 text-sm font-semibold text-neutral-700 hover:bg-neutral-50"
            >
              Voir le panier
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
