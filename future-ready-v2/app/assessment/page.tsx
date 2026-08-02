import Link from "next/link";

export default function AssessmentPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <section className="rounded-3xl bg-[#0B3B60] p-10 text-white shadow-lg">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-200">
            Future Ready™
          </p>

          <h1 className="mt-3 text-4xl font-bold">
            Assessment Center
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-blue-50">
            Discover your strengths, communication style, career readiness,
            and next steps for building your future.
          </p>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-3">
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-wide text-[#0B3B60]">
              Self-Discovery
            </p>

            <h2 className="mt-3 text-2xl font-bold text-slate-950">
              Strengths Assessment
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              Identify the abilities and working styles you naturally bring
              to teams, classrooms, and workplaces.
            </p>

            <Link
              href="/assessment/strengths"
              className="mt-6 inline-flex rounded-xl bg-[#0B3B60] px-5 py-3 font-bold text-white"
            >
              Begin Assessment
            </Link>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-wide text-[#0B3B60]">
              Professional Skills
            </p>

            <h2 className="mt-3 text-2xl font-bold text-slate-950">
              Communication Style
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              Understand how you express ideas, listen, collaborate, and
              respond during professional conversations.
            </p>

            <Link
              href="/assessment/communication"
              className="mt-6 inline-flex rounded-xl bg-[#0B3B60] px-5 py-3 font-bold text-white"
            >
              Begin Assessment
            </Link>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-wide text-[#0B3B60]">
              Workforce Readiness
            </p>

            <h2 className="mt-3 text-2xl font-bold text-slate-950">
              Career Readiness
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              Measure your confidence across workplace behavior, career
              direction, communication, and experience.
            </p>

            <Link
              href="/assessment/career-readiness"
              className="mt-6 inline-flex rounded-xl bg-[#0B3B60] px-5 py-3 font-bold text-white"
            >
              Begin Assessment
            </Link>
          </article>
        </section>

        <Link
          href="/"
          className="mt-8 inline-flex font-bold text-[#0B3B60]"
        >
          ← Return to Future Ready™
        </Link>
      </div>
    </main>
  );
}
