import type { Metadata } from "next";
import Link from "next/link";

import { SeverityBadge } from "@/components/badges";
import { ArrowRightIcon, CheckIcon, WarningIcon } from "@/components/icons";
import { PageHeader } from "@/components/page-header";
import { humanize } from "@/lib/format";
import { metroMoveFixture } from "@fixtures/metromove";

export const metadata: Metadata = { title: "MetroMove Executive Brief" };

export default function ExecutiveBriefPage() {
  const brief = metroMoveFixture.deploymentPlan.executiveBrief;
  const criticalGaps = metroMoveFixture.gaps.filter((gap) => brief.criticalGapIds.includes(gap.id));

  return (
    <div>
      <PageHeader
        eyebrow="Executive Brief"
        title="MetroMove pilot readiness decision"
        description="A concise view of the validated sample findings, decisions required, and recommended next steps for nontechnical sponsors."
      />

      <article className="mt-8 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-[0_18px_55px_rgba(33,48,40,0.08)]">
        <header className="grid gap-px bg-stone-200 lg:grid-cols-[1fr_240px]">
          <div className="bg-[#173e30] p-7 text-white sm:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a9d1bf]">
              Overall assessment
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em]">
              {humanize(brief.overallReadiness)}
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-7 text-[#d6e5dd]">{brief.summary}</p>
          </div>
          <div className="flex flex-col justify-center bg-[#fdf8f4] p-7 text-center">
            <span className="text-5xl font-semibold tracking-[-0.05em] text-red-800">{brief.readinessScore}</span>
            <span className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
              Readiness score
            </span>
            <span className="mt-1 text-xs text-stone-400">Deterministically derived</span>
          </div>
        </header>

        <div className="grid gap-px bg-stone-200 lg:grid-cols-2">
          <section className="bg-white p-7 sm:p-9">
            <div className="flex items-center gap-2 text-red-800">
              <WarningIcon className="h-5 w-5" />
              <h2 className="font-semibold">Most critical gap</h2>
            </div>
            <div className="mt-5 space-y-4">
              {criticalGaps.map((gap) => (
                <Link
                  key={gap.id}
                  href={`/demo/metromove/gaps/${gap.slug}`}
                  className="group block rounded-xl border border-red-100 bg-red-50/50 p-5 hover:border-red-200 focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  <SeverityBadge severity={gap.severity} />
                  <h3 className="mt-3 font-semibold leading-6 text-stone-900 group-hover:text-red-800">{gap.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-stone-600">{gap.businessImpact}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-red-800">
                    Inspect evidence
                    <ArrowRightIcon className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <section className="bg-white p-7 sm:p-9">
            <h2 className="font-semibold text-stone-900">Decisions required</h2>
            <ol className="mt-5 space-y-4">
              {brief.decisionsRequired.map((decision, index) => (
                <li key={decision} className="flex gap-3 text-sm leading-6 text-stone-700">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-stone-300 font-mono text-[10px] text-stone-500">
                    {index + 1}
                  </span>
                  {decision}
                </li>
              ))}
            </ol>
          </section>
        </div>

        <section className="border-t border-stone-200 p-7 sm:p-9">
          <div className="flex items-center gap-2 text-[#276249]">
            <CheckIcon className="h-5 w-5" />
            <h2 className="font-semibold">Recommended next steps</h2>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {brief.recommendedNextSteps.map((step, index) => (
              <div key={step} className="rounded-xl border border-[#cbdcd2] bg-[#f3f8f5] p-5">
                <span className="font-mono text-[10px] text-[#5d7d6d]">0{index + 1}</span>
                <p className="mt-3 text-sm font-medium leading-6 text-[#2f4b3f]">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="flex flex-col gap-4 border-t border-stone-200 bg-stone-50 px-7 py-5 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between sm:px-9">
          <p>Prepared from MetroMove fictional fixtures · Sample analysis · Version 1.0.0</p>
          <Link href="/demo/metromove/deployment-path" className="inline-flex items-center gap-2 font-semibold text-[#276249] hover:underline">
            Review complete Deployment Path
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>
        </footer>
      </article>

      <aside className="mt-6 rounded-xl border border-stone-200 bg-[#f3f2ed] px-5 py-4 text-xs leading-5 text-stone-500">
        This brief summarizes validated fictional sample data. It is not a live model result or a guarantee
        that the pilot is safe to launch.
      </aside>
    </div>
  );
}
