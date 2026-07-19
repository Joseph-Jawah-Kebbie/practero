import type { Metadata } from "next";
import Link from "next/link";

import { CategoryBadge, SeverityBadge } from "@/components/badges";
import { ArrowRightIcon, CheckIcon, DocumentIcon, WarningIcon } from "@/components/icons";
import { PageHeader } from "@/components/page-header";
import { SampleNotice } from "@/components/sample-notice";
import { orderGaps } from "@/domain/policies";
import { humanize } from "@/lib/format";
import { metroMoveFixture } from "@fixtures/metromove";

export const metadata: Metadata = { title: "MetroMove overview" };

export default function MetroMoveOverviewPage() {
  const { engagement, evidenceSources, gaps, realityMapItems } = metroMoveFixture;
  const orderedGaps = orderGaps(gaps);
  const severityCounts = orderedGaps.reduce(
    (counts, gap) => ({ ...counts, [gap.severity]: counts[gap.severity] + 1 }),
    { critical: 0, high: 0, medium: 0, low: 0 },
  );

  return (
    <div>
      <PageHeader
        eyebrow="Engagement overview"
        title={engagement.title}
        description={engagement.objective}
        actions={
          <Link
            href="/demo/metromove/gaps"
            className="inline-flex items-center gap-2 rounded-lg bg-[#1f5f47] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#194c39] focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Review Reality Gaps
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        }
      />

      <div className="mt-6">
        <SampleNotice />
      </div>

      <section aria-labelledby="readiness-heading" className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
        <div className="rounded-2xl border border-[#d8c5bd] bg-[#fffaf7] p-6 sm:p-7">
          <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-start">
            <div>
              <div className="flex items-center gap-2 text-red-800">
                <WarningIcon className="h-5 w-5" />
                <p className="text-xs font-semibold uppercase tracking-[0.15em]">Readiness assessment</p>
              </div>
              <h2 id="readiness-heading" className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-[#32211a]">
                {humanize(engagement.readinessStatus)}
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-stone-600">
                One critical contradiction and four high-priority gaps remain open. Pilot expansion
                should wait until ride-state resilience and core operating controls are validated.
              </p>
            </div>
            <div className="shrink-0 rounded-xl border border-red-200 bg-white px-5 py-4 text-center">
              <span className="block text-4xl font-semibold tracking-[-0.04em] text-red-800">
                {engagement.readinessScore}
              </span>
              <span className="mt-1 block text-xs font-medium text-stone-500">out of 100</span>
            </div>
          </div>
          <div className="mt-7 h-2 overflow-hidden rounded-full bg-stone-200" aria-hidden="true">
            <div
              className="h-full rounded-full bg-red-700"
              style={{ width: `${engagement.readinessScore}%` }}
            />
          </div>
          <p className="mt-3 text-xs leading-5 text-stone-500">
            Derived from unresolved gap severity: −25 critical, −12 high, −5 medium, −2 low.
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-stone-400">
            Engagement context
          </p>
          <dl className="mt-5 grid grid-cols-2 gap-x-5 gap-y-5 text-sm">
            <div>
              <dt className="text-stone-500">Organization</dt>
              <dd className="mt-1 font-semibold text-stone-900">{engagement.organizationName}</dd>
            </div>
            <div>
              <dt className="text-stone-500">Stage</dt>
              <dd className="mt-1 font-semibold text-stone-900">{humanize(engagement.deploymentStage)}</dd>
            </div>
            <div>
              <dt className="text-stone-500">Industry</dt>
              <dd className="mt-1 font-semibold text-stone-900">{engagement.industry}</dd>
            </div>
            <div>
              <dt className="text-stone-500">Status</dt>
              <dd className="mt-1 font-semibold text-stone-900">{humanize(engagement.status)}</dd>
            </div>
          </dl>
          <div className="mt-6 border-t border-stone-100 pt-5">
            <p className="text-xs text-stone-500">Expected outcome</p>
            <p className="mt-2 text-sm leading-6 text-stone-700">{engagement.expectedOutcome}</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="signals-heading" className="mt-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#37745c]">
              Evidence snapshot
            </p>
            <h2 id="signals-heading" className="mt-2 text-2xl font-semibold tracking-[-0.025em] text-[#172820]">
              What the sample currently shows
            </h2>
          </div>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { value: evidenceSources.length, label: "Evidence sources", sub: "Across all three realities" },
            { value: realityMapItems.length, label: "Reality Map items", sub: "Structured and traceable" },
            { value: gaps.length, label: "Open Reality Gaps", sub: "Prioritized for pilot readiness" },
            { value: metroMoveFixture.deploymentPlan.workstreams.length, label: "Workstreams", sub: "Linked back to gaps" },
          ].map((metric) => (
            <div key={metric.label} className="rounded-xl border border-stone-200 bg-white p-5">
              <p className="text-3xl font-semibold tracking-[-0.04em] text-[#18372b]">{metric.value}</p>
              <p className="mt-3 text-sm font-semibold text-stone-800">{metric.label}</p>
              <p className="mt-1 text-xs leading-5 text-stone-500">{metric.sub}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
        <div className="rounded-2xl border border-stone-200 bg-white">
          <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4 sm:px-6">
            <div>
              <h2 className="font-semibold text-stone-900">Priority gaps</h2>
              <p className="mt-1 text-xs text-stone-500">Ordered by severity, criticality, and evidence strength</p>
            </div>
            <Link href="/demo/metromove/gaps" className="text-sm font-semibold text-[#276249] hover:underline">
              View all
            </Link>
          </div>
          <div className="divide-y divide-stone-100">
            {orderedGaps.slice(0, 4).map((gap) => (
              <Link
                key={gap.id}
                href={`/demo/metromove/gaps/${gap.slug}`}
                className="group flex items-center justify-between gap-4 px-5 py-4 hover:bg-[#fafbf9] focus-visible:outline-2 focus-visible:outline-offset-[-2px] sm:px-6"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <SeverityBadge severity={gap.severity} />
                    <span className="text-xs text-stone-400">{humanize(gap.type)}</span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-stone-800 group-hover:text-[#215c44]">
                    {gap.title}
                  </p>
                </div>
                <ArrowRightIcon className="h-4 w-4 shrink-0 text-stone-300 group-hover:text-[#276249]" />
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6">
          <div className="flex items-center gap-2">
            <DocumentIcon className="h-5 w-5 text-[#2b6d52]" />
            <h2 className="font-semibold text-stone-900">Evidence coverage</h2>
          </div>
          <div className="mt-5 space-y-4">
            {(["organizational_intent", "field_reality", "technical_reality"] as const).map((category) => {
              const count = evidenceSources.filter((source) => source.category === category).length;
              return (
                <div key={category} className="flex items-center justify-between gap-4">
                  <CategoryBadge category={category} />
                  <span className="text-sm font-semibold text-stone-700">{count} source{count === 1 ? "" : "s"}</span>
                </div>
              );
            })}
          </div>
          <Link
            href="/demo/metromove/evidence"
            className="mt-6 inline-flex items-center gap-2 rounded-lg border border-stone-300 px-4 py-2.5 text-sm font-semibold text-stone-700 hover:border-stone-400 hover:bg-stone-50 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Browse all evidence
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-[#bfd3c7] bg-[#f0f6f2] p-6 sm:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#2b6d52]" />
            <div>
              <h2 className="font-semibold text-[#183e2f]">Next recommended review</h2>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-[#4d665b]">
                Inspect how the connectivity contradiction aligns management expectations, driver
                conditions, and current architecture before opening its deployment workstream.
              </p>
            </div>
          </div>
          <Link
            href="/demo/metromove/gaps/connectivity-contradiction"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#1f5f47] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#194c39] focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Open connectivity gap
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
