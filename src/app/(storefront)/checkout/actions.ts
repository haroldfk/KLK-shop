"use server";

import { createOrder } from "@/lib/orders";
import type { CartItem } from "@/lib/cart-types";

export type CheckoutState = {
  error?: string;
  orderId?: string;
};

export async function placeOrderAction(
  items: CartItem[],
  totalPrice: number,
  _prevState: CheckoutState | undefined,
  formData: FormData
): Promise<CheckoutState> {
  const customerName = String(formData.get("customerName") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const address = String(formData.get("address") ?? "").trim();
  const note = String(formData.get("note") ?? "").trim();

  if (!customerName || !phone || !city || !address) {
    return { error: "Merci de remplir tous les champs obligatoires." };
  }

  if (items.length === 0) {
    return { error: "Ton panier est vide." };
  }

  const order = await createOrder({
    customerName,
    phone,
    city,
    address,
    note: note || undefined,
    items,
    totalPrice,
  });

  return { orderId: order.id };
}
