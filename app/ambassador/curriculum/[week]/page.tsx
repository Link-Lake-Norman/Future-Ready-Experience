import Link from "next/link";
import { notFound } from "next/navigation";
import { curriculum } from "@/content/platform";

type PageProps = {
  params: Promise<{
    week: string;
  }>;
};

type PhaseDetails = {
  name: string;
  startWeek: number;
  endWeek: number;
  description: string;
};

const phases: PhaseDetails[] = [
  {
    name: "DISCOVER™",
    startWeek: 1,
    endWeek: 6,
    description:
      "Build self-awareness, confidence, communication, and a clear personal vision.",
  },
  {
    name: "DEVELOP™",
    startWeek: 7,
    endWeek: 12,
    description:
      "Strengthen the professional and human skills needed to work successfully with others.",
  },
  {
    name: "EXPLORE™",
    startWeek: 13,
    endWeek: 18,
    description:
      "Explore careers, industries, education pathways, and the changing world of work.",
  },
  {
    name: "CONNECT™",
    startWeek: 19,
    endWeek: 24,
    description:
      "Build professional relationships, networks, mentorship, and workplace presence.",
  },
  {
    name: "EXPERIENCE™",
    startWeek: 25,
    endWeek: 30,
    description:
      "Apply learning through projects, service, workplace preparation, and reflection.",
  },
  {
    name: "LAUNCH™",
    startWeek: 31,
    endWeek: 36,
    description:
      "Complete a portfolio, career plan, showcase, and clear next-step launch strategy.",
  },
];

function getPhaseForWeek(week: number): PhaseDetails {
  return (
    phases.find(
      (phase) =>
        week >= phase.startWeek &&
        week <= phase.endWeek,
    ) ?? phases[0]
  );
}

function getPhaseProgress(
  week: number,
  phase: PhaseDetails,
): number {
  const completedInPhase =
    week - phase.startWeek + 1;

  const totalPhaseWeeks =
    phase.endWeek - phase.startWeek + 1;

  return Math.min(
    100,
    Math.max(
      0,
      Math.round(
        (completedInPhase / totalPhaseWeeks) * 100,
      ),
    ),
  );
}

export default async function CurriculumPage({
  params,
}: PageProps) {
  const { week } = await params;
  const weekNumber = Number(week);

  if (
    !Number.isInteger(weekNumber) ||
    weekNumber < 1 ||
    weekNumber > 36
  ) {
    notFound();
  }

  const lesson = curriculum.find(
    (item) => item.week === weekNumber,
  );

  if (!lesson) {
    notFound();
  }

  const phase = getPhaseForWeek(lesson.week);
  const phaseProgress = getPhaseProgress(
    lesson.week,
    phase,
  );

  const previousLesson =
    lesson.week > 1
      ? curriculum.find(
          (item) => item.week === lesson.week - 1,
        )
      : undefined;

  const nextLesson =
    lesson.week < 36
      ? curriculum.find(
          (item) => item.week === lesson.week + 1,
        )
      : undefined;

  return (
    <div className="space-y-8">
      <nav className="flex flex-wrap items-center gap-2 text-sm font-bold text-slate-500">
        <Link
          href="/ambassador"
          className="transition hover:text-[#0D1B3D]"
        >
          Ambassador
        </Link>

        <span>/</span>

        <Link
          href="/ambassador/curriculum/1"
          className="transition hover:text-[#0D1B3D]"
        >
          Curriculum
        </Link>

        <span>/</span>

        <span className="text-[#0D1B3D]">
          Week {lesson.week}
        </span>
      </nav>

      <header className="overflow-hidden rounded-[32px] bg-[#0D1B3D] text-white shadow-xl">
        <div className="grid gap-8 p-8 lg:grid-cols-[1fr_300px] lg:items-center lg:p-10">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[#F2B705] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#0D1B3D]">
                {phase.name}
              </span>

              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white">
                Week {lesson.week} of 36
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-black leading-tight sm:text-5xl">
              {lesson.title}
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-200">
              {lesson.objective}
            </p>
          </div>

          <div className="rounded-3xl border border-white/15 bg-white/10 p-6">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#F2B705]">
              Phase Progress
            </p>

            <p className="mt-3 text-4xl font-black">
              {phaseProgress}%
            </p>

            <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/15">
              <div
                className="h-full rounded-full bg-[#F2B705]"
                style={{
                  width: `${phaseProgress}%`,
                }}
              />
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-300">
              Weeks {phase.startWeek}–
              {phase.endWeek}
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 bg-white/5 px-8 py-5 lg:px-10">
          <p className="font-semibold text-slate-200">
            {phase.description}
          </p>
        </div>
      </header>

      <section className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-8">
          <ContentSection
            eyebrow="Lesson Delivery"
            title="Facilitator Guide"
            content={lesson.facilitatorGuide}
          />

          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <SectionHeading
              eyebrow="Guided Conversation"
              title="Discussion Questions"
            />

            <ol className="mt-7 space-y-4">
              {lesson.discussionQuestions.map(
                (question, index) => (
                  <li
                    key={`${lesson.week}-${index}`}
                    className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0D1B3D] text-sm font-black text-white">
                      {index + 1}
                    </div>

                    <p className="pt-1 leading-7 text-slate-700">
                      {question}
                    </p>
                  </li>
                ),
              )}
            </ol>
          </article>

          <ContentSection
            eyebrow="Applied Learning"
            title="Student Activity"
            content={lesson.studentActivity}
            highlighted
          />

          <ContentSection
            eyebrow="Why It Matters"
            title="Workplace Connection"
            content={lesson.workplaceConnection}
          />
        </div>

        <aside className="space-y-8">
          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <SectionHeading
              eyebrow="Competency Development"
              title="Skills Earned"
            />

            <div className="mt-6 flex flex-wrap gap-3">
              {lesson.skillsEarned.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-[#F2B705]/50 bg-[#FFF3C4] px-4 py-2 text-sm font-black text-[#0D1B3D]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-[#D8C46A] bg-[#FFF9E6] p-8 shadow-sm">
            <SectionHeading
              eyebrow="Student Record"
              title="Portfolio Evidence"
            />

            <p className="mt-5 text-lg font-bold leading-8 text-[#0D1B3D]">
              {lesson.portfolioEvidence}
            </p>

            <p className="mt-4 text-sm leading-6 text-slate-600">
              Students should retain this work as
              evidence of skill development and
              readiness growth.
            </p>
          </article>

          <article className="rounded-3xl bg-[#4B2265] p-8 text-white shadow-sm">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#F2B705]">
              Milestone
            </p>

            <h2 className="mt-3 text-2xl font-black">
              Badge Earned
            </h2>

            <div className="mt-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F2B705] text-3xl font-black text-[#0D1B3D]">
              ★
            </div>

            <p className="mt-5 text-lg font-black leading-7">
              {lesson.badgeEarned}
            </p>

            <p className="mt-3 text-sm leading-6 text-purple-100">
              Award after the student completes the
              required lesson activity and supporting
              evidence.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <SectionHeading
              eyebrow="Week Completion"
              title="Completion Checklist"
            />

            <div className="mt-6 space-y-3">
              <ChecklistItem text="Review the lesson objective" />
              <ChecklistItem text="Complete the guided discussion" />
              <ChecklistItem text="Finish the student activity" />
              <ChecklistItem text="Save the portfolio evidence" />
              <ChecklistItem text="Complete the weekly reflection" />
            </div>
          </article>
        </aside>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#9A7600]">
              Curriculum Navigation
            </p>

            <h2 className="mt-2 text-2xl font-black text-[#0D1B3D]">
              Continue the 36-week journey
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/ambassador"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border-2 border-[#0D1B3D] px-5 py-3 font-black text-[#0D1B3D] transition hover:bg-slate-50"
            >
              Ambassador Home
            </Link>

            <Link
              href="/ambassador/student-dashboard/ambassador-student-001"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#F2B705] px-5 py-3 font-black text-[#0D1B3D] transition hover:bg-[#DDA600]"
            >
              Student Dashboard
            </Link>
          </div>
        </div>
      </section>

      <nav className="grid gap-4 border-t border-slate-200 pt-8 sm:grid-cols-2">
        {previousLesson ? (
          <Link
            href={`/ambassador/curriculum/${previousLesson.week}`}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-[#F2B705] hover:bg-[#FFF9E6]"
          >
            <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
              Previous Lesson
            </p>

            <p className="mt-2 font-black text-[#0D1B3D]">
              ← Week {previousLesson.week}:{" "}
              {previousLesson.title}
            </p>
          </Link>
        ) : (
          <div />
        )}

        {nextLesson ? (
          <Link
            href={`/ambassador/curriculum/${nextLesson.week}`}
            className="rounded-2xl bg-[#0D1B3D] p-5 text-right text-white shadow-sm transition hover:bg-[#172B55]"
          >
            <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-300">
              Next Lesson
            </p>

            <p className="mt-2 font-black">
              Week {nextLesson.week}:{" "}
              {nextLesson.title} →
            </p>
          </Link>
        ) : (
          <Link
            href="/ambassador"
            className="rounded-2xl bg-[#0D1B3D] p-5 text-right text-white shadow-sm transition hover:bg-[#172B55]"
          >
            <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-300">
              Journey Complete
            </p>

            <p className="mt-2 font-black">
              Return to Ambassador Home →
            </p>
          </Link>
        )}
      </nav>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <>
      <p className="text-xs font-black uppercase tracking-[0.16em] text-[#9A7600]">
        {eyebrow}
      </p>

      <h2 className="mt-2 text-3xl font-black text-[#0D1B3D]">
        {title}
      </h2>
    </>
  );
}

function ContentSection({
  eyebrow,
  title,
  content,
  highlighted = false,
}: {
  eyebrow: string;
  title: string;
  content: string;
  highlighted?: boolean;
}) {
  return (
    <article
      className={`rounded-3xl border p-8 shadow-sm ${
        highlighted
          ? "border-[#F2B705] bg-[#FFF9E6]"
          : "border-slate-200 bg-white"
      }`}
    >
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
      />

      <p className="mt-5 whitespace-pre-line text-lg leading-8 text-slate-700">
        {content}
      </p>
    </article>
  );
}

function ChecklistItem({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white font-black text-slate-400 ring-1 ring-slate-300">
        ○
      </div>

      <p className="font-bold text-slate-700">
        {text}
      </p>
    </div>
  );
}