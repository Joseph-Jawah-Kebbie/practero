import type {
  EvidenceCategory,
  GapSeverity,
} from "@/domain/types";

export const categoryLabels: Record<EvidenceCategory, string> = {
  organizational_intent: "Organizational intent",
  field_reality: "Field reality",
  technical_reality: "Technical reality",
};

export const categoryShortLabels: Record<EvidenceCategory, string> = {
  organizational_intent: "Intent",
  field_reality: "Field",
  technical_reality: "Technical",
};

export const severityLabels: Record<GapSeverity, string> = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",
};

export function humanize(value: string): string {
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

export function formatConfidence(value: number): string {
  return `${Math.round(value * 100)}%`;
}
