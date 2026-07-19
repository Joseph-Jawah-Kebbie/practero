import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <header className="flex flex-col gap-5 border-b border-stone-200 pb-7 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#35715a]">
          {eyebrow}
        </p>
        <h1 className="text-balance text-3xl font-semibold tracking-[-0.035em] text-[#14231d] sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-stone-600">{description}</p>
      </div>
      {actions && <div className="shrink-0">{actions}</div>}
    </header>
  );
}
