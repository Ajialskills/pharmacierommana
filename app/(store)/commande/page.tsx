import CommandeClient from "./CommandeClient";

export default function CommandePage() {
  return (
    <div style={{ maxWidth: "var(--spacing-max-width)" }} className="mx-auto px-[var(--spacing-lg)] py-10">
      <h1 className="text-xl font-bold text-[var(--color-on-surface)] mb-8">Finaliser la commande</h1>
      <CommandeClient />
    </div>
  );
}
