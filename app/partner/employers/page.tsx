const employers = [
  {
    name: "H2 Health",
    industry: "Healthcare",
    opportunities: 6,
    students: 8,
    status: "Active",
  },
  {
    name: "Lake Norman Advanced Manufacturing Group",
    industry: "Advanced Manufacturing",
    opportunities: 5,
    students: 7,
    status: "Active",
  },
  {
    name: "Employers Advantage",
    industry: "Human Resources",
    opportunities: 3,
    students: 4,
    status: "Active",
  },
  {
    name: "Regional Technology Collaborative",
    industry: "Technology",
    opportunities: 4,
    students: 5,
    status: "Recruiting",
  },
  {
    name: "Community Impact Network",
    industry: "Nonprofit",
    opportunities: 7,
    students: 11,
    status: "Active",
  },
];

export default function PartnerEmployersPage() {
  return (
    <div className="space-y-7">
      <section>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0B3B60]">
          Employer Network
        </p>

        <h2 className="mt-2 text-3xl font-bold text-slate-950">
          Employer Partners
        </h2>

        <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
          Track employer engagement, student participation, and available
          career-connected experiences across the regional network.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Employer Partners", "38"],
          ["Active Opportunities", "29"],
          ["Students Placed", "42"],
          ["Industries Represented", "11"],
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

      <section className="grid gap-5 lg:grid-cols-2">
        {employers.map((employer) => (
          <article
            key={employer.name}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-[#0B3B60]">
                  {employer.industry}
                </p>

                <h3 className="mt-2 text-xl font-bold text-slate-950">
                  {employer.name}
                </h3>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${
                  employer.status === "Active"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-blue-50 text-blue-700"
                }`}
              >
                {employer.status}
              </span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Opportunities
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-950">
                  {employer.opportunities}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Students
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-950">
                  {employer.students}
                </p>
              </div>
            </div>

            <button
              type="button"
              className="mt-5 w-full rounded-xl border border-[#0B3B60] px-4 py-3 text-sm font-bold text-[#0B3B60] transition hover:bg-blue-50"
            >
              View Partnership
            </button>
          </article>
        ))}
      </section>
    </div>
  );
}
