"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { label: "Overview", href: "/demo/metromove", marker: "01" },
  { label: "Evidence", href: "/demo/metromove/evidence", marker: "02" },
  { label: "Reality Map", href: "/demo/metromove/reality-map", marker: "03" },
  { label: "Reality Gaps", href: "/demo/metromove/gaps", marker: "04" },
  { label: "Deployment Path", href: "/demo/metromove/deployment-path", marker: "05" },
  { label: "Executive Brief", href: "/demo/metromove/executive-brief", marker: "06" },
];

export function DemoNavigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="MetroMove demo" className="min-w-0">
      <ol className="flex gap-1 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
        {navigation.map((item) => {
          const isOverview = item.href === "/demo/metromove";
          const active = isOverview
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <li key={item.href} className="shrink-0 lg:shrink">
              <Link
                href={item.href}
                aria-label={item.label}
                aria-current={active ? "page" : undefined}
                className={`group flex items-center gap-3 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 lg:w-full ${
                  active
                    ? "border-[#9db9aa] bg-[#eff5f1] text-[#173e2f]"
                    : "border-transparent text-stone-500 hover:border-stone-200 hover:bg-white hover:text-stone-800"
                }`}
              >
                <span
                  className={`font-mono text-[10px] ${active ? "text-[#2e7658]" : "text-stone-400 group-hover:text-stone-500"}`}
                >
                  {item.marker}
                </span>
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
