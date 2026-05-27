import AdminLoginForm from "@/components/admin/AdminLoginForm";
import Image from "next/image";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background-soft)] px-4">
      <div className="w-full max-w-[512px]">
        <div className="bg-white rounded-2xl border border-[var(--color-border-subtle)] p-12 shadow-sm">
          <div className="flex justify-center mb-8">
            <Image
              src="/Logo Rommana.png"
              alt="Pharmacie Rommana"
              width={160}
              height={64}
              className="h-14 w-auto object-contain"
            />
          </div>
          <h1 className="text-center font-bold text-[var(--color-on-surface)] mb-1 text-lg">
            Accès Administration
          </h1>
          <p className="text-center text-sm text-[var(--color-on-surface-variant)] mb-8">
            Connectez-vous pour gérer la boutique
          </p>
          <AdminLoginForm />
        </div>
      </div>
    </div>
  );
}
