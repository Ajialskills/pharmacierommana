import Link from "next/link";
import { getProducts } from "@/app/actions/products";
import { getCategories } from "@/app/actions/categories";
import { getBrands } from "@/app/actions/brands";
import ProductsTable from "@/components/admin/ProductsTable";

export default async function AdminProduitsPage() {
  const [products, categories, brands] = await Promise.all([
    getProducts(),
    getCategories(),
    getBrands(),
  ]);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-bold text-[var(--color-on-surface)]">Produits</h1>
          <p className="text-sm text-[var(--color-on-surface-variant)] mt-0.5">{products.length} produits</p>
        </div>
        <Link
          href="/admin/produits/nouveau"
          className="bg-[var(--color-primary)] text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity"
        >
          + Nouveau produit
        </Link>
      </div>
      <ProductsTable products={products} categories={categories} brands={brands} />
    </div>
  );
}
