import { getAllOrders } from "@/lib/orders";
import { formatPrice } from "@/lib/product-types";
import OrderStatusSelect from "./OrderStatusSelect";

export default async function AdminOrdersPage() {
  const orders = await getAllOrders();

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-neutral-900">Commandes</h1>
      <p className="mt-1 text-sm text-neutral-500">
        Les commandes passées par les clients depuis le site.
      </p>

      <div className="mt-6 space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="rounded-xl border border-neutral-200 p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-mono text-xs text-neutral-400">{order.id}</p>
                <p className="mt-1 font-semibold text-neutral-900">
                  {order.customerName} · {order.phone}
                </p>
                <p className="text-sm text-neutral-600">
                  {order.address}, {order.city}
                </p>
                {order.note && (
                  <p className="mt-1 text-sm italic text-neutral-500">
                    Note : {order.note}
                  </p>
                )}
                <p className="mt-1 text-xs text-neutral-400">
                  {new Intl.DateTimeFormat("fr-FR", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(order.createdAt)}
                </p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span className="font-bold text-neutral-900">
                  {formatPrice(order.totalPrice)}
                </span>
                <OrderStatusSelect orderId={order.id} status={order.status} />
              </div>
            </div>

            <ul className="mt-4 space-y-1 border-t border-neutral-100 pt-3">
              {order.items.map((item) => (
                <li
                  key={`${item.slug}-${item.size}-${item.color}-${item.customization ?? ""}`}
                  className="flex justify-between text-sm text-neutral-600"
                >
                  <span>
                    {item.name} ({item.color}, {item.size}) × {item.quantity}
                    {item.customization && (
                      <span className="block text-xs italic">
                        Gravure : « {item.customization} »
                      </span>
                    )}
                  </span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {orders.length === 0 && (
          <p className="p-8 text-center text-sm text-neutral-500">
            Aucune commande pour l&apos;instant.
          </p>
        )}
      </div>
    </div>
  );
}
