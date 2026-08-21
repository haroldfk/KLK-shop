"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/product-types";
import { placeOrderAction } from "./actions";

export default function CheckoutClient() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();

  const boundAction = placeOrderAction.bind(null, items, totalPrice);
  const [state, formAction, pending] = useActionState(boundAction, undefined);

  useEffect(() => {
    if (state?.orderId) {
      clearCart();
      router.push(`/checkout/confirmation?order=${state.orderId}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.orderId]);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <h1 className="text-2xl font-bold text-neutral-900">Ton panier est vide</h1>
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
      <h1 className="text-3xl font-extrabold text-neutral-900">Finaliser la commande</h1>
      <p className="mt-1 text-sm text-neutral-500">
        Pas de paiement en ligne pour l&apos;instant — on te contacte pour confirmer et
        organiser la livraison / le paiement.
      </p>

      <div className="mt-8 grid gap-10 lg:grid-cols-3">
        <form action={formAction} className="space-y-4 lg:col-span-2">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Nom complet" name="customerName" required />
            <Field label="Téléphone" name="phone" type="tel" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Ville" name="city" required />
            <Field label="Adresse" name="address" required />
          </div>
          <div>
            <label className="text-sm font-medium text-neutral-700">
              Note (optionnel)
            </label>
            <textarea
              name="note"
              rows={3}
              className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-klk-crimson"
              placeholder="Précisions sur la livraison, horaires, etc."
            />
          </div>

          {state?.error && (
            <p className="text-sm font-medium text-red-600">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-full klk-gradient-bg py-4 text-sm font-bold uppercase tracking-wide text-white disabled:opacity-60"
          >
            {pending ? "Envoi..." : "Confirmer la commande"}
          </button>
        </form>

        <div className="h-fit rounded-2xl bg-klk-cream p-6">
          <h2 className="text-lg font-bold text-neutral-900">Résumé</h2>
          <ul className="mt-4 space-y-3">
            {items.map((item) => (
              <li
                key={`${item.slug}-${item.size}-${item.color}-${item.customization ?? ""}`}
                className="flex justify-between text-sm"
              >
                <span className="text-neutral-600">
                  {item.name} ({item.color}, {item.size}) × {item.quantity}
                  {item.customization && (
                    <span className="block text-xs italic">
                      Gravure : « {item.customization} »
                    </span>
                  )}
                </span>
                <span className="font-medium text-neutral-900">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-neutral-300 pt-4 text-base font-bold text-neutral-900">
            <span>Total</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-neutral-700">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-klk-crimson"
      />
    </div>
  );
}
