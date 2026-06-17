import type { ReactNode } from "react";

export function PageHeader({ eyebrow, title, description, children }: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-surface/40">
      <div className="starfield absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-4 py-14">
        {eyebrow && <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</div>}
        <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">{title}</h1>
        {description && <p className="mt-3 max-w-2xl text-base text-muted-foreground">{description}</p>}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}
