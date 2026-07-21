import type {
  EvidenceCategory,
  EvidenceStrength,
  GapSeverity,
} from "@/domain/types";
import {
  categoryLabels,
  humanize,
  severityLabels,
} from "@/lib/format";

const severityStyles: Record<GapSeverity, string> = {
  critical: "border-red-200 bg-red-50 text-red-800",
  high: "border-amber-200 bg-amber-50 text-amber-800",
  medium: "border-sky-200 bg-sky-50 text-sky-800",
  low: "border-slate-200 bg-slate-50 text-slate-700",
};

const categoryStyles: Record<EvidenceCategory, string> = {
  organizational_intent: "border-violet-200 bg-violet-50 text-violet-800",
  field_reality: "border-orange-200 bg-orange-50 text-orange-800",
  technical_reality: "border-teal-200 bg-teal-50 text-teal-800",
};

export function SeverityBadge({ severity }: { severity: GapSeverity }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${severityStyles[severity]}`}
    >
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
      {severityLabels[severity]}
    </span>
  );
}

export function CategoryBadge({ category }: { category: EvidenceCategory }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${categoryStyles[category]}`}
    >
      {categoryLabels[category]}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-stone-200 bg-white px-2.5 py-1 text-xs font-semibold text-stone-600">
      {humanize(status)}
    </span>
  );
}

export function EvidenceStrengthBadge({ strength }: { strength: EvidenceStrength }) {
  const style =
    strength === "strong"
      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
      : strength === "moderate"
        ? "border-blue-200 bg-blue-50 text-blue-800"
        : "border-stone-200 bg-stone-50 text-stone-700";

  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${style}`}>
      {humanize(strength)} evidence
    </span>
  );
}
