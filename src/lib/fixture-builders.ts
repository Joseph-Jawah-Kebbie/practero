import type {
  EvidenceCategory,
  EvidenceReference,
  EvidenceSource,
} from "@/domain/types";

export function deterministicFixtureId(text: string): string {
  let hash = 0x811c9dc5;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return `fixture-${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

export function createEvidenceSource(input: {
  id: string;
  title: string;
  category: EvidenceCategory;
  authorRole: string;
  fictionalDate: string;
  summary: string;
  text: string;
}): EvidenceSource {
  const contentHash = deterministicFixtureId(input.text);
  const chunkId = `${input.id}-chunk-01`;

  return {
    ...input,
    sourceType: "pasted_text",
    characterCount: input.text.length,
    contentHash,
    chunks: [
      {
        id: chunkId,
        sourceId: input.id,
        index: 0,
        text: input.text,
        sourceStartOffset: 0,
        sourceEndOffset: input.text.length,
        contentHash,
      },
    ],
  };
}

export function createEvidenceReference(
  source: EvidenceSource,
  excerpt: string,
): EvidenceReference {
  const chunk = source.chunks[0];
  if (!chunk) throw new Error(`Fixture source ${source.id} has no chunks.`);
  const startOffset = chunk.text.indexOf(excerpt);
  if (startOffset < 0) {
    throw new Error(`Fixture excerpt was not found in ${source.id}: ${excerpt}`);
  }

  return {
    sourceId: source.id,
    sourceTitle: source.title,
    sourceCategory: source.category,
    chunkId: chunk.id,
    excerpt,
    startOffset,
    endOffset: startOffset + excerpt.length,
    contentHash: chunk.contentHash,
  };
}
