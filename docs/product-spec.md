# Practero MVP Product Specification

**Status:** Planning baseline for OpenAI Build Week  
**Working name:** Practero  
**Tagline:** Where plans meet reality.  
**Primary category:** Work & Productivity

## Product definition

Practero is an open implementation workspace for forward-deployed teams. It turns fragmented discovery material into a traceable deployment plan by comparing three views of an implementation:

1. **Organizational intent** — what leaders, contracts, policies, and requirements say should happen.
2. **Field reality** — what users, operators, and implementation teams report actually happens.
3. **Technical reality** — what the current software, architecture, integrations, and data can support.

The MVP is an evidence-analysis and implementation-planning product. It is not a generic chat interface, document summarizer, or project-management suite.

## Problem statement

Implementation teams make deployment decisions from interviews, requirements, contracts, observations, support messages, technical documentation, repositories, and spreadsheets. These materials are usually scattered and frequently disagree. A plan can therefore look complete while depending on unsupported assumptions, missing capabilities, unresolved ownership, or field conditions the technology cannot tolerate.

Teams need a dependable way to:

- normalize important claims from unlike sources;
- compare intent, field experience, and technical capability;
- identify contradictions and missing evidence before deployment;
- show the exact evidence behind every finding;
- convert validated findings into accountable implementation work.

Practero addresses this gap. Its core promise is: **move from fragmented discovery materials to an evidence-backed, executable deployment plan.**

## Target users

### Primary users

- Forward-Deployed Engineers
- Applied AI engineers
- Solutions architects
- Deployment and implementation specialists
- Technical consultants and software agencies
- Product managers embedded with enterprise clients
- Digital-transformation and government technology-delivery teams

### Secondary users

- Enterprise sponsors and operational leaders
- Operations managers
- Client technical teams
- Field researchers
- Quality-assurance teams
- Frontline users whose experiences are represented in evidence

## Product principles

- **Evidence before assertion.** A factual finding is never shown without valid source references.
- **Comparison before planning.** Deployment work is derived from validated gaps, not generated in isolation.
- **Insufficiency is a valid result.** Missing evidence becomes an unresolved question, not a guess.
- **Serious implementation workspace.** The interface prioritizes hierarchy, traceability, and operational clarity over conversational or decorative patterns.
- **Judge-friendly without weakening privacy.** The fictional MetroMove demo opens without an account; private engagements require authentication and ownership checks.
- **Honest state.** Seeded results, live model runs, loading, empty, partial, and error states are visibly distinguished.

## Primary differentiator: the Reality Gap Engine

The Reality Gap Engine compares structured findings across the three realities. It identifies:

- contradictions;
- unsupported assumptions;
- missing capabilities;
- requirement-to-capability gaps;
- field-to-management gaps;
- field-to-technology gaps;
- adoption and operational risks;
- technical blockers;
- unresolved decisions; and
- implementation dependencies.

Each Reality Gap includes a type, deterministic severity, confidence, evidence-sufficiency state, finding, impact, recommendation, acceptance criterion, related stakeholders, status, and supporting excerpts. A contradiction requires evidence for both sides. A missing-capability claim requires an explicit requirement plus technical evidence of the absent or incompatible capability. If those conditions are not met, Practero records an unresolved question instead.

## Core workflow

1. Create an engagement with organization, objective, industry, deployment stage, and expected outcome.
2. Add up to five evidence sources and classify each as organizational requirements, field observations, or technical evidence.
3. Paste text or extract text locally from a supported file.
4. Review the extracted text and resolve size or extraction warnings before submission.
5. Extract structured claims, requirements, assumptions, constraints, needs, capabilities, outcomes, pain points, and questions from each source.
6. Inspect the resulting Reality Map and its source links.
7. Compare findings across sources and validate their evidence references.
8. Inspect prioritized Reality Gaps and open any gap to see its evidence.
9. Generate a Deployment Path with workstreams, tasks, stakeholder actions, dependencies, acceptance criteria, risks, mitigations, and a pilot checklist.
10. Review a concise Executive Brief for nontechnical decision-makers.

## User stories

### Engagement and evidence

- As an implementation lead, I can define the engagement outcome and deployment stage so that findings are evaluated in context.
- As an analyst, I can paste text or choose a TXT or PDF file and review locally extracted text before it leaves my browser.
- As an analyst, I can classify every source into one of the three realities so that comparisons are meaningful.
- As an analyst, I receive clear file, character, and total-input limit warnings without silent truncation.
- As a private user, I can access only engagements I own.
- As a judge, I can open the MetroMove demo without creating an account.

### Reality Map and gaps

- As an implementation lead, I can inspect normalized requirements, needs, assumptions, constraints, capabilities, outcomes, pain points, and unresolved questions.
- As a reviewer, I can open any extracted item or gap and see exact supporting excerpts, source titles, categories, and locations.
- As a delivery lead, I can distinguish critical blockers from lower-priority risks using consistent severity rules.
- As a reviewer, I see “insufficient evidence” when Practero cannot support a claim.
- As an analyst, I can tell whether a result is seeded demonstration data or the result of a live model run.

### Deployment planning

- As an engineer, I can see prioritized technical tasks with dependencies and testable acceptance criteria.
- As a sponsor, I can see stakeholder decisions and operational actions rather than an engineering-only backlog.
- As a pilot owner, I can use a readiness summary and checklist to decide what must happen before launch.
- As an executive, I can read the critical gaps, decisions required, and next steps without reviewing every source.

## MVP features and screens

### 1. Landing page

- Concise product positioning and explanation of the three realities.
- Primary “Try MetroMove Demo” action and secondary “Create an engagement” action.
- Clear explanation of the Reality Gap Engine and evidence traceability.

### 2. Engagement dashboard

- Organization, objective, expected outcome, industry, and deployment stage.
- Evidence counts by category, gap counts by severity, readiness status, and recent activity.
- Direct navigation to evidence, Reality Map, Reality Gaps, Deployment Path, and Executive Brief.

### 3. Evidence workspace

- Pasted-text entry and local TXT/PDF extraction.
- Explicit source category and metadata.
- Extracted-text preview before analysis.
- Processing state and accessible success, empty, warning, and error states.
- Initial limits: five sources per analysis, 60,000 characters per source, and 180,000 characters total. Limits are rejected visibly, never silently truncated.
- DOCX is deferred unless PDF and the complete vertical slice are stable.

### 4. Reality Map

- Grouped requirements, stakeholder needs, assumptions, constraints, capabilities, expected outcomes, pain points, and unresolved questions.
- Source badges and expandable exact excerpts on every item.

### 5. Reality Gaps

- Filters for severity, gap type, evidence category, and status.
- A scan-friendly gap list plus a detailed evidence drawer or page.
- Type, severity, confidence, finding, impact, recommendation, acceptance criterion, stakeholders, status, and supporting excerpts.
- This is the visual centerpiece of the MVP.

### 6. Deployment Path

- Prioritized workstreams with engineering tasks and stakeholder actions.
- Dependencies, acceptance criteria, risks, mitigations, and pilot-readiness checklist.
- Direct links back to the gaps that caused each action.

### 7. Executive Brief

- Overall readiness and a short supporting rationale.
- Most critical gaps, decisions required, and recommended next steps.
- Clear indication of evidence coverage and unresolved uncertainty.

### Cross-cutting capabilities

- Email/password authentication for private engagements.
- Read-only, public MetroMove demo with safe fictional data.
- Server-side OpenAI Responses API integration with validated Structured Outputs.
- Repository abstractions between presentation/application logic and Firestore.
- Responsive, keyboard-accessible, calm enterprise interface.
- Loading, empty, partial, success, and error states for every asynchronous workflow.

## Non-goals

The hackathon MVP will not include:

- a Jira, CRM, or document-management replacement;
- live Slack, Gmail, or repository integrations;
- complex GitHub analysis or autonomous code changes;
- enterprise billing, multi-organization administration, or complex RBAC;
- real-time collaborative editing;
- a mobile application;
- a generic chatbot;
- Firebase Storage, Cloud Functions, or paid Firebase extensions;
- original-file cloud storage;
- DOCX support until the core flow is dependable;
- background autonomous analysis, continuous ingestion, or bulk imports;
- decorative animations that do not improve comprehension.

## MVP acceptance criteria

### Judge journey

1. A visitor can open the public application and launch MetroMove without payment or authentication.
2. The three evidence categories are understandable without explanation.
3. MetroMove contains realistic, fictional sources in all three categories.
4. The visitor can inspect source text and structured Reality Map items.
5. Seeded analysis is labeled as seeded; by release it is a captured, validated snapshot from the real pipeline, while an on-demand run uses the same server-side pipeline and is labeled as live.
6. The visitor can view multiple gaps, including high-severity contradictions from the prescribed scenario.
7. Opening a gap reveals validated excerpts and source metadata from the relevant realities.
8. Each gap communicates implementation impact, a recommended action, and a testable acceptance criterion.
9. The visitor can navigate from a gap to its related Deployment Path workstream.
10. The visitor can review readiness, pilot checklist, risks, mitigations, and the Executive Brief.
11. The complete path works on a common desktop viewport and a mobile-width browser without horizontal page overflow.
12. No step requires hidden setup or special judge assistance.

### Quality and safety

- TypeScript strict mode, lint, unit/integration tests, production build, and the required Playwright flow pass.
- Every factual generated item has at least one validated source reference; cross-source contradictions have references to both sides.
- Invalid references are rejected or converted into unresolved questions.
- Private data access is ownership-checked server-side and protected by deny-by-default Firestore rules.
- API keys and Firebase Admin credentials never enter client bundles or tracked files.
- Source and total limits are enforced before the OpenAI request.
- Failures preserve submitted evidence and give the user a safe retry path.

## MetroMove demonstration scenario

MetroMove is a fictional urban-mobility organization planning a transport-platform pilot. All names, figures, and incidents in its sample materials must be invented and safe to publish.

### Sample sources

| Source | Reality | Purpose |
| --- | --- | --- |
| Pilot charter and management requirements | Organizational intent | Authentication, verification, wallet controls, rollout target, and service expectations |
| Driver discovery interviews | Field reality | Connectivity constraints, device practices, verification experience, and support needs |
| Rider and support feedback | Field reality | Cancellation expectations, trust issues, and escalation needs |
| Architecture and feature summary | Technical reality | Current auth, online-only state handling, verification, ledger, cancellation, and support capabilities |
| Pilot operating budget and responsibilities | Organizational intent | SMS budget, support ownership, reconciliation duties, and rollout assumptions |

### Expected demonstration gaps

| Gap | Required evidence | Expected priority | Illustrative action |
| --- | --- | --- | --- |
| SMS authentication is required but SMS spend is excluded | Management requirement plus operating budget | High | Approve an SMS budget or change and validate the authentication requirement |
| Drivers lose connectivity while ride state assumes constant internet | Driver interviews plus architecture summary | Critical/High, based on severity inputs | Add local event queuing and reconnect synchronization before expansion |
| Operations requires driver verification but no workflow exists | Management requirement plus technical capability summary | High | Define and implement verification states, review ownership, and audit history |
| Finance expects wallet reconciliation but audit records are incomplete | Finance requirement plus ledger description | High | Add immutable transaction events and a reconciliation process |
| Riders expect cancellation support but allowable stages are undefined | Rider feedback plus requirements/technical behavior | Medium/High | Decide cancellation stages, reasons, permissions, and user messaging |
| Rapid expansion is planned without a support-escalation process | Rollout requirement plus field/support and responsibility evidence | High | Define escalation tiers, owners, response targets, and pilot rehearsal |

Severity labels in sample output must be produced by the documented deterministic classification rules, not hard-coded merely to match this table.

### Demo narrative

The judge begins at the MetroMove dashboard, inspects one source from each reality, opens the Reality Map, and then sees the gap list. The connectivity gap is opened to reveal the management expectation, driver excerpt, and technical constraint side by side. The judge follows the gap to an offline-resilience workstream and its acceptance criterion, then finishes on the readiness summary and Executive Brief. The experience should make Practero’s comparison-and-traceability advantage clear without a chat interaction.
