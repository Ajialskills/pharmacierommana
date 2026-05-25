import { getBrands } from "@/app/actions/brands";
import BrandsManager from "@/components/admin/BrandsManager";

export default async function AdminMarquesPage() {
  const brands = await getBrands();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-xl font-bold text-[var(--color-on-surface)]">Marques</h1>
        <p className="text-sm text-[var(--color-on-surface-variant)] mt-0.5">{brands.length} marque{brands.length !== 1 ? "s" : ""}</p>
      </div>
      <BrandsManager brands={brands} />
    </div>
  );
}
