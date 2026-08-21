import { notFound } from "next/navigation";
import { getProductById } from "@/lib/products";
import ProductForm from "../../../ProductForm";
import { updateProductAction } from "../../../../actions";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) notFound();

  const boundAction = updateProductAction.bind(null, id);

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-neutral-900">
        Modifier « {product.name} »
      </h1>
      <ProductForm action={boundAction} initial={product} />
    </div>
  );
}
