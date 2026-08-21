import Image from "next/image";
import Link from "next/link";
import { getAllProducts } from "@/lib/products";
import { CATEGORY_LABELS, formatPrice } from "@/lib/product-types";
import DeleteProductButton from "./DeleteProductButton";

export default async function AdminProductsPage() {
  const products = await getAllProducts();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-neutral-900">Produits</h1>
        <Link
          href="/admin/products/new"
          className="rounded-full klk-gradient-bg px-5 py-2.5 text-sm font-bold text-white"
        >
          + Ajouter un produit
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-neutral-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 text-xs uppercase text-neutral-500">
            <tr>
              <th className="px-4 py-3">Produit</th>
              <th className="px-4 py-3">Marque</th>
              <th className="px-4 py-3">Catégorie</th>
              <th className="px-4 py-3">Prix</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {products.map((p) => (
              <tr key={p.id}>
                <td className="flex items-center gap-3 px-4 py-3">
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-klk-cream">
                    <Image src={p.image} alt={p.name} fill className="object-cover" />
                  </div>
                  <span className="font-medium text-neutral-900">{p.name}</span>
                  {p.isNew && (
                    <span className="rounded-full klk-gradient-bg px-2 py-0.5 text-[10px] font-bold text-white">
                      NEW
                    </span>
                  )}
                  {p.isCustomizable && (
                    <span className="rounded-full bg-neutral-200 px-2 py-0.5 text-[10px] font-bold text-neutral-700">
                      PERSO
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-neutral-600">{p.brand}</td>
                <td className="px-4 py-3 text-neutral-600">{CATEGORY_LABELS[p.category]}</td>
                <td className="px-4 py-3 font-medium text-neutral-900">
                  {formatPrice(p.price)}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-3">
                    <Link
                      href={`/admin/products/${p.id}/edit`}
                      className="font-medium text-klk-crimson hover:underline"
                    >
                      Modifier
                    </Link>
                    <DeleteProductButton id={p.id} name={p.name} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <p className="p-8 text-center text-sm text-neutral-500">
            Aucun produit pour l&apos;instant.
          </p>
        )}
      </div>
    </div>
  );
}
