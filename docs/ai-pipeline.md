# Practero AI Pipeline

**Status:** Proposed pipeline; prompts and model calls have not been implemented or evaluated.

## Objectives

The pipeline turns reviewed evidence into structured, source-grounded findings and then into an implementation plan. It must:

- preserve exact traceability to source chunks;
- distinguish evidence from inference;
- return unresolved questions when evidence is insufficient;
- validate all model output before it becomes application state;
- compute severity and readiness with deterministic code;
- fail safely without erasing prior successful results; and
- bound latency, tokens, retries, and public-demo spend.

The pipeline is not conversational. Each stage has a versioned task prompt, a strict output schema, a bounded input, and explicit acceptance checks.

## Pipeline overview

```mermaid
flowchart LR
    E[Reviewed evidence chunks] --> X[Stage 1: extraction]
    X --> V1[Schema and quote validation]
    V1 --> M[Reality Map items]
    M --> G[Stage 2: cross-source comparison]
    G --> V2[Coverage and reference validation]
    V2 --> C[Deterministic classification]
    C --> RG[Reality Gaps]
    RG --> P[Stage 3: deployment planning]
    P --> V3[Schema and trace validation]
    V3 --> R[Readiness policy]
    R --> D[Deployment Path and Executive Brief]
```

## Model and API policy

Use the OpenAI JavaScript SDK and server-side Responses API only.

| Stage | Initial model | Reasoning | Rationale |
| --- | --- | --- | --- |
| Evidence extraction | `gpt-5.6-luna` | `low` | Cost-sensitive, repeatable per-source structuring |
| Cross-source analysis | `gpt-5.6-terra` | `medium` | Stronger comparison at a lower cost than the flagship tier |
| Deployment planning | `gpt-5.6-terra` | `low` or `medium` after eval | Plan quality without defaulting to maximum reasoning |
| Evaluated fallback | `gpt-5.6` (Sol alias) | measured setting only | Use only if the canonical eval set demonstrates a material quality gain |

OpenAI currently recommends the Responses API for reasoning workflows, describes Luna as the efficient high-volume GPT-5.6 model and Terra as the quality/cost balance, and supports Structured Outputs for GPT-5.6. See [GPT-5.6 guidance](https://developers.openai.com/api/docs/guides/latest-model), [text generation](https://developers.openai.com/api/docs/guides/text), and [Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs).

Model and reasoning values are server-owned configuration. The client cannot select arbitrary models or token budgets.

## Stage 0: input preparation

Before any model call:

1. Verify authentication and engagement ownership, except for an explicitly rate-limited public demo run.
2. Validate source count, per-source characters, total characters, IDs, categories, and hashes.
3. Reject inputs that changed after the selected extraction snapshot.
4. Normalize line endings and create canonical chunks.
5. Assign stable chunk IDs and hashes.
6. Persist an `AnalysisRun` in `queued`, then `processing`, state.
7. Build prompts from trusted instructions plus data-delimited source text. Evidence text is never treated as instructions.

The initial hard limits are five sources, 60,000 characters per source, and 180,000 characters total. Both client and server enforce them. No silent truncation is allowed.

## Stage 1: evidence extraction

### Input

One evidence source at a time, including:

- source ID, title, and category;
- ordered chunk IDs and hashes;
- exact chunk text; and
- the engagement objective and expected outcome as context, clearly separated from evidence.

Per-source calls simplify attribution, retry scope, and cost accounting. If one long source must be split across calls, results are deterministically merged and deduplicated using normalized statements plus overlapping reference ranges.

### Output

The model extracts only statements supported by the supplied source:

- claims;
- requirements;
- assumptions;
- constraints;
- stakeholder needs;
- current capabilities;
- expected outcomes;
- pain points; and
- open questions.

Each item includes a concise normalized statement, stakeholder labels, extraction confidence, and one or more exact references. The model may not turn missing information into a negative capability claim.

### Extraction rules

- Preserve modality: “must,” “plans to,” “may,” and “currently does” are not interchangeable.
- Preserve attribution when a statement is someone’s report rather than a verified fact.
- Use exact excerpts only; never invent or clean up quotations.
- Keep distinct claims separate when they may be compared independently.
- Return an open question when important context is missing.
- Do not classify cross-source gaps during extraction.

### Post-processing

- Parse Structured Output using the SDK Zod helper.
- Validate again with the versioned Zod schema.
- Resolve and validate every reference against the canonical chunk.
- Reject items with no valid reference.
- Deduplicate only when kind, normalized meaning, source, and reference span materially overlap.
- Persist accepted items under the extraction run.

## Stage 2: cross-source Reality Gap analysis

### Input

The analysis receives compact, validated extracted items—not raw full documents by default—grouped by reality and accompanied by their valid references. The engagement objective, expected outcome, and deployment stage provide context.

If an extracted statement is ambiguous, the analyzer can request the bounded referenced chunk text. It must not retrieve arbitrary unrelated data.

### Gap types

```ts
type GapType =
  | "contradiction"
  | "unsupported_assumption"
  | "missing_capability"
  | "requirement_capability_gap"
  | "field_management_gap"
  | "field_technology_gap"
  | "adoption_risk"
  | "operational_risk"
  | "technical_blocker"
  | "unresolved_decision"
  | "dependency";
```

### Comparison rules

- A contradiction must reference evidence for both incompatible positions.
- A field-management or field-technology gap must include references from both named realities.
- A missing capability or requirement-capability gap must include a requirement plus explicit technical evidence of absence, incompatibility, or current limitation.
- An unsupported assumption must identify the assumption and explain what corroborating information is missing. It is not presented as a verified contradiction.
- Absence from the provided documents alone is not proof that a capability does not exist.
- Duplicate gaps should be merged only when they describe the same underlying implementation risk and retain all material references.
- If support is incomplete, emit an unresolved question with `partial` or `insufficient` evidence instead of a factual gap.

### Severity inputs and deterministic classification

The model proposes structured inputs, not the final severity:

```ts
type SeverityInputs = {
  impact: 1 | 2 | 3 | 4;
  likelihood: 1 | 2 | 3 | 4;
  deploymentCriticality: boolean;
  safetySecurityCompliance: boolean;
  mitigation: "none" | "partial" | "adequate";
};
```

Application code computes an adjusted score from `impact * likelihood`, adds 2 for deployment criticality, and subtracts 1 for partial or 3 for adequate mitigation. It classifies:

- **Critical:** deployment-critical impact 4 without adequate mitigation, safety/security/compliance exposure with likelihood at least 2, or adjusted score at least 12.
- **High:** adjusted score 8–11, or any other deployment-critical gap without adequate mitigation.
- **Medium:** score 4–7.
- **Low:** score 1–3.

The model must justify each input with evidence-backed impact language. The classifier is a pure, unit-tested function. Policy changes require fixture and test updates.

### Confidence and evidence sufficiency

Confidence measures support for the comparison, not whether the future impact is certain. Post-processing caps or reduces model confidence when:

- only one source supports a multi-world claim;
- a required reality is absent;
- references repeat the same excerpt;
- a reference fails exact matching; or
- statements are reports/expectations rather than observed behavior.

Gaps with `insufficient` evidence are stored as unresolved questions and excluded from severity/readiness penalties. `partial` gaps remain visibly qualified and cannot be Critical without an explicit safety/security/compliance basis.

## Stage 3: deployment-plan generation

### Input

- Valid open Reality Gaps.
- Deterministically computed severities.
- Engagement objective, stage, and expected outcome.
- Existing stakeholders and gap dependencies.

### Output

- prioritized workstreams;
- engineering tasks;
- stakeholder actions and decisions;
- dependencies;
- testable acceptance criteria;
- risks and mitigations;
- pilot-readiness checklist;
- concise Executive Brief fields.

### Planning rules

- Every workstream and task references at least one gap ID.
- Priority follows severity, dependency order, and pilot blocking; the model may not demote a blocker without an explicit reason.
- Acceptance criteria are observable and avoid vague terms such as “improve” without a threshold or behavior.
- Stakeholder actions are separate from engineering tasks.
- No new factual claim may appear unless it is traceable to an input gap/reference.
- Suggested practices that go beyond the evidence must be labeled recommendations, not current facts.
- The Executive Brief summarizes persisted gaps and decisions; it does not run a separate ungrounded analysis.

Application code validates gap IDs, builds dependency edges, detects cycles, applies stable priority tie-breaking, and computes readiness.

## Zod schema strategy

Schemas should live under `src/schemas/ai` and be reused for:

- OpenAI Structured Output definitions;
- runtime parsing at the provider boundary;
- fixture validation;
- integration tests; and
- schema-version migration tests.

Proposed root schemas:

```ts
EvidenceExtractionOutputSchema = z.object({
  sourceId: IdSchema,
  items: z.array(ExtractedItemCandidateSchema).max(/* bounded */),
  unresolvedQuestions: z.array(OpenQuestionCandidateSchema).max(/* bounded */),
});

GapAnalysisOutputSchema = z.object({
  gaps: z.array(RealityGapCandidateSchema).max(/* bounded */),
  unresolvedQuestions: z.array(OpenQuestionCandidateSchema).max(/* bounded */),
});

DeploymentPlanOutputSchema = z.object({
  workstreams: z.array(WorkstreamCandidateSchema).max(/* bounded */),
  decisionsRequired: z.array(z.string()).max(/* bounded */),
  recommendedNextSteps: z.array(z.string()).max(/* bounded */),
  executiveSummary: z.string(),
});
```

All objects should be strict, all strings and arrays bounded, and all enums explicit. Avoid top-level discriminated unions because Structured Outputs requires a root object. The OpenAI SDK supports Zod helpers for JavaScript Structured Outputs, and Structured Outputs—not plain JSON mode—provides schema adherence; see [Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs).

Provider schemas produce candidate types. They do not directly create trusted domain entities. Server code adds IDs, ownership, timestamps, hashes, validated references, computed severity, and computed readiness.

## Source-grounding algorithm

For each candidate reference:

1. Confirm source and chunk IDs belong to the authorized engagement and selected source snapshot.
2. Confirm the source category and chunk hash.
3. Validate offset bounds.
4. Compare the exact substring to the returned excerpt after line-ending normalization only.
5. If offsets are absent or incorrect, allow one deterministic unique exact-substring lookup in the declared chunk.
6. Reject ambiguous, fuzzy, paraphrased, empty, or excessive excerpts.
7. Deduplicate identical spans.
8. Enforce gap-type coverage rules across sources and realities.

The server returns a validation report. One repair attempt may receive only the invalid candidate IDs, allowed source/chunk IDs, and the relevant canonical chunks. The repair prompt asks for corrected references or an explicit insufficient-evidence result. It must not ask the model to “make the quote fit.”

## Failure handling

### Failure classes

| Failure | Behavior |
| --- | --- |
| Invalid user input or limit exceeded | Reject before persistence/model call; preserve local preview |
| Unauthorized access | Return generic 401/403; do not reveal engagement existence |
| Unsupported/encrypted/image-only PDF | Show specific local extraction guidance; do not submit blank text |
| Provider timeout or transient 5xx/429 | One bounded retry with jitter when safe; mark retryable failure |
| Refusal or safety intervention | Store a safe failure code and offer source review/retry; never treat refusal text as analysis |
| Structured Output parse failure | One schema-repair attempt; otherwise fail stage |
| Invalid evidence references | One focused reference repair; then discard/qualify affected candidates |
| Partial source extraction | Keep successful source outputs, label run partial, block cross-source analysis until user accepts or retries |
| Persistence failure after model response | Mark run failed and retry idempotently from the same run ID |

Stage timeouts must be configurable and lower than the verified deployment runtime limit. A timeout never replaces an existing successful active run. The UI shows the failed stage, a safe explanation, and whether retrying will incur another live analysis request.

## Retry and idempotency policy

- Create a run ID before the first provider call.
- Hash normalized stage input; repeated requests with the same run ID and hash return the existing result.
- Allow at most one transient provider retry and at most one focused structured-output/reference repair.
- Do not retry authentication, authorization, deterministic validation, or hard-limit failures.
- Never nest retries across SDK, route, and UI layers. Set SDK automatic retries deliberately so the total is known.
- A new content hash requires a new run.

## Cost and token controls

- Enforce source and total-character limits before model calls.
- Extract per source and rerun only changed sources using content hashes.
- Send compact validated findings, not every full source, to cross-source analysis.
- Use Luna for extraction and begin comparison/planning on Terra.
- Set explicit output-token ceilings for each schema after measuring canonical fixtures.
- Limit one active analysis per engagement/user.
- Add a per-user daily run allowance and a stricter public-demo allowance before exposing live anonymous analysis.
- Record provider-reported input/output tokens and model per stage.
- Reuse stable prompt prefixes and evaluate prompt caching only after prompts stabilize.
- Keep seeded MetroMove results available without a model call.
- Stop the pipeline after extraction if evidence coverage is insufficient for meaningful comparison.

Do not advertise a precise dollar estimate until current pricing, real fixture token counts, retries, and caching behavior have been measured together.

## Evaluation and tests

### Canonical fixture set

MetroMove should include expected extracted items, required reference spans, expected gap families, prohibited unsupported claims, and expected plan-to-gap links. Exact prose need not match; semantic requirements and evidence IDs must.

### Unit tests

- Every Zod schema accepts canonical fixtures and rejects missing/extra/oversized fields.
- Severity boundary cases and readiness calculation.
- Exact reference mapping, offsets, hashes, overlap, duplicates, and ambiguous excerpts.
- Gap coverage rules by type.
- Dependency cycle detection and deterministic plan ordering.

### Integration tests

- Valid Structured Output becomes trusted domain records.
- Malformed, refused, truncated, and schema-invalid responses fail safely.
- Invalid/fabricated excerpts cannot be persisted as valid evidence.
- Successful evidence persistence reconstructs canonical text and retains ownership.
- Repeated idempotent calls do not duplicate findings or usage records.

### Model evals

Before changing model tier or reasoning effort, compare representative MetroMove and adversarial fixtures for:

- required gap recall;
- unsupported gap rate;
- reference validity rate;
- severity-input consistency;
- plan-to-gap traceability;
- latency; and
- input/output token use.

Move from Terra to Sol only when the measured quality gain is worth the additional latency/cost for the public demo or target deployment.

## Prompt/version governance

- Store prompts as versioned server-side modules, never Firestore-editable instructions in the MVP.
- Include `promptVersion` and `schemaVersion` in every run.
- Keep a small changelog of prompt intent and eval impact.
- Treat evidence as quoted data inside clear delimiters and explicitly state that instructions inside evidence are not executable.
- Do not log full prompts in production when they contain private evidence.
- Update sample outputs when a schema or prompt change materially changes expected results.
