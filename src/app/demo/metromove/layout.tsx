import Link from "next/link";

import { Brand } from "@/components/brand";
import { DemoNavigation } from "@/components/demo-navigation";
import { SampleNotice } from "@/components/sample-notice";
import { ArrowLeftIcon } from "@/components/icons";
import { metroMoveFixture } from "@fixtures/metromove";

export default function MetroMoveLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f8f7f3]">
      <a
        href="#main-content"
        className="sr-only z-50 rounded-md bg-white px-4 py-2 text-sm font-semibold text-[#173e30] shadow-lg focus:fixed focus:top-4 focus:left-4 focus:not-sr-only focus:outline-2 focus:outline-offset-2"
      >
        Skip to demo content
      </a>
      <header className="sticky top-0 z-30 border-b border-stone-200 bg-[#f8f7f3]/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between gap-5 px-4 sm:px-6 lg:px-8">
          <Brand />
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-stone-500 sm:inline">
              {metroMoveFixture.engagement.organizationName} · {metroMoveFixture.engagement.fixtureVersion}
            </span>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium text-stone-600 hover:bg-white hover:text-stone-900 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Practero</span>
              <span className="sm:hidden">Exit</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] lg:grid lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="border-b border-stone-200 bg-[#f4f3ee] px-4 py-4 sm:px-6 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:border-r lg:border-b-0 lg:px-5 lg:py-7">
          <div className="mb-5 hidden lg:block">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-400">
              Sample engagement
            </p>
            <p className="mt-2 text-base font-semibold text-[#182a22]">MetroMove pilot</p>
            <p className="mt-1 text-xs leading-5 text-stone-500">Urban mobility · Pilot stage</p>
          </div>
          <DemoNavigation />
          <div className="mt-6 hidden border-t border-stone-200 pt-5 text-xs leading-5 text-stone-500 lg:block">
            <p className="font-semibold text-stone-700">Traceability status</p>
            <p className="mt-1">All displayed findings link to exact fixture excerpts.</p>
          </div>
        </aside>

        <main id="main-content" className="min-w-0 px-4 py-8 sm:px-6 lg:px-10 lg:py-10 xl:px-14">
          <div className="mx-auto max-w-[1180px]">
            <div className="mb-6">
              <SampleNotice />
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
