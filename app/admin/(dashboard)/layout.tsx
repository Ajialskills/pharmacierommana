export const dynamic = "force-dynamic";

import AdminSidebar from "@/components/admin/AdminSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-[var(--color-background-soft)]">
      <AdminSidebar />
      <main className="flex-1 min-w-0 p-8">{children}</main>
    </div>
  );
}
