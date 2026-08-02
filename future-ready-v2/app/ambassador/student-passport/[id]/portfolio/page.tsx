import Link from "next/link";
import { notFound } from "next/navigation";
import { students } from "@/content/platform";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

const artifacts = [
  "Future Ready Identity Map",
  "Strengths and Values Reflection",
  "Career Exploration Map",
  "Professional Resume",
  "Capstone Portfolio",
];

export default async function StudentPortfolioPage({
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
          Digital Portfolio
        </h1>

        <p className="mt-3 text-lg text-slate-200">
          {student.name}
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        {artifacts.map((artifact, index) => (
          <article
            key={artifact}
            className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"
          >
            <p className="text-sm font-bold uppercase text-[#F2B705]">
              Portfolio Artifact {index + 1}
            </p>

            <h2 className="mt-3 text-2xl font-black text-[#0D1B3D]">
              {artifact}
            </h2>

            <p className="mt-4 text-slate-600">
              {index === 0 ? "Complete" : "Not Started"}
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}
