import Link from "next/link";
import { notFound } from "next/navigation";
import { ambassadorPilot } from "@/content/ambassador-pilot";
import LessonCompletion from "./LessonCompletion";

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

  const lesson = ambassadorPilot.find(
    (item) => item.week === weekNumber,
  );

  if (!lesson) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <header className="rounded-3xl bg-[#0D1B3D] px-8 py-10 text-white">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#F2B705]">
          {lesson.phase} · Week {lesson.week} of 16
        </p>

        <h1 className="mt-3 text-4xl font-black">
          {lesson.title}
        </h1>

        <p className="mt-4 text-lg italic leading-8 text-slate-200">
          {lesson.essentialQuestion}
        </p>

        <p className="mt-3 text-lg leading-8 text-slate-200">
          {lesson.objective}
        </p>
      </header>

      <LessonCompletion
        week={lesson.week}
        title={lesson.title}
        badgeEarned={lesson.badgeEarned}
        portfolioEvidence={lesson.portfolioArtifact}
      />

      <section className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-8">
          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#725500]">
              Facilitator Guide
            </p>
            <h2 className="mt-2 text-3xl font-black text-[#0D1B3D]">
              Lesson Outcomes
            </h2>

            <ul className="mt-5 space-y-2">
              {lesson.outcomes.map((outcome, index) => (
                <li key={`${lesson.week}-outcome-${index}`} className="leading-7 text-slate-700">
                  • {outcome}
                </li>
              ))}
            </ul>

            <h3 className="mt-6 text-xl font-black text-[#0D1B3D]">Preparation</h3>
            <ul className="mt-3 space-y-2">
              {lesson.preparation.map((item, index) => (
                <li key={`${lesson.week}-prep-${index}`} className="leading-7 text-slate-700">
                  • {item}
                </li>
              ))}
            </ul>

            <h3 className="mt-6 text-xl font-black text-[#0D1B3D]">Lesson Flow</h3>
            <div className="mt-3 space-y-3">
              {lesson.lessonFlow.map((segment, index) => (
                <div key={`${lesson.week}-flow-${index}`} className="rounded-xl bg-slate-50 p-4">
                  <p className="font-black text-[#0D1B3D]">
                    {segment.segment} <span className="font-normal text-slate-500">({segment.minutes} min)</span>
                  </p>
                  <p className="mt-1 leading-7 text-slate-700">{segment.instructions}</p>
                </div>
              ))}
            </div>

            <h3 className="mt-6 text-xl font-black text-[#0D1B3D]">Facilitator Notes</h3>
            <p className="mt-2 leading-7 text-slate-700">{lesson.facilitatorNotes}</p>

            <h3 className="mt-6 text-xl font-black text-[#0D1B3D]">Differentiation</h3>
            <p className="mt-2 leading-7 text-slate-700">{lesson.differentiation}</p>

            <h3 className="mt-6 text-xl font-black text-[#0D1B3D]">Speaker Guide</h3>
            <p className="mt-2 leading-7 text-slate-700">Recommended guest: {lesson.recommendedSpeaker}</p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-black text-[#0D1B3D]">
              Classroom Activities
            </h2>

            <div className="mt-5 space-y-4">
              {lesson.activities.map((activity, index) => (
                <div key={`${lesson.week}-activity-${index}`} className="rounded-2xl bg-slate-50 p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-lg font-black text-[#0D1B3D]">{activity.name}</p>
                    <span className="rounded-full bg-[#FFF3C4] px-3 py-1 text-xs font-black uppercase tracking-wide text-[#725500]">
                      {activity.type} · {activity.minutes} min
                    </span>
                  </div>
                  <p className="mt-2 leading-7 text-slate-700">{activity.instructions}</p>
                  <p className="mt-2 text-sm text-slate-500">
                    Materials: {activity.materials.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-black text-[#0D1B3D]">
              Discussion Questions
            </h2>

            <ol className="mt-6 space-y-4">
              {lesson.discussionQuestions.map(
                (question, index) => (
                  <li
                    key={`${lesson.week}-${index}`}
                    className="rounded-xl bg-slate-50 p-5 leading-7"
                  >
                    <strong className="mr-2 text-[#0D1B3D]">
                      {index + 1}.
                    </strong>
                    {question}
                  </li>
                ),
              )}
            </ol>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#725500]">
              Student Workbook
            </p>
            <h2 className="mt-2 text-3xl font-black text-[#0D1B3D]">
              {lesson.title}
            </h2>

            <div className="mt-5 space-y-4">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="font-black text-[#0D1B3D]">Warm-Up</p>
                <p className="mt-1 leading-7 text-slate-700">{lesson.studentWorkbook.warmUp}</p>
              </div>

              {lesson.studentWorkbook.workbookPages.map((page, index) => (
                <div key={`${lesson.week}-page-${index}`} className="rounded-xl bg-slate-50 p-4">
                  <p className="font-black text-[#0D1B3D]">{page.title}</p>
                  <p className="mt-1 leading-7 text-slate-700">{page.directions}</p>
                </div>
              ))}

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="font-black text-[#0D1B3D]">Reflection</p>
                <p className="mt-1 leading-7 text-slate-700">{lesson.studentWorkbook.reflectionPrompt}</p>
              </div>

              <div className="rounded-xl bg-[#FFF3C4] p-4">
                <p className="font-black text-[#0D1B3D]">AI Lab</p>
                <p className="mt-1 leading-7 text-slate-700">{lesson.studentWorkbook.aiLabPrompt}</p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="font-black text-[#0D1B3D]">Google Workspace</p>
                <p className="mt-1 leading-7 text-slate-700">{lesson.studentWorkbook.googleWorkspaceTask}</p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="font-black text-[#0D1B3D]">Employer Connection</p>
                <p className="mt-1 leading-7 text-slate-700">{lesson.studentWorkbook.employerConnection}</p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="font-black text-[#0D1B3D]">Exit Ticket</p>
                <p className="mt-1 leading-7 text-slate-700">{lesson.studentWorkbook.exitTicket}</p>
              </div>
            </div>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-black text-[#0D1B3D]">
              Workplace Connection
            </h2>
            <p className="mt-5 leading-8 text-slate-700">{lesson.workplaceConnection}</p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-black text-[#0D1B3D]">
              Homework / Family Connection
            </h2>
            <p className="mt-5 leading-8 text-slate-700">{lesson.homework}</p>
          </article>
        </div>

        <div className="space-y-8">
          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-black text-[#0D1B3D]">
              Skills Earned
            </h2>

            <div className="mt-5 flex flex-wrap gap-3">
              {lesson.skillsEarned.map((skill) => (
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
            <h2 className="text-2xl font-black text-[#0D1B3D]">
              Assessment Rubric
            </h2>
            <ul className="mt-5 space-y-2">
              {lesson.assessmentRubric.map((criterion, index) => (
                <li key={`${lesson.week}-rubric-${index}`} className="leading-7 text-slate-700">
                  ☐ {criterion}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-black text-[#0D1B3D]">
              Portfolio Artifact
            </h2>
            <p className="mt-5 leading-8 text-slate-700">{lesson.portfolioArtifact}</p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-black text-[#0D1B3D]">
              Badge Earned
            </h2>
            <p className="mt-5 leading-8 text-slate-700">{lesson.badgeEarned}</p>
          </article>
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

        {lesson.week < 16 ? (
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
