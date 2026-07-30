import Link from "next/link";
import { notFound } from "next/navigation";
import { students } from "@/content/platform";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function StudentPassportPage({
  params,
}: PageProps) {
  const { id } = await params;

  const student = students.find(
    (item) => item.id === id
  );

  if (!student) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <header className="rounded-3xl bg-[#0D1B3D] p-10 text-white">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#F2B705]">
          Future Ready™ Student Passport
        </p>

        <h1 className="mt-3 text-4xl font-black">
          {student.name}
        </h1>

        <p className="mt-3 text-lg text-slate-200">
          Ambassador Christian School · {student.cohort}
        </p>
      </header>

      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <PassportCard
          label="Current Week"
          value={String(student.currentWeek)}
        />

        <PassportCard
          label="Readiness"
          value={`${student.readinessScore}%`}
        />

        <PassportCard
          label="Attendance"
          value={`${student.attendanceRate}%`}
        />

        <PassportCard
          label="Badges"
          value={String(student.badges.length)}
        />
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <PassportLink
          href={`/ambassador/student-passport/${student.id}/profile`}
          title="My Profile"
          description="Strengths, interests, values, goals, and career direction."
        />

        <PassportLink
          href={`/ambassador/student-passport/${student.id}/portfolio`}
          title="Digital Portfolio"
          description="Projects, activities, skills, badges, and portfolio evidence."
        />

        <PassportLink
          href={`/ambassador/student-passport/${student.id}/reflections`}
          title="Reflection Journal"
          description="Weekly reflections from the Future Ready™ journey."
        />

        <PassportLink
          href={`/ambassador/student-portal/${student.id}`}
          title="Complete Student Record"
          description="Readiness, attendance, skills, and 36-week progress."
        />
      </section>
    </div>
  );
}

function PassportCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-bold uppercase text-slate-500">
        {label}
      </p>

      <p className="mt-3 text-4xl font-black text-[#0D1B3D]">
        {value}
      </p>
    </article>
  );
}

function PassportLink({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:border-[#F2B705]"
    >
      <h2 className="text-2xl font-black text-[#0D1B3D]">
        {title}
      </h2>

      <p className="mt-3 leading-7 text-slate-600">
        {description}
      </p>

      <p className="mt-6 font-black text-[#0D1B3D]">
        Open →
      </p>
    </Link>
  );
}
