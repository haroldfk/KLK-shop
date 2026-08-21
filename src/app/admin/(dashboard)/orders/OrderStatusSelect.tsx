"use client";

import { useTransition } from "react";
import { ORDER_STATUSES } from "@/lib/order-types";
import { updateOrderStatusAction } from "../../actions";

const STATUS_STYLES: Record<string, string> = {
  "En attente": "bg-yellow-100 text-yellow-800",
  "Confirmée": "bg-blue-100 text-blue-800",
  "Livrée": "bg-green-100 text-green-800",
  "Annulée": "bg-red-100 text-red-800",
};

export default function OrderStatusSelect({
  orderId,
  status,
}: {
  orderId: string;
  status: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      value={status}
      disabled={pending}
      onChange={(e) => {
        const newStatus = e.target.value;
        startTransition(() => {
          updateOrderStatusAction(orderId, newStatus);
        });
      }}
      className={`rounded-full border-0 px-3 py-1.5 text-xs font-semibold outline-none disabled:opacity-50 ${
        STATUS_STYLES[status] ?? "bg-neutral-100 text-neutral-700"
      }`}
    >
      {ORDER_STATUSES.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
