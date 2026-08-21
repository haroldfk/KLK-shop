"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem } from "@/lib/cart-types";

export type { CartItem } from "@/lib/cart-types";

type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (slug: string, size: string, color: string, customization?: string) => void;
  updateQuantity: (
    slug: string,
    size: string,
    color: string,
    quantity: number,
    customization?: string
  ) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);
const STORAGE_KEY = "klk-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {
      // ignore corrupted storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, hydrated]);

  const addItem = (newItem: CartItem) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) =>
          i.slug === newItem.slug &&
          i.size === newItem.size &&
          i.color === newItem.color &&
          i.customization === newItem.customization
      );
      if (existing) {
        return prev.map((i) =>
          i === existing ? { ...i, quantity: i.quantity + newItem.quantity } : i
        );
      }
      return [...prev, newItem];
    });
  };

  const removeItem = (slug: string, size: string, color: string, customization?: string) => {
    setItems((prev) =>
      prev.filter(
        (i) =>
          !(
            i.slug === slug &&
            i.size === size &&
            i.color === color &&
            i.customization === customization
          )
      )
    );
  };

  const updateQuantity = (
    slug: string,
    size: string,
    color: string,
    quantity: number,
    customization?: string
  ) => {
    if (quantity < 1) {
      removeItem(slug, size, color, customization);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.slug === slug &&
        i.size === size &&
        i.color === color &&
        i.customization === customization
          ? { ...i, quantity }
          : i
      )
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const totalPrice = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
