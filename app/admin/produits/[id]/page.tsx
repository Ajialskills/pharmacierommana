import { notFound } from "next/navigation";
import { getCategories } from "@/app/actions/categories";
import { getBrands } from "@/app/actions/brands";
import { getProductById } from "@/app/actions/products";
import ProductForm from "@/components/admin/ProductForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditProduitPage({ params }: Props) {
  const { id } = await params;
  const [product, categories, brands] = await Promise.all([
    getProductById(id),
    getCategories(),
    getBrands(),
  ]);

  if (!product) notFound();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-xl font-bold text-[var(--color-on-surface)]">Modifier le produit</h1>
        <p className="text-sm text-[var(--color-on-surface-variant)] mt-0.5 font-mono">{product.slug}</p>
      </div>
      <ProductForm product={product} categories={categories} brands={brands} />
    </div>
  );
}
