import { Suspense } from "react";
import ProductsClient from "./ProductsClient";
import { getAllProducts, getBrands } from "@/lib/products";

export default async function ProductsPage() {
  const [products, brands] = await Promise.all([getAllProducts(), getBrands()]);

  return (
    <Suspense>
      <ProductsClient products={products} brands={brands} />
    </Suspense>
  );
}
