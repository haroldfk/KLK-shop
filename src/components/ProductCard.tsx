import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Product } from "@/lib/product-types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-klk-cream">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
        {product.isNew && (
          <span className="absolute left-3 top-3 rounded-full klk-gradient-bg px-2.5 py-1 text-xs font-bold text-white">
            Nouveau
          </span>
        )}
        {product.compareAtPrice && (
          <span className="absolute right-3 top-3 rounded-full bg-klk-maroon px-2.5 py-1 text-xs font-bold text-white">
            Promo
          </span>
        )}
      </div>
      <div className="mt-3">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
          {product.brand}
        </p>
        <h3 className="text-sm font-semibold text-neutral-900">{product.name}</h3>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-sm font-bold text-neutral-900">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-xs text-neutral-400 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
