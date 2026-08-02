import Link from "next/link";
import { notFound } from "next/navigation";
import { students } from "@/content/platform";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ReflectionJournalPage({
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
        <Link
          href={`/ambassador/student-passport/${student.id}`}
          className="font-bold text-[#F2B705]"
        >
          ← Back to Student Passport
        </Link>

        <h1 className="mt-7 text-4xl font-black">
          Reflection Journal
        </h1>

        <p className="mt-3 text-lg text-slate-200">
          {student.name} · Week {student.currentWeek}
        </p>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-3xl font-black text-[#0D1B3D]">
          Week {student.currentWeek} Reflection
        </h2>

        <p className="mt-4 text-lg leading-8 text-slate-600">
          What did you learn about yourself, and how will you apply it?
        </p>

        <textarea
          placeholder="Write your reflection..."
          className="mt-7 min-h-72 w-full rounded-2xl border border-slate-300 p-5"
        />

        <button
          type="button"
          className="mt-6 rounded-xl bg-[#F2B705] px-7 py-4 font-black text-[#0D1B3D]"
        >
          Save Reflection
        </button>
      </section>
    </div>
  );
}
