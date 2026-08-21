"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSession, destroySession, getSession } from "@/lib/auth";
import {
  createProduct,
  deleteProduct,
  updateProduct,
  type ProductInput,
} from "@/lib/products";
import type { Category } from "@/lib/product-types";
import { updateOrderStatus } from "@/lib/orders";

export async function loginAction(
  _prevState: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string }> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin) {
    return { error: "Identifiants incorrects." };
  }

  const valid = await bcrypt.compare(password, admin.passwordHash);
  if (!valid) {
    return { error: "Identifiants incorrects." };
  }

  await createSession({ adminId: admin.id, email: admin.email, name: admin.name });
  redirect("/admin");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}

function readProductInput(formData: FormData): ProductInput {
  const colors = String(formData.get("colors") ?? "")
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);
  const sizes = String(formData.get("sizes") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const compareAtPriceRaw = String(formData.get("compareAtPrice") ?? "").trim();

  return {
    slug: String(formData.get("slug") ?? "").trim(),
    name: String(formData.get("name") ?? "").trim(),
    brand: String(formData.get("brand") ?? "").trim(),
    category: String(formData.get("category") ?? "maillots") as Category,
    price: Number(formData.get("price") ?? 0),
    compareAtPrice: compareAtPriceRaw ? Number(compareAtPriceRaw) : null,
    colors,
    sizes,
    description: String(formData.get("description") ?? "").trim(),
    image: String(formData.get("image") ?? "").trim(),
    isCustomizable: formData.get("isCustomizable") === "on",
    isNew: formData.get("isNew") === "on",
  };
}

export async function createProductAction(
  _prevState: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string }> {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const data = readProductInput(formData);

  if (!data.slug || !data.name || !data.brand || !data.image) {
    return { error: "Merci de remplir tous les champs obligatoires." };
  }

  try {
    await createProduct(data);
  } catch {
    return { error: "Ce slug existe déjà, choisis-en un autre." };
  }

  revalidatePath("/admin");
  revalidatePath("/products");
  revalidatePath("/");
  redirect("/admin");
}

export async function updateProductAction(
  id: string,
  _prevState: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string }> {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const data = readProductInput(formData);

  if (!data.slug || !data.name || !data.brand || !data.image) {
    return { error: "Merci de remplir tous les champs obligatoires." };
  }

  try {
    await updateProduct(id, data);
  } catch {
    return { error: "Ce slug est déjà utilisé par un autre produit." };
  }

  revalidatePath("/admin");
  revalidatePath("/products");
  revalidatePath(`/products/${data.slug}`);
  revalidatePath("/");
  redirect("/admin");
}

export async function deleteProductAction(id: string) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  await deleteProduct(id);
  revalidatePath("/admin");
  revalidatePath("/products");
  revalidatePath("/");
}

export async function createAdminAction(
  _prevState: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string }> {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!name || !email || password.length < 8) {
    return { error: "Nom, email requis, et mot de passe d'au moins 8 caractères." };
  }

  const existing = await prisma.admin.findUnique({ where: { email } });
  if (existing) {
    return { error: "Un admin avec cet email existe déjà." };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.admin.create({ data: { name, email, passwordHash } });

  revalidatePath("/admin/admins");
  redirect("/admin/admins");
}

export async function deleteAdminAction(id: string) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  if (session.adminId === id) {
    return;
  }

  const count = await prisma.admin.count();
  if (count <= 1) return;

  await prisma.admin.delete({ where: { id } });
  revalidatePath("/admin/admins");
}

export async function updateOrderStatusAction(id: string, status: string) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  await updateOrderStatus(id, status);
  revalidatePath("/admin/orders");
}
