
Screenshot 2026-07-10 at 2.04.27 AM(1).png
Screenshot 2026-07-13 at 7.31.05 PM.png
Screenshot 2026-07-13 at 7.31.18 PM.png
Screenshot 2026-07-13 at 7.30.10 PM.png
Screenshot 2026-07-13 at 7.30.23 PM.png
Screenshot 2026-07-13 at 7.30.30 PM.png
Screenshot 2026-07-13 at 7.30.48 PM(1).png
ok what else do we  need to complete on the ambassador side to get this up and usable 

you can use this on the ambassador side with the Future Ready logo so it is custom to them and keep building

here it is

and here are the brand standards






Pasted text(1).txt
Document


future-ready-project-snapshot.txt
Document


Pasted text(2).txt
Document


Pasted text(3).txt
Document


Pasted text(4).txt
Document

this is where i am at and do not know what all the buttons mean





Pasted text(5).txt
Document


future-ready-current-audit.txt
Document

Screenshot 2026-07-30 at 8.10.28 AM.png
Screenshot 2026-07-30 at 8.12.10 AM.png
Screenshot 2026-07-30 at 8.12.25 AM.png


page(31).tsx
TypeScript

VSCode-darwin-arm64.dmg
File

curriculum-backup.ts
TypeScript

Screenshot 2026-07-13 at 7.30.10 PM(1).png
Screenshot 2026-07-13 at 7.30.23 PM(1).png

schema.prisma
File

schema(1).prisma
File


package.jsonnpx prisma db seed
File
i have all the prisma saves etc


future-ready-code-bundle.zip
Zip Archive


Pasted text(9).txt
Document


Pasted text(13).txt
Document


Pasted text(14).txt
Document


Pasted text(15).txt
Document


Pasted text(16).txt
Document


Pasted code.ts
TypeScript


Pasted text(17).txt
Document

Perfect—that tells us exactly where we are.

The dashboard is loading, but it doesn't currently have a "Continue Curriculum" (or "Continue Learning") button. That isn't a bug in the curriculum; it's simply missing from the dashboard implementation.

We'll add one button, not redesign the page.

It should link the student directly to their current lesson, for example:

Continue Learning →
Week 7 • Professional Communication
and the button should navigate to:

/ambassador/curriculum/{student.currentWeek}
So if the student is on Week 12, it goes to:

/ambassador/curriculum/12
This is exactly the kind of enhancement we want—connecting existing pieces, not rebuilding them.

Next step: I'll give you the complete replacement for app/ambassador/student-dashboard/[id]/page.tsx with that button added and wired into the existing dashboard. That will keep the dashboard and curriculum connected.


ok

Excellent. That's exactly the type of thing we want to improve.

Because your student dashboard is already Prisma-backed, we're only going to add a button—we're not replacing the dashboard architecture. The dashboard already loads the student and calculates the current lesson. 


Find the section that displays the current lesson title. It will look similar to:

<h2 className="mt-2 text-3xl font-black text-[#0D1B3D]">
  {currentLesson?.title ?? "Continue Your Journey"}
</h2>

<p className="mt-5 text-lg leading-8 text-slate-600">
  {currentLesson?.objective ??
    "Build the skills, confidence, and professional readiness needed for your future."}
</p>
Immediately below that paragraph, add this:

<div className="mt-8 flex flex-wrap gap-4">
  <Link
    href={`/ambassador/curriculum/${studentRecord.currentWeek}`}
    className="inline-flex items-center rounded-xl bg-[#0D1B3D] px-6 py-4 text-base font-black text-white transition hover:bg-[#17356F]"
  >
    Continue Curriculum →
  </Link>

  <Link
    href={`/ambassador/student-passport/${studentRecord.id}`}
    className="inline-flex items-center rounded-xl border-2 border-[#0D1B3D] px-6 py-4 text-base font-black text-[#0D1B3D] transition hover:bg-slate-50"
  >
    Open Passport
  </Link>
</div>
That gives every student two primary actions:

Continue Curriculum → resumes at their current week.

Open Passport → opens their personal Future Ready™ passport.

After you save the file and refresh the dashboard, you should see those buttons directly under the "Today's Focus" section.

Once that's in place, we'll make those buttons dynamic so they also show the current week number (for example, "Continue Week 7").


just give whole new code

Worked for 1m 4s
Replace the entire file:

app/ambassador/student-dashboard/[id]/page.tsx
with this complete replacement file:

student-dashboard-page.tsx

This keeps the Prisma-backed dashboard intact and changes the action to clearly display:

Continue Curriculum — Week 1
The week number updates automatically for each student.


student-dashboard-page.tsx
Code


Library
/
student-dashboard-page.tsx


import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

type SkillScore = {
  name: string;
  score: number;
};

type CurriculumWeek = {
  week: number;
  title: string;
  objective: string;
};

function getContentText(
  content: unknown,
  keys: string[],
): string | null {
  if (
    !content ||
    typeof content !== "object" ||
    Array.isArray(content)
  ) {
    return null;
  }

  const record = content as Record<string, unknown>;

  for (const key of keys) {
    const value = record[key];

    if (
      typeof value === "string" &&
      value.trim().length > 0
    ) {
      return value;
    }
  }

  return null;
}

function clampScore(value: number): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.min(100, Math.max(0, Math.round(value)));
}

export default async function StudentDashboardPage({
  params,
}: PageProps) {
  const { id } = await params;

  const studentRecord = await db.student.findFirst({
    where: {
      deletedAt: null,
      OR: [
        {
          id,
        },
        {
          userId: id,
        },
        {
          studentNumber: id,
        },
      ],
    },
    include: {
      user: true,
      school: true,

      enrollments: {
        where: {
          status: {
            in: ["ACTIVE", "COMPLETED"],
          },
        },
        include: {
          cohort: {
            include: {
              organization: true,
              school: true,
              program: true,
            },
          },
        },
        orderBy: {
          enrolledAt: "desc",
        },
      },

      lessonProgress: {
        include: {
          lesson: true,
        },
        orderBy: {
          updatedAt: "desc",
        },
      },

      reflections: {
        orderBy: {
          updatedAt: "desc",
        },
      },

      portfolio: {
        include: {
          artifacts: {
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      },

      badgeAwards: {
        include: {
          badge: true,
        },
        orderBy: {
          awardedAt: "desc",
        },
      },

      studentSkills: {
        include: {
          skill: true,
        },
        orderBy: {
          score: "desc",
        },
      },

      careerInterests: {
        orderBy: [
          {
            interest: "desc",
          },
          {
            careerName: "asc",
          },
        ],
      },

      attendance: {
        orderBy: {
          date: "desc",
        },
      },
    },
  });

  if (!studentRecord) {
    notFound();
  }

  const activeEnrollment =
    studentRecord.enrollments.find(
      (enrollment) =>
        enrollment.status === "ACTIVE",
    ) ?? studentRecord.enrollments[0];

  const program = activeEnrollment?.cohort.program;
  const cohort = activeEnrollment?.cohort;

  let lessons = program
    ? await db.lesson.findMany({
        where: {
          module: {
            programId: program.id,
          },
          status: "ACTIVE",
        },
        include: {
          module: true,
        },
        orderBy: [
          {
            weekNumber: "asc",
          },
          {
            position: "asc",
          },
        ],
      })
    : [];

  if (program && lessons.length === 0) {
    lessons = await db.lesson.findMany({
      where: {
        module: {
          programId: program.id,
        },
      },
      include: {
        module: true,
      },
      orderBy: [
        {
          weekNumber: "asc",
        },
        {
          position: "asc",
        },
      ],
    });
  }

  const totalWeeks = Math.max(
    program?.totalWeeks ?? 36,
    1,
  );

  const completedLessonIds = new Set(
    studentRecord.lessonProgress
      .filter(
        (progress) =>
          progress.completedAt !== null ||
          progress.percent >= 100,
      )
      .map((progress) => progress.lessonId),
  );

  const completedWeekNumbers = new Set(
    studentRecord.lessonProgress
      .filter(
        (progress) =>
          progress.completedAt !== null ||
          progress.percent >= 100,
      )
      .map((progress) => progress.lesson.weekNumber),
  );

  const firstIncompleteLesson = lessons.find(
    (lesson) => !completedLessonIds.has(lesson.id),
  );

  const highestStartedWeek =
    studentRecord.lessonProgress.reduce(
      (highest, progress) => {
        if (
          progress.startedAt ||
          progress.completedAt ||
          progress.percent > 0
        ) {
          return Math.max(
            highest,
            progress.lesson.weekNumber,
          );
        }

        return highest;
      },
      0,
    );

  const currentWeek = Math.min(
    totalWeeks,
    Math.max(
      1,
      firstIncompleteLesson?.weekNumber ??
        highestStartedWeek ??
        1,
    ),
  );

  const currentLesson =
    lessons.find(
      (lesson) =>
        lesson.weekNumber === currentWeek,
    ) ?? firstIncompleteLesson;

  const curriculum: CurriculumWeek[] =
    Array.from(
      {
        length: totalWeeks,
      },
      (_, index) => {
        const week = index + 1;

        const lesson = lessons.find(
          (item) => item.weekNumber === week,
        );

        const objective =
          getContentText(lesson?.content, [
            "objective",
            "learningObjective",
            "description",
            "overview",
          ]) ??
          lesson?.summary ??
          "Continue building the skills, confidence, and professional readiness needed for your future.";

        return {
          week,
          title:
            lesson?.title ??
            `Future Ready™ Week ${week}`,
          objective,
        };
      },
    );

  const completedWeeks =
    completedWeekNumbers.size;

  const journeyProgress = clampScore(
    (completedWeeks / totalWeeks) * 100,
  );

  const portfolioCompleted =
    studentRecord.portfolio?.artifacts.length ?? 0;

  const portfolioItems = Math.max(
    5,
    portfolioCompleted,
  );

  const portfolioProgress = clampScore(
    (portfolioCompleted / portfolioItems) *
      100,
  );

  const attendedRecords =
    studentRecord.attendance.filter(
      (record) =>
        record.status === "PRESENT" ||
        record.status === "LATE",
    ).length;

  const attendanceRate =
    studentRecord.attendance.length > 0
      ? clampScore(
          (attendedRecords /
            studentRecord.attendance.length) *
            100,
        )
      : 0;

  const readinessScore = clampScore(
    Number(studentRecord.readinessScore),
  );

  const fullName =
    studentRecord.user.displayName?.trim() ||
    `${studentRecord.user.firstName} ${studentRecord.user.lastName}`.trim();

  const firstName =
    studentRecord.user.firstName.trim() ||
    fullName.split(" ")[0] ||
    "Student";

  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const schoolName =
    studentRecord.school?.name ??
    cohort?.school?.name ??
    cohort?.organization.name ??
    "Future Ready™ Partner School";

  const badges = studentRecord.badgeAwards.map(
    (award) => ({
      id: award.id,
      name: award.badge.name,
      description:
        award.badge.description ??
        "Future Ready™ milestone earned.",
    }),
  );

  const databaseSkillScores: SkillScore[] =
    studentRecord.studentSkills.map(
      (studentSkill) => ({
        name: studentSkill.skill.name,
        score: clampScore(
          Number(studentSkill.score),
        ),
      }),
    );

  const defaultSkills = [
    "Communication",
    "Teamwork",
    "Professionalism",
    "Leadership",
    "Problem Solving",
    "Adaptability",
  ];

  const skillScores: SkillScore[] =
    databaseSkillScores.length > 0
      ? databaseSkillScores
      : defaultSkills.map((name) => ({
          name,
          score: 0,
        }));

  const careerInterests =
    studentRecord.careerInterests.map(
      (interest) => interest.careerName,
    );

  const currentLessonProgress =
    currentLesson
      ? studentRecord.lessonProgress.find(
          (progress) =>
            progress.lessonId ===
            currentLesson.id,
        )
      : undefined;

  const currentLessonComplete =
    Boolean(
      currentLessonProgress?.completedAt,
    ) ||
    (currentLessonProgress?.percent ?? 0) >=
      100;

  const currentReflectionComplete =
    currentLesson
      ? studentRecord.reflections.some(
          (reflection) =>
            reflection.lessonId ===
              currentLesson.id &&
            reflection.status !== "DRAFT",
        )
      : false;

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[32px] bg-[#0D1B3D] text-white shadow-xl">
        <div className="grid gap-8 p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10">
          <div>
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F2B705] text-xl font-black text-[#0D1B3D]">
                {initials || "FR"}
              </div>

              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#F2B705]">
                  Future Ready™ Student Home
                </p>

                <p className="mt-1 text-sm text-slate-300">
                  {schoolName}
                </p>
              </div>
            </div>

            <h1 className="mt-7 text-4xl font-black sm:text-5xl">
              Welcome back, {firstName}
            </h1>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-200">
              You are currently on Week{" "}
              {currentWeek} of your Future
              Ready™ journey. Keep building
              the skills, confidence, and
              experience that will help you
              launch your future.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/ambassador/curriculum/${currentWeek}`}
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#F2B705] px-6 py-3 font-black text-[#0D1B3D] transition hover:bg-[#DDA600]"
              >
                Continue Curriculum — Week {currentWeek}
              </Link>

              <Link
                href={`/ambassador/student-passport/${studentRecord.id}`}
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
              {readinessScore}%
            </p>

            <p className="mt-2 text-sm text-slate-300">
              Readiness Score
            </p>

            <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/15">
              <div
                className="h-full rounded-full bg-[#F2B705]"
                style={{
                  width: `${readinessScore}%`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 bg-white/5 px-8 py-5">
          <p className="font-semibold text-slate-200">
            Discover Purpose. Build Skills.
            Launch Your Future.
          </p>
        </div>
      </section>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardStat
          label="Current Week"
          value={`${currentWeek}/${totalWeeks}`}
          detail="Future Ready™ journey"
        />

        <DashboardStat
          label="Attendance"
          value={`${attendanceRate}%`}
          detail="Participation and reliability"
        />

        <DashboardStat
          label="Badges Earned"
          value={String(badges.length)}
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
                {totalWeeks}-Week Progress
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
            {curriculum.map((week) => {
              const complete =
                completedWeekNumbers.has(
                  week.week,
                );

              const current =
                week.week === currentWeek;

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

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <JourneyPhase
              name="Discover"
              weeks="Weeks 1–6"
              active={currentWeek <= 6}
              complete={currentWeek > 6}
            />

            <JourneyPhase
              name="Develop"
              weeks="Weeks 7–12"
              active={
                currentWeek >= 7 &&
                currentWeek <= 12
              }
              complete={currentWeek > 12}
            />

            <JourneyPhase
              name="Explore"
              weeks="Weeks 13–18"
              active={
                currentWeek >= 13 &&
                currentWeek <= 18
              }
              complete={currentWeek > 18}
            />

            <JourneyPhase
              name="Connect"
              weeks="Weeks 19–24"
              active={
                currentWeek >= 19 &&
                currentWeek <= 24
              }
              complete={currentWeek > 24}
            />

            <JourneyPhase
              name="Experience"
              weeks="Weeks 25–30"
              active={
                currentWeek >= 25 &&
                currentWeek <= 30
              }
              complete={currentWeek > 30}
            />

            <JourneyPhase
              name="Launch"
              weeks="Weeks 31–36"
              active={currentWeek >= 31}
              complete={currentWeek > 36}
            />
          </div>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#4B2265]">
            Today&apos;s Focus
          </p>

          <p className="mt-5 text-sm font-black uppercase tracking-[0.14em] text-slate-500">
            Week {currentWeek}
          </p>

          <h2 className="mt-2 text-3xl font-black text-[#0D1B3D]">
            {currentLesson?.title ??
              "Continue Your Journey"}
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            {currentLesson
              ? getContentText(
                  currentLesson.content,
                  [
                    "objective",
                    "learningObjective",
                    "description",
                    "overview",
                  ],
                ) ??
                currentLesson.summary ??
                "Build the skills, confidence, and professional readiness needed for your future."
              : "Build the skills, confidence, and professional readiness needed for your future."}
          </p>

          <div className="mt-7 rounded-2xl bg-[#FFF9E6] p-5">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#8A6600]">
              This Week
            </p>

            <p className="mt-2 font-bold leading-7 text-[#0D1B3D]">
              Complete your lesson activity
              and add one meaningful reflection
              to your Future Ready™ record.
            </p>
          </div>

          <div className="mt-7 space-y-3">
            <TaskItem
              label="Complete this week’s lesson"
              complete={currentLessonComplete}
            />

            <TaskItem
              label="Submit your reflection"
              complete={
                currentReflectionComplete
              }
            />

            <TaskItem
              label="Update your student profile"
              complete={
                studentRecord.profileComplete
              }
            />
          </div>

          <Link
            href={`/ambassador/curriculum/${currentWeek}`}
            className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#0D1B3D] px-6 py-3 font-black text-white transition hover:bg-[#172B55]"
          >
            Continue Curriculum — Week {currentWeek}
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
              href={`/ambassador/student-passport/${studentRecord.id}`}
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
            {badges.length > 0 ? (
              badges.map((badge) => (
                <AchievementCard
                  key={badge.id}
                  title={badge.name}
                  description={
                    badge.description
                  }
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

          {careerInterests.length > 0 ? (
            <div className="mt-6 flex flex-wrap gap-3">
              {careerInterests.map(
                (interest) => (
                  <span
                    key={interest}
                    className="rounded-full bg-purple-50 px-4 py-2 font-bold text-purple-800"
                  >
                    {interest}
                  </span>
                ),
              )}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5">
              <p className="font-bold text-slate-600">
                Add your career interests to
                begin building your personalized
                Future Ready™ pathway.
              </p>
            </div>
          )}

          <Link
            href={`/ambassador/student-passport/${studentRecord.id}/profile`}
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
              href={`/ambassador/student-passport/${studentRecord.id}`}
              title="Student Passport"
              description="View your complete readiness record."
            />

            <QuickAction
              href={`/ambassador/student-passport/${studentRecord.id}/profile`}
              title="My Profile"
              description="Update strengths, goals, and interests."
            />

            <QuickAction
              href={`/ambassador/student-passport/${studentRecord.id}/portfolio`}
              title="Digital Portfolio"
              description="Review projects and evidence of growth."
            />

            <QuickAction
              href={`/ambassador/student-passport/${studentRecord.id}/reflections`}
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
Library
/
student-dashboard-page.tsx


import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

type SkillScore = {
  name: string;
  score: number;
};

type CurriculumWeek = {
  week: number;
  title: string;
  objective: string;
};

function getContentText(
  content: unknown,
  keys: string[],
): string | null {
  if (
    !content ||
    typeof content !== "object" ||
    Array.isArray(content)
  ) {
    return null;
  }

  const record = content as Record<string, unknown>;

  for (const key of keys) {
    const value = record[key];

    if (
      typeof value === "string" &&
      value.trim().length > 0
    ) {
      return value;
    }
  }

  return null;
}

function clampScore(value: number): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.min(100, Math.max(0, Math.round(value)));
}

export default async function StudentDashboardPage({
  params,
}: PageProps) {
  const { id } = await params;

  const studentRecord = await db.student.findFirst({
    where: {
      deletedAt: null,
      OR: [
        {
          id,
        },
        {
          userId: id,
        },
        {
          studentNumber: id,
        },
      ],
    },
    include: {
      user: true,
      school: true,

      enrollments: {
        where: {
          status: {
            in: ["ACTIVE", "COMPLETED"],
          },
        },
        include: {
          cohort: {
            include: {
              organization: true,
              school: true,
              program: true,
            },
          },
        },
        orderBy: {
          enrolledAt: "desc",
        },
      },

      lessonProgress: {
        include: {
          lesson: true,
        },
        orderBy: {
          updatedAt: "desc",
        },
      },

      reflections: {
        orderBy: {
          updatedAt: "desc",
        },
      },

      portfolio: {
        include: {
          artifacts: {
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      },

      badgeAwards: {
        include: {
          badge: true,
        },
        orderBy: {
          awardedAt: "desc",
        },
      },

      studentSkills: {
        include: {
          skill: true,
        },
        orderBy: {
          score: "desc",
        },
      },

      careerInterests: {
        orderBy: [
          {
            interest: "desc",
          },
          {
            careerName: "asc",
          },
        ],
      },

      attendance: {
        orderBy: {
          date: "desc",
        },
      },
    },
  });

  if (!studentRecord) {
    notFound();
  }

  const activeEnrollment =
    studentRecord.enrollments.find(
      (enrollment) =>
        enrollment.status === "ACTIVE",
    ) ?? studentRecord.enrollments[0];

  const program = activeEnrollment?.cohort.program;
  const cohort = activeEnrollment?.cohort;

  let lessons = program
    ? await db.lesson.findMany({
        where: {
          module: {
            programId: program.id,
          },
          status: "ACTIVE",
        },
        include: {
          module: true,
        },
        orderBy: [
          {
            weekNumber: "asc",
          },
          {
            position: "asc",
          },
        ],
      })
    : [];

  if (program && lessons.length === 0) {
    lessons = await db.lesson.findMany({
      where: {
        module: {
          programId: program.id,
        },
      },
      include: {
        module: true,
      },
      orderBy: [
        {
          weekNumber: "asc",
        },
        {
          position: "asc",
        },
      ],
    });
  }

  const totalWeeks = Math.max(
    program?.totalWeeks ?? 36,
    1,
  );

  const completedLessonIds = new Set(
    studentRecord.lessonProgress
      .filter(
        (progress) =>
          progress.completedAt !== null ||
          progress.percent >= 100,
      )
      .map((progress) => progress.lessonId),
  );

  const completedWeekNumbers = new Set(
    studentRecord.lessonProgress
      .filter(
        (progress) =>
          progress.completedAt !== null ||
          progress.percent >= 100,
      )
      .map((progress) => progress.lesson.weekNumber),
  );

  const firstIncompleteLesson = lessons.find(
    (lesson) => !completedLessonIds.has(lesson.id),
  );

  const highestStartedWeek =
    studentRecord.lessonProgress.reduce(
      (highest, progress) => {
        if (
          progress.startedAt ||
          progress.completedAt ||
          progress.percent > 0
        ) {
          return Math.max(
            highest,
            progress.lesson.weekNumber,
          );
        }

        return highest;
      },
      0,
    );

  const currentWeek = Math.min(
    totalWeeks,
    Math.max(
      1,
      firstIncompleteLesson?.weekNumber ??
        highestStartedWeek ??
        1,
    ),
  );

  const currentLesson =
    lessons.find(
      (lesson) =>
        lesson.weekNumber === currentWeek,
    ) ?? firstIncompleteLesson;

  const curriculum: CurriculumWeek[] =
    Array.from(
      {
        length: totalWeeks,
      },
      (_, index) => {
        const week = index + 1;

        const lesson = lessons.find(
          (item) => item.weekNumber === week,
        );

        const objective =
          getContentText(lesson?.content, [
            "objective",
            "learningObjective",
            "description",
            "overview",
          ]) ??
          lesson?.summary ??
          "Continue building the skills, confidence, and professional readiness needed for your future.";

        return {
          week,
          title:
            lesson?.title ??
            `Future Ready™ Week ${week}`,
          objective,
        };
      },
    );

  const completedWeeks =
    completedWeekNumbers.size;

  const journeyProgress = clampScore(
    (completedWeeks / totalWeeks) * 100,
  );

  const portfolioCompleted =
    studentRecord.portfolio?.artifacts.length ?? 0;

  const portfolioItems = Math.max(
    5,
    portfolioCompleted,
  );

  const portfolioProgress = clampScore(
    (portfolioCompleted / portfolioItems) *
      100,
  );

  const attendedRecords =
    studentRecord.attendance.filter(
      (record) =>
        record.status === "PRESENT" ||
        record.status === "LATE",
    ).length;

  const attendanceRate =
    studentRecord.attendance.length > 0
      ? clampScore(
          (attendedRecords /
            studentRecord.attendance.length) *
            100,
        )
      : 0;

  const readinessScore = clampScore(
    Number(studentRecord.readinessScore),
  );

  const fullName =
    studentRecord.user.displayName?.trim() ||
    `${studentRecord.user.firstName} ${studentRecord.user.lastName}`.trim();

  const firstName =
    studentRecord.user.firstName.trim() ||
    fullName.split(" ")[0] ||
    "Student";

  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const schoolName =
    studentRecord.school?.name ??
    cohort?.school?.name ??
    cohort?.organization.name ??
    "Future Ready™ Partner School";

  const badges = studentRecord.badgeAwards.map(
    (award) => ({
      id: award.id,
      name: award.badge.name,
      description:
        award.badge.description ??
        "Future Ready™ milestone earned.",
    }),
  );

  const databaseSkillScores: SkillScore[] =
    studentRecord.studentSkills.map(
      (studentSkill) => ({
        name: studentSkill.skill.name,
        score: clampScore(
          Number(studentSkill.score),
        ),
      }),
    );

  const defaultSkills = [
    "Communication",
    "Teamwork",
    "Professionalism",
    "Leadership",
    "Problem Solving",
    "Adaptability",
  ];

  const skillScores: SkillScore[] =
    databaseSkillScores.length > 0
      ? databaseSkillScores
      : defaultSkills.map((name) => ({
          name,
          score: 0,
        }));

  const careerInterests =
    studentRecord.careerInterests.map(
      (interest) => interest.careerName,
    );

  const currentLessonProgress =
    currentLesson
      ? studentRecord.lessonProgress.find(
          (progress) =>
            progress.lessonId ===
            currentLesson.id,
        )
      : undefined;

  const currentLessonComplete =
    Boolean(
      currentLessonProgress?.completedAt,
    ) ||
    (currentLessonProgress?.percent ?? 0) >=
      100;

  const currentReflectionComplete =
    currentLesson
      ? studentRecord.reflections.some(
          (reflection) =>
            reflection.lessonId ===
              currentLesson.id &&
            reflection.status !== "DRAFT",
        )
      : false;

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[32px] bg-[#0D1B3D] text-white shadow-xl">
        <div className="grid gap-8 p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10">
          <div>
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F2B705] text-xl font-black text-[#0D1B3D]">
                {initials || "FR"}
              </div>

              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#F2B705]">
                  Future Ready™ Student Home
                </p>

                <p className="mt-1 text-sm text-slate-300">
                  {schoolName}
                </p>
              </div>
            </div>

            <h1 className="mt-7 text-4xl font-black sm:text-5xl">
              Welcome back, {firstName}
            </h1>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-200">
              You are currently on Week{" "}
              {currentWeek} of your Future
              Ready™ journey. Keep building
              the skills, confidence, and
              experience that will help you
              launch your future.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/ambassador/curriculum/${currentWeek}`}
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#F2B705] px-6 py-3 font-black text-[#0D1B3D] transition hover:bg-[#DDA600]"
              >
                Continue Curriculum — Week {currentWeek}
              </Link>

              <Link
                href={`/ambassador/student-passport/${studentRecord.id}`}
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
              {readinessScore}%
            </p>

            <p className="mt-2 text-sm text-slate-300">
              Readiness Score
            </p>

            <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/15">
              <div
                className="h-full rounded-full bg-[#F2B705]"
                style={{
                  width: `${readinessScore}%`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 bg-white/5 px-8 py-5">
          <p className="font-semibold text-slate-200">
            Discover Purpose. Build Skills.
            Launch Your Future.
          </p>
        </div>
      </section>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardStat
          label="Current Week"
          value={`${currentWeek}/${totalWeeks}`}
          detail="Future Ready™ journey"
        />

        <DashboardStat
          label="Attendance"
          value={`${attendanceRate}%`}
          detail="Participation and reliability"
        />

        <DashboardStat
          label="Badges Earned"
          value={String(badges.length)}
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
                {totalWeeks}-Week Progress
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
            {curriculum.map((week) => {
              const complete =
                completedWeekNumbers.has(
                  week.week,
                );

              const current =
                week.week === currentWeek;

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

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <JourneyPhase
              name="Discover"
              weeks="Weeks 1–6"
              active={currentWeek <= 6}
              complete={currentWeek > 6}
            />

            <JourneyPhase
              name="Develop"
              weeks="Weeks 7–12"
              active={
                currentWeek >= 7 &&
                currentWeek <= 12
              }
              complete={currentWeek > 12}
            />

            <JourneyPhase
              name="Explore"
              weeks="Weeks 13–18"
              active={
                currentWeek >= 13 &&
                currentWeek <= 18
              }
              complete={currentWeek > 18}
            />

            <JourneyPhase
              name="Connect"
              weeks="Weeks 19–24"
              active={
                currentWeek >= 19 &&
                currentWeek <= 24
              }
              complete={currentWeek > 24}
            />

            <JourneyPhase
              name="Experience"
              weeks="Weeks 25–30"
              active={
                currentWeek >= 25 &&
                currentWeek <= 30
              }
              complete={currentWeek > 30}
            />

            <JourneyPhase
              name="Launch"
              weeks="Weeks 31–36"
              active={currentWeek >= 31}
              complete={currentWeek > 36}
            />
          </div>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#4B2265]">
            Today&apos;s Focus
          </p>

          <p className="mt-5 text-sm font-black uppercase tracking-[0.14em] text-slate-500">
            Week {currentWeek}
          </p>

          <h2 className="mt-2 text-3xl font-black text-[#0D1B3D]">
            {currentLesson?.title ??
              "Continue Your Journey"}
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            {currentLesson
              ? getContentText(
                  currentLesson.content,
                  [
                    "objective",
                    "learningObjective",
                    "description",
                    "overview",
                  ],
                ) ??
                currentLesson.summary ??
                "Build the skills, confidence, and professional readiness needed for your future."
              : "Build the skills, confidence, and professional readiness needed for your future."}
          </p>

          <div className="mt-7 rounded-2xl bg-[#FFF9E6] p-5">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#8A6600]">
              This Week
            </p>

            <p className="mt-2 font-bold leading-7 text-[#0D1B3D]">
              Complete your lesson activity
              and add one meaningful reflection
              to your Future Ready™ record.
            </p>
          </div>

          <div className="mt-7 space-y-3">
            <TaskItem
              label="Complete this week’s lesson"
              complete={currentLessonComplete}
            />

            <TaskItem
              label="Submit your reflection"
              complete={
                currentReflectionComplete
              }
            />

            <TaskItem
              label="Update your student profile"
              complete={
                studentRecord.profileComplete
              }
            />
          </div>

          <Link
            href={`/ambassador/curriculum/${currentWeek}`}
            className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#0D1B3D] px-6 py-3 font-black text-white transition hover:bg-[#172B55]"
          >
            Continue Curriculum — Week {currentWeek}
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
              href={`/ambassador/student-passport/${studentRecord.id}`}
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
            {badges.length > 0 ? (
              badges.map((badge) => (
                <AchievementCard
                  key={badge.id}
                  title={badge.name}
                  description={
                    badge.description
                  }
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

          {careerInterests.length > 0 ? (
            <div className="mt-6 flex flex-wrap gap-3">
              {careerInterests.map(
                (interest) => (
                  <span
                    key={interest}
                    className="rounded-full bg-purple-50 px-4 py-2 font-bold text-purple-800"
                  >
                    {interest}
                  </span>
                ),
              )}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5">
              <p className="font-bold text-slate-600">
                Add your career interests to
                begin building your personalized
                Future Ready™ pathway.
              </p>
            </div>
          )}

          <Link
            href={`/ambassador/student-passport/${studentRecord.id}/profile`}
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
              href={`/ambassador/student-passport/${studentRecord.id}`}
              title="Student Passport"
              description="View your complete readiness record."
            />

            <QuickAction
              href={`/ambassador/student-passport/${studentRecord.id}/profile`}
              title="My Profile"
              description="Update strengths, goals, and interests."
            />

            <QuickAction
              href={`/ambassador/student-passport/${studentRecord.id}/portfolio`}
              title="Digital Portfolio"
              description="Review projects and evidence of growth."
            />

            <QuickAction
              href={`/ambassador/student-passport/${studentRecord.id}/reflections`}
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
