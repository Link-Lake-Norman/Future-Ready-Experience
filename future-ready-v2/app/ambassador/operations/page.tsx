"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ambassadorOperations,
  type AmbassadorOperationWeek,
  type SpeakerStatus,
} from "@/content/ambassador-operations";

const STORAGE_KEY = "future-ready:ambassador-operations";

const statuses: SpeakerStatus[] = [
  "Suggested",
  "Contacted",
  "Confirmed",
  "Completed",
];

function loadWeeks(): AmbassadorOperationWeek[] {
  if (typeof window === "undefined") return ambassadorOperations;

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (!saved) return ambassadorOperations;

    const parsed: unknown = JSON.parse(saved);

    if (!Array.isArray(parsed)) return ambassadorOperations;

    return parsed as AmbassadorOperationWeek[];
  } catch {
    return ambassadorOperations;
  }
}

export default function AmbassadorOperationsPage() {
  const [weeks, setWeeks] = useState<AmbassadorOperationWeek[]>(
    ambassadorOperations,
  );
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    setWeeks(loadWeeks());
  }, []);

  const current = useMemo(
    () => weeks.find((item) => item.week === selectedWeek) ?? weeks[0],
    [weeks, selectedWeek],
  );

  function updateCurrent(
    field: keyof AmbassadorOperationWeek,
    value: string | number,
  ) {
    setWeeks((existing) =>
      existing.map((item) =>
        item.week === selectedWeek
          ? { ...item, [field]: value }
          : item,
      ),
    );
    setSavedMessage("");
  }

  function saveAll() {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(weeks));
    setSavedMessage("Saved");
  }

  function resetCurrentWeek() {
    const original = ambassadorOperations.find(
      (item) => item.week === selectedWeek,
    );

    if (!original) return;

    setWeeks((existing) =>
      existing.map((item) =>
        item.week === selectedWeek ? { ...original } : item,
      ),
    );
    setSavedMessage("");
  }

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="rounded-[32px] bg-[#0D1B3D] px-7 py-8 text-white shadow-xl lg:px-10">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#F2B705]">
            Ambassador Christian School
          </p>
          <h1 className="mt-3 text-4xl font-black">
            Speaker Planner & Program Calendar
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-200">
            Edit each week, add confirmed speakers, update dates, and keep
            session details in one place.
          </p>
        </header>

        <section className="mt-8 grid gap-8 xl:grid-cols-[340px_1fr]">
          <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-black text-[#0D1B3D]">
                Program Calendar
              </h2>
              <span className="rounded-full bg-[#FFF3C4] px-3 py-1 text-sm font-black text-[#725500]">
                36 Weeks
              </span>
            </div>

            <div className="max-h-[72vh] space-y-2 overflow-y-auto pr-1">
              {weeks.map((item) => (
                <button
                  key={item.week}
                  type="button"
                  onClick={() => setSelectedWeek(item.week)}
                  className={`w-full rounded-2xl border p-4 text-left transition ${
                    selectedWeek === item.week
                      ? "border-[#F2B705] bg-[#FFF9DF]"
                      : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-black text-[#0D1B3D]">
                      Week {item.week}
                    </span>
                    <span className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                      {item.phase}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-bold text-slate-700">
                    {item.sessionTopic}
                  </p>
                  <p className="mt-2 text-xs font-black uppercase tracking-[0.12em] text-[#725500]">
                    {item.status}
                  </p>
                </button>
              ))}
            </div>
          </aside>

          <section className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-[#725500]">
                    {current.phase} · Week {current.week}
                  </p>
                  <h2 className="mt-2 text-3xl font-black text-[#0D1B3D]">
                    {current.sessionTopic}
                  </h2>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={resetCurrentWeek}
                    className="rounded-xl border border-slate-300 px-4 py-3 font-black text-slate-700"
                  >
                    Reset Week
                  </button>
                  <button
                    type="button"
                    onClick={saveAll}
                    className="rounded-xl bg-[#0D1B3D] px-5 py-3 font-black text-white"
                  >
                    Save Changes
                  </button>
                </div>
              </div>

              {savedMessage ? (
                <p className="mt-4 font-black text-emerald-700">
                  {savedMessage}
                </p>
              ) : null}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Field label="Session Date">
                <input
                  type="date"
                  value={current.sessionDate}
                  onChange={(event) =>
                    updateCurrent("sessionDate", event.target.value)
                  }
                  className={inputClass}
                />
              </Field>

              <Field label="Planning Status">
                <select
                  value={current.status}
                  onChange={(event) =>
                    updateCurrent(
                      "status",
                      event.target.value as SpeakerStatus,
                    )
                  }
                  className={inputClass}
                >
                  {statuses.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
              </Field>

              <Field label="Suggested Speaker Type">
                <input
                  value={current.suggestedSpeakerType}
                  onChange={(event) =>
                    updateCurrent(
                      "suggestedSpeakerType",
                      event.target.value,
                    )
                  }
                  className={inputClass}
                />
              </Field>

              <Field label="Confirmed Speaker Name">
                <input
                  value={current.speakerName}
                  onChange={(event) =>
                    updateCurrent("speakerName", event.target.value)
                  }
                  placeholder="Add when confirmed"
                  className={inputClass}
                />
              </Field>

              <Field label="Speaker Email">
                <input
                  type="email"
                  value={current.speakerEmail}
                  onChange={(event) =>
                    updateCurrent("speakerEmail", event.target.value)
                  }
                  placeholder="name@email.com"
                  className={inputClass}
                />
              </Field>

              <Field label="Speaker Topic">
                <input
                  value={current.speakerTopic}
                  onChange={(event) =>
                    updateCurrent("speakerTopic", event.target.value)
                  }
                  placeholder="Add the final session topic"
                  className={inputClass}
                />
              </Field>
            </div>

            <Field label="Interactive Experience">
              <textarea
                rows={4}
                value={current.interactiveActivity}
                onChange={(event) =>
                  updateCurrent(
                    "interactiveActivity",
                    event.target.value,
                  )
                }
                className={inputClass}
              />
            </Field>

            <Field label="Materials">
              <textarea
                rows={3}
                value={current.materials}
                onChange={(event) =>
                  updateCurrent("materials", event.target.value)
                }
                placeholder="Handouts, role-play cards, slides, supplies..."
                className={inputClass}
              />
            </Field>

            <Field label="Admin Notes">
              <textarea
                rows={5}
                value={current.notes}
                onChange={(event) =>
                  updateCurrent("notes", event.target.value)
                }
                placeholder="Invitation status, follow-up, arrival details, parking, reminders..."
                className={inputClass}
              />
            </Field>
          </section>
        </section>
      </div>
    </main>
  );
}

const inputClass =
  "mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-[#F2B705] focus:ring-2 focus:ring-[#F2B705]/20";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <span className="text-sm font-black uppercase tracking-[0.14em] text-[#0D1B3D]">
        {label}
      </span>
      {children}
    </label>
  );
}
