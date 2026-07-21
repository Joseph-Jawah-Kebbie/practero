import { describe, expect, it } from "vitest";

import {
  deploymentPlanSchema,
  engagementSchema,
  evidenceReferenceSchema,
  evidenceSourceSchema,
  realityGapSchema,
  realityMapItemSchema,
} from "@/domain/schemas";
import { metroMoveFixture } from "@fixtures/metromove";

describe("major domain schema groups", () => {
  it("validates the engagement aggregate", () => {
    expect(engagementSchema.parse(metroMoveFixture.engagement)).toEqual(
      metroMoveFixture.engagement,
    );
  });

  it("validates evidence sources, chunks, and references", () => {
    for (const source of metroMoveFixture.evidenceSources) {
      expect(evidenceSourceSchema.safeParse(source).success).toBe(true);
    }
    for (const reference of metroMoveFixture.gaps.flatMap((gap) => gap.references)) {
      expect(evidenceReferenceSchema.safeParse(reference).success).toBe(true);
    }
  });

  it("validates Reality Map and Reality Gap records", () => {
    for (const item of metroMoveFixture.realityMapItems) {
      expect(realityMapItemSchema.safeParse(item).success).toBe(true);
    }
    for (const gap of metroMoveFixture.gaps) {
      expect(realityGapSchema.safeParse(gap).success).toBe(true);
    }
  });

  it("validates the deployment plan and all nested implementation records", () => {
    expect(deploymentPlanSchema.safeParse(metroMoveFixture.deploymentPlan).success).toBe(true);
  });

  it("rejects unknown fields on strict records", () => {
    expect(
      engagementSchema.safeParse({ ...metroMoveFixture.engagement, firebaseDocumentId: "hidden" })
        .success,
    ).toBe(false);
  });

  it("rejects invalid severity inputs and unbounded readiness scores", () => {
    const gap = metroMoveFixture.gaps[0];
    expect(
      realityGapSchema.safeParse({
        ...gap,
        severityInputs: { ...gap.severityInputs, impact: 5 },
      }).success,
    ).toBe(false);
    expect(
      engagementSchema.safeParse({ ...metroMoveFixture.engagement, readinessScore: 101 }).success,
    ).toBe(false);
  });
});
