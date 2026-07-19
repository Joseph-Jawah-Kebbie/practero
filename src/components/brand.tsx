import Link from "next/link";

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 rounded-sm text-lg font-semibold tracking-[-0.02em] focus-visible:outline-2 focus-visible:outline-offset-4 ${inverse ? "text-white" : "text-[#14231d]"}`}
    >
      <span
        className={`grid h-7 w-7 grid-cols-2 gap-[3px] rounded-[7px] p-[5px] ${inverse ? "bg-white" : "bg-[#1f6048]"}`}
        aria-hidden="true"
      >
        <span className={`rounded-[2px] ${inverse ? "bg-[#1f6048]" : "bg-white"}`} />
        <span className={`rounded-[2px] ${inverse ? "bg-[#1f6048]/45" : "bg-white/45"}`} />
        <span className={`rounded-[2px] ${inverse ? "bg-[#1f6048]/45" : "bg-white/45"}`} />
        <span className={`rounded-[2px] ${inverse ? "bg-[#1f6048]" : "bg-white"}`} />
      </span>
      Practero
    </Link>
  );
}
