import { describe, expect, it } from "vitest";

import {
  calculateEvidenceStrength,
  calculateReadiness,
  classifySeverity,
  getSourceCoverage,
  orderGaps,
  validateEvidenceReference,
} from "@/domain/policies";
import type { EvidenceReference, RealityGap } from "@/domain/types";
import { metroMoveFixture } from "@fixtures/metromove";

describe("evidence-reference validation", () => {
  const validReference = metroMoveFixture.gaps[0].references[0];

  it("matches an exact excerpt at the declared chunk offsets", () => {
    expect(
      validateEvidenceReference(validReference, metroMoveFixture.evidenceSources),
    ).toEqual({ valid: true });
  });

  it("rejects a fabricated quotation", () => {
    const invalidReference: EvidenceReference = {
      ...validReference,
      excerpt: "This quotation is not present in the source.",
    };
    expect(validateEvidenceReference(invalidReference, metroMoveFixture.evidenceSources)).toEqual({
      valid: false,
      reason: "Excerpt is not an exact match at the declared offsets.",
    });
  });

  it("rejects an unknown chunk and a stale content identifier", () => {
    expect(
      validateEvidenceReference(
        { ...validReference, chunkId: "missing-chunk" },
        metroMoveFixture.evidenceSources,
      ).valid,
    ).toBe(false);
    expect(
      validateEvidenceReference(
        { ...validReference, contentHash: "fixture-stale" },
        metroMoveFixture.evidenceSources,
      ).valid,
    ).toBe(false);
  });
});

describe("severity classification", () => {
  it("classifies an unmitigated deployment-critical impact as critical", () => {
    expect(
      classifySeverity({
        impact: 4,
        likelihood: 3,
        deploymentCriticality: true,
        safetySecurityCompliance: false,
        mitigation: "none",
      }),
    ).toBe("critical");
  });

  it("uses mitigation to reduce otherwise comparable exposure", () => {
    expect(
      classifySeverity({
        impact: 3,
        likelihood: 3,
        deploymentCriticality: false,
        safetySecurityCompliance: false,
        mitigation: "adequate",
      }),
    ).toBe("medium");
  });

  it("keeps safety, security, or compliance exposure critical", () => {
    expect(
      classifySeverity({
        impact: 2,
        likelihood: 2,
        deploymentCriticality: false,
        safetySecurityCompliance: true,
        mitigation: "adequate",
      }),
    ).toBe("critical");
  });
});

describe("readiness calculation", () => {
  it("subtracts only unresolved-gap penalties and applies the critical gate", () => {
    const critical = metroMoveFixture.gaps.find((gap) => gap.severity === "critical");
    const medium = metroMoveFixture.gaps.find((gap) => gap.severity === "medium");
    expect(critical).toBeDefined();
    expect(medium).toBeDefined();

    expect(calculateReadiness([critical!, { ...medium!, status: "resolved" }])).toEqual({
      score: 75,
      status: "not_ready",
    });
  });

  it("marks a high-free score above 90 as ready", () => {
    const lowGap = {
      ...metroMoveFixture.gaps[0],
      severity: "low",
      status: "open",
    } satisfies RealityGap;
    expect(calculateReadiness([lowGap])).toEqual({ score: 98, status: "ready" });
  });
});

describe("gap ordering and source coverage", () => {
  it("orders by severity, criticality, evidence strength, then title", () => {
    const ordered = orderGaps([...metroMoveFixture.gaps].reverse());
    expect(ordered[0].severity).toBe("critical");
    expect(ordered.map((gap) => gap.id)).toEqual(metroMoveFixture.gaps.map((gap) => gap.id));
  });

  it("reports all three realities for the connectivity gap", () => {
    const connectivityGap = metroMoveFixture.gaps.find(
      (gap) => gap.id === "gap-connectivity-contradiction",
    );
    expect(connectivityGap).toBeDefined();
    expect(getSourceCoverage(connectivityGap!.references)).toEqual({
      organizational_intent: true,
      field_reality: true,
      technical_reality: true,
    });
    expect(calculateEvidenceStrength(connectivityGap!.references)).toBe("strong");
  });
});
