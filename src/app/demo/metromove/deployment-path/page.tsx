import type { Metadata } from "next";
import Link from "next/link";

import { SeverityBadge, StatusBadge } from "@/components/badges";
import { ArrowRightIcon, CheckIcon, LinkIcon, WarningIcon } from "@/components/icons";
import { PageHeader } from "@/components/page-header";
import { humanize } from "@/lib/format";
import { metroMoveFixture } from "@fixtures/metromove";

export const metadata: Metadata = { title: "MetroMove Deployment Path" };

export default function DeploymentPathPage() {
  const { workstreams } = metroMoveFixture.deploymentPlan;

  return (
    <div>
      <PageHeader
        eyebrow="Deployment Path"
        title="Turn validated gaps into accountable implementation work."
        description="Workstreams are prioritized by pilot impact and linked directly to the Reality Gaps that created them. Engineering work and stakeholder decisions remain visibly separate."
      />

      <div className="mt-7 grid gap-3 sm:grid-cols-4">
        {workstreams.map((workstream) => (
          <a
            key={workstream.id}
            href={`#${workstream.id}`}
            className="rounded-xl border border-stone-200 bg-white p-4 hover:border-[#9fbbaa] focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <span className="font-mono text-[10px] text-stone-400">Priority {workstream.priority}</span>
            <p className="mt-2 text-sm font-semibold leading-5 text-stone-800">{workstream.title}</p>
          </a>
        ))}
      </div>

      <div className="mt-9 space-y-8">
        {workstreams.map((workstream) => {
          const relatedGaps = metroMoveFixture.gaps.filter((gap) =>
            workstream.relatedGapIds.includes(gap.id),
          );
          const dependencies = workstreams.filter((candidate) =>
            workstream.dependencyWorkstreamIds.includes(candidate.id),
          );

          return (
            <section
              key={workstream.id}
              id={workstream.id}
              className="scroll-mt-24 overflow-hidden rounded-2xl border border-stone-200 bg-white"
            >
              <header className="border-b border-stone-200 bg-[#fbfbf8] p-6 sm:p-7">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[#173e30] px-2.5 py-1 text-xs font-semibold text-white">
                        Priority {workstream.priority}
                      </span>
                      <StatusBadge status={workstream.status} />
                    </div>
                    <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-[#182a22]">
                      {workstream.title}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-stone-600">{workstream.objective}</p>
                  </div>
                  <div className="shrink-0 lg:max-w-xs">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-400">
                      Related gaps
                    </p>
                    <div className="mt-2 space-y-2">
                      {relatedGaps.map((gap) => (
                        <Link
                          key={gap.id}
                          href={`/demo/metromove/gaps/${gap.slug}`}
                          className="flex items-center gap-2 rounded-md text-xs font-semibold text-[#276249] hover:underline"
                        >
                          <SeverityBadge severity={gap.severity} />
                          <span>{gap.title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </header>

              <div className="grid gap-px bg-stone-200 lg:grid-cols-2">
                <div className="bg-white p-6 sm:p-7">
                  <h3 className="text-sm font-semibold text-stone-900">Implementation tasks</h3>
                  <ol className="mt-4 space-y-3">
                    {workstream.tasks.map((task, index) => (
                      <li key={task.id} className="flex gap-3 rounded-lg border border-stone-100 bg-stone-50/60 p-3.5">
                        <span className="mt-0.5 font-mono text-[10px] text-stone-400">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <p className="text-sm font-medium leading-5 text-stone-800">{task.title}</p>
                          <p className="mt-1 text-xs text-stone-500">
                            {humanize(task.ownerType)} · {humanize(task.status)}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="bg-white p-6 sm:p-7">
                  <h3 className="text-sm font-semibold text-stone-900">Stakeholder actions</h3>
                  <ul className="mt-4 space-y-3">
                    {workstream.stakeholderActions.map((action) => (
                      <li key={action.id} className="rounded-lg border border-[#d8cfc4] bg-[#fdfaf5] p-4">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#7b5e3f]">
                            {action.stakeholder}
                          </p>
                          {action.decisionRequired && (
                            <span className="rounded-full bg-[#f0e5d7] px-2 py-1 text-[10px] font-semibold text-[#765332]">
                              Decision required
                            </span>
                          )}
                        </div>
                        <p className="mt-2 text-sm leading-6 text-stone-700">{action.action}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid gap-6 border-t border-stone-200 p-6 sm:p-7 xl:grid-cols-[1.1fr_.9fr]">
                <div>
                  <div className="flex items-center gap-2 text-[#276249]">
                    <CheckIcon className="h-5 w-5" />
                    <h3 className="text-sm font-semibold">Acceptance criteria</h3>
                  </div>
                  <div className="mt-4 space-y-4">
                    {workstream.acceptanceCriteria.map((criterion) => (
                      <article key={criterion.id} className="rounded-xl border border-[#c8dacf] bg-[#f3f8f5] p-4">
                        <p className="text-sm font-medium leading-6 text-[#2b493c]">{criterion.statement}</p>
                        <p className="mt-2 text-xs leading-5 text-[#5f746b]">
                          <strong>Verify:</strong> {criterion.verification}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <div className="flex items-center gap-2 text-[#8a4b36]">
                      <WarningIcon className="h-4 w-4" />
                      <h3 className="text-sm font-semibold">Risks and mitigations</h3>
                    </div>
                    <div className="mt-3 space-y-3">
                      {workstream.risks.map((risk) => (
                        <article key={risk.id} className="rounded-lg border border-stone-200 p-4">
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-xs font-semibold text-stone-700">{humanize(risk.exposure)} exposure</p>
                            <span className="text-[10px] text-stone-400">Owner: {risk.mitigation.owner}</span>
                          </div>
                          <p className="mt-2 text-xs leading-5 text-stone-600">{risk.description}</p>
                          <p className="mt-2 border-t border-stone-100 pt-2 text-xs leading-5 text-[#34654f]">
                            {risk.mitigation.action}
                          </p>
                        </article>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-stone-900">Pilot checklist</h3>
                    <ul className="mt-3 space-y-2">
                      {workstream.pilotChecklistItems.map((item) => (
                        <li key={item.id} className="flex items-start gap-2.5 text-xs leading-5 text-stone-600">
                          <span
                            className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${item.status === "ready" ? "bg-emerald-500" : item.status === "blocked" ? "bg-red-500" : "bg-amber-500"}`}
                          />
                          <span>
                            {item.label} <span className="text-stone-400">· {humanize(item.status)}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {dependencies.length > 0 && (
                <footer className="flex flex-wrap items-center gap-2 border-t border-stone-200 bg-stone-50 px-6 py-4 text-xs text-stone-500 sm:px-7">
                  <LinkIcon className="h-3.5 w-3.5" />
                  <strong className="text-stone-700">Depends on:</strong>
                  {dependencies.map((dependency) => (
                    <a key={dependency.id} href={`#${dependency.id}`} className="font-semibold text-[#276249] hover:underline">
                      {dependency.title}
                    </a>
                  ))}
                </footer>
              )}
            </section>
          );
        })}
      </div>

      <section className="mt-8 rounded-2xl border border-[#173e30] bg-[#173e30] p-6 text-white sm:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#a9d1bf]">
              Decision view
            </p>
            <h2 className="mt-2 text-xl font-semibold">Summarize the path for pilot sponsors.</h2>
          </div>
          <Link
            href="/demo/metromove/executive-brief"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-[#173e30] hover:bg-[#eff6f2] focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Open Executive Brief
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
