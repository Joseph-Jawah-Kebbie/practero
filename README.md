# Practero

**Where plans meet reality.**

Practero is an open implementation workspace for forward-deployed engineers, applied AI teams, technical consultants, and delivery organizations. It compares:

- what organizations say they need;
- what people experience in the field; and
- what the current technology can support.

Practero turns the resulting contradictions, missing capabilities, risks, and unresolved decisions into an evidence-backed deployment path.

## Current milestone

The repository currently implements the **MetroMove read-only traceability slice**.

It includes:

- a public product landing page;
- a no-account MetroMove sample engagement;
- five fictional evidence sources across the three realities;
- a structured Reality Map;
- six prioritized Reality Gaps;
- exact source excerpts, chunk offsets, and deterministic fixture identifiers;
- deterministic severity, readiness, ordering, and source-coverage policies;
- a prioritized Deployment Path; and
- an Executive Brief.

All current analysis is visibly labeled **Sample analysis**. MetroMove and every source, person, event, requirement, and finding are fictional. No live model is called in this milestone.

Codex with GPT-5.6 was used to help build and verify this hackathon submission. The shipped application itself is intentionally model-free: it makes no OpenAI API request, needs no API credits, and renders only validated fixture data.

## Not implemented yet

- Firebase Authentication or Firestore
- Private or editable engagements
- File upload or document extraction
- OpenAI API calls
- Live GPT-5.6 extraction or gap analysis
- Multi-user collaboration

These are planned future milestones and must not be inferred from the sample interface.

## Technology

- Next.js App Router
- React and strict TypeScript
- Tailwind CSS
- Zod runtime schemas
- Vitest unit tests
- Playwright end-to-end testing

There are intentionally no Firebase or OpenAI packages yet.

## Local setup

Requirements:

- Node.js 20.19 or newer
- npm 10 or newer

Install and start the application:

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

No environment variables are required for the current fixture-only milestone.

## Available commands

```bash
npm run dev        # Start the local Next.js development server
npm run lint       # Run ESLint with zero warnings allowed
npm run typecheck  # Run strict TypeScript checks
npm run test       # Run Vitest unit tests
npm run build      # Create a production build
npm run start      # Start a completed production build
npm run test:e2e   # Run the Playwright MetroMove smoke flow
```

The first Playwright run may require:

```bash
npx playwright install chromium
```

## Working routes

| Route | Purpose |
| --- | --- |
| `/` | Practero landing page and the three realities |
| `/demo` | Redirect to the public MetroMove demo |
| `/demo/metromove` | Engagement overview and readiness assessment |
| `/demo/metromove/evidence` | Five fictional evidence sources |
| `/demo/metromove/evidence/[sourceId]` | Complete source text and traceability metadata |
| `/demo/metromove/reality-map` | Structured, source-linked findings |
| `/demo/metromove/gaps` | Six prioritized Reality Gaps |
| `/demo/metromove/gaps/[gapId]` | Gap evidence, action, and acceptance criteria |
| `/demo/metromove/deployment-path` | Prioritized workstreams and pilot checks |
| `/demo/metromove/executive-brief` | Sponsor-facing readiness summary |

## Production run and deployment

Build and run the production application locally:

```bash
npm ci
npm run build
npm run start
```

Then open [http://localhost:3000](http://localhost:3000). The current fixture-only application requires no environment variables.

For a Vercel deployment from the repository root:

```bash
npx vercel@latest login
npx vercel@latest deploy --prod
```

Follow the first-run prompts to select or create the Vercel project. Next.js is auto-detected; no Firebase or OpenAI configuration is required for this milestone.

## Verified submission state

On 21 July 2026, strict typecheck, zero-warning lint, all 21 unit tests, and the Next.js production build passed. The production build prerendered the complete public journey as static or statically generated pages, and a production-server smoke check confirmed the critical route content.

## MetroMove demonstration

Open `/demo/metromove` or select **Try MetroMove Demo** from the landing page.

The strongest walkthrough is:

1. Review readiness on the engagement overview.
2. Browse the five evidence sources.
3. Inspect the Reality Map.
4. Open **Continuous ride updates conflict with field connectivity**.
5. Compare its organizational, field, and technical excerpts.
6. Follow the gap into **Reliable ride-state delivery**.
7. Finish with the Executive Brief.

See [docs/demo-guide.md](docs/demo-guide.md) for a complete judge walkthrough.

## Architecture and traceability

Domain schemas and deterministic policies are independent of React, Next.js, Firebase, and Firestore. MetroMove fixtures are validated during import; invalid fixture records fail development and production builds clearly.

An evidence reference is accepted only when its source, category, chunk, deterministic content identifier, offsets, and exact excerpt all agree. Final severity and readiness are computed by code rather than stored as unexplained sample scores.

Architecture and future implementation boundaries are documented in:

- [Product specification](docs/product-spec.md)
- [Architecture](docs/architecture.md)
- [Data model](docs/data-model.md)
- [AI pipeline](docs/ai-pipeline.md)
- [Implementation plan](docs/implementation-plan.md)

## Roadmap

1. Firebase email/password authentication and owner-isolated persistence.
2. Pasted-text, TXT, and local PDF evidence ingestion.
3. Server-side GPT-5.6 evidence extraction with Structured Outputs.
4. Live, source-grounded Reality Gap analysis.
5. Live Deployment Path generation and reliability hardening.

The public seeded demo will remain available as a dependable fallback as live capabilities are added.

## License

Licensed under the [Apache License 2.0](LICENSE).
