export type Category =
  | "maillots"
  | "montres-luxe"
  | "montres-personnalisables"
  | "bijoux"
  | "parfums";

export const CATEGORY_LABELS: Record<Category, string> = {
  maillots: "Maillots de football",
  "montres-luxe": "Montres de luxe",
  "montres-personnalisables": "Montres personnalisables",
  bijoux: "Bijoux",
  parfums: "Parfums",
};

export type Product = {
  id: string;
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

export function formatPrice(amount: number) {
  return new Intl.NumberFormat("fr-FR").format(amount) + " FCFA";
}
