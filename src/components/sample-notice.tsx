import { SparkIcon } from "@/components/icons";

export function SampleNotice({ compact = false }: { compact?: boolean }) {
  return (
    <aside
      aria-label="Sample data disclosure"
      className={`border border-[#d7dfd7] bg-[#f3f7f2] text-[#315346] ${compact ? "rounded-lg px-3 py-2" : "rounded-xl px-4 py-3"}`}
    >
      <div className="flex items-start gap-2.5">
        <SparkIcon className="mt-0.5 h-4 w-4 shrink-0" />
        <div className={compact ? "text-xs leading-5" : "text-sm leading-6"}>
          <strong className="font-semibold text-[#173d30]">Sample analysis</strong>
          {!compact && (
            <span>
              {" "}— MetroMove, its evidence, and its findings are fictional validated fixtures. Live
              GPT-5.6 analysis will be introduced in a later milestone.
            </span>
          )}
        </div>
      </div>
    </aside>
  );
}
