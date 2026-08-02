"use client";

import { useEffect, useMemo, useState } from "react";
import { curriculum } from "@/content/platform";
import {
  ambassadorOperations,
  type AmbassadorOperationWeek,
} from "@/content/ambassador-operations";

type PlannerWeek = {
  week: number;
  outcome: string;
  launch: string;
  teamHuddle: string;
  workplaceChallenge: string;
  aiSkill: string;
  reflection: string;
  nextStep: string;
  materials: string;
  sessionNotes: string;
};

const PLANNER_KEY = "future-ready:ambassador-session-planner";
const OPERATIONS_KEY = "future-ready:ambassador-operations";

function createDefaults(): PlannerWeek[] {
  return curriculum.map((lesson) => ({
    week: lesson.week,
    outcome: lesson.objective,
    launch: "Use a quick movement, question, or paired introduction.",
    teamHuddle: lesson.discussionQuestions.join("\n"),
    workplaceChallenge: lesson.studentActivity,
    aiSkill:
      lesson.aiCoachPrompt ||
      "Use AI to improve one workplace-ready response, then explain what you changed.",
    reflection:
      lesson.weeklyReflection ||
      "What did you learn, what did you practice, and what will you use next?",
    nextStep:
      lesson.homework ||
      "Practice one skill from today's session before the next meeting.",
    materials: "Workbook, facilitator guide, activity materials, and slides.",
    sessionNotes: "",
  }));
}

function loadJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

export default function SessionPlannerPage() {
  const defaults = useMemo(() => createDefaults(), []);
  const [weeks, setWeeks] = useState<PlannerWeek[]>(defaults);
  const [operations, setOperations] =
    useState<AmbassadorOperationWeek[]>(ambassadorOperations);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setWeeks(loadJson<PlannerWeek[]>(PLANNER_KEY, defaults));
    setOperations(
      loadJson<AmbassadorOperationWeek[]>(
        OPERATIONS_KEY,
        ambassadorOperations,
      ),
    );
  }, [defaults]);

  const lesson = curriculum.find((item) => item.week === selectedWeek);
  const planner = weeks.find((item) => item.week === selectedWeek) ?? weeks[0];
  const operation =
    operations.find((item) => item.week === selectedWeek) ??
    ambassadorOperations[0];

  function update(field: keyof PlannerWeek, value: string) {
    setWeeks((current) =>
      current.map((item) =>
        item.week === selectedWeek ? { ...item, [field]: value } : item,
      ),
    );
    setSaved(false);
  }

  function save() {
    window.localStorage.setItem(PLANNER_KEY, JSON.stringify(weeks));
    setSaved(true);
  }

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8 print:bg-white print:px-0">
      <div className="mx-auto max-w-7xl">
        <header className="rounded-[30px] bg-[#0D1B3D] px-7 py-8 text-white shadow-xl print:rounded-none print:shadow-none">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#F2B705]">
                Ambassador Christian School
              </p>
              <h1 className="mt-2 text-4xl font-black">Session Planner</h1>
              <p className="mt-3 text-lg text-slate-200">
                Week {selectedWeek} · {lesson?.title}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 print:hidden">
              <select
                value={selectedWeek}
                onChange={(event) => setSelectedWeek(Number(event.target.value))}
                className="rounded-xl border border-white/20 bg-white px-4 py-3 font-black text-[#0D1B3D]"
              >
                {curriculum.map((item) => (
                  <option key={item.week} value={item.week}>
                    Week {item.week} — {item.title}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => window.print()}
                className="rounded-xl border border-white/30 px-5 py-3 font-black"
              >
                Print
              </button>

              <button
                type="button"
                onClick={save}
                className="rounded-xl bg-[#F2B705] px-5 py-3 font-black text-[#0D1B3D]"
              >
                Save
              </button>
            </div>
          </div>

          {saved ? <p className="mt-4 font-black text-emerald-300">Saved</p> : null}
        </header>

        <section className="mt-8 grid gap-7 xl:grid-cols-[1fr_340px]">
          <div className="space-y-6">
            <EditableCard title="Today's Outcome" value={planner.outcome} onChange={(v) => update("outcome", v)} />
            <EditableCard title="Launch" subtitle="5 minutes" value={planner.launch} onChange={(v) => update("launch", v)} />
            <EditableCard title="Team Huddle" subtitle="10 minutes" value={planner.teamHuddle} onChange={(v) => update("teamHuddle", v)} />
            <EditableCard title="Workplace Challenge" subtitle="15–20 minutes" value={planner.workplaceChallenge} onChange={(v) => update("workplaceChallenge", v)} />
            <EditableCard title="AI Skill" value={planner.aiSkill} onChange={(v) => update("aiSkill", v)} />
            <EditableCard title="Reflection" value={planner.reflection} onChange={(v) => update("reflection", v)} />
            <EditableCard title="Next Step" value={planner.nextStep} onChange={(v) => update("nextStep", v)} />
            <EditableCard
              title="Session Notes"
              value={planner.sessionNotes}
              onChange={(v) => update("sessionNotes", v)}
              placeholder="Wins, challenges, follow-up, and students to encourage..."
            />
          </div>

          <aside className="space-y-6">
            <InfoCard title="Professional">
              <InfoRow label="Suggested" value={operation.suggestedSpeakerType} />
              <InfoRow label="Name" value={operation.speakerName || "Not assigned"} />
              <InfoRow label="Topic" value={operation.speakerTopic || lesson?.title || ""} />
              <InfoRow label="Status" value={operation.status} />
              <InfoRow label="Date" value={operation.sessionDate || "Not scheduled"} />
              <InfoRow label="Experience" value={operation.interactiveActivity} />
            </InfoCard>

            <EditableCard title="Materials" value={planner.materials} onChange={(v) => update("materials", v)} />

            <InfoCard title="Quick Links">
              <a href={`/ambassador/curriculum/${selectedWeek}`} className="block rounded-xl bg-[#0D1B3D] px-4 py-3 text-center font-black text-white print:hidden">
                Open Week {selectedWeek}
              </a>
              <a href="/ambassador/facilitator/attendance" className="mt-3 block rounded-xl border border-slate-300 px-4 py-3 text-center font-black text-slate-700 print:hidden">
                Take Attendance
              </a>
              <a href="/ambassador/operations" className="mt-3 block rounded-xl border border-slate-300 px-4 py-3 text-center font-black text-slate-700 print:hidden">
                Edit Speaker & Calendar
              </a>
            </InfoCard>

            <InfoCard title="Backup Experience">
              <p className="leading-7 text-slate-700">
                Run the workplace challenge without the guest. Divide students into teams,
                assign roles, coach the scenario, and close with the same reflection.
              </p>
            </InfoCard>
          </aside>
        </section>
      </div>
    </main>
  );
}

function EditableCard({
  title,
  subtitle,
  value,
  onChange,
  placeholder,
}: {
  title: string;
  subtitle?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-black text-[#0D1B3D]">{title}</h2>
        {subtitle ? (
          <span className="rounded-full bg-[#FFF3C4] px-3 py-1 text-sm font-black text-[#725500]">
            {subtitle}
          </span>
        ) : null}
      </div>
      <textarea
        rows={4}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-4 w-full rounded-xl border border-slate-300 px-4 py-3 leading-7 outline-none focus:border-[#F2B705] focus:ring-2 focus:ring-[#F2B705]/20 print:border-0 print:px-0"
      />
    </section>
  );
}

function InfoCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-black text-[#0D1B3D]">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-slate-100 py-3 last:border-0">
      <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">
        {label}
      </p>
      <p className="mt-1 leading-6 text-slate-800">{value}</p>
    </div>
  );
}
