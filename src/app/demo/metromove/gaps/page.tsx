import type { Metadata } from "next";
import Link from "next/link";

import { EvidenceStrengthBadge, SeverityBadge, StatusBadge } from "@/components/badges";
import { ArrowRightIcon } from "@/components/icons";
import { PageHeader } from "@/components/page-header";
import { SourceCoverage } from "@/components/source-coverage";
import { orderGaps } from "@/domain/policies";
import { formatConfidence, humanize } from "@/lib/format";
import { metroMoveFixture } from "@fixtures/metromove";

export const metadata: Metadata = { title: "MetroMove Reality Gaps" };

export default function RealityGapsPage() {
  const gaps = orderGaps(metroMoveFixture.gaps);

  return (
    <div>
      <PageHeader
        eyebrow="Reality Gaps"
        title="The points where the pilot plan stops matching reality."
        description="Each gap is ordered by deterministic severity, deployment criticality, and evidence strength. Open a finding to inspect the exact sources behind it."
      />

      <div className="mt-6 flex flex-wrap items-center gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3 text-xs text-stone-500">
        <span className="font-semibold text-stone-700">Assessment policy</span>
        <span>Risk = impact × likelihood</span>
        <span aria-hidden="true">·</span>
        <span>Adjusted for deployment criticality and mitigation</span>
        <span aria-hidden="true">·</span>
        <span>Evidence diversity controls ordering</span>
      </div>

      <section aria-label="Prioritized Reality Gaps" className="mt-6 space-y-4">
        {gaps.map((gap, index) => (
          <article key={gap.id} className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
            <Link
              href={`/demo/metromove/gaps/${gap.slug}`}
              className="group block p-5 focus-visible:outline-2 focus-visible:outline-offset-[-2px] sm:p-6"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[10px] text-stone-400">{String(index + 1).padStart(2, "0")}</span>
                    <SeverityBadge severity={gap.severity} />
                    <EvidenceStrengthBadge strength={gap.evidenceStrength} />
                    <StatusBadge status={gap.status} />
                  </div>
                  <h2 className="mt-4 text-xl font-semibold tracking-[-0.025em] text-[#1a2b23] group-hover:text-[#205b43]">
                    {gap.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-stone-600">{gap.finding}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2 text-sm font-semibold text-[#276249]">
                  Inspect evidence
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
              <div className="mt-5 flex flex-col gap-4 border-t border-stone-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <SourceCoverage references={gap.references} />
                <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-stone-500">
                  <span>{formatConfidence(gap.confidence)} confidence</span>
                  <span>{gap.references.length} exact excerpts</span>
                  <span>{humanize(gap.type)}</span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
