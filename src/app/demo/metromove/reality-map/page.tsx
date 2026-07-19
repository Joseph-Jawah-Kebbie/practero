import type { Metadata } from "next";
import Link from "next/link";

import { CategoryBadge, StatusBadge } from "@/components/badges";
import { ExternalLinkIcon, LinkIcon } from "@/components/icons";
import { PageHeader } from "@/components/page-header";
import type { RealityMapItem } from "@/domain/types";
import { formatConfidence, humanize } from "@/lib/format";
import { metroMoveFixture } from "@fixtures/metromove";

export const metadata: Metadata = { title: "MetroMove Reality Map" };

const sectionOrder: RealityMapItem["kind"][] = [
  "requirement",
  "stakeholder_need",
  "assumption",
  "constraint",
  "capability",
  "pain_point",
  "expected_outcome",
  "open_question",
  "claim",
];

export default function RealityMapPage() {
  const sections = sectionOrder
    .map((kind) => ({
      kind,
      items: metroMoveFixture.realityMapItems.filter((item) => item.kind === kind),
    }))
    .filter((section) => section.items.length > 0);

  return (
    <div>
      <PageHeader
        eyebrow="Reality Map"
        title="Structured findings, anchored to the source."
        description="The map separates requirements, constraints, assumptions, current capabilities, and unresolved questions before cross-source gaps are assessed."
      />

      <div className="mt-8 grid gap-5 xl:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="hidden xl:block">
          <div className="sticky top-24 rounded-xl border border-stone-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-400">
              Map sections
            </p>
            <nav className="mt-3" aria-label="Reality Map sections">
              <ul className="space-y-1">
                {sections.map((section) => (
                  <li key={section.kind}>
                    <a
                      href={`#${section.kind}`}
                      className="flex items-center justify-between rounded-md px-2 py-2 text-sm text-stone-600 hover:bg-stone-50 hover:text-stone-900 focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                      {humanize(section.kind)}
                      <span className="font-mono text-[10px] text-stone-400">{section.items.length}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        <div className="space-y-8">
          {sections.map((section) => (
            <section key={section.kind} id={section.kind} className="scroll-mt-24">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold tracking-[-0.02em] text-stone-900">
                  {humanize(section.kind)}s
                </h2>
                <span className="text-xs text-stone-400">{section.items.length} mapped</span>
              </div>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <article key={item.id} className="rounded-xl border border-stone-200 bg-white p-5 sm:p-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <StatusBadge status={item.status} />
                        <span className="text-xs text-stone-400">
                          {formatConfidence(item.confidence)} extraction confidence
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-stone-400">{item.id}</span>
                    </div>
                    <p className="mt-4 text-base font-medium leading-7 text-[#26372f]">{item.statement}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.stakeholders.map((stakeholder) => (
                        <span key={stakeholder} className="rounded-md bg-stone-100 px-2 py-1 text-xs text-stone-600">
                          {stakeholder}
                        </span>
                      ))}
                    </div>
                    <details className="group mt-5 border-t border-stone-100 pt-4">
                      <summary className="flex cursor-pointer list-none items-center gap-2 rounded-sm text-sm font-semibold text-[#276249] focus-visible:outline-2 focus-visible:outline-offset-2">
                        <LinkIcon className="h-4 w-4" />
                        {item.references.length} supporting excerpt{item.references.length === 1 ? "" : "s"}
                        <span className="ml-1 text-xs text-stone-400 group-open:hidden">Show</span>
                        <span className="ml-1 hidden text-xs text-stone-400 group-open:inline">Hide</span>
                      </summary>
                      <div className="mt-4 space-y-3">
                        {item.references.map((reference) => (
                          <blockquote
                            key={`${reference.chunkId}-${reference.startOffset}`}
                            className="rounded-lg border border-stone-200 bg-[#fafaf8] p-4"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <CategoryBadge category={reference.sourceCategory} />
                              <Link
                                href={`/demo/metromove/evidence/${reference.sourceId}#source-text`}
                                className="inline-flex items-center gap-1 text-xs font-semibold text-[#276249] hover:underline"
                              >
                                {reference.sourceTitle}
                                <ExternalLinkIcon className="h-3 w-3" />
                              </Link>
                            </div>
                            <p className="mt-3 text-sm leading-6 text-stone-700">“{reference.excerpt}”</p>
                          </blockquote>
                        ))}
                      </div>
                    </details>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
