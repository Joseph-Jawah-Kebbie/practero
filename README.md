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
