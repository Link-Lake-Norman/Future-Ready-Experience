const programs = [
  {
    name: "Launch Ready™",
    organization: "Ambassador Christian School",
    students: 20,
    progress: 34,
    phase: "Discover",
    status: "Active",
  },
  {
    name: "Future Ready™ Career Academy",
    organization: "Lake Norman Regional Network",
    students: 36,
    progress: 61,
    phase: "Explore",
    status: "Active",
  },
  {
    name: "Regional Internship Pipeline",
    organization: "Employer Collaborative",
    students: 42,
    progress: 78,
    phase: "Experience",
    status: "Active",
  },
  {
    name: "Post-Grad Career Launch",
    organization: "LINK Consulting Group",
    students: 26,
    progress: 91,
    phase: "Launch",
    status: "Active",
  },
];

export default function PartnerProgramsPage() {
  return (
    <div className="space-y-7">
      <section>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0B3B60]">
          Program Management
        </p>

        <h2 className="mt-2 text-3xl font-bold text-slate-950">
          Partner Programs
        </h2>

        <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
          View active cohorts, curriculum progress, participating organizations,
          and student engagement across each Future Ready™ implementation.
        </p>
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        {programs.map((program) => (
          <article
            key={program.name}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-[#0B3B60]">
                  {program.organization}
                </p>

                <h3 className="mt-2 text-xl font-bold text-slate-950">
                  {program.name}
                </h3>
              </div>

              <span className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                {program.status}
              </span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Students
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-950">
                  {program.students}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Current Phase
                </p>

                <p className="mt-2 text-lg font-bold text-slate-950">
                  {program.phase}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between text-sm">
                <p className="font-bold text-slate-700">
                  Program Progress
                </p>

                <p className="font-bold text-[#0B3B60]">
                  {program.progress}%
                </p>
              </div>

              <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-[#0B3B60]"
                  style={{ width: `${program.progress}%` }}
                />
              </div>
            </div>

            <button
              type="button"
              className="mt-6 w-full rounded-xl bg-[#0B3B60] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#145D86]"
            >
              Open Program
            </button>
          </article>
        ))}
      </section>
    </div>
  );
}
