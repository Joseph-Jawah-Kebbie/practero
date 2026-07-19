import { z } from "zod";

import {
  acceptanceCriterionSchema,
  deploymentPlanSchema,
  engagementSchema,
  evidenceCategorySchema,
  evidenceChunkSchema,
  evidenceReferenceSchema,
  evidenceSourceSchema,
  evidenceStrengthSchema,
  executiveBriefSchema,
  gapSeveritySchema,
  implementationTaskSchema,
  metroMoveFixtureSchema,
  mitigationSchema,
  pilotChecklistItemSchema,
  realityGapSchema,
  realityMapItemSchema,
  riskSchema,
  severityInputsSchema,
  stakeholderActionSchema,
  workstreamSchema,
} from "@/domain/schemas";

export type EvidenceCategory = z.infer<typeof evidenceCategorySchema>;
export type Engagement = z.infer<typeof engagementSchema>;
export type EvidenceChunk = z.infer<typeof evidenceChunkSchema>;
export type EvidenceSource = z.infer<typeof evidenceSourceSchema>;
export type EvidenceReference = z.infer<typeof evidenceReferenceSchema>;
export type RealityMapItem = z.infer<typeof realityMapItemSchema>;
export type SeverityInputs = z.infer<typeof severityInputsSchema>;
export type GapSeverity = z.infer<typeof gapSeveritySchema>;
export type EvidenceStrength = z.infer<typeof evidenceStrengthSchema>;
export type RealityGap = z.infer<typeof realityGapSchema>;
export type ImplementationTask = z.infer<typeof implementationTaskSchema>;
export type StakeholderAction = z.infer<typeof stakeholderActionSchema>;
export type AcceptanceCriterion = z.infer<typeof acceptanceCriterionSchema>;
export type Mitigation = z.infer<typeof mitigationSchema>;
export type Risk = z.infer<typeof riskSchema>;
export type PilotChecklistItem = z.infer<typeof pilotChecklistItemSchema>;
export type Workstream = z.infer<typeof workstreamSchema>;
export type ExecutiveBrief = z.infer<typeof executiveBriefSchema>;
export type DeploymentPlan = z.infer<typeof deploymentPlanSchema>;
export type MetroMoveFixture = z.infer<typeof metroMoveFixtureSchema>;
