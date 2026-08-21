import Link from "next/link";
import { notFound } from "next/navigation";
import { getOrderById } from "@/lib/orders";
import { formatPrice } from "@/lib/product-types";

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order: orderId } = await searchParams;
  if (!orderId) notFound();

  const order = await getOrderById(orderId);
  if (!order) notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full klk-gradient-bg">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 13l4 4L19 7"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <h1 className="mt-6 text-2xl font-extrabold text-neutral-900">
        Commande reçue !
      </h1>
      <p className="mt-2 text-neutral-600">
        Merci {order.customerName}, on te contacte très vite au{" "}
        <strong>{order.phone}</strong> pour confirmer et organiser la livraison à{" "}
        {order.city}.
      </p>

      <div className="mt-8 rounded-2xl bg-klk-cream p-6 text-left">
        <p className="text-xs uppercase tracking-wide text-neutral-500">
          Référence de commande
        </p>
        <p className="font-mono text-sm font-semibold text-neutral-900">{order.id}</p>

        <ul className="mt-4 space-y-2 border-t border-neutral-300 pt-4">
          {order.items.map((item) => (
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
          <span>{formatPrice(order.totalPrice)}</span>
        </div>
      </div>

      <Link
        href="/products"
        className="mt-8 inline-block rounded-full klk-gradient-bg px-8 py-3 text-sm font-bold uppercase tracking-wide text-white"
      >
        Continuer mes achats
      </Link>
    </div>
  );
}
