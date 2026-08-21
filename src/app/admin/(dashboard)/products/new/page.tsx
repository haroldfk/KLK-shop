import ProductForm from "../../ProductForm";
import { createProductAction } from "../../../actions";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="text-2xl font-extrabold text-neutral-900">Ajouter un produit</h1>
      <ProductForm action={createProductAction} />
    </div>
  );
}
