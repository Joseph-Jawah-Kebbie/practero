# Codex Build Log

This log records material Codex-assisted work and human-approved constraints. It should describe only work that actually occurred.

## 2026-07-19 — Planning baseline

### Human direction

- Defined Practero as an implementation workspace rather than a chatbot or generic project-management product.
- Required the Reality Gap Engine to compare organizational intent, field reality, and technical reality.
- Required Firebase and the OpenAI Responses API for later milestones, but requested a planning-only first pass.

### Codex work

- Inspected the minimal repository without reading `.env.local`.
- Created the product specification, architecture, data model, AI pipeline, implementation plan, and repository-specific `AGENTS.md`.
- Proposed a phased delivery plan centered on the evidence → gap → deployment-action trace.

## 2026-07-19 — MetroMove read-only traceability slice

### Human-approved constraints

- Implement only the first milestone with fictional fixture data.
- Do not add Firebase, authentication, Firestore, OpenAI calls, uploads, editable engagement creation, or live analysis.
- Make the connectivity contradiction the strongest visual example.
- Label current results as **Sample analysis** and prevent confusion with a live GPT-5.6 result.
- Preserve existing license, guidance, ignore rules, and planning documents.
- Do not commit, push, or merge.

### Codex work

- Scaffolded Next.js App Router, strict TypeScript, Tailwind CSS, ESLint, Vitest, and Playwright using npm.
- Defined strict Zod schemas for the engagement, sources, chunks, references, Reality Map items, Reality Gaps, workstreams, tasks, stakeholder actions, acceptance criteria, risks, mitigations, checklist items, deployment plan, and Executive Brief.
- Created five fictional MetroMove sources and six required gaps.
- Built exact-offset fixture reference helpers with deterministic content identifiers.
- Implemented deterministic reference validation, severity classification, readiness calculation, gap ordering, evidence strength, and three-reality source coverage.
- Built the landing page and complete no-account demo route set.
- Added a three-world Reality Gap detail view, linked source pages, Deployment Path, and Executive Brief.
- Added representative schema, fixture, policy, invalid-reference, and Playwright smoke tests.
- Added this log, the demo guide, and an implementation-accurate README.

### Architectural decisions

- Short fictional sources use one stable chunk each; the future live ingestion strategy remains the bounded multi-chunk design in `docs/data-model.md`.
- Fixture content identifiers use a deterministic FNV-1a-derived label. They are integrity identifiers for reproducible sample data, not cryptographic security hashes.
- Severity extends the planning policy with an explicit mitigation adjustment while retaining deployment-critical and safety/security/compliance gates.
- Evidence-category diversity affects evidence strength and deterministic ordering, not the underlying operational impact score.
- Fixture validation runs when the fixture module is imported, causing development, tests, and production builds to fail clearly on invalid data.

### Issues encountered

- npm registry DNS/SSL responses were intermittent during version inspection and initial dependency installation attempts.

### Verification

Final command results are recorded in the completion handoff after all required gates run.
