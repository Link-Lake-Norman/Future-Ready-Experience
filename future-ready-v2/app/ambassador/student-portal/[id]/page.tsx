import Link from "next/link";
import { notFound } from "next/navigation";
import StatCard from "@/components/StatCard";
import { students } from "@/content/platform";
import { ambassadorPilot } from "@/content/ambassador-pilot";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function StudentRecordPage({
  params,
}: PageProps) {
  const { id } = await params;

  const student = students.find(
    (item) => item.id === id
  );

  if (!student) {
    notFound();
  }

  const lesson = ambassadorPilot.find(
    (item) =>
      item.week === student.currentWeek
  );

  return (
    <div className="space-y-10">
      <header className="rounded-3xl bg-[#0D1B3D] px-8 py-10 text-white">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#F2B705]">
          Future Ready™ Student Record
        </p>

        <h1 className="mt-3 text-4xl font-black">
          {student.name}
        </h1>

        <p className="mt-3 text-lg text-slate-200">
          Ambassador Christian School ·{" "}
          {student.cohort}
        </p>
      </header>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Readiness"
          value={`${student.readinessScore}%`}
        />

        <StatCard
          label="Current Week"
          value={student.currentWeek}
        />

        <StatCard
          label="Attendance"
          value={`${student.attendanceRate}%`}
        />

        <StatCard
          label="Badges"
          value={student.badges.length}
        />
      </section>

      <section className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#F2B705]">
            Current Lesson
          </p>

          <h2 className="mt-2 text-3xl font-black text-[#0D1B3D]">
            Week {student.currentWeek}:{" "}
            {lesson?.title}
          </h2>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            {lesson?.objective}
          </p>

          <Link
            href={`/ambassador/curriculum/${student.currentWeek}`}
            className="mt-7 inline-flex rounded-xl bg-[#0D1B3D] px-6 py-3 font-black text-white"
          >
            Open Lesson
          </Link>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-black text-[#0D1B3D]">
            Student Details
          </h2>

          <div className="mt-6 space-y-4">
            <Detail
              label="Grade"
              value={student.grade}
            />

            <Detail
              label="Email"
              value={student.email}
            />

            <Detail
              label="Status"
              value={student.status}
            />
          </div>
        </article>
      </section>

      <section className="grid gap-8 xl:grid-cols-2">
        <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-black text-[#0D1B3D]">
            Skills
          </h2>

          <div className="mt-6 flex flex-wrap gap-3">
            {student.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-[#FFF3C4] px-4 py-2 font-bold text-[#0D1B3D]"
              >
                {skill}
              </span>
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-black text-[#0D1B3D]">
            Career Interests
          </h2>

          <div className="mt-6 flex flex-wrap gap-3">
            {student.careerInterests.map(
              (interest) => (
                <span
                  key={interest}
                  className="rounded-full bg-purple-50 px-4 py-2 font-bold text-purple-800"
                >
                  {interest}
                </span>
              )
            )}
          </div>
        </article>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-3xl font-black text-[#0D1B3D]">
          16-Week Journey
        </h2>

        <div className="mt-7 grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-9">
          {ambassadorPilot.map((week) => (
            <Link
              key={week.week}
              href={`/ambassador/curriculum/${week.week}`}
              className={`flex min-h-14 items-center justify-center rounded-xl border-2 font-black ${
                week.week === student.currentWeek
                  ? "border-[#F2B705] bg-[#FFF3C4] text-[#0D1B3D]"
                  : week.week <
                      student.currentWeek
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : "border-slate-200 text-slate-500"
              }`}
            >
              {week.week}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function Detail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p className="mt-2 font-black text-slate-900">
        {value}
      </p>
    </div>
  );
}
