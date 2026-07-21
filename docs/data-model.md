# Practero MVP Data Model

**Status:** Fixture domain schemas implemented; Firestore model remains proposed.

## Modeling principles

- Domain types contain no Firebase-specific values.
- Original files are never stored; only reviewed extracted text and bounded metadata are persisted.
- Source text is chunked into small documents.
- Every factual extracted item and Reality Gap carries validated evidence references.
- Private records have one owner in the MVP. Team membership and organization RBAC are deferred.
- Generated records are immutable within an analysis run; a new run supersedes an old run.
- AI schema versions, prompt versions, fixture versions, and content hashes support reproducibility.
- Public MetroMove fixtures use the same domain shapes but do not require public Firestore writes.

## Shared value types

```ts
type Id = string;
type IsoDateTime = string;

type EvidenceCategory =
  | "organizational_intent"
  | "field_reality"
  | "technical_reality";

type ProcessingStatus =
  | "draft"
  | "ready"
  | "queued"
  | "processing"
  | "succeeded"
  | "partial"
  | "failed";

type EvidenceReference = {
  sourceId: Id;
  sourceTitle: string;
  sourceCategory: EvidenceCategory;
  chunkId: Id;
  excerpt: string;
  startOffset: number; // chunk-relative Unicode string offset
  endOffset: number;   // exclusive
  contentHash: string;
};
```

`sourceTitle` and `sourceCategory` are denormalized snapshots so a historical analysis stays readable if source metadata changes. `sourceId`, `chunkId`, offsets, and hash are the authoritative traceability fields. Excerpts are display values and must match the referenced chunk after normalization.

## Domain entities

### UserProfile

Minimal application profile; Firebase Authentication remains the identity source.

| Field | Type | Notes |
| --- | --- | --- |
| `id` | ID | Same value as Firebase Auth UID |
| `displayName` | string or null | Optional |
| `email` | string | Snapshot for display; not authorization input |
| `createdAt` | ISO datetime | Server assigned |
| `updatedAt` | ISO datetime | Server assigned |

### Engagement

| Field | Type | Notes |
| --- | --- | --- |
| `id` | ID | Stable domain ID |
| `ownerId` | ID | Firebase UID; sole owner in MVP |
| `organizationName` | string | Required |
| `title` | string | Engagement label |
| `objective` | string | Implementation objective |
| `industry` | string | Bounded display value |
| `deploymentStage` | enum | `discovery`, `design`, `build`, `pilot`, `rollout` |
| `expectedOutcome` | string | Required |
| `status` | enum | `draft`, `active`, `archived` |
| `activeAnalysisRunId` | ID or null | Last successful selected run |
| `activeDeploymentPlanId` | ID or null | Last successful selected plan |
| `readinessScore` | integer or null | Deterministically derived, 0–100 |
| `readinessStatus` | enum or null | `not_ready`, `at_risk`, `conditionally_ready`, `ready` |
| `createdAt`, `updatedAt` | ISO datetime | Server assigned |

### EvidenceSource

Metadata is separate from source content.

| Field | Type | Notes |
| --- | --- | --- |
| `id` | ID | Stable within engagement |
| `engagementId`, `ownerId` | ID | Duplicated for authorization/query safety |
| `title` | string | User supplied |
| `category` | EvidenceCategory | Exactly one of the three realities |
| `sourceType` | enum | `pasted_text`, `txt`, `pdf` initially |
| `originalFileName` | string or null | Sanitized display metadata only |
| `mediaType` | string | Detected/accepted type |
| `characterCount` | integer | Canonical extracted text count |
| `chunkCount` | integer | Canonical number of chunks |
| `contentHash` | string | SHA-256 of canonical extracted text |
| `processingStatus` | ProcessingStatus | Explicit workflow state |
| `errorCode` | string or null | Safe application code, no raw provider details |
| `errorMessage` | string or null | Safe user-facing summary |
| `createdAt`, `updatedAt` | ISO datetime | Server assigned |

### EvidenceChunk

| Field | Type | Notes |
| --- | --- | --- |
| `id` | ID | Deterministic source ID plus zero-padded index is acceptable |
| `engagementId`, `ownerId`, `sourceId` | ID | Ownership and parent fields |
| `index` | integer | Zero-based order |
| `text` | string | Canonical chunk text |
| `sourceStartOffset` | integer | Start in complete canonical source |
| `sourceEndOffset` | integer | Exclusive end in complete source |
| `contentHash` | string | Hash of chunk text |
| `createdAt` | ISO datetime | Server assigned |

### AnalysisRun

| Field | Type | Notes |
| --- | --- | --- |
| `id` | ID | Idempotency boundary |
| `engagementId`, `ownerId` | ID | Ownership fields |
| `kind` | enum | `extraction`, `gap_analysis`, `deployment_plan` |
| `status` | ProcessingStatus | Run lifecycle |
| `sourceIds` | ID array | Bounded to five |
| `sourceContentHashes` | string map | Detect stale results |
| `model` | string | Exact model ID/alias used |
| `reasoningEffort` | string | Configuration snapshot |
| `schemaVersion` | string | Output contract version |
| `promptVersion` | string | Prompt/eval version |
| `attemptCount` | integer | Includes bounded retries |
| `inputTokens`, `outputTokens` | integer or null | Provider usage when available |
| `durationMs` | integer or null | Stage duration |
| `errorCode`, `errorMessage` | string or null | Sanitized failure state |
| `startedAt`, `completedAt` | ISO datetime or null | Lifecycle timestamps |
| `createdAt` | ISO datetime | Server assigned |

### ExtractedItem

One normalized item from one evidence source.

| Field | Type | Notes |
| --- | --- | --- |
| `id` | ID | Stable within run |
| `engagementId`, `ownerId`, `analysisRunId` | ID | Parent fields |
| `sourceId` | ID | Primary source |
| `kind` | enum | `claim`, `requirement`, `assumption`, `constraint`, `stakeholder_need`, `capability`, `expected_outcome`, `pain_point`, `open_question` |
| `statement` | string | Normalized, evidence-grounded statement |
| `stakeholders` | string array | Bounded normalized labels |
| `confidence` | number | 0–1; confidence in extraction, not truth |
| `evidenceReferences` | EvidenceReference array | At least one valid reference |
| `validationStatus` | enum | `valid`, `insufficient_evidence`, `invalid_reference` |
| `createdAt` | ISO datetime | Server assigned |

### RealityGap

| Field | Type | Notes |
| --- | --- | --- |
| `id` | ID | Stable within gap-analysis run |
| `engagementId`, `ownerId`, `analysisRunId` | ID | Parent fields |
| `type` | GapType enum | See AI pipeline |
| `title` | string | Scan-friendly label |
| `finding` | string | Supported comparison statement |
| `businessImpact` | string | Operational/business consequence |
| `recommendedAction` | string | Concrete next step |
| `acceptanceCriterion` | string | Observable/testable outcome |
| `stakeholders` | string array | Bounded labels |
| `severityInputs` | object | `impact`, `likelihood`, `deploymentCriticality`, `safetySecurityCompliance`, `mitigation` |
| `severity` | enum | `critical`, `high`, `medium`, `low`; computed in code |
| `confidence` | number | 0–1 after reference validation |
| `evidenceSufficiency` | enum | `sufficient`, `partial`, `insufficient` |
| `evidenceReferences` | EvidenceReference array | Bounded; valid references only |
| `relatedExtractedItemIds` | ID array | Trace to normalized findings |
| `status` | enum | `open`, `accepted`, `in_progress`, `resolved`, `dismissed` |
| `createdAt`, `updatedAt` | ISO datetime | Server assigned |

### DeploymentPlan

| Field | Type | Notes |
| --- | --- | --- |
| `id` | ID | Stable plan version |
| `engagementId`, `ownerId`, `analysisRunId` | ID | Parent fields |
| `status` | ProcessingStatus | Generation state |
| `basedOnGapIds` | ID array | Complete bounded gap set |
| `readinessScore` | integer | Deterministically computed 0–100 |
| `readinessStatus` | enum | Deterministically computed |
| `readinessRationale` | string | Evidence-grounded summary |
| `executiveSummary` | string | Nontechnical overview |
| `criticalGapIds` | ID array | References, not copied gap bodies |
| `decisionsRequired` | string array | Bounded |
| `recommendedNextSteps` | string array | Bounded |
| `schemaVersion`, `promptVersion` | string | Reproducibility |
| `createdAt` | ISO datetime | Server assigned |

### Workstream

| Field | Type | Notes |
| --- | --- | --- |
| `id` | ID | Stable within plan |
| `engagementId`, `ownerId`, `deploymentPlanId` | ID | Parent fields |
| `title`, `objective` | string | Concise implementation scope |
| `priority` | integer | 1 is highest; deterministic tie-breaking |
| `status` | enum | `not_started`, `in_progress`, `blocked`, `complete` |
| `relatedGapIds` | ID array | Required traceability |
| `dependencyWorkstreamIds` | ID array | Directed dependencies |
| `tasks` | Task array | Bounded embedded records |
| `stakeholderActions` | StakeholderAction array | Bounded embedded records |
| `risks` | RiskMitigation array | Bounded embedded records |
| `acceptanceCriteria` | string array | Testable statements |
| `pilotChecklistItems` | PilotChecklistItem array | Bounded embedded records |

Small task/action/checklist records can remain embedded because they are bounded and read with their workstream. If fixture size tests approach the Firestore document limit, move them to child collections without changing domain DTOs.

### ActivityEvent

| Field | Type | Notes |
| --- | --- | --- |
| `id` | ID | Stable event ID |
| `engagementId`, `ownerId` | ID | Parent fields |
| `type` | enum | Source added, analysis completed/failed, plan generated, status changed |
| `summary` | string | Safe, short display text |
| `actorId` | ID or `system` | Initiator |
| `createdAt` | ISO datetime | Server assigned |

## Firestore collection design

```text
users/{userId}

engagements/{engagementId}
  evidenceSources/{sourceId}
    chunks/{chunkId}
  analysisRuns/{analysisRunId}
    extractedItems/{itemId}
    realityGaps/{gapId}
  deploymentPlans/{planId}
    workstreams/{workstreamId}
  activityEvents/{eventId}
```

All private descendant documents duplicate `ownerId` and `engagementId`. This supports collection-group queries if later needed and makes defensive validation possible. The server still authorizes against the parent engagement; duplicated fields alone are not trusted.

MetroMove data currently lives in one version-controlled TypeScript fixture module:

```text
sample-data/metromove/
  index.ts
```

The fixture shares runtime Zod schemas with the domain layer and includes a `fixtureVersion` plus a prominent sample-analysis marker. Splitting the records across persistence-oriented files remains a later option.

## Relationships and invariants

- A user owns zero or more engagements; an engagement has exactly one owner in the MVP.
- An engagement has at most five active evidence sources in one analysis input.
- Every evidence chunk belongs to exactly one source and has a unique contiguous index.
- A source’s `contentHash` and ordered chunks reconstruct the canonical reviewed text.
- An extraction run references the exact source hashes it processed.
- An ExtractedItem belongs to one extraction run and normally one source.
- A gap-analysis run compares one consistent set of successful extraction outputs.
- A RealityGap has at least one reference; contradictions require at least two references supporting different sides and at least two realities.
- A DeploymentPlan references a successful gap-analysis run and the gaps it used.
- Every workstream references at least one gap. No orphan generated tasks are presented as evidence-backed.
- An engagement’s active run/plan pointers change only after a new run succeeds.

## Ownership and authorization model

Private access is allowed only when `request.auth.uid` equals the engagement’s `ownerId`. The server enforces this by:

1. verifying the Firebase ID token;
2. loading the parent engagement;
3. comparing its owner with the verified UID; and
4. passing an authorized owner/engagement context to repository methods.

The Firebase Admin SDK bypasses Firestore security rules, so this service check is mandatory. Security rules remain deny-by-default and should allow no arbitrary client writes in the initial server-only persistence architecture. The public MetroMove fixture adapter is separate from private repositories and read-only.

## Evidence reference validation

Before an item or gap is accepted:

1. Resolve `sourceId` and `chunkId` within the same engagement and source-hash snapshot.
2. Confirm the declared category and title snapshot correspond to that source version.
3. Normalize line endings only; do not paraphrase the excerpt.
4. Confirm `chunk.text.slice(startOffset, endOffset) === excerpt`.
5. Confirm `contentHash` matches the canonical chunk hash.
6. Reject duplicate, empty, excessive, or out-of-range references.
7. Enforce the category/source coverage rule for the claimed gap type.

If the model returns an excerpt without reliable offsets, a deterministic mapper may locate one unique exact occurrence in the declared chunk. Ambiguous or approximate matches fail validation; fuzzy quote matching must not silently turn a paraphrase into evidence.

## Chunking strategy

The initial canonical chunker should:

- normalize CRLF/CR line endings to LF and preserve all other text;
- target 10,000–12,000 characters per chunk;
- prefer paragraph, then sentence, then hard boundaries;
- include up to 500 characters of overlap so boundary-spanning statements retain context;
- record source-relative start/end offsets and chunk hashes;
- keep each chunk far below Firestore’s 1 MiB document limit after metadata overhead;
- assign stable IDs from source ID, chunk index, and content hash prefix.

Overlapping text has distinct chunk-relative offsets. References also retain the source ID and chunk hash, preventing an excerpt from being mistaken for evidence from another version.

At the current product limits, a 60,000-character source should normally produce about six chunks; five maximum-length sources should remain a small, predictable Firestore dataset.

## Readiness summary model

Readiness is derived from unresolved gaps, never generated as an unsupported model opinion.

- Start at 100.
- Subtract 25 per critical gap, 12 per high gap, 5 per medium gap, and 2 per low gap.
- Clamp the result to 0–100.
- `not_ready`: any critical gap or score below 50.
- `at_risk`: no critical gap, but any high gap or score below 75.
- `conditionally_ready`: score 75–89 with no critical or high gaps.
- `ready`: score 90–100 with no critical or high gaps.

These are initial hackathon policy values. They must be unit-tested, described in the interface as a Practero assessment rather than an objective guarantee, and revised only alongside fixtures and tests.

## Index expectations

The first server-rendered queries should need only simple child-collection ordering. Likely composite indexes, if filters require them, include:

- evidence sources by `processingStatus` and `createdAt`;
- analysis runs by `kind` and `createdAt`;
- Reality Gaps by `status`, `severity`, and `createdAt`;
- activity events by `createdAt` descending.

Do not add speculative indexes. Capture the exact Firebase-generated index requirement during implementation and document it in the Firebase index configuration.
