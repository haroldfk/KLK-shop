"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { CATEGORY_LABELS, type Category, type Product } from "@/lib/product-types";

const CATEGORIES: { label: string; value: Category | "tout" }[] = [
  { label: "Tout", value: "tout" },
  ...(Object.entries(CATEGORY_LABELS) as [Category, string][]).map(([value, label]) => ({
    label,
    value,
  })),
];

const VALID_CATEGORIES = Object.keys(CATEGORY_LABELS);

export default function ProductsClient({
  products,
  brands,
}: {
  products: Product[];
  brands: string[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categoryParam = searchParams.get("category");
  const category: Category | "tout" = VALID_CATEGORIES.includes(categoryParam ?? "")
    ? (categoryParam as Category)
    : "tout";

  const [brand, setBrand] = useState<string>("Toutes");

  const selectCategory = (value: Category | "tout") => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "tout") {
      params.delete("category");
    } else {
      params.set("category", value);
    }
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (category !== "tout" && p.category !== category) return false;
      if (brand !== "Toutes" && p.brand !== brand) return false;
      return true;
    });
  }, [products, category, brand]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-neutral-900">Boutique</h1>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        {CATEGORIES.map((c) => (
          <button
            key={c.value}
            onClick={() => selectCategory(c.value)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              category === c.value
                ? "klk-gradient-bg text-white"
                : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
            }`}
          >
            {c.label}
          </button>
        ))}

        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="ml-auto rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700"
        >
          <option value="Toutes">Toutes les marques</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <p className="mt-4 text-sm text-neutral-500">{filtered.length} produits</p>

      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-neutral-500">
          Aucun produit ne correspond à ces filtres.
        </p>
      )}
    </div>
  );
}
