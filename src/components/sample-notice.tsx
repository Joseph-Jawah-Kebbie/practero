import { SparkIcon } from "@/components/icons";

export function SampleNotice() {
  return (
    <aside
      aria-label="Sample data disclosure"
      className="rounded-xl border border-[#d7dfd7] bg-[#f3f7f2] px-4 py-3 text-[#315346]"
    >
      <div className="flex items-start gap-2.5">
        <SparkIcon className="mt-0.5 h-4 w-4 shrink-0" />
        <div className="text-sm leading-6">
          <strong className="font-semibold text-[#173d30]">Sample analysis</strong>
          <span>
            {" "}— MetroMove, its evidence, and its findings are fictional validated fixtures. No
            live GPT-5.6 analysis or external service runs in this milestone.
          </span>
        </div>
      </div>
    </aside>
  );
}
