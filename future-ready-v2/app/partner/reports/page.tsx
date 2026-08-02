const outcomes = [
  {
    label: "Communication Confidence",
    value: 89,
  },
  {
    label: "Career Awareness",
    value: 84,
  },
  {
    label: "Workplace Readiness",
    value: 86,
  },
  {
    label: "Professional Network Growth",
    value: 73,
  },
  {
    label: "Employer Engagement",
    value: 81,
  },
];

const reports = [
  {
    title: "Quarterly Student Readiness Report",
    period: "April–June 2026",
    status: "Ready",
  },
  {
    title: "Employer Partnership Impact Report",
    period: "2026 Year to Date",
    status: "Ready",
  },
  {
    title: "Ambassador Christian Cohort Report",
    period: "Fall 2026",
    status: "In Progress",
  },
  {
    title: "Regional Workforce Pipeline Report",
    period: "2026 Year to Date",
    status: "Ready",
  },
];

export default function PartnerReportsPage() {
  return (
    <div className="space-y-7">
      <section>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0B3B60]">
          Outcomes and Accountability
        </p>

        <h2 className="mt-2 text-3xl font-bold text-slate-950">
          Impact Reports
        </h2>

        <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
          Measure student growth, employer engagement, program completion, and
          regional workforce outcomes.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Students Served", "124"],
          ["Completion Rate", "91%"],
          ["Employer Experiences", "67"],
          ["Average Readiness", "86%"],
        ].map(([label, value]) => (
          <article
            key={label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm font-bold text-slate-500">
              {label}
            </p>

            <p className="mt-3 text-3xl font-bold text-slate-950">
              {value}
            </p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-bold text-[#0B3B60]">
            Student Outcomes
          </p>

          <h3 className="mt-1 text-xl font-bold text-slate-950">
            Readiness Growth
          </h3>

          <div className="mt-6 space-y-5">
            {outcomes.map((outcome) => (
              <div key={outcome.label}>
                <div className="flex items-center justify-between gap-4 text-sm">
                  <p className="font-bold text-slate-700">
                    {outcome.label}
                  </p>

                  <p className="font-bold text-[#0B3B60]">
                    {outcome.value}%
                  </p>
                </div>

                <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-[#0B3B60]"
                    style={{ width: `${outcome.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-bold text-[#0B3B60]">
            Available Reports
          </p>

          <h3 className="mt-1 text-xl font-bold text-slate-950">
            Report Library
          </h3>

          <div className="mt-5 space-y-4">
            {reports.map((report) => (
              <div
                key={report.title}
                className="rounded-xl border border-slate-200 p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-bold text-slate-900">
                      {report.title}
                    </p>

                    <p className="mt-2 text-sm text-slate-500">
                      {report.period}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      report.status === "Ready"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {report.status}
                  </span>
                </div>

                <button
                  type="button"
                  disabled={report.status !== "Ready"}
                  className="mt-4 w-full rounded-lg bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {report.status === "Ready"
                    ? "View Report"
                    : "Report Processing"}
                </button>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
