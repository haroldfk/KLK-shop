import { notFound } from "next/navigation";
import { getProductBySlug, getAllProducts } from "@/lib/products";
import ProductDetailClient from "./ProductDetailClient";

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return <ProductDetailClient product={product} />;
}
