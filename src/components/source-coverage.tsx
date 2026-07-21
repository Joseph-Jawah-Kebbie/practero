import { getSourceCoverage } from "@/domain/policies";
import type { EvidenceReference } from "@/domain/types";
import { categoryShortLabels } from "@/lib/format";

const categories = [
  "organizational_intent",
  "field_reality",
  "technical_reality",
] as const;

export function SourceCoverage({ references }: { references: readonly EvidenceReference[] }) {
  const coverage = getSourceCoverage(references);

  return (
    <div className="flex flex-wrap gap-2" aria-label="Evidence category coverage">
      {categories.map((category) => (
        <span
          key={category}
          className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs font-medium ${
            coverage[category]
              ? "border-[#b8d2c7] bg-[#edf6f1] text-[#225440]"
              : "border-stone-200 bg-stone-50 text-stone-400"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${coverage[category] ? "bg-[#2e7a5b]" : "bg-stone-300"}`}
          />
          {categoryShortLabels[category]}
        </span>
      ))}
    </div>
  );
}
