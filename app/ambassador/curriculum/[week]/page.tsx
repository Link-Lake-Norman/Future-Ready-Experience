import Link from "next/link";
import { notFound } from "next/navigation";
import { curriculum } from "@/content/platform";

type PageProps = {
  params: Promise<{
    week: string;
  }>;
};

export default async function CurriculumPage({
  params,
}: PageProps) {
  const { week } = await params;
  const weekNumber = Number(week);

  const lesson = curriculum.find(
    (item) => item.week === weekNumber
  );

  if (!lesson) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <header className="rounded-3xl bg-[#0D1B3D] px-8 py-10 text-white">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#F2B705]">
          {lesson.phase} · Week {lesson.week}
        </p>

        <h1 className="mt-3 text-4xl font-black">
          {lesson.title}
        </h1>

        <p className="mt-4 text-lg leading-8 text-slate-200">
          {lesson.objective}
        </p>
      </header>

      <section className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-8">
          <Section
            title="Facilitator Guide"
            content={lesson.facilitatorGuide}
          />

          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-black text-[#0D1B3D]">
              Discussion Questions
            </h2>

            <ol className="mt-6 space-y-4">
              {lesson.discussionQuestions.map(
                (question, index) => (
                  <li
                    key={question}
                    className="rounded-xl bg-slate-50 p-5 leading-7"
                  >
                    <strong className="mr-2 text-[#0D1B3D]">
                      {index + 1}.
                    </strong>

                    {question}
                  </li>
                )
              )}
            </ol>
          </article>

          <Section
            title="Student Activity"
            content={lesson.studentActivity}
          />

          <Section
            title="Workplace Connection"
            content={lesson.workplaceConnection}
          />
        </div>

        <div className="space-y-8">
          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-black text-[#0D1B3D]">
              Skills Earned
            </h2>

            <div className="mt-5 flex flex-wrap gap-3">
              {lesson.skillsEarned.map(
                (skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-[#FFF3C4] px-4 py-2 font-bold text-[#0D1B3D]"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </article>

          <Section
            title="Portfolio Evidence"
            content={lesson.portfolioEvidence}
          />

          <Section
            title="Badge Earned"
            content={lesson.badgeEarned}
          />
        </div>
      </section>

      <nav className="flex justify-between border-t border-slate-200 pt-7">
        {lesson.week > 1 ? (
          <Link
            href={`/ambassador/curriculum/${lesson.week - 1}`}
            className="rounded-xl border border-slate-300 px-5 py-3 font-black text-slate-700"
          >
            ← Week {lesson.week - 1}
          </Link>
        ) : (
          <span />
        )}

        {lesson.week < 36 ? (
          <Link
            href={`/ambassador/curriculum/${lesson.week + 1}`}
            className="rounded-xl bg-[#0D1B3D] px-5 py-3 font-black text-white"
          >
            Week {lesson.week + 1} →
          </Link>
        ) : (
          <Link
            href="/ambassador"
            className="rounded-xl bg-[#0D1B3D] px-5 py-3 font-black text-white"
          >
            Return Home
          </Link>
        )}
      </nav>
    </div>
  );
}

function Section({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="text-3xl font-black text-[#0D1B3D]">
        {title}
      </h2>

      <p className="mt-5 text-lg leading-8 text-slate-700">
        {content}
      </p>
    </article>
  );
}
