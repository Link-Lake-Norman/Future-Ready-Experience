import Link from "next/link";
import type { ReactNode } from "react";

const navigation = [
  { href: "/partner/dashboard", label: "Dashboard", icon: "▦" },
  { href: "/partner/students", label: "Students", icon: "◎" },
  { href: "/partner/employers", label: "Employers", icon: "◇" },
  { href: "/partner/programs", label: "Programs", icon: "◆" },
  { href: "/partner/reports", label: "Reports", icon: "▤" },
];

export default function PartnerLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 flex-col bg-[#0B3B60] text-white lg:flex">
          <div className="border-b border-white/15 px-7 py-7">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-200">
              Future Ready™
            </p>

            <h1 className="mt-2 text-2xl font-bold">
              Partner Portal
            </h1>

            <p className="mt-2 text-sm leading-6 text-blue-100">
              Coordinate schools, employers, programs, and student outcomes.
            </p>
          </div>

          <nav className="flex-1 space-y-2 px-4 py-6">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-blue-50 transition hover:bg-white/15 hover:text-white"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-base">
                  {item.icon}
                </span>

                {item.label}
              </Link>
            ))}
          </nav>

          <div className="border-t border-white/15 p-5">
            <Link
              href="/"
              className="block rounded-xl border border-white/20 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Return Home
            </Link>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="border-b border-slate-200 bg-white px-5 py-4 shadow-sm lg:px-8">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0B3B60]">
                  Discover Purpose. Build Skills. Launch Your Future.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-bold text-slate-900">
                    Community Partner
                  </p>
                  <p className="text-xs text-slate-500">
                    Lake Norman Regional Network
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0B3B60] text-sm font-bold text-white">
                  CP
                </div>
              </div>
            </div>

            <nav className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:hidden">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="whitespace-nowrap rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </header>

          <main className="flex-1 px-5 py-7 lg:px-8">
            <div className="mx-auto max-w-7xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
