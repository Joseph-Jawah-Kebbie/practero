import type { Metadata } from "next";
import Link from "next/link";

import { CategoryBadge } from "@/components/badges";
import { ArrowRightIcon, DocumentIcon } from "@/components/icons";
import { PageHeader } from "@/components/page-header";
import { formatDate } from "@/lib/format";
import { metroMoveFixture } from "@fixtures/metromove";

export const metadata: Metadata = { title: "MetroMove evidence" };

export default function EvidenceWorkspacePage() {
  return (
    <div>
      <PageHeader
        eyebrow="Evidence workspace"
        title="Five sources. Three realities. One traceable record."
        description="Browse the fictional materials used to build MetroMove’s sample Reality Map and gaps. Every quoted finding links back to this source text."
      />

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {metroMoveFixture.evidenceSources.map((source, index) => (
          <Link
            key={source.id}
            href={`/demo/metromove/evidence/${source.id}`}
            className={`group rounded-2xl border border-stone-200 bg-white p-6 transition-colors hover:border-[#a9c3b5] hover:bg-[#fcfdfc] focus-visible:outline-2 focus-visible:outline-offset-2 ${index === 4 ? "lg:col-span-2" : ""}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="rounded-lg border border-stone-200 bg-stone-50 p-2.5 text-[#32684f]">
                <DocumentIcon className="h-5 w-5" />
              </div>
              <span className="font-mono text-[11px] text-stone-400">0{index + 1}</span>
            </div>
            <div className="mt-6">
              <CategoryBadge category={source.category} />
              <h2 className="mt-4 text-lg font-semibold tracking-[-0.02em] text-stone-900 group-hover:text-[#205a42]">
                {source.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-stone-600">{source.summary}</p>
            </div>
            <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-stone-100 pt-4 text-xs text-stone-500">
              <div className="flex gap-1.5">
                <dt>Prepared by</dt>
                <dd className="font-medium text-stone-700">{source.authorRole}</dd>
              </div>
              <div className="flex gap-1.5">
                <dt>Date</dt>
                <dd className="font-medium text-stone-700">{formatDate(source.fictionalDate)}</dd>
              </div>
              <div className="flex gap-1.5">
                <dt>Length</dt>
                <dd className="font-medium text-stone-700">{source.characterCount.toLocaleString()} chars</dd>
              </div>
            </dl>
            <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#276249]">
              Inspect source
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        ))}
      </div>

      <aside className="mt-7 rounded-xl border border-stone-200 bg-[#f3f2ed] px-5 py-4 text-sm leading-6 text-stone-600">
        These files are fictional pasted-text fixtures. Upload, editing, persistence, and live analysis
        are intentionally outside this milestone.
      </aside>
    </div>
  );
}
