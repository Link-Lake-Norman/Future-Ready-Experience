import Link from "next/link";
import StatCard from "@/components/StatCard";
import {
  curriculum,
  students,
} from "@/content/platform";

const currentWeek = 1;

export default function FacilitatorPage() {
  const lesson = curriculum.find(
    (item) => item.week === currentWeek
  );

  const averageReadiness = Math.round(
    students.reduce(
      (total, student) =>
        total + student.readinessScore,
      0
    ) / students.length
  );

  return (
    <div className="space-y-10">
      <header className="rounded-3xl bg-[#0D1B3D] px-8 py-10 text-white shadow-lg">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#F2B705]">
          Ambassador Christian School
        </p>

        <h1 className="mt-3 text-4xl font-black">
          Facilitator Dashboard
        </h1>

        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-200">
          Manage lessons, attendance, student progress, and
          readiness for the Future Ready™ pilot.
        </p>
      </header>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Current Week"
          value={currentWeek}
        />

        <StatCard
          label="Students"
          value={students.length}
        />

        <StatCard
          label="Average Readiness"
          value={`${averageReadiness}%`}
        />

        <StatCard
          label="Attendance"
          value="Pending"
        />
      </section>

      <section className="grid gap-8 xl:grid-cols-[1.3fr_0.7fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#F2B705]">
            Current Lesson
          </p>

          <h2 className="mt-2 text-3xl font-black text-[#0D1B3D]">
            Week {currentWeek}: {lesson?.title}
          </h2>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            {lesson?.objective}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/ambassador/curriculum/${currentWeek}`}
              className="rounded-xl bg-[#0D1B3D] px-6 py-3 font-black text-white"
            >
              Open Lesson
            </Link>

            <Link
              href="/ambassador/facilitator/attendance"
              className="rounded-xl bg-[#F2B705] px-6 py-3 font-black text-[#0D1B3D]"
            >
              Record Attendance
            </Link>
          </div>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-black text-[#0D1B3D]">
            Quick Actions
          </h2>

          <div className="mt-6 space-y-3">
            <QuickLink
              href="/ambassador/facilitator/attendance"
              label="Record Attendance"
            />

            <QuickLink
              href="/ambassador/facilitator/students"
              label="View Student Roster"
            />

            <QuickLink
              href="/ambassador/admin"
              label="Manage Students & Facilitators"
            />
          </div>
        </article>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-black text-[#0D1B3D]">
            Cohort Preview
          </h2>

          <Link
            href="/ambassador/facilitator/students"
            className="font-black text-[#0D1B3D]"
          >
            Full Roster →
          </Link>
        </div>

        <div className="mt-6 divide-y divide-slate-100">
          {students.slice(0, 6).map((student) => (
            <div
              key={student.id}
              className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-black text-slate-900">
                  {student.name}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {student.grade} · Week{" "}
                  {student.currentWeek}
                </p>
              </div>

              <Link
                href={`/ambassador/student-portal/${student.id}`}
                className="rounded-lg bg-[#0D1B3D] px-4 py-2 text-sm font-black text-white"
              >
                Open Record
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function QuickLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-xl border border-slate-200 px-5 py-4 font-bold text-slate-800 hover:border-[#F2B705] hover:bg-[#FFF9E6]"
    >
      {label}
      <span>→</span>
    </Link>
  );
}
