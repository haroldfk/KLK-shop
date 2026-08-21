"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/product-types";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <h1 className="text-2xl font-bold text-neutral-900">Ton panier est vide</h1>
        <p className="mt-2 text-neutral-500">Explore la boutique pour trouver ton bonheur.</p>
        <Link
          href="/products"
          className="mt-6 inline-block rounded-full klk-gradient-bg px-8 py-3 text-sm font-bold uppercase tracking-wide text-white"
        >
          Voir la boutique
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-neutral-900">Mon panier</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {items.map((item) => (
            <div
              key={`${item.slug}-${item.size}-${item.color}-${item.customization ?? ""}`}
              className="flex gap-4 border-b border-neutral-200 pb-6"
            >
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-klk-cream">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-neutral-500">
                    {item.brand}
                  </p>
                  <Link
                    href={`/products/${item.slug}`}
                    className="font-semibold text-neutral-900 hover:underline"
                  >
                    {item.name}
                  </Link>
                  <p className="text-sm text-neutral-500">
                    Couleur : {item.color} · Taille : {item.size}
                  </p>
                  {item.customization && (
                    <p className="text-sm italic text-neutral-500">
                      Gravure : « {item.customization} »
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.slug,
                          item.size,
                          item.color,
                          item.quantity - 1,
                          item.customization
                        )
                      }
                      className="h-7 w-7 rounded-full border border-neutral-300 text-sm font-bold hover:bg-neutral-100"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.slug,
                          item.size,
                          item.color,
                          item.quantity + 1,
                          item.customization
                        )
                      }
                      className="h-7 w-7 rounded-full border border-neutral-300 text-sm font-bold hover:bg-neutral-100"
                    >
                      +
                    </button>
                  </div>
                  <span className="font-bold text-neutral-900">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              </div>
              <button
                onClick={() =>
                  removeItem(item.slug, item.size, item.color, item.customization)
                }
                aria-label="Retirer"
                className="self-start text-neutral-400 hover:text-klk-crimson"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <div className="h-fit rounded-2xl bg-klk-cream p-6">
          <h2 className="text-lg font-bold text-neutral-900">Récapitulatif</h2>
          <div className="mt-4 flex justify-between text-sm text-neutral-600">
            <span>Sous-total</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <div className="mt-2 flex justify-between text-sm text-neutral-600">
            <span>Livraison</span>
            <span>Organisée après confirmation</span>
          </div>
          <div className="mt-4 flex justify-between border-t border-neutral-300 pt-4 text-base font-bold text-neutral-900">
            <span>Total</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <Link
            href="/checkout"
            className="mt-6 block w-full rounded-full klk-gradient-bg py-4 text-center text-sm font-bold uppercase tracking-wide text-white hover:opacity-90"
          >
            Passer la commande
          </Link>
        </div>
      </div>
    </div>
  );
}
