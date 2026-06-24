import Link from "next/link";

export interface Crumb {
  label: string;
  href?: string;
}

interface Props {
  title: string;
  subtitle?: string;
  crumbs: Crumb[];
}

export default function PageHero({ title, subtitle, crumbs }: Props) {
  return (
    <div className="bg-[var(--color-surface-container-low)] border-b border-[var(--color-border-subtle)]">
      <div
        style={{ maxWidth: "var(--spacing-max-width)" }}
        className="mx-auto px-[var(--spacing-lg)] py-8"
      >
        {/* Breadcrumbs */}
        <nav aria-label="Fil d'Ariane" className="mb-3">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--color-on-surface-variant)]">
            <li>
              <Link href="/accueil" className="hover:text-[var(--color-primary)] transition-colors">
                Accueil
              </Link>
            </li>
            {crumbs.map((crumb, i) => (
              <li key={crumb.href ?? crumb.label} className="flex items-center gap-1.5">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M9 18l6-6-6-6" />
                </svg>
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-[var(--color-primary)] transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span
                    className="text-[var(--color-on-surface)] font-medium"
                    {...(i === crumbs.length - 1 ? { "aria-current": "page" as const } : {})}
                  >
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Title */}
        <h1 className="text-2xl font-bold text-[var(--color-on-background)] tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-sm text-[var(--color-on-surface-variant)]">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
