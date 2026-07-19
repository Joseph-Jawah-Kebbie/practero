import type {
  EvidenceCategory,
  EvidenceReference,
  EvidenceSource,
  EvidenceStrength,
  GapSeverity,
  RealityGap,
  SeverityInputs,
} from "@/domain/types";

const severityRank: Record<GapSeverity, number> = {
  critical: 4,
  high: 3,
  medium: 2,
  low: 1,
};

const evidenceStrengthRank: Record<EvidenceStrength, number> = {
  strong: 3,
  moderate: 2,
  limited: 1,
};

const readinessPenalty: Record<GapSeverity, number> = {
  critical: 25,
  high: 12,
  medium: 5,
  low: 2,
};

export function validateEvidenceReference(
  reference: EvidenceReference,
  sources: readonly EvidenceSource[],
): { valid: boolean; reason?: string } {
  const source = sources.find((candidate) => candidate.id === reference.sourceId);
  if (!source) return { valid: false, reason: "Source does not exist." };
  if (source.title !== reference.sourceTitle) {
    return { valid: false, reason: "Source title does not match." };
  }
  if (source.category !== reference.sourceCategory) {
    return { valid: false, reason: "Source category does not match." };
  }

  const chunk = source.chunks.find((candidate) => candidate.id === reference.chunkId);
  if (!chunk) return { valid: false, reason: "Chunk does not exist in the source." };
  if (chunk.contentHash !== reference.contentHash) {
    return { valid: false, reason: "Chunk content identifier does not match." };
  }
  if (
    reference.startOffset < 0 ||
    reference.endOffset > chunk.text.length ||
    reference.startOffset >= reference.endOffset
  ) {
    return { valid: false, reason: "Reference offsets are outside the chunk." };
  }
  if (chunk.text.slice(reference.startOffset, reference.endOffset) !== reference.excerpt) {
    return { valid: false, reason: "Excerpt is not an exact match at the declared offsets." };
  }

  return { valid: true };
}

export function classifySeverity(inputs: SeverityInputs): GapSeverity {
  const mitigationAdjustment =
    inputs.mitigation === "adequate" ? 3 : inputs.mitigation === "partial" ? 1 : 0;
  const adjustedRisk =
    inputs.impact * inputs.likelihood +
    (inputs.deploymentCriticality ? 2 : 0) -
    mitigationAdjustment;

  if (
    (inputs.safetySecurityCompliance && inputs.likelihood >= 2) ||
    (inputs.deploymentCriticality &&
      inputs.impact === 4 &&
      inputs.mitigation !== "adequate") ||
    adjustedRisk >= 12
  ) {
    return "critical";
  }
  if (
    (inputs.deploymentCriticality && inputs.mitigation !== "adequate") ||
    adjustedRisk >= 8
  ) {
    return "high";
  }
  if (adjustedRisk >= 4) return "medium";
  return "low";
}

export function calculateReadiness(gaps: readonly RealityGap[]): {
  score: number;
  status: "not_ready" | "at_risk" | "conditionally_ready" | "ready";
} {
  const unresolved = gaps.filter(
    (gap) => gap.status !== "resolved" && gap.status !== "dismissed",
  );
  const score = Math.max(
    0,
    100 - unresolved.reduce((total, gap) => total + readinessPenalty[gap.severity], 0),
  );
  const hasCritical = unresolved.some((gap) => gap.severity === "critical");
  const hasHigh = unresolved.some((gap) => gap.severity === "high");

  if (hasCritical || score < 50) return { score, status: "not_ready" };
  if (hasHigh || score < 75) return { score, status: "at_risk" };
  if (score < 90) return { score, status: "conditionally_ready" };
  return { score, status: "ready" };
}

export function getSourceCoverage(references: readonly EvidenceReference[]): Record<
  EvidenceCategory,
  boolean
> {
  const categories = new Set(references.map((reference) => reference.sourceCategory));
  return {
    organizational_intent: categories.has("organizational_intent"),
    field_reality: categories.has("field_reality"),
    technical_reality: categories.has("technical_reality"),
  };
}

export function calculateEvidenceStrength(
  references: readonly EvidenceReference[],
): EvidenceStrength {
  const categories = new Set(references.map((reference) => reference.sourceCategory)).size;
  const sources = new Set(references.map((reference) => reference.sourceId)).size;
  if (categories === 3 || sources >= 3) return "strong";
  if (categories === 2 || sources === 2) return "moderate";
  return "limited";
}

export function orderGaps(gaps: readonly RealityGap[]): RealityGap[] {
  return [...gaps].sort((left, right) => {
    const severityDifference = severityRank[right.severity] - severityRank[left.severity];
    if (severityDifference !== 0) return severityDifference;

    const criticalityDifference =
      Number(right.severityInputs.deploymentCriticality) -
      Number(left.severityInputs.deploymentCriticality);
    if (criticalityDifference !== 0) return criticalityDifference;

    const evidenceDifference =
      evidenceStrengthRank[right.evidenceStrength] -
      evidenceStrengthRank[left.evidenceStrength];
    if (evidenceDifference !== 0) return evidenceDifference;

    return left.title.localeCompare(right.title);
  });
}
