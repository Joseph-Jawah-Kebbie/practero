import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { EvidenceStrengthBadge, SeverityBadge, StatusBadge } from "@/components/badges";
import { EvidenceReferenceCard } from "@/components/evidence-reference-card";
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, LinkIcon, WarningIcon } from "@/components/icons";
import { SourceCoverage } from "@/components/source-coverage";
import { formatConfidence, humanize } from "@/lib/format";
import { getGap, metroMoveFixture } from "@fixtures/metromove";

type GapPageProps = { params: Promise<{ gapId: string }> };

export function generateStaticParams() {
  return metroMoveFixture.gaps.map((gap) => ({ gapId: gap.slug }));
}

export async function generateMetadata({ params }: GapPageProps): Promise<Metadata> {
  const { gapId } = await params;
  const gap = getGap(gapId);
  return { title: gap ? gap.title : "Reality Gap" };
}

export default async function GapDetailPage({ params }: GapPageProps) {
  const { gapId } = await params;
  const gap = getGap(gapId);
  if (!gap) notFound();

  const isConnectivity = gap.id === "gap-connectivity-contradiction";
  const relatedItems = metroMoveFixture.realityMapItems.filter((item) =>
    gap.relatedRealityMapItemIds.includes(item.id),
  );
  const workstream = metroMoveFixture.deploymentPlan.workstreams.find((candidate) =>
    candidate.relatedGapIds.includes(gap.id),
  );

  return (
    <div>
      <Link
        href="/demo/metromove/gaps"
        className="inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-stone-600 hover:text-[#236148] focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        All Reality Gaps
      </Link>

      <header className="mt-6 border-b border-stone-200 pb-8">
        <div className="flex flex-wrap items-center gap-2">
          <SeverityBadge severity={gap.severity} />
          <EvidenceStrengthBadge strength={gap.evidenceStrength} />
          <StatusBadge status={gap.status} />
          {isConnectivity && (
            <span className="rounded-full bg-[#173e30] px-2.5 py-1 text-xs font-semibold text-white">
              Pilot centerpiece
            </span>
          )}
        </div>
        <h1 className="mt-5 max-w-4xl text-balance text-3xl font-semibold tracking-[-0.04em] text-[#14231d] sm:text-5xl">
          {gap.title}
        </h1>
        <p className="mt-5 max-w-4xl text-lg leading-8 text-stone-600">{gap.finding}</p>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SourceCoverage references={gap.references} />
          <div className="flex gap-4 text-xs text-stone-500">
            <span>{formatConfidence(gap.confidence)} confidence</span>
            <span>{gap.references.length} validated excerpts</span>
          </div>
        </div>
      </header>

      <section aria-labelledby="evidence-alignment" className="mt-9">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#347159]">
              Source alignment
            </p>
            <h2 id="evidence-alignment" className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-stone-900">
              Why Practero raised this gap
            </h2>
          </div>
          <p className="max-w-md text-xs leading-5 text-stone-500">
            Every quote below is an exact substring of its linked fixture source and is checked against
            stable chunk offsets.
          </p>
        </div>
        <div className={`mt-5 grid gap-4 ${gap.references.length >= 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"}`}>
          {gap.references.map((reference) => (
            <EvidenceReferenceCard
              key={`${reference.chunkId}-${reference.startOffset}`}
              reference={reference}
              emphasis={isConnectivity}
            />
          ))}
        </div>
      </section>

      <section className="mt-9 grid gap-5 lg:grid-cols-2">
        <article className="rounded-2xl border border-stone-200 bg-white p-6">
          <div className="flex items-center gap-2 text-[#8a3d27]">
            <WarningIcon className="h-5 w-5" />
            <h2 className="font-semibold">Implementation impact</h2>
          </div>
          <div className="mt-5 space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-400">Operational / business</p>
              <p className="mt-2 text-sm leading-6 text-stone-700">{gap.businessImpact}</p>
            </div>
            {gap.technicalImpact && (
              <div className="border-t border-stone-100 pt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-400">Technical</p>
                <p className="mt-2 text-sm leading-6 text-stone-700">{gap.technicalImpact}</p>
              </div>
            )}
          </div>
        </article>

        <article className="rounded-2xl border border-[#bbd1c4] bg-[#f1f7f3] p-6">
          <div className="flex items-center gap-2 text-[#246148]">
            <CheckIcon className="h-5 w-5" />
            <h2 className="font-semibold">Recommended action</h2>
          </div>
          <p className="mt-5 text-sm leading-6 text-[#3e5b4e]">{gap.recommendedAction}</p>
          <div className="mt-5 border-t border-[#d4e2da] pt-5">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#4d7562]">
              Acceptance criteria
            </p>
            <ul className="mt-3 space-y-3">
              {gap.acceptanceCriteria.map((criterion) => (
                <li key={criterion} className="flex gap-2.5 text-sm leading-6 text-[#2f4d40]">
                  <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-[#2a7557]" />
                  {criterion}
                </li>
              ))}
            </ul>
          </div>
        </article>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
        <article className="rounded-xl border border-stone-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-stone-900">Deterministic assessment</h2>
          <dl className="mt-4 grid grid-cols-2 gap-4 text-xs">
            <div>
              <dt className="text-stone-500">Impact</dt>
              <dd className="mt-1 font-semibold text-stone-800">{gap.severityInputs.impact} / 4</dd>
            </div>
            <div>
              <dt className="text-stone-500">Likelihood</dt>
              <dd className="mt-1 font-semibold text-stone-800">{gap.severityInputs.likelihood} / 4</dd>
            </div>
            <div>
              <dt className="text-stone-500">Deployment-critical</dt>
              <dd className="mt-1 font-semibold text-stone-800">{gap.severityInputs.deploymentCriticality ? "Yes" : "No"}</dd>
            </div>
            <div>
              <dt className="text-stone-500">Current mitigation</dt>
              <dd className="mt-1 font-semibold text-stone-800">{humanize(gap.severityInputs.mitigation)}</dd>
            </div>
          </dl>
        </article>

        <article className="rounded-xl border border-stone-200 bg-white p-5">
          <div className="flex items-center gap-2">
            <LinkIcon className="h-4 w-4 text-[#2b6d52]" />
            <h2 className="text-sm font-semibold text-stone-900">Related Reality Map items</h2>
          </div>
          <ul className="mt-4 space-y-3">
            {relatedItems.map((item) => (
              <li key={item.id} className="flex items-start justify-between gap-4 text-sm">
                <span className="leading-6 text-stone-700">{item.statement}</span>
                <span className="shrink-0 rounded-md bg-stone-100 px-2 py-1 text-[10px] font-semibold text-stone-500">
                  {humanize(item.kind)}
                </span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      {workstream && (
        <section className="mt-8 rounded-2xl border border-[#173e30] bg-[#173e30] p-6 text-white sm:p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#a9d1bf]">
                Linked deployment workstream
              </p>
              <h2 className="mt-2 text-xl font-semibold">{workstream.title}</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#d4e5dc]">{workstream.objective}</p>
            </div>
            <Link
              href={`/demo/metromove/deployment-path#${workstream.id}`}
              className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-[#173e30] hover:bg-[#eff6f2] focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Open Deployment Path
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
