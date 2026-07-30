import Link from "next/link";
import StatCard from "@/components/StatCard";
import { students } from "@/content/platform";

export default function StudentRosterPage() {
  const averageReadiness = Math.round(
    students.reduce(
      (total, student) =>
        total + student.readinessScore,
      0
    ) / students.length
  );

  return (
    <div className="space-y-10">
      <header className="rounded-3xl bg-[#0D1B3D] px-8 py-10 text-white">
        <h1 className="text-4xl font-black">
          Student Roster
        </h1>

        <p className="mt-4 text-lg text-slate-200">
          Ambassador Christian School · Ambassador 2026
        </p>
      </header>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
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
          value="100%"
        />

        <StatCard
          label="Current Week"
          value="1"
        />
      </section>

      <section className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[900px]">
          <thead className="bg-slate-50">
            <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
              <th className="px-6 py-5">Student</th>
              <th className="px-6 py-5">Grade</th>
              <th className="px-6 py-5">Week</th>
              <th className="px-6 py-5">Attendance</th>
              <th className="px-6 py-5">Readiness</th>
              <th className="px-6 py-5">Status</th>
              <th className="px-6 py-5 text-right">
                Record
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {students.map((student) => (
              <tr key={student.id}>
                <td className="px-6 py-5">
                  <p className="font-black text-slate-900">
                    {student.name}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {student.email}
                  </p>
                </td>

                <td className="px-6 py-5">
                  {student.grade}
                </td>

                <td className="px-6 py-5">
                  Week {student.currentWeek}
                </td>

                <td className="px-6 py-5">
                  {student.attendanceRate}%
                </td>

                <td className="px-6 py-5 font-black text-[#0D1B3D]">
                  {student.readinessScore}%
                </td>

                <td className="px-6 py-5">
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700">
                    {student.status}
                  </span>
                </td>

                <td className="px-6 py-5 text-right">
                  <Link
                    href={`/ambassador/student-portal/${student.id}`}
                    className="rounded-lg bg-[#0D1B3D] px-4 py-2 text-sm font-black text-white"
                  >
                    Open
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
