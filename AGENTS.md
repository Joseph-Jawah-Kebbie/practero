# Practero repository guidance

## Scope

- Build the evidence-to-deployment vertical slice described in `docs/product-spec.md`.
- Treat the Reality Gap Engine and source traceability as the product core; do not turn Practero into a chatbot or general project-management suite.
- Work one approved phase at a time. Do not implement later phases or optional integrations without explicit approval.
- Preserve useful existing work and keep changes narrowly related to the active task.

## Architecture

- Use Next.js App Router, strict TypeScript, Tailwind CSS, Firebase Auth/Firestore, the server-side OpenAI Responses API, Zod, Vitest, and Playwright.
- Keep domain types and pure policies independent of Next.js, Firebase, and OpenAI SDK types.
- Access persistence through repository interfaces and application services; presentation components must not call Firestore directly.
- Keep OpenAI and Firebase Admin code server-only. Use the read-only fixture repository for the public MetroMove demo.
- Preserve explicit loading, empty, partial, success, and error states.

## Evidence and AI rules

- Never show a factual generated finding without validated source references.
- Validate source ID, chunk ID, exact excerpt, offsets, and content hash before persistence.
- Convert insufficient support into an unresolved question; do not infer absence from silence.
- Use Structured Outputs with versioned strict Zod schemas. Treat provider output as untrusted candidate data.
- Compute severity, readiness, reference mapping, and stable ordering in deterministic tested code.
- Clearly label seeded “Sample analysis” and real “Live analysis.”

## Security

- Never read, print, commit, or expose `.env*`, API keys, Firebase Admin credentials, service-account JSON, tokens, or private evidence.
- `NEXT_PUBLIC_` variables may contain only Firebase’s public web configuration, never server secrets.
- Verify Firebase ID tokens and parent engagement ownership for every private server operation.
- Keep Firestore deny-by-default; Firebase Admin bypasses rules, so route/service authorization is mandatory.
- Do not store original files. Enforce source count and size limits on client and server.
- Do not log evidence bodies, exact private excerpts, authorization headers, or raw provider responses in production.

## Coding

- Avoid `any`, dead code, speculative abstraction, and dependencies without a clear MVP need.
- Prefer accessible semantic HTML and small reusable components over page-specific duplication.
- Keep user-facing wording professional and honest about incomplete, seeded, failed, or unsupported behavior.
- Add comments only for non-obvious invariants or security-sensitive reasoning.

## Tests and verification

- Add or update tests with every deterministic policy, schema, repository behavior, and provider failure path.
- Required checks once scripts exist: `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build`.
- Maintain a Playwright flow covering MetroMove evidence, a gap’s supporting excerpts, and Deployment Path.
- Do not claim a phase complete while relevant checks fail or a control is only a placeholder.

## Documentation

- Keep architecture, data model, AI pipeline, demo guide, README, and `docs/codex-build-log.md` consistent with implemented behavior.
- Record material Codex work and human corrections truthfully; do not backfill work that did not occur.
- Update sample fixture/schema versions together when analysis contracts change.
