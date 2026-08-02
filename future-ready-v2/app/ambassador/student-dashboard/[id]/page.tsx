import Link from "next/link";
import { notFound } from "next/navigation";
import { students } from "@/content/platform";
import { ambassadorPilot } from "@/content/ambassador-pilot";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

type SkillScore = {
  name: string;
  score: number;
};

const skillScores: SkillScore[] = [
  {
    name: "Communication",
    score: 82,
  },
  {
    name: "Teamwork",
    score: 78,
  },
  {
    name: "Professionalism",
    score: 80,
  },
  {
    name: "Leadership",
    score: 72,
  },
  {
    name: "Problem Solving",
    score: 76,
  },
  {
    name: "Adaptability",
    score: 74,
  },
];

export default async function StudentDashboardPage({
  params,
}: PageProps) {
  const { id } = await params;

  const student = students.find(
    (item) => item.id === id
  );

  if (!student) {
    notFound();
  }

  const currentLesson = ambassadorPilot.find(
    (item) => item.week === student.currentWeek
  );

  const completedWeeks = Math.max(
    student.currentWeek - 1,
    0
  );

  const journeyProgress = Math.round(
    (completedWeeks / 16) * 100
  );

  const portfolioItems = 5;
  const portfolioCompleted =
    student.currentWeek >= 3
      ? 2
      : student.currentWeek >= 1
        ? 1
        : 0;

  const portfolioProgress = Math.round(
    (portfolioCompleted / portfolioItems) * 100
  );

  const firstName =
    student.name.split(" ")[0] || student.name;

  const initials = student.name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[32px] bg-[#0D1B3D] text-white shadow-xl">
        <div className="grid gap-8 p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10">
          <div>
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F2B705] text-xl font-black text-[#0D1B3D]">
                {initials}
              </div>

              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#F2B705]">
                  Future Ready™ Student Home
                </p>

                <p className="mt-1 text-sm text-slate-300">
                  Ambassador Christian School
                </p>
              </div>
            </div>

            <h1 className="mt-7 text-4xl font-black sm:text-5xl">
              Welcome back, {firstName}
            </h1>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-200">
              You are currently on Week{" "}
              {student.currentWeek} of your
              Future Ready™ journey. Keep building
              the skills, confidence, and experience
              that will help you launch your future.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/ambassador/curriculum/${student.currentWeek}`}
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#F2B705] px-6 py-3 font-black text-[#0D1B3D] transition hover:bg-[#DDA600]"
              >
                Continue Learning
              </Link>

              <Link
                href={`/ambassador/student-passport/${student.id}`}
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-black text-white transition hover:bg-white/20"
              >
                Open My Passport
              </Link>
            </div>
          </div>

          <div className="min-w-[230px] rounded-3xl border border-white/15 bg-white/10 p-7 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-300">
              Future Ready™ Index
            </p>

            <p className="mt-3 text-6xl font-black text-[#F2B705]">
              {student.readinessScore}%
            </p>

            <p className="mt-2 text-sm text-slate-300">
              Readiness Score
            </p>

            <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/15">
              <div
                className="h-full rounded-full bg-[#F2B705]"
                style={{
                  width: `${student.readinessScore}%`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 bg-white/5 px-8 py-5">
          <p className="font-semibold text-slate-200">
            Discover Purpose. Build Skills. Launch
            Your Future.
          </p>
        </div>
      </section>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardStat
          label="Current Week"
          value={`${student.currentWeek}/16`}
          detail="Ambassador Pilot journey"
        />

        <DashboardStat
          label="Attendance"
          value={`${student.attendanceRate}%`}
          detail="Participation and reliability"
        />

        <DashboardStat
          label="Badges Earned"
          value={String(student.badges.length)}
          detail="Milestones completed"
        />

        <DashboardStat
          label="Portfolio"
          value={`${portfolioProgress}%`}
          detail={`${portfolioCompleted} of ${portfolioItems} artifacts`}
        />
      </section>

      <section className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#F2B705]">
                My Journey
              </p>

              <h2 className="mt-2 text-3xl font-black text-[#0D1B3D]">
                16-Week Progress
              </h2>
            </div>

            <p className="font-black text-[#0D1B3D]">
              {journeyProgress}% complete
            </p>
          </div>

          <div className="mt-7 h-4 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-[#F2B705]"
              style={{
                width: `${journeyProgress}%`,
              }}
            />
          </div>

          <div className="mt-8 grid grid-cols-6 gap-2 sm:grid-cols-9">
            {ambassadorPilot.map((week) => {
              const complete =
                week.week < student.currentWeek;

              const current =
                week.week === student.currentWeek;

              return (
                <Link
                  key={week.week}
                  href={`/ambassador/curriculum/${week.week}`}
                  title={`Week ${week.week}: ${week.title}`}
                  className={`flex min-h-12 items-center justify-center rounded-xl border-2 text-sm font-black transition ${
                    complete
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                      : current
                        ? "border-[#F2B705] bg-[#FFF3C4] text-[#0D1B3D]"
                        : "border-slate-200 bg-white text-slate-500 hover:border-slate-400"
                  }`}
                >
                  {complete
                    ? "✓"
                    : current
                      ? `▶${week.week}`
                      : week.week}
                </Link>
              );
            })}
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-4">
            <JourneyPhase
              name="Discover"
              weeks="Weeks 1–4"
              active={student.currentWeek <= 4}
              complete={student.currentWeek > 4}
            />

            <JourneyPhase
              name="Develop"
              weeks="Weeks 5–8"
              active={
                student.currentWeek >= 5 &&
                student.currentWeek <= 8
              }
              complete={student.currentWeek > 8}
            />

            <JourneyPhase
              name="Explore"
              weeks="Weeks 9–12"
              active={
                student.currentWeek >= 9 &&
                student.currentWeek <= 12
              }
              complete={student.currentWeek > 12}
            />

            <JourneyPhase
              name="Connect"
              weeks="Weeks 13–16"
              active={student.currentWeek >= 13}
              complete={student.currentWeek > 16}
            />
          </div>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#4B2265]">
            Today&apos;s Focus
          </p>

          <p className="mt-5 text-sm font-black uppercase tracking-[0.14em] text-slate-500">
            Week {student.currentWeek}
          </p>

          <h2 className="mt-2 text-3xl font-black text-[#0D1B3D]">
            {currentLesson?.title ??
              "Continue Your Journey"}
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            {currentLesson?.objective ??
              "Build the skills, confidence, and professional readiness needed for your future."}
          </p>

          <div className="mt-7 rounded-2xl bg-[#FFF9E6] p-5">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#8A6600]">
              This Week
            </p>

            <p className="mt-2 font-bold leading-7 text-[#0D1B3D]">
              Complete your lesson activity and add
              one meaningful reflection to your
              Future Ready™ record.
            </p>
          </div>

          <div className="mt-7 space-y-3">
            <TaskItem
              label="Complete this week’s lesson"
              complete={false}
            />

            <TaskItem
              label="Submit your reflection"
              complete={false}
            />

            <TaskItem
              label="Update your student profile"
              complete
            />
          </div>

          <Link
            href={`/ambassador/curriculum/${student.currentWeek}`}
            className="mt-7 inline-flex w-full min-h-12 items-center justify-center rounded-xl bg-[#0D1B3D] px-6 py-3 font-black text-white transition hover:bg-[#172B55]"
          >
            Open Week {student.currentWeek}
          </Link>
        </article>
      </section>

      <section className="grid gap-8 xl:grid-cols-2">
        <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#F2B705]">
                Skill Growth
              </p>

              <h2 className="mt-2 text-3xl font-black text-[#0D1B3D]">
                My Competencies
              </h2>
            </div>

            <Link
              href={`/ambassador/student-passport/${student.id}`}
              className="font-black text-[#0D1B3D]"
            >
              View Passport →
            </Link>
          </div>

          <div className="mt-8 space-y-6">
            {skillScores.map((skill) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                score={skill.score}
              />
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#4B2265]">
            Recent Achievements
          </p>

          <h2 className="mt-2 text-3xl font-black text-[#0D1B3D]">
            Badges and Milestones
          </h2>

          <div className="mt-8 space-y-4">
            {student.badges.length > 0 ? (
              student.badges.map((badge) => (
                <AchievementCard
                  key={badge}
                  title={badge}
                  description="Future Ready™ milestone earned."
                  earned
                />
              ))
            ) : (
              <AchievementCard
                title="First Badge Ahead"
                description="Complete your first Future Ready™ milestone to unlock a badge."
                earned={false}
              />
            )}

            <AchievementCard
              title="Professional Communicator"
              description="Continue building communication skills to unlock this badge."
              earned={false}
            />

            <AchievementCard
              title="Career Explorer"
              description="Complete career exploration activities to unlock this badge."
              earned={false}
            />
          </div>
        </article>
      </section>

      <section className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#F2B705]">
            Career Direction
          </p>

          <h2 className="mt-2 text-3xl font-black text-[#0D1B3D]">
            My Interests
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

          <Link
            href={`/ambassador/student-passport/${student.id}/profile`}
            className="mt-8 inline-flex rounded-xl border-2 border-[#0D1B3D] px-6 py-3 font-black text-[#0D1B3D]"
          >
            Update My Profile
          </Link>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#4B2265]">
            Quick Actions
          </p>

          <h2 className="mt-2 text-3xl font-black text-[#0D1B3D]">
            My Future Ready™ Tools
          </h2>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <QuickAction
              href={`/ambassador/student-passport/${student.id}`}
              title="Student Passport"
              description="View your complete readiness record."
            />

            <QuickAction
              href={`/ambassador/student-passport/${student.id}/profile`}
              title="My Profile"
              description="Update strengths, goals, and interests."
            />

            <QuickAction
              href={`/ambassador/student-passport/${student.id}/portfolio`}
              title="Digital Portfolio"
              description="Review projects and evidence of growth."
            />

            <QuickAction
              href={`/ambassador/student-passport/${student.id}/reflections`}
              title="Reflection Journal"
              description="Record weekly learning and growth."
            />
          </div>
        </article>
      </section>
    </div>
  );
}

function DashboardStat({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-bold uppercase tracking-[0.12em] text-slate-500">
        {label}
      </p>

      <p className="mt-3 text-4xl font-black text-[#0D1B3D]">
        {value}
      </p>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        {detail}
      </p>
    </article>
  );
}

function JourneyPhase({
  name,
  weeks,
  active,
  complete,
}: {
  name: string;
  weeks: string;
  active: boolean;
  complete: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        active
          ? "border-[#F2B705] bg-[#FFF9E6]"
          : complete
            ? "border-emerald-200 bg-emerald-50"
            : "border-slate-200 bg-slate-50"
      }`}
    >
      <p
        className={`font-black ${
          active
            ? "text-[#0D1B3D]"
            : complete
              ? "text-emerald-700"
              : "text-slate-600"
        }`}
      >
        {complete ? "✓ " : ""}
        {name}
      </p>

      <p className="mt-1 text-sm text-slate-500">
        {weeks}
      </p>
    </div>
  );
}

function TaskItem({
  label,
  complete,
}: {
  label: string;
  complete: boolean;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 p-4">
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-black ${
          complete
            ? "bg-emerald-600 text-white"
            : "bg-slate-200 text-slate-500"
        }`}
      >
        {complete ? "✓" : "○"}
      </div>

      <p className="font-bold text-slate-800">
        {label}
      </p>
    </div>
  );
}

function SkillBar({
  name,
  score,
}: {
  name: string;
  score: number;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <p className="font-black text-slate-800">
          {name}
        </p>

        <p className="font-black text-[#0D1B3D]">
          {score}%
        </p>
      </div>

      <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-[#F2B705]"
          style={{
            width: `${score}%`,
          }}
        />
      </div>
    </div>
  );
}

function AchievementCard({
  title,
  description,
  earned,
}: {
  title: string;
  description: string;
  earned: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-4 rounded-2xl border p-5 ${
        earned
          ? "border-[#F2B705] bg-[#FFF9E6]"
          : "border-slate-200 bg-slate-50"
      }`}
    >
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xl font-black ${
          earned
            ? "bg-[#F2B705] text-[#0D1B3D]"
            : "bg-slate-200 text-slate-500"
        }`}
      >
        {earned ? "✓" : "○"}
      </div>

      <div>
        <p className="font-black text-[#0D1B3D]">
          {title}
        </p>

        <p className="mt-1 text-sm leading-6 text-slate-600">
          {description}
        </p>
      </div>
    </div>
  );
}

function QuickAction({
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
      className="rounded-2xl border border-slate-200 p-5 transition hover:border-[#F2B705] hover:bg-[#FFF9E6]"
    >
      <h3 className="text-lg font-black text-[#0D1B3D]">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        {description}
      </p>

      <p className="mt-4 font-black text-[#0D1B3D]">
        Open →
      </p>
    </Link>
  );
}
