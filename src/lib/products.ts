import "server-only";
import { prisma } from "@/lib/prisma";
import type { ProductModel as DbProduct } from "@/generated/prisma/models";
import type { Category, Product } from "@/lib/product-types";

export type { Category, Product } from "@/lib/product-types";
export { formatPrice } from "@/lib/product-types";

function toProduct(row: DbProduct): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    brand: row.brand,
    category: row.category as Category,
    price: row.price,
    compareAtPrice: row.compareAtPrice ?? undefined,
    colors: JSON.parse(row.colors) as string[],
    sizes: JSON.parse(row.sizes) as string[],
    description: row.description,
    image: row.image,
    isNew: row.isNew,
    isCustomizable: row.isCustomizable,
  };
}

export async function getAllProducts(): Promise<Product[]> {
  const rows = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
  return rows.map(toProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const row = await prisma.product.findUnique({ where: { slug } });
  return row ? toProduct(row) : null;
}

export async function getProductById(id: string): Promise<Product | null> {
  const row = await prisma.product.findUnique({ where: { id } });
  return row ? toProduct(row) : null;
}

export async function getBrands(): Promise<string[]> {
  const rows = await prisma.product.findMany({
    select: { brand: true },
    distinct: ["brand"],
    orderBy: { brand: "asc" },
  });
  return rows.map((r) => r.brand);
}

export type ProductInput = {
  slug: string;
  name: string;
  brand: string;
  category: Category;
  price: number;
  compareAtPrice?: number | null;
  colors: string[];
  sizes: string[];
  description: string;
  image: string;
  isNew: boolean;
  isCustomizable: boolean;
};

export async function createProduct(data: ProductInput) {
  return prisma.product.create({
    data: {
      ...data,
      compareAtPrice: data.compareAtPrice ?? null,
      colors: JSON.stringify(data.colors),
      sizes: JSON.stringify(data.sizes),
    },
  });
}

export async function updateProduct(id: string, data: ProductInput) {
  return prisma.product.update({
    where: { id },
    data: {
      ...data,
      compareAtPrice: data.compareAtPrice ?? null,
      colors: JSON.stringify(data.colors),
      sizes: JSON.stringify(data.sizes),
    },
  });
}

export async function deleteProduct(id: string) {
  return prisma.product.delete({ where: { id } });
}
