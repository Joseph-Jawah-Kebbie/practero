import { z } from "zod";

export const evidenceCategorySchema = z.enum([
  "organizational_intent",
  "field_reality",
  "technical_reality",
]);

export const deploymentStageSchema = z.enum([
  "discovery",
  "design",
  "build",
  "pilot",
  "rollout",
]);

export const evidenceChunkSchema = z
  .object({
    id: z.string().min(1),
    sourceId: z.string().min(1),
    index: z.number().int().nonnegative(),
    text: z.string().min(1),
    sourceStartOffset: z.number().int().nonnegative(),
    sourceEndOffset: z.number().int().positive(),
    contentHash: z.string().min(1),
  })
  .strict();

export const evidenceSourceSchema = z
  .object({
    id: z.string().min(1),
    title: z.string().min(1),
    category: evidenceCategorySchema,
    authorRole: z.string().min(1),
    fictionalDate: z.iso.date(),
    sourceType: z.enum(["pasted_text", "txt", "pdf"]),
    summary: z.string().min(1),
    text: z.string().min(1),
    characterCount: z.number().int().positive(),
    contentHash: z.string().min(1),
    chunks: z.array(evidenceChunkSchema).min(1),
  })
  .strict();

export const evidenceReferenceSchema = z
  .object({
    sourceId: z.string().min(1),
    sourceTitle: z.string().min(1),
    sourceCategory: evidenceCategorySchema,
    chunkId: z.string().min(1),
    excerpt: z.string().min(1),
    startOffset: z.number().int().nonnegative(),
    endOffset: z.number().int().positive(),
    contentHash: z.string().min(1),
  })
  .strict();

export const engagementSchema = z
  .object({
    id: z.string().min(1),
    organizationName: z.string().min(1),
    title: z.string().min(1),
    objective: z.string().min(1),
    industry: z.string().min(1),
    deploymentStage: deploymentStageSchema,
    expectedOutcome: z.string().min(1),
    status: z.enum(["draft", "active", "archived"]),
    readinessScore: z.number().int().min(0).max(100),
    readinessStatus: z.enum([
      "not_ready",
      "at_risk",
      "conditionally_ready",
      "ready",
    ]),
    fixtureVersion: z.string().min(1),
    lastUpdated: z.iso.date(),
  })
  .strict();

export const realityMapItemSchema = z
  .object({
    id: z.string().min(1),
    kind: z.enum([
      "claim",
      "requirement",
      "assumption",
      "constraint",
      "stakeholder_need",
      "capability",
      "expected_outcome",
      "pain_point",
      "open_question",
    ]),
    statement: z.string().min(1),
    stakeholders: z.array(z.string().min(1)).min(1),
    confidence: z.number().min(0).max(1),
    status: z.enum(["supported", "unresolved"]),
    references: z.array(evidenceReferenceSchema).min(1),
  })
  .strict();

export const severityInputsSchema = z
  .object({
    impact: z.number().int().min(1).max(4),
    likelihood: z.number().int().min(1).max(4),
    deploymentCriticality: z.boolean(),
    safetySecurityCompliance: z.boolean(),
    mitigation: z.enum(["none", "partial", "adequate"]),
  })
  .strict();

export const gapSeveritySchema = z.enum(["critical", "high", "medium", "low"]);

export const evidenceStrengthSchema = z.enum(["strong", "moderate", "limited"]);

export const realityGapSchema = z
  .object({
    id: z.string().min(1),
    slug: z.string().min(1),
    title: z.string().min(1),
    type: z.enum([
      "contradiction",
      "unsupported_assumption",
      "missing_capability",
      "requirement_capability_gap",
      "field_management_gap",
      "field_technology_gap",
      "adoption_risk",
      "operational_risk",
      "technical_blocker",
      "unresolved_decision",
      "dependency",
    ]),
    severityInputs: severityInputsSchema,
    severity: gapSeveritySchema,
    evidenceStrength: evidenceStrengthSchema,
    confidence: z.number().min(0).max(1),
    finding: z.string().min(1),
    businessImpact: z.string().min(1),
    technicalImpact: z.string().min(1).nullable(),
    recommendedAction: z.string().min(1),
    acceptanceCriteria: z.array(z.string().min(1)).min(1),
    stakeholders: z.array(z.string().min(1)).min(1),
    status: z.enum(["open", "accepted", "in_progress", "resolved", "dismissed"]),
    references: z.array(evidenceReferenceSchema).min(1),
    relatedRealityMapItemIds: z.array(z.string().min(1)).min(1),
  })
  .strict();

export const implementationTaskSchema = z
  .object({
    id: z.string().min(1),
    title: z.string().min(1),
    ownerType: z.enum(["engineering", "product", "operations", "finance", "support"]),
    status: z.enum(["not_started", "in_progress", "blocked", "complete"]),
  })
  .strict();

export const stakeholderActionSchema = z
  .object({
    id: z.string().min(1),
    stakeholder: z.string().min(1),
    action: z.string().min(1),
    decisionRequired: z.boolean(),
  })
  .strict();

export const acceptanceCriterionSchema = z
  .object({
    id: z.string().min(1),
    statement: z.string().min(1),
    verification: z.string().min(1),
  })
  .strict();

export const mitigationSchema = z
  .object({
    id: z.string().min(1),
    action: z.string().min(1),
    owner: z.string().min(1),
  })
  .strict();

export const riskSchema = z
  .object({
    id: z.string().min(1),
    description: z.string().min(1),
    exposure: z.enum(["high", "medium", "low"]),
    mitigation: mitigationSchema,
  })
  .strict();

export const pilotChecklistItemSchema = z
  .object({
    id: z.string().min(1),
    label: z.string().min(1),
    status: z.enum(["blocked", "not_ready", "ready"]),
  })
  .strict();

export const workstreamSchema = z
  .object({
    id: z.string().min(1),
    title: z.string().min(1),
    objective: z.string().min(1),
    priority: z.number().int().positive(),
    status: z.enum(["not_started", "in_progress", "blocked", "complete"]),
    relatedGapIds: z.array(z.string().min(1)).min(1),
    dependencyWorkstreamIds: z.array(z.string().min(1)),
    tasks: z.array(implementationTaskSchema).min(1),
    stakeholderActions: z.array(stakeholderActionSchema).min(1),
    acceptanceCriteria: z.array(acceptanceCriterionSchema).min(1),
    risks: z.array(riskSchema).min(1),
    pilotChecklistItems: z.array(pilotChecklistItemSchema).min(1),
  })
  .strict();

export const executiveBriefSchema = z
  .object({
    overallReadiness: z.enum([
      "not_ready",
      "at_risk",
      "conditionally_ready",
      "ready",
    ]),
    readinessScore: z.number().int().min(0).max(100),
    summary: z.string().min(1),
    criticalGapIds: z.array(z.string().min(1)),
    decisionsRequired: z.array(z.string().min(1)).min(1),
    recommendedNextSteps: z.array(z.string().min(1)).min(1),
  })
  .strict();

export const deploymentPlanSchema = z
  .object({
    id: z.string().min(1),
    engagementId: z.string().min(1),
    title: z.string().min(1),
    generatedFrom: z.literal("validated_sample_analysis"),
    workstreams: z.array(workstreamSchema).min(1),
    executiveBrief: executiveBriefSchema,
  })
  .strict();

export const metroMoveFixtureSchema = z
  .object({
    provenance: z
      .object({
        label: z.literal("Sample analysis"),
        description: z.string().min(1),
        liveAnalysisAvailable: z.literal(false),
      })
      .strict(),
    engagement: engagementSchema,
    evidenceSources: z.array(evidenceSourceSchema).length(5),
    realityMapItems: z.array(realityMapItemSchema).min(1),
    gaps: z.array(realityGapSchema).min(6),
    deploymentPlan: deploymentPlanSchema,
  })
  .strict();
