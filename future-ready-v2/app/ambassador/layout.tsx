import type { ReactNode } from "react";
import PlatformHeader from "@/components/PlatformHeader";

export default function AmbassadorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <PlatformHeader />

      <main className="mx-auto w-full max-w-7xl px-6 py-8">
        {children}
      </main>
    </div>
  );
}
