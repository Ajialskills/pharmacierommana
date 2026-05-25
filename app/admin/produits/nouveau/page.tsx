import { getCategories } from "@/app/actions/categories";
import { getBrands } from "@/app/actions/brands";
import ProductForm from "@/components/admin/ProductForm";

export default async function NouveauProduitPage() {
  const [categories, brands] = await Promise.all([getCategories(), getBrands()]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-xl font-bold text-[var(--color-on-surface)]">Nouveau produit</h1>
        <p className="text-sm text-[var(--color-on-surface-variant)] mt-0.5">Remplissez les informations ci-dessous</p>
      </div>
      <ProductForm categories={categories} brands={brands} />
    </div>
  );
}
