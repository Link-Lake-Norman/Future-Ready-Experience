const students = [
  {
    name: "Jordan Matthews",
    cohort: "Ambassador Christian School",
    stage: "Develop",
    readiness: 92,
    status: "On Track",
  },
  {
    name: "Taylor Brooks",
    cohort: "Lake Norman Career Cohort",
    stage: "Explore",
    readiness: 86,
    status: "On Track",
  },
  {
    name: "Morgan Davis",
    cohort: "Regional Internship Pipeline",
    stage: "Connect",
    readiness: 74,
    status: "Needs Support",
  },
  {
    name: "Cameron Lee",
    cohort: "Post-Grad Career Launch",
    stage: "Launch",
    readiness: 95,
    status: "Opportunity Ready",
  },
  {
    name: "Avery Johnson",
    cohort: "Ambassador Christian School",
    stage: "Discover",
    readiness: 81,
    status: "On Track",
  },
  {
    name: "Riley Wilson",
    cohort: "Regional Internship Pipeline",
    stage: "Experience",
    readiness: 89,
    status: "Opportunity Ready",
  },
];

export default function PartnerStudentsPage() {
  return (
    <div className="space-y-7">
      <section>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0B3B60]">
          Student Network
        </p>

        <h2 className="mt-2 text-3xl font-bold text-slate-950">
          Student Readiness
        </h2>

        <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
          Review progress across partner organizations, identify students who
          need support, and see who is ready for employer-connected experiences.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-slate-500">
            Total Students
          </p>

          <p className="mt-3 text-3xl font-bold text-slate-950">
            124
          </p>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-slate-500">
            Opportunity Ready
          </p>

          <p className="mt-3 text-3xl font-bold text-emerald-700">
            46
          </p>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-slate-500">
            Need Intervention
          </p>

          <p className="mt-3 text-3xl font-bold text-amber-700">
            12
          </p>
        </article>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-5">
          <input
            type="search"
            placeholder="Search students, cohorts, or stages..."
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#0B3B60] focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                {[
                  "Student",
                  "Cohort",
                  "Current Stage",
                  "Readiness",
                  "Status",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {students.map((student) => (
                <tr
                  key={student.name}
                  className="transition hover:bg-slate-50"
                >
                  <td className="whitespace-nowrap px-5 py-4">
                    <p className="font-bold text-slate-900">
                      {student.name}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {student.cohort}
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                      {student.stage}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex min-w-36 items-center gap-3">
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-[#0B3B60]"
                          style={{ width: `${student.readiness}%` }}
                        />
                      </div>

                      <span className="text-sm font-bold text-slate-800">
                        {student.readiness}%
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        student.status === "Opportunity Ready"
                          ? "bg-emerald-50 text-emerald-700"
                          : student.status === "Needs Support"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
