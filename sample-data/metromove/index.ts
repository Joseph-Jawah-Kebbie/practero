import { metroMoveFixtureSchema } from "@/domain/schemas";
import {
  calculateEvidenceStrength,
  calculateReadiness,
  classifySeverity,
  orderGaps,
} from "@/domain/policies";
import type {
  MetroMoveFixture,
  RealityGap,
  RealityMapItem,
} from "@/domain/types";
import {
  createEvidenceReference,
  createEvidenceSource,
} from "@/lib/fixture-builders";

const managementRequirements = createEvidenceSource({
  id: "source-management-requirements",
  title: "MetroMove pilot management requirements",
  category: "organizational_intent",
  authorRole: "Pilot steering committee",
  fictionalDate: "2026-05-06",
  summary: "Approved outcomes, operating expectations, and controls for the fictional pilot.",
  text: `MetroMove Pilot Management Requirements

The pilot will begin with 40 drivers and expand to 150 active drivers within six weeks if service targets are met. Ride status updates must be recorded continuously from driver acceptance through trip completion so the operations desk can monitor every active journey.

New drivers must complete onboarding using SMS one-time passwords before they can access pilot rides. Only drivers verified by operations may participate in the pilot, and finance must be able to reconcile every wallet credit, debit, and adjustment each week.

Riders must be able to request a cancellation in the application. The approved requirements do not define which ride stages allow cancellation, what reasons are required, or when a fee applies.

The pilot should support rapid expansion without reducing service quality. Operational issues should be resolved quickly enough to protect rider and driver confidence.`,
});

const pilotBudget = createEvidenceSource({
  id: "source-pilot-budget",
  title: "Pilot budget and operating assumptions",
  category: "organizational_intent",
  authorRole: "Finance and pilot operations",
  fictionalDate: "2026-05-13",
  summary: "Budget boundaries, staffing assumptions, and ownership for the fictional pilot.",
  text: `MetroMove Pilot Budget and Operating Assumptions

The approved pilot budget covers product hosting, field training, driver orientation, and two support coordinators during business hours. It includes no line item for SMS messages, paid identity checks, or third-party verification fees.

The onboarding estimate assumes one paid SMS delivery for every sign-in attempt through an external messaging provider. No cost ceiling, fallback method, or failed-delivery allowance has been approved.

Finance will conduct a weekly wallet reconciliation using records exported by the product team. The budget assumes that transaction-level history will already be available and does not fund manual reconstruction of balances.

Support coordinators will answer routine questions in a shared inbox. Incident escalation, after-hours ownership, response targets, and responsibility for service-wide failures have not been assigned.`,
});

const driverInterviews = createEvidenceSource({
  id: "source-driver-interviews",
  title: "Driver discovery interview notes",
  category: "field_reality",
  authorRole: "Field research lead",
  fictionalDate: "2026-05-21",
  summary: "Synthesized observations from fictional pilot-driver interviews.",
  text: `MetroMove Driver Discovery Interview Notes

Drivers reported that mobile data frequently drops on the eastern and hillside routes, sometimes for ten to twenty minutes. Several drivers said they cannot tell whether a ride-status change was saved when the signal disappears, so they retry manually after connectivity returns.

Drivers expected onboarding to work on basic Android devices, but some share a phone with a family member and replace SIM cards when network coverage changes. They asked whether a missed SMS code would block them from beginning work.

Interviewed drivers described sending identity documents to a coordinator through chat. They could not see whether a document was received, under review, rejected, or approved, and they did not know who to contact when verification stalled.

Drivers said urgent safety or payment questions are sometimes sent to whichever coordinator responded most recently because there is no published escalation contact.`,
});

const riderSupport = createEvidenceSource({
  id: "source-rider-support",
  title: "Rider support feedback summary",
  category: "field_reality",
  authorRole: "Customer support research lead",
  fictionalDate: "2026-05-24",
  summary: "Fictional rider expectations and support observations before the pilot.",
  text: `MetroMove Rider Support Feedback Summary

Riders said they need to cancel when a driver is delayed or moving away from the pickup point, but they do not know when cancellation stops being available. Support reviewers found no consistent explanation of cancellation stages or fees in the pilot materials.

Riders expected support to distinguish a routine question from an urgent trip incident. In the current rehearsal, support agents could not identify who owns an urgent escalation after business hours or how quickly an incident should be acknowledged.

Several riders said a delayed status display would reduce their confidence that a driver was still completing the journey, especially in areas known for weak mobile coverage.`,
});

const technicalArchitecture = createEvidenceSource({
  id: "source-technical-architecture",
  title: "Current architecture and feature summary",
  category: "technical_reality",
  authorRole: "Platform engineering lead",
  fictionalDate: "2026-05-28",
  summary: "Current-state architecture and implemented feature boundaries for the fictional product.",
  text: `MetroMove Current Architecture and Feature Summary

All ride-status transitions are written directly to the online application API. There is no local event queue, durable offline store, or reconnect synchronization. A failed request remains only in the current screen state and is lost if the application restarts.

SMS one-time-password onboarding is designed around a paid external messaging provider. The implementation has no email fallback, offline code, delivery-cost cap, or retry budget.

The driver profile contains a single isVerified boolean. Document submission, review states, reviewer assignment, rejection reasons, and verification audit history are not implemented.

Wallet records store the current balance and a latest-transaction description. They do not preserve immutable transaction events, adjustment reasons, actor identity, or a reconciliation ledger.

The rider interface exposes cancellation before driver matching. The service contract does not define permitted cancellation transitions after matching or after a driver starts toward pickup.

Support requests arrive in a shared email inbox. The product has no incident severity, escalation schedule, assigned incident owner, after-hours rotation, or response target.`,
});

export const evidenceSources = [
  managementRequirements,
  pilotBudget,
  driverInterviews,
  riderSupport,
  technicalArchitecture,
] as const;

const ref = {
  continuousUpdates: createEvidenceReference(
    managementRequirements,
    "Ride status updates must be recorded continuously from driver acceptance through trip completion so the operations desk can monitor every active journey.",
  ),
  expansion: createEvidenceReference(
    managementRequirements,
    "The pilot will begin with 40 drivers and expand to 150 active drivers within six weeks if service targets are met.",
  ),
  smsRequirement: createEvidenceReference(
    managementRequirements,
    "New drivers must complete onboarding using SMS one-time passwords before they can access pilot rides.",
  ),
  verificationRequirement: createEvidenceReference(
    managementRequirements,
    "Only drivers verified by operations may participate in the pilot, and finance must be able to reconcile every wallet credit, debit, and adjustment each week.",
  ),
  cancellationAmbiguity: createEvidenceReference(
    managementRequirements,
    "The approved requirements do not define which ride stages allow cancellation, what reasons are required, or when a fee applies.",
  ),
  noSmsBudget: createEvidenceReference(
    pilotBudget,
    "It includes no line item for SMS messages, paid identity checks, or third-party verification fees.",
  ),
  paidSmsAssumption: createEvidenceReference(
    pilotBudget,
    "The onboarding estimate assumes one paid SMS delivery for every sign-in attempt through an external messaging provider.",
  ),
  financeAssumption: createEvidenceReference(
    pilotBudget,
    "The budget assumes that transaction-level history will already be available and does not fund manual reconstruction of balances.",
  ),
  noEscalationOwnership: createEvidenceReference(
    pilotBudget,
    "Incident escalation, after-hours ownership, response targets, and responsibility for service-wide failures have not been assigned.",
  ),
  unreliableConnectivity: createEvidenceReference(
    driverInterviews,
    "Drivers reported that mobile data frequently drops on the eastern and hillside routes, sometimes for ten to twenty minutes.",
  ),
  manualRetry: createEvidenceReference(
    driverInterviews,
    "Several drivers said they cannot tell whether a ride-status change was saved when the signal disappears, so they retry manually after connectivity returns.",
  ),
  verificationField: createEvidenceReference(
    driverInterviews,
    "They could not see whether a document was received, under review, rejected, or approved, and they did not know who to contact when verification stalled.",
  ),
  cancellationField: createEvidenceReference(
    riderSupport,
    "Riders said they need to cancel when a driver is delayed or moving away from the pickup point, but they do not know when cancellation stops being available.",
  ),
  supportField: createEvidenceReference(
    riderSupport,
    "In the current rehearsal, support agents could not identify who owns an urgent escalation after business hours or how quickly an incident should be acknowledged.",
  ),
  onlineOnly: createEvidenceReference(
    technicalArchitecture,
    "All ride-status transitions are written directly to the online application API. There is no local event queue, durable offline store, or reconnect synchronization.",
  ),
  paidSmsTechnical: createEvidenceReference(
    technicalArchitecture,
    "SMS one-time-password onboarding is designed around a paid external messaging provider.",
  ),
  verificationTechnical: createEvidenceReference(
    technicalArchitecture,
    "Document submission, review states, reviewer assignment, rejection reasons, and verification audit history are not implemented.",
  ),
  walletTechnical: createEvidenceReference(
    technicalArchitecture,
    "They do not preserve immutable transaction events, adjustment reasons, actor identity, or a reconciliation ledger.",
  ),
  cancellationTechnical: createEvidenceReference(
    technicalArchitecture,
    "The service contract does not define permitted cancellation transitions after matching or after a driver starts toward pickup.",
  ),
  supportTechnical: createEvidenceReference(
    technicalArchitecture,
    "The product has no incident severity, escalation schedule, assigned incident owner, after-hours rotation, or response target.",
  ),
};

const realityMapItems: RealityMapItem[] = [
  {
    id: "item-continuous-updates",
    kind: "requirement",
    statement: "Operations requires continuous ride-state visibility throughout every active journey.",
    stakeholders: ["Operations", "Drivers"],
    confidence: 0.99,
    status: "supported",
    references: [ref.continuousUpdates],
  },
  {
    id: "item-connectivity-loss",
    kind: "constraint",
    statement: "Drivers experience mobile-data outages lasting long enough to interrupt ride-state updates.",
    stakeholders: ["Drivers", "Operations"],
    confidence: 0.97,
    status: "supported",
    references: [ref.unreliableConnectivity, ref.manualRetry],
  },
  {
    id: "item-online-only-state",
    kind: "capability",
    statement: "The current ride-state implementation requires an online request and has no durable offline recovery path.",
    stakeholders: ["Engineering", "Operations"],
    confidence: 0.99,
    status: "supported",
    references: [ref.onlineOnly],
  },
  {
    id: "item-sms-onboarding",
    kind: "requirement",
    statement: "Management requires SMS one-time passwords for driver onboarding.",
    stakeholders: ["Operations", "Drivers"],
    confidence: 0.99,
    status: "supported",
    references: [ref.smsRequirement],
  },
  {
    id: "item-sms-budget",
    kind: "constraint",
    statement: "The approved budget excludes SMS and third-party verification costs.",
    stakeholders: ["Finance", "Operations"],
    confidence: 0.99,
    status: "supported",
    references: [ref.noSmsBudget],
  },
  {
    id: "item-paid-sms-provider",
    kind: "assumption",
    statement: "The onboarding design assumes a paid messaging provider without a funded fallback or cost ceiling.",
    stakeholders: ["Engineering", "Finance"],
    confidence: 0.98,
    status: "supported",
    references: [ref.paidSmsAssumption, ref.paidSmsTechnical],
  },
  {
    id: "item-verified-drivers",
    kind: "requirement",
    statement: "Operations requires every pilot driver to be verified before participation.",
    stakeholders: ["Operations", "Drivers"],
    confidence: 0.99,
    status: "supported",
    references: [ref.verificationRequirement],
  },
  {
    id: "item-verification-workflow",
    kind: "capability",
    statement: "The current product has a verification flag but no complete submission, review, or audit workflow.",
    stakeholders: ["Engineering", "Operations", "Drivers"],
    confidence: 0.99,
    status: "supported",
    references: [ref.verificationField, ref.verificationTechnical],
  },
  {
    id: "item-wallet-reconciliation",
    kind: "requirement",
    statement: "Finance expects weekly transaction-level wallet reconciliation.",
    stakeholders: ["Finance", "Engineering"],
    confidence: 0.98,
    status: "supported",
    references: [ref.verificationRequirement, ref.financeAssumption],
  },
  {
    id: "item-wallet-audit-history",
    kind: "capability",
    statement: "Current wallet records do not retain the immutable event history needed for reconciliation.",
    stakeholders: ["Finance", "Engineering"],
    confidence: 0.99,
    status: "supported",
    references: [ref.walletTechnical],
  },
  {
    id: "item-cancellation-policy",
    kind: "open_question",
    statement: "Allowed cancellation stages, reasons, and fees remain unresolved.",
    stakeholders: ["Riders", "Operations", "Product"],
    confidence: 0.99,
    status: "unresolved",
    references: [ref.cancellationAmbiguity, ref.cancellationField, ref.cancellationTechnical],
  },
  {
    id: "item-support-escalation",
    kind: "open_question",
    statement: "Urgent incident ownership, escalation targets, and after-hours coverage remain unresolved.",
    stakeholders: ["Support", "Operations", "Riders", "Drivers"],
    confidence: 0.99,
    status: "unresolved",
    references: [ref.noEscalationOwnership, ref.supportField, ref.supportTechnical],
  },
];

function buildGap(
  input: Omit<RealityGap, "severity" | "evidenceStrength">,
): RealityGap {
  return {
    ...input,
    severity: classifySeverity(input.severityInputs),
    evidenceStrength: calculateEvidenceStrength(input.references),
  };
}

const gaps = orderGaps([
  buildGap({
    id: "gap-connectivity-contradiction",
    slug: "connectivity-contradiction",
    title: "Continuous ride updates conflict with field connectivity",
    type: "field_technology_gap",
    severityInputs: {
      impact: 4,
      likelihood: 4,
      deploymentCriticality: true,
      safetySecurityCompliance: false,
      mitigation: "none",
    },
    confidence: 0.98,
    finding:
      "The pilot requires continuous ride updates, while drivers report material coverage gaps and the current architecture has no durable offline queue or reconnect synchronization.",
    businessImpact:
      "Operations may lose visibility of active journeys, and riders may lose confidence when trip progress appears stale during the pilot.",
    technicalImpact:
      "Ride-state transitions can fail or disappear when connectivity drops, leaving server state incomplete or out of sequence.",
    recommendedAction:
      "Introduce a local event queue with idempotent replay, visible pending state, and reconnect synchronization before pilot expansion.",
    acceptanceCriteria: [
      "A driver can complete all required ride-state transitions during a 15-minute simulated outage, and each transition synchronizes exactly once and in order after connectivity returns.",
      "The driver interface clearly distinguishes pending, synchronized, and failed state changes.",
    ],
    stakeholders: ["Drivers", "Operations", "Engineering", "Riders"],
    status: "open",
    references: [ref.continuousUpdates, ref.unreliableConnectivity, ref.onlineOnly],
    relatedRealityMapItemIds: [
      "item-continuous-updates",
      "item-connectivity-loss",
      "item-online-only-state",
    ],
  }),
  buildGap({
    id: "gap-sms-cost-conflict",
    slug: "sms-authentication-cost-conflict",
    title: "Required SMS onboarding has no approved operating budget",
    type: "contradiction",
    severityInputs: {
      impact: 3,
      likelihood: 3,
      deploymentCriticality: true,
      safetySecurityCompliance: false,
      mitigation: "partial",
    },
    confidence: 0.97,
    finding:
      "Management requires SMS onboarding and the technical design depends on a paid provider, but the approved pilot budget excludes SMS costs.",
    businessImpact:
      "Driver onboarding may stop when trial credits or unplanned funds are exhausted, limiting pilot participation.",
    technicalImpact:
      "The only designed authentication path depends on an unfunded external delivery service without a fallback.",
    recommendedAction:
      "Approve a capped SMS budget with delivery monitoring or formally adopt and test a funded fallback onboarding method.",
    acceptanceCriteria: [
      "Finance approves a per-driver SMS allowance and monthly ceiling, or product approves a tested fallback that lets an eligible driver complete onboarding without paid SMS.",
    ],
    stakeholders: ["Finance", "Operations", "Engineering", "Drivers"],
    status: "open",
    references: [ref.smsRequirement, ref.noSmsBudget, ref.paidSmsTechnical],
    relatedRealityMapItemIds: [
      "item-sms-onboarding",
      "item-sms-budget",
      "item-paid-sms-provider",
    ],
  }),
  buildGap({
    id: "gap-driver-verification",
    slug: "driver-verification-capability-gap",
    title: "Driver verification requirement lacks a review workflow",
    type: "requirement_capability_gap",
    severityInputs: {
      impact: 3,
      likelihood: 3,
      deploymentCriticality: true,
      safetySecurityCompliance: false,
      mitigation: "none",
    },
    confidence: 0.98,
    finding:
      "Operations requires verified drivers, but the product has only a boolean flag and no traceable submission, review, rejection, or audit workflow.",
    businessImpact:
      "Operations cannot demonstrate a consistent approval process, and eligible drivers may remain blocked without a visible resolution path.",
    technicalImpact:
      "A single mutable flag cannot represent review state, evidence, reviewer accountability, or decision history.",
    recommendedAction:
      "Define verification states and ownership, then implement document metadata, reviewer assignment, decisions, reasons, and audit events.",
    acceptanceCriteria: [
      "Every pilot driver has a visible verification state, assigned reviewer, timestamped decision, and retained reason before ride access is granted.",
    ],
    stakeholders: ["Operations", "Drivers", "Engineering"],
    status: "open",
    references: [ref.verificationRequirement, ref.verificationField, ref.verificationTechnical],
    relatedRealityMapItemIds: ["item-verified-drivers", "item-verification-workflow"],
  }),
  buildGap({
    id: "gap-wallet-reconciliation",
    slug: "wallet-reconciliation-audit-gap",
    title: "Wallet records cannot support the expected reconciliation",
    type: "requirement_capability_gap",
    severityInputs: {
      impact: 4,
      likelihood: 2,
      deploymentCriticality: true,
      safetySecurityCompliance: false,
      mitigation: "partial",
    },
    confidence: 0.96,
    finding:
      "Finance expects weekly transaction-level reconciliation, while current wallet records retain balances without immutable event or actor history.",
    businessImpact:
      "Finance may be unable to explain adjustments, resolve disputes, or confirm the accuracy of pilot balances.",
    technicalImpact:
      "Mutable balance snapshots cannot reconstruct transaction order, adjustment reasons, or responsible actors.",
    recommendedAction:
      "Add immutable wallet events and a reconciliation export before processing pilot-value transactions.",
    acceptanceCriteria: [
      "For any pilot wallet, finance can reproduce the displayed balance from ordered immutable events and identify the actor and reason for every adjustment.",
    ],
    stakeholders: ["Finance", "Engineering", "Operations"],
    status: "open",
    references: [ref.verificationRequirement, ref.financeAssumption, ref.walletTechnical],
    relatedRealityMapItemIds: [
      "item-wallet-reconciliation",
      "item-wallet-audit-history",
    ],
  }),
  buildGap({
    id: "gap-support-escalation",
    slug: "support-escalation-gap",
    title: "Rapid pilot expansion has no incident-escalation model",
    type: "operational_risk",
    severityInputs: {
      impact: 3,
      likelihood: 3,
      deploymentCriticality: true,
      safetySecurityCompliance: false,
      mitigation: "partial",
    },
    confidence: 0.98,
    finding:
      "The pilot is expected to expand quickly, but urgent incident ownership, after-hours coverage, severity levels, and response targets are not defined.",
    businessImpact:
      "Urgent rider or driver incidents may be handled inconsistently as volume grows, damaging trust and delaying recovery.",
    technicalImpact:
      "The current shared inbox cannot assign severity, ownership, or service targets to incidents.",
    recommendedAction:
      "Define escalation tiers, accountable roles, response targets, and after-hours coverage, then rehearse the process before expansion.",
    acceptanceCriteria: [
      "A pilot exercise routes urgent, payment, and routine scenarios to named owners with documented acknowledgement and resolution targets.",
    ],
    stakeholders: ["Support", "Operations", "Riders", "Drivers"],
    status: "open",
    references: [ref.expansion, ref.noEscalationOwnership, ref.supportField, ref.supportTechnical],
    relatedRealityMapItemIds: ["item-support-escalation"],
  }),
  buildGap({
    id: "gap-cancellation-policy",
    slug: "cancellation-policy-ambiguity",
    title: "Cancellation behavior is promised but not operationally defined",
    type: "unresolved_decision",
    severityInputs: {
      impact: 2,
      likelihood: 3,
      deploymentCriticality: false,
      safetySecurityCompliance: false,
      mitigation: "partial",
    },
    confidence: 0.97,
    finding:
      "Riders expect cancellation, but requirements and service rules do not define permitted stages, reasons, or fees after matching.",
    businessImpact:
      "Riders and support staff may receive inconsistent outcomes, increasing disputes and failed trip expectations.",
    technicalImpact:
      "The application cannot enforce a complete transition policy until product and operations make the missing decisions.",
    recommendedAction:
      "Approve a cancellation decision table covering ride stages, actors, reasons, fees, and user messaging before expanding the interface.",
    acceptanceCriteria: [
      "An approved decision table defines cancellation permissions and outcomes for every ride stage, and product tests cover each allowed and rejected transition.",
    ],
    stakeholders: ["Riders", "Operations", "Support", "Product", "Engineering"],
    status: "open",
    references: [ref.cancellationAmbiguity, ref.cancellationField, ref.cancellationTechnical],
    relatedRealityMapItemIds: ["item-cancellation-policy"],
  }),
]);

const readiness = calculateReadiness(gaps);

const fixtureCandidate: MetroMoveFixture = {
  provenance: {
    label: "Sample analysis",
    description:
      "MetroMove, its evidence, and its findings are fictional, validated fixtures. No live model analysis is running in this milestone.",
    liveAnalysisAvailable: false,
  },
  engagement: {
    id: "engagement-metromove-pilot",
    organizationName: "MetroMove",
    title: "Urban mobility pilot readiness",
    objective:
      "Prepare a dependable transport-platform pilot that can expand without losing operational control, financial traceability, or user trust.",
    industry: "Urban mobility",
    deploymentStage: "pilot",
    expectedOutcome:
      "A source-traceable plan that identifies what must be resolved before the pilot expands beyond its initial driver cohort.",
    status: "active",
    readinessScore: readiness.score,
    readinessStatus: readiness.status,
    fixtureVersion: "metromove-1.0.0",
    lastUpdated: "2026-06-02",
  },
  evidenceSources: [...evidenceSources],
  realityMapItems,
  gaps,
  deploymentPlan: {
    id: "plan-metromove-pilot-readiness",
    engagementId: "engagement-metromove-pilot",
    title: "MetroMove pilot deployment path",
    generatedFrom: "validated_sample_analysis",
    workstreams: [
      {
        id: "workstream-offline-resilience",
        title: "Reliable ride-state delivery",
        objective:
          "Preserve ride-state transitions and operational visibility across temporary connectivity loss.",
        priority: 1,
        status: "blocked",
        relatedGapIds: ["gap-connectivity-contradiction"],
        dependencyWorkstreamIds: [],
        tasks: [
          {
            id: "task-offline-event-envelope",
            title: "Define idempotent ride-event envelope and ordering rules",
            ownerType: "engineering",
            status: "not_started",
          },
          {
            id: "task-local-queue",
            title: "Implement durable local queue and reconnect replay",
            ownerType: "engineering",
            status: "not_started",
          },
          {
            id: "task-pending-status",
            title: "Design pending, synchronized, and failed state feedback",
            ownerType: "product",
            status: "not_started",
          },
        ],
        stakeholderActions: [
          {
            id: "action-offline-threshold",
            stakeholder: "Operations lead",
            action: "Approve the maximum acceptable synchronization delay during the pilot.",
            decisionRequired: true,
          },
        ],
        acceptanceCriteria: [
          {
            id: "criterion-offline-sync",
            statement:
              "A driver can complete all required ride-state transitions during a 15-minute simulated outage, and each transition synchronizes exactly once and in order after connectivity returns.",
            verification: "Automated outage/reconnect scenario plus an operations-observer pilot rehearsal.",
          },
        ],
        risks: [
          {
            id: "risk-event-conflict",
            description: "Repeated or out-of-order events could corrupt the authoritative ride state.",
            exposure: "high",
            mitigation: {
              id: "mitigation-idempotency",
              action: "Use immutable event IDs, server idempotency, and explicit ordering validation.",
              owner: "Engineering lead",
            },
          },
        ],
        pilotChecklistItems: [
          {
            id: "check-outage-test",
            label: "Offline transition and reconnect test passes on a low-cost Android device",
            status: "blocked",
          },
        ],
      },
      {
        id: "workstream-onboarding-trust",
        title: "Funded and auditable driver onboarding",
        objective:
          "Align authentication cost, verification decisions, and driver-facing review status.",
        priority: 2,
        status: "blocked",
        relatedGapIds: ["gap-sms-cost-conflict", "gap-driver-verification"],
        dependencyWorkstreamIds: [],
        tasks: [
          {
            id: "task-auth-cost-model",
            title: "Model SMS attempts, failures, retries, and pilot cost ceiling",
            ownerType: "finance",
            status: "not_started",
          },
          {
            id: "task-verification-states",
            title: "Define and implement driver verification state transitions",
            ownerType: "engineering",
            status: "not_started",
          },
        ],
        stakeholderActions: [
          {
            id: "action-auth-decision",
            stakeholder: "Finance and operations",
            action: "Approve a capped SMS budget or a tested alternative onboarding method.",
            decisionRequired: true,
          },
          {
            id: "action-review-owner",
            stakeholder: "Operations lead",
            action: "Name verification reviewers and a stalled-review escalation owner.",
            decisionRequired: true,
          },
        ],
        acceptanceCriteria: [
          {
            id: "criterion-auth-funded",
            statement: "Every supported onboarding path has an approved cost and tested failure path.",
            verification: "Finance sign-off and scripted delivery-failure test.",
          },
          {
            id: "criterion-verification-audit",
            statement:
              "Every pilot driver has a visible verification state, assigned reviewer, timestamped decision, and retained reason before ride access is granted.",
            verification: "Review five seeded approval/rejection scenarios in the audit history.",
          },
        ],
        risks: [
          {
            id: "risk-driver-blocked",
            description: "Authentication delivery or a stalled review could block eligible drivers.",
            exposure: "high",
            mitigation: {
              id: "mitigation-fallback-owner",
              action: "Define a funded fallback and a named review-escalation owner.",
              owner: "Operations lead",
            },
          },
        ],
        pilotChecklistItems: [
          {
            id: "check-sms-budget",
            label: "SMS cost ceiling or approved fallback is documented",
            status: "blocked",
          },
          {
            id: "check-verification-rehearsal",
            label: "Verification approval and rejection paths are rehearsed",
            status: "not_ready",
          },
        ],
      },
      {
        id: "workstream-transaction-controls",
        title: "Transaction and cancellation controls",
        objective:
          "Make wallet activity auditable and cancellation behavior operationally consistent.",
        priority: 3,
        status: "not_started",
        relatedGapIds: ["gap-wallet-reconciliation", "gap-cancellation-policy"],
        dependencyWorkstreamIds: [],
        tasks: [
          {
            id: "task-wallet-events",
            title: "Implement immutable wallet events and reconciliation export",
            ownerType: "engineering",
            status: "not_started",
          },
          {
            id: "task-cancellation-policy",
            title: "Encode the approved cancellation decision table",
            ownerType: "product",
            status: "blocked",
          },
        ],
        stakeholderActions: [
          {
            id: "action-cancellation-decision",
            stakeholder: "Product, operations, and finance",
            action: "Approve cancellation stages, fees, reasons, and support messaging.",
            decisionRequired: true,
          },
        ],
        acceptanceCriteria: [
          {
            id: "criterion-ledger-rebuild",
            statement:
              "Finance can reproduce each pilot wallet balance from ordered immutable events and identify every adjustment actor and reason.",
            verification: "Reconciliation test against seeded credits, debits, reversals, and adjustments.",
          },
          {
            id: "criterion-cancellation-matrix",
            statement: "Every ride stage has one approved, test-covered cancellation outcome.",
            verification: "Product decision-table review and transition test suite.",
          },
        ],
        risks: [
          {
            id: "risk-policy-delay",
            description: "Unresolved policy decisions may block consistent implementation.",
            exposure: "medium",
            mitigation: {
              id: "mitigation-policy-workshop",
              action: "Time-box a cross-functional decision workshop before engineering starts.",
              owner: "Product lead",
            },
          },
        ],
        pilotChecklistItems: [
          {
            id: "check-wallet-reconciliation",
            label: "Finance completes a seeded wallet reconciliation",
            status: "blocked",
          },
          {
            id: "check-cancellation-policy",
            label: "Cancellation decision table is approved",
            status: "blocked",
          },
        ],
      },
      {
        id: "workstream-support-readiness",
        title: "Pilot support and incident ownership",
        objective:
          "Give every pilot incident a severity, accountable owner, response target, and escalation path.",
        priority: 4,
        status: "blocked",
        relatedGapIds: ["gap-support-escalation"],
        dependencyWorkstreamIds: ["workstream-onboarding-trust", "workstream-transaction-controls"],
        tasks: [
          {
            id: "task-incident-model",
            title: "Define incident severity and escalation workflow",
            ownerType: "support",
            status: "not_started",
          },
          {
            id: "task-support-runbook",
            title: "Publish pilot support and after-hours runbook",
            ownerType: "operations",
            status: "not_started",
          },
        ],
        stakeholderActions: [
          {
            id: "action-after-hours-owner",
            stakeholder: "Pilot sponsor",
            action: "Assign after-hours incident ownership and approve response targets.",
            decisionRequired: true,
          },
        ],
        acceptanceCriteria: [
          {
            id: "criterion-support-drill",
            statement:
              "A pilot exercise routes urgent, payment, and routine scenarios to named owners within their approved acknowledgement targets.",
            verification: "Timed tabletop exercise with support, operations, finance, and engineering.",
          },
        ],
        risks: [
          {
            id: "risk-unclear-owner",
            description: "Shared ownership may still leave urgent incidents without a decision-maker.",
            exposure: "high",
            mitigation: {
              id: "mitigation-single-owner",
              action: "Assign one accountable role per incident level and publish a backup rota.",
              owner: "Pilot sponsor",
            },
          },
        ],
        pilotChecklistItems: [
          {
            id: "check-escalation-drill",
            label: "Urgent incident escalation drill meets response targets",
            status: "blocked",
          },
        ],
      },
    ],
    executiveBrief: {
      overallReadiness: readiness.status,
      readinessScore: readiness.score,
      summary:
        "MetroMove has a credible pilot objective, but it is not ready to expand. The highest-risk contradiction is the expectation of continuous ride visibility despite known connectivity loss and an online-only ride-state design. Onboarding funding, driver verification, wallet auditability, cancellation policy, and incident ownership also require decisions or implementation before scale-up.",
      criticalGapIds: gaps.filter((gap) => gap.severity === "critical").map((gap) => gap.id),
      decisionsRequired: [
        "Approve a funded authentication approach and cost ceiling.",
        "Assign verification reviewers and define driver review states.",
        "Approve cancellation stages, reasons, fees, and messaging.",
        "Name after-hours incident owners and response targets.",
      ],
      recommendedNextSteps: [
        "Prioritize offline ride-state delivery and validate it in a simulated coverage outage.",
        "Resolve authentication funding and verification ownership before expanding driver onboarding.",
        "Add wallet event history and complete a finance reconciliation rehearsal.",
        "Approve the cancellation matrix and incident escalation runbook before pilot expansion.",
      ],
    },
  },
};

export const metroMoveFixture = metroMoveFixtureSchema.parse(fixtureCandidate);

export function getEvidenceSource(sourceId: string) {
  return metroMoveFixture.evidenceSources.find((source) => source.id === sourceId);
}

export function getGap(gapIdOrSlug: string) {
  return metroMoveFixture.gaps.find(
    (gap) => gap.id === gapIdOrSlug || gap.slug === gapIdOrSlug,
  );
}
