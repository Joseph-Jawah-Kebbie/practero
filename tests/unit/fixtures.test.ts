import { describe, expect, it } from "vitest";

import { metroMoveFixtureSchema } from "@/domain/schemas";
import { validateEvidenceReference } from "@/domain/policies";
import { metroMoveFixture } from "@fixtures/metromove";

describe("MetroMove fixture", () => {
  it("validates the complete fixture at runtime", () => {
    expect(metroMoveFixtureSchema.safeParse(metroMoveFixture).success).toBe(true);
  });

  it("contains exactly five publish-safe sources and all six required gap families", () => {
    expect(metroMoveFixture.evidenceSources).toHaveLength(5);
    expect(metroMoveFixture.gaps.map((gap) => gap.id)).toEqual(
      expect.arrayContaining([
        "gap-connectivity-contradiction",
        "gap-sms-cost-conflict",
        "gap-driver-verification",
        "gap-wallet-reconciliation",
        "gap-cancellation-policy",
        "gap-support-escalation",
      ]),
    );
  });

  it("validates every reference used by the Reality Map and gaps", () => {
    const references = [
      ...metroMoveFixture.realityMapItems.flatMap((item) => item.references),
      ...metroMoveFixture.gaps.flatMap((gap) => gap.references),
    ];

    for (const reference of references) {
      expect(
        validateEvidenceReference(reference, metroMoveFixture.evidenceSources),
        `${reference.sourceId} at ${reference.startOffset}`,
      ).toEqual({ valid: true });
    }
  });

  it("clearly marks the fixture as sample analysis with no live model availability", () => {
    expect(metroMoveFixture.provenance.label).toBe("Sample analysis");
    expect(metroMoveFixture.provenance.liveAnalysisAvailable).toBe(false);
    expect(metroMoveFixture.provenance.description).toContain("fictional");
  });

  it("links every workstream to a real gap", () => {
    const gapIds = new Set(metroMoveFixture.gaps.map((gap) => gap.id));
    for (const workstream of metroMoveFixture.deploymentPlan.workstreams) {
      expect(workstream.relatedGapIds.length).toBeGreaterThan(0);
      expect(workstream.relatedGapIds.every((gapId) => gapIds.has(gapId))).toBe(true);
    }
  });
});
