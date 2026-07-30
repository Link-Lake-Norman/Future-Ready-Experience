import Link from "next/link";

const metrics = [
  {
    label: "Active Students",
    value: "124",
    detail: "Across 6 active cohorts",
    accent: "bg-blue-50 text-blue-700",
  },
  {
    label: "Employer Partners",
    value: "38",
    detail: "12 currently hosting experiences",
    accent: "bg-emerald-50 text-emerald-700",
  },
  {
    label: "Programs",
    value: "7",
    detail: "5 active and 2 upcoming",
    accent: "bg-violet-50 text-violet-700",
  },
  {
    label: "Readiness Rate",
    value: "86%",
    detail: "Up 8% this quarter",
    accent: "bg-amber-50 text-amber-700",
  },
];

const upcomingItems = [
  {
    title: "Employer Partner Roundtable",
    date: "August 6",
    type: "Employer Engagement",
  },
  {
    title: "Facilitator Progress Review",
    date: "August 12",
    type: "Program Management",
  },
  {
    title: "Student Career Experience Day",
    date: "August 20",
    type: "Student Experience",
  },
];

const activity = [
  {
    title: "Ambassador Christian cohort attendance updated",
    detail: "20 student records were reviewed.",
    time: "Today",
  },
  {
    title: "New employer partner added",
    detail: "Lake Norman Advanced Manufacturing Group joined the network.",
    time: "Yesterday",
  },
  {
    title: "Student readiness report completed",
    detail: "Quarterly outcomes are ready for review.",
    time: "2 days ago",
  },
];

export default function PartnerDashboardPage() {
  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-[#0B3B60] to-[#145D86] p-7 text-white shadow-lg lg:p-10">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-200">
            Regional Partnership Center
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight lg:text-4xl">
            Build the ecosystem around every student.
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-7 text-blue-50">
            Monitor student readiness, coordinate employer participation, manage
            programs, and measure the outcomes generated across your Future
            Ready™ network.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/partner/students"
              className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#0B3B60] shadow-sm transition hover:bg-blue-50"
            >
              View Students
            </Link>

            <Link
              href="/partner/reports"
              className="rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/20"
            >
              Open Impact Reports
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <article
            key={metric.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div
              className={`inline-flex rounded-lg px-3 py-1 text-xs font-bold ${metric.accent}`}
            >
              {metric.label}
            </div>

            <p className="mt-4 text-3xl font-bold text-slate-950">
              {metric.value}
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {metric.detail}
            </p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-[#0B3B60]">
                Student Readiness
              </p>

              <h3 className="mt-1 text-xl font-bold text-slate-950">
                Cohort Progress
              </h3>
            </div>

            <Link
              href="/partner/students"
              className="text-sm font-bold text-[#0B3B60] hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="mt-6 space-y-5">
            {[
              {
                label: "Ambassador Christian School",
                value: 88,
                students: 20,
              },
              {
                label: "Lake Norman Career Cohort",
                value: 82,
                students: 36,
              },
              {
                label: "Regional Internship Pipeline",
                value: 76,
                students: 42,
              },
              {
                label: "Post-Grad Career Launch",
                value: 91,
                students: 26,
              },
            ].map((cohort) => (
              <div key={cohort.label}>
                <div className="flex items-center justify-between gap-4 text-sm">
                  <div>
                    <p className="font-bold text-slate-800">
                      {cohort.label}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {cohort.students} students
                    </p>
                  </div>

                  <p className="font-bold text-[#0B3B60]">
                    {cohort.value}%
                  </p>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-[#0B3B60]"
                    style={{ width: `${cohort.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-bold text-[#0B3B60]">
            Upcoming
          </p>

          <h3 className="mt-1 text-xl font-bold text-slate-950">
            Important Dates
          </h3>

          <div className="mt-5 space-y-4">
            {upcomingItems.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4"
              >
                <p className="text-xs font-bold uppercase tracking-wide text-[#0B3B60]">
                  {item.type}
                </p>

                <p className="mt-2 font-bold text-slate-900">
                  {item.title}
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  {item.date}
                </p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <p className="text-sm font-bold text-[#0B3B60]">
            Network Activity
          </p>

          <h3 className="mt-1 text-xl font-bold text-slate-950">
            Recent Updates
          </h3>
        </div>

        <div className="mt-5 divide-y divide-slate-200">
          {activity.map((item) => (
            <div
              key={item.title}
              className="flex flex-col justify-between gap-3 py-4 sm:flex-row sm:items-center"
            >
              <div>
                <p className="font-bold text-slate-900">
                  {item.title}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {item.detail}
                </p>
              </div>

              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                {item.time}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
