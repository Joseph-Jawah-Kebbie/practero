import Link from "next/link";

import { CategoryBadge } from "@/components/badges";
import { ExternalLinkIcon } from "@/components/icons";
import type { EvidenceReference } from "@/domain/types";

export function EvidenceReferenceCard({
  reference,
  emphasis = false,
}: {
  reference: EvidenceReference;
  emphasis?: boolean;
}) {
  return (
    <article
      className={`flex h-full flex-col rounded-xl border bg-white p-5 ${
        emphasis ? "border-[#9fbfaf] shadow-[0_10px_30px_rgba(30,72,54,0.08)]" : "border-stone-200"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <CategoryBadge category={reference.sourceCategory} />
        <span className="font-mono text-[10px] text-stone-400">
          {reference.chunkId.replace("-chunk-", " · ")}
        </span>
      </div>
      <blockquote className="my-5 flex-1 text-[15px] leading-7 text-[#263b32]">
        “{reference.excerpt}”
      </blockquote>
      <div className="border-t border-stone-100 pt-4">
        <p className="text-sm font-semibold text-stone-800">{reference.sourceTitle}</p>
        <Link
          href={`/demo/metromove/evidence/${reference.sourceId}#source-text`}
          className="mt-2 inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold text-[#236148] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Open complete source
          <ExternalLinkIcon className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}
