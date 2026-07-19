import Link from "next/link";

import { Brand } from "@/components/brand";
import {
  ArrowRightIcon,
  CheckIcon,
  DocumentIcon,
  LinkIcon,
  ShieldIcon,
} from "@/components/icons";

const realities = [
  {
    number: "01",
    title: "Organizational intent",
    description: "What leaders, policies, requirements, and commercial commitments say should happen.",
    accent: "border-violet-200 bg-violet-50/70",
  },
  {
    number: "02",
    title: "Field reality",
    description: "What frontline users and implementation teams report actually happens in practice.",
    accent: "border-orange-200 bg-orange-50/70",
  },
  {
    number: "03",
    title: "Technical reality",
    description: "What the current architecture, integrations, data, and product can support today.",
    accent: "border-teal-200 bg-teal-50/70",
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#f8f7f3]">
      <header className="border-b border-stone-200 bg-[#f8f7f3]">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Brand />
          <Link
            href="/demo/metromove"
            className="inline-flex items-center gap-2 rounded-lg border border-[#245f48] px-4 py-2 text-sm font-semibold text-[#194431] transition-colors hover:bg-[#edf5f0] focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Try MetroMove
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </header>

      <section className="border-b border-stone-200">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-18 sm:px-8 sm:py-24 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:py-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-semibold text-stone-600">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2c7557]" />
              Open implementation workspace
            </div>
            <h1 className="max-w-4xl text-balance text-5xl font-semibold leading-[1.03] tracking-[-0.055em] text-[#13231c] sm:text-6xl lg:text-7xl">
              Where plans meet reality.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-stone-600 sm:text-xl sm:leading-9">
              Practero helps forward-deployed teams compare what organizations say they need,
              what people experience in the field, and what the technology can actually support.
            </p>
            <p className="mt-4 max-w-xl text-base leading-7 text-stone-500">
              Then it turns the gaps into an evidence-backed deployment path.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/demo/metromove"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1f5f47] px-5 py-3 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(31,95,71,0.2)] transition-colors hover:bg-[#184c39] focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Try MetroMove Demo
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-lg border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-700 transition-colors hover:border-stone-400 hover:bg-stone-50 focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                See how it works
              </a>
            </div>
            <div className="mt-7 flex items-center gap-2 text-sm text-stone-500">
              <ShieldIcon className="h-4 w-4 text-[#36745b]" />
              No account required · Fictional, publish-safe sample data
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:mr-0">
            <div className="fine-grid absolute -inset-5 rounded-3xl opacity-50" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-[0_24px_70px_rgba(39,54,46,0.12)]">
              <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-400">
                    Reality Gap
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#1d332a]">Connectivity contradiction</p>
                </div>
                <span className="rounded-full border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-800">
                  Critical
                </span>
              </div>
              <div className="grid gap-px bg-stone-200 sm:grid-cols-3">
                {[
                  ["Intent", "Continuous ride updates are required."],
                  ["Field", "Drivers lose mobile data for 10–20 minutes."],
                  ["Technical", "No offline queue or reconnect sync exists."],
                ].map(([label, text], index) => (
                  <div key={label} className="bg-[#fbfbf9] p-4">
                    <p className="font-mono text-[10px] text-stone-400">0{index + 1} / {label}</p>
                    <p className="mt-3 text-sm leading-6 text-stone-700">“{text}”</p>
                  </div>
                ))}
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#2d6c52]">
                  <LinkIcon className="h-3.5 w-3.5" />
                  Evidence-backed action
                </div>
                <p className="mt-3 text-sm leading-6 text-stone-700">
                  Add durable local event queuing and idempotent reconnect synchronization before
                  the pilot expands.
                </p>
                <div className="mt-5 flex items-center gap-2 border-t border-stone-100 pt-4 text-xs text-stone-500">
                  <CheckIcon className="h-4 w-4 text-[#2a7557]" />
                  3 realities aligned · 3 exact excerpts
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-7xl px-5 py-18 sm:px-8 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#347159]">
              One implementation picture
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.035em] text-[#15271f] sm:text-4xl">
              Compare the three realities before committing the plan.
            </h2>
            <p className="mt-5 text-base leading-7 text-stone-600">
              Requirements alone are not a deployment strategy. Practero keeps every finding tied
              to the material that supports it.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {realities.map((reality) => (
              <article key={reality.title} className={`rounded-xl border p-5 ${reality.accent}`}>
                <p className="font-mono text-xs text-stone-500">{reality.number}</p>
                <h3 className="mt-8 text-lg font-semibold tracking-[-0.02em] text-stone-900">
                  {reality.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-stone-600">{reality.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-4 border-t border-stone-200 pt-12 sm:grid-cols-3">
          {[
            {
              icon: DocumentIcon,
              title: "Structure the evidence",
              text: "Turn unlike source materials into requirements, constraints, capabilities, and unresolved questions.",
            },
            {
              icon: LinkIcon,
              title: "Expose the gap",
              text: "Compare sources and keep the exact excerpt behind every contradiction, blocker, and risk.",
            },
            {
              icon: CheckIcon,
              title: "Build the path",
              text: "Translate validated gaps into prioritized workstreams, decisions, acceptance criteria, and pilot checks.",
            },
          ].map((item) => (
            <article key={item.title} className="rounded-xl border border-stone-200 bg-white p-6">
              <item.icon className="h-5 w-5 text-[#27664c]" />
              <h3 className="mt-5 font-semibold text-stone-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-stone-600">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-stone-200 bg-[#173e30] text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-7 px-5 py-12 sm:px-8 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a9d1bf]">
              Explore the sample engagement
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.025em]">
              See the full MetroMove evidence trail.
            </h2>
          </div>
          <Link
            href="/demo/metromove"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-[#173e30] hover:bg-[#edf5f1] focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Open MetroMove Demo
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-8 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>Practero · Open-source implementation workspace</p>
        <p>MetroMove is entirely fictional and provided for demonstration.</p>
      </footer>
    </main>
  );
}
