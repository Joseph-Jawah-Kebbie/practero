import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CategoryBadge } from "@/components/badges";
import { ArrowLeftIcon, LinkIcon } from "@/components/icons";
import { formatDate } from "@/lib/format";
import { getEvidenceSource, metroMoveFixture } from "@fixtures/metromove";

type SourcePageProps = { params: Promise<{ sourceId: string }> };

export function generateStaticParams() {
  return metroMoveFixture.evidenceSources.map((source) => ({ sourceId: source.id }));
}

export async function generateMetadata({ params }: SourcePageProps): Promise<Metadata> {
  const { sourceId } = await params;
  const source = getEvidenceSource(sourceId);
  return { title: source ? source.title : "Evidence source" };
}

export default async function EvidenceSourcePage({ params }: SourcePageProps) {
  const { sourceId } = await params;
  const source = getEvidenceSource(sourceId);
  if (!source) notFound();

  const referenceCount = [
    ...metroMoveFixture.realityMapItems.flatMap((item) => item.references),
    ...metroMoveFixture.gaps.flatMap((gap) => gap.references),
  ].filter((reference) => reference.sourceId === source.id).length;
  const paragraphs = source.text.split("\n\n");

  return (
    <div>
      <Link
        href="/demo/metromove/evidence"
        className="inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-stone-600 hover:text-[#236148] focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        All evidence sources
      </Link>

      <header className="mt-6 border-b border-stone-200 pb-7">
        <CategoryBadge category={source.category} />
        <h1 className="mt-4 max-w-4xl text-balance text-3xl font-semibold tracking-[-0.035em] text-[#14231d] sm:text-4xl">
          {source.title}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-stone-600">{source.summary}</p>
      </header>

      <div className="mt-8 grid gap-7 xl:grid-cols-[minmax(0,1fr)_280px]">
        <article id="source-text" className="scroll-mt-24 rounded-2xl border border-stone-200 bg-white p-6 sm:p-9">
          <div className="mb-7 flex items-center justify-between gap-4 border-b border-stone-100 pb-5">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-stone-400">
                Complete extracted text
              </h2>
              <p className="mt-1 text-xs text-stone-500">Fictional fixture · no original file retained</p>
            </div>
            <span className="rounded-md bg-[#edf5f0] px-2.5 py-1 text-xs font-semibold text-[#286149]">
              Validated
            </span>
          </div>
          <div className="document-text max-w-3xl text-[15px] leading-8 text-stone-700">
            {paragraphs.map((paragraph, index) =>
              index === 0 ? (
                <h3 key={paragraph} className="mb-6 text-xl font-semibold tracking-[-0.02em] text-stone-900">
                  {paragraph}
                </h3>
              ) : (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ),
            )}
          </div>
        </article>

        <aside className="space-y-4">
          <div className="rounded-xl border border-stone-200 bg-white p-5">
            <h2 className="text-sm font-semibold text-stone-900">Source metadata</h2>
            <dl className="mt-4 space-y-4 text-xs">
              <div>
                <dt className="text-stone-500">Stakeholder role</dt>
                <dd className="mt-1 font-semibold text-stone-800">{source.authorRole}</dd>
              </div>
              <div>
                <dt className="text-stone-500">Fictional date</dt>
                <dd className="mt-1 font-semibold text-stone-800">{formatDate(source.fictionalDate)}</dd>
              </div>
              <div>
                <dt className="text-stone-500">Stable source ID</dt>
                <dd className="mt-1 break-all font-mono text-[11px] text-stone-700">{source.id}</dd>
              </div>
              <div>
                <dt className="text-stone-500">Fixture content ID</dt>
                <dd className="mt-1 font-mono text-[11px] text-stone-700">{source.contentHash}</dd>
              </div>
              <div>
                <dt className="text-stone-500">Chunks</dt>
                <dd className="mt-1 font-semibold text-stone-800">{source.chunks.length}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-xl border border-[#bfd3c7] bg-[#f0f6f2] p-5">
            <LinkIcon className="h-4 w-4 text-[#2c6c51]" />
            <p className="mt-3 text-sm font-semibold text-[#173d2e]">Traceability usage</p>
            <p className="mt-2 text-xs leading-5 text-[#50675d]">
              This source contributes {referenceCount} exact reference{referenceCount === 1 ? "" : "s"} across the sample Reality Map and gap set.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
