import "server-only";
import { prisma } from "@/lib/prisma";
import type { Order as DbOrder } from "@/generated/prisma/models";
import type { CartItem } from "@/lib/cart-types";

export type Order = {
  id: string;
  customerName: string;
  phone: string;
  city: string;
  address: string;
  note?: string | null;
  items: CartItem[];
  totalPrice: number;
  status: string;
  createdAt: Date;
};

function toOrder(row: DbOrder): Order {
  return {
    id: row.id,
    customerName: row.customerName,
    phone: row.phone,
    city: row.city,
    address: row.address,
    note: row.note ?? undefined,
    items: JSON.parse(row.items) as CartItem[],
    totalPrice: row.totalPrice,
    status: row.status,
    createdAt: row.createdAt,
  };
}

export type CreateOrderInput = {
  customerName: string;
  phone: string;
  city: string;
  address: string;
  note?: string;
  items: CartItem[];
  totalPrice: number;
};

export async function createOrder(data: CreateOrderInput) {
  return prisma.order.create({
    data: {
      customerName: data.customerName,
      phone: data.phone,
      city: data.city,
      address: data.address,
      note: data.note || null,
      items: JSON.stringify(data.items),
      totalPrice: data.totalPrice,
    },
  });
}

export async function getAllOrders(): Promise<Order[]> {
  const rows = await prisma.order.findMany({ orderBy: { createdAt: "desc" } });
  return rows.map(toOrder);
}

export async function getOrderById(id: string): Promise<Order | null> {
  const row = await prisma.order.findUnique({ where: { id } });
  return row ? toOrder(row) : null;
}

export async function updateOrderStatus(id: string, status: string) {
  return prisma.order.update({ where: { id }, data: { status } });
}
