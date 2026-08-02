"use client";

import { useEffect, useMemo, useState } from "react";
import {
  futureReadyProfessionals,
  interactiveStyles,
  professionalStatuses,
  type FutureReadyProfessional,
  type InteractiveStyle,
  type ProfessionalStatus,
} from "@/content/professionals";
import {
  ambassadorOperations,
  type AmbassadorOperationWeek,
} from "@/content/ambassador-operations";

const PROFESSIONALS_KEY = "future-ready:ambassador-professionals";
const OPERATIONS_KEY = "future-ready:ambassador-operations";

function loadProfessionals(): FutureReadyProfessional[] {
  if (typeof window === "undefined") return futureReadyProfessionals;

  try {
    const saved = window.localStorage.getItem(PROFESSIONALS_KEY);
    return saved
      ? (JSON.parse(saved) as FutureReadyProfessional[])
      : futureReadyProfessionals;
  } catch {
    return futureReadyProfessionals;
  }
}

function createBlankProfessional(): FutureReadyProfessional {
  return {
    id: `professional-${Date.now()}`,
    name: "",
    organization: "",
    title: "",
    email: "",
    phone: "",
    website: "",
    bio: "",
    softSkills: [],
    interactiveStyles: [],
    assignedWeek: null,
    status: "Prospect",
    notes: "",
  };
}

export default function ProfessionalsPage() {
  const [professionals, setProfessionals] =
    useState<FutureReadyProfessional[]>(futureReadyProfessionals);
  const [selectedId, setSelectedId] = useState(futureReadyProfessionals[0].id);
  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const loaded = loadProfessionals();
    setProfessionals(loaded);
    setSelectedId(loaded[0]?.id ?? "");
  }, []);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return professionals;

    return professionals.filter((professional) =>
      [
        professional.name,
        professional.organization,
        professional.title,
        professional.email,
        professional.softSkills.join(" "),
        professional.interactiveStyles.join(" "),
      ]
        .join(" ")
        .toLowerCase()
        .includes(term),
    );
  }, [professionals, search]);

  const selected =
    professionals.find((professional) => professional.id === selectedId) ??
    professionals[0];

  function update<K extends keyof FutureReadyProfessional>(
    field: K,
    value: FutureReadyProfessional[K],
  ) {
    if (!selected) return;

    setProfessionals((current) =>
      current.map((professional) =>
        professional.id === selected.id
          ? { ...professional, [field]: value }
          : professional,
      ),
    );

    setSaved(false);
  }

  function toggleStyle(style: InteractiveStyle) {
    if (!selected) return;

    const next = selected.interactiveStyles.includes(style)
      ? selected.interactiveStyles.filter((item) => item !== style)
      : [...selected.interactiveStyles, style];

    update("interactiveStyles", next);
  }

  function addProfessional() {
    const next = createBlankProfessional();
    setProfessionals((current) => [...current, next]);
    setSelectedId(next.id);
    setSaved(false);
  }

  function deleteProfessional() {
    if (!selected) return;

    const remaining = professionals.filter(
      (professional) => professional.id !== selected.id,
    );

    const safeRemaining =
      remaining.length > 0 ? remaining : [createBlankProfessional()];

    setProfessionals(safeRemaining);
    setSelectedId(safeRemaining[0].id);
    setSaved(false);
  }

  function saveAll() {
    window.localStorage.setItem(
      PROFESSIONALS_KEY,
      JSON.stringify(professionals),
    );

    const operationsSaved = window.localStorage.getItem(OPERATIONS_KEY);
    const operations: AmbassadorOperationWeek[] = operationsSaved
      ? (JSON.parse(operationsSaved) as AmbassadorOperationWeek[])
      : ambassadorOperations;

    const updatedOperations = operations.map((week) => {
      const assigned = professionals.find(
        (professional) => professional.assignedWeek === week.week,
      );

      if (!assigned) return week;

      return {
        ...week,
        speakerName: assigned.name,
        speakerEmail: assigned.email,
        speakerTopic:
          assigned.softSkills.length > 0
            ? assigned.softSkills.join(", ")
            : week.speakerTopic,
        status:
          assigned.status === "Confirmed"
            ? "Confirmed"
            : assigned.status === "Completed"
              ? "Completed"
              : assigned.status === "Invited"
                ? "Contacted"
                : "Suggested",
        notes: [
          week.notes,
          assigned.organization
            ? `${assigned.name || "Professional"} — ${assigned.organization}`
            : assigned.name,
          assigned.notes,
        ]
          .filter(Boolean)
          .join("\n"),
      };
    });

    window.localStorage.setItem(
      OPERATIONS_KEY,
      JSON.stringify(updatedOperations),
    );

    setSaved(true);
  }

  if (!selected) return null;

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8">
      <div className="mx-auto max-w-7xl">
        <header className="rounded-[30px] bg-[#0D1B3D] px-7 py-8 text-white shadow-xl">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#F2B705]">
                Ambassador Christian School
              </p>
              <h1 className="mt-2 text-4xl font-black">
                Professional Directory
              </h1>
              <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-200">
                Add professionals, track contact details, choose interactive
                styles, and assign them to a program week.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={addProfessional}
                className="rounded-xl border border-white/30 px-5 py-3 font-black"
              >
                Add Professional
              </button>

              <button
                type="button"
                onClick={saveAll}
                className="rounded-xl bg-[#F2B705] px-5 py-3 font-black text-[#0D1B3D]"
              >
                Save All
              </button>
            </div>
          </div>

          {saved ? (
            <p className="mt-4 font-black text-emerald-300">
              Saved and synced to Operations.
            </p>
          ) : null}
        </header>

        <section className="mt-8 grid gap-8 xl:grid-cols-[340px_1fr]">
          <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search professionals"
              className={inputClass}
            />

            <div className="mt-5 max-h-[70vh] space-y-3 overflow-y-auto">
              {filtered.map((professional) => (
                <button
                  key={professional.id}
                  type="button"
                  onClick={() => setSelectedId(professional.id)}
                  className={`w-full rounded-2xl border p-4 text-left ${
                    professional.id === selected.id
                      ? "border-[#F2B705] bg-[#FFF9DF]"
                      : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  <p className="font-black text-[#0D1B3D]">
                    {professional.name || "New Professional"}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    {professional.organization || "Organization not added"}
                  </p>
                  <p className="mt-2 text-xs font-black uppercase tracking-[0.12em] text-[#725500]">
                    {professional.status}
                    {professional.assignedWeek
                      ? ` · Week ${professional.assignedWeek}`
                      : ""}
                  </p>
                </button>
              ))}
            </div>
          </aside>

          <section className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Field label="Name">
                <input
                  value={selected.name}
                  onChange={(event) => update("name", event.target.value)}
                  className={inputClass}
                />
              </Field>

              <Field label="Organization">
                <input
                  value={selected.organization}
                  onChange={(event) =>
                    update("organization", event.target.value)
                  }
                  className={inputClass}
                />
              </Field>

              <Field label="Title">
                <input
                  value={selected.title}
                  onChange={(event) => update("title", event.target.value)}
                  className={inputClass}
                />
              </Field>

              <Field label="Status">
                <select
                  value={selected.status}
                  onChange={(event) =>
                    update(
                      "status",
                      event.target.value as ProfessionalStatus,
                    )
                  }
                  className={inputClass}
                >
                  {professionalStatuses.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
              </Field>

              <Field label="Email">
                <input
                  type="email"
                  value={selected.email}
                  onChange={(event) => update("email", event.target.value)}
                  className={inputClass}
                />
              </Field>

              <Field label="Phone">
                <input
                  value={selected.phone}
                  onChange={(event) => update("phone", event.target.value)}
                  className={inputClass}
                />
              </Field>

              <Field label="Website or LinkedIn">
                <input
                  value={selected.website}
                  onChange={(event) =>
                    update("website", event.target.value)
                  }
                  className={inputClass}
                />
              </Field>

              <Field label="Assigned Week">
                <select
                  value={selected.assignedWeek ?? ""}
                  onChange={(event) =>
                    update(
                      "assignedWeek",
                      event.target.value
                        ? Number(event.target.value)
                        : null,
                    )
                  }
                  className={inputClass}
                >
                  <option value="">Not assigned</option>
                  {Array.from({ length: 16 }, (_, index) => index + 1).map(
                    (week) => (
                      <option key={week} value={week}>
                        Week {week}
                      </option>
                    ),
                  )}
                </select>
              </Field>
            </div>

            <Field label="Professional Bio">
              <textarea
                rows={4}
                value={selected.bio}
                onChange={(event) => update("bio", event.target.value)}
                className={inputClass}
              />
            </Field>

            <Field label="Soft Skills / Topics">
              <input
                value={selected.softSkills.join(", ")}
                onChange={(event) =>
                  update(
                    "softSkills",
                    event.target.value
                      .split(",")
                      .map((item) => item.trim())
                      .filter(Boolean),
                  )
                }
                placeholder="Communication, conflict management, interviews, AI..."
                className={inputClass}
              />
            </Field>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-black text-[#0D1B3D]">
                Interactive Styles
              </h2>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {interactiveStyles.map((style) => (
                  <label
                    key={style}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 font-bold text-slate-700"
                  >
                    <input
                      type="checkbox"
                      checked={selected.interactiveStyles.includes(style)}
                      onChange={() => toggleStyle(style)}
                    />
                    {style}
                  </label>
                ))}
              </div>
            </section>

            <Field label="Admin Notes">
              <textarea
                rows={5}
                value={selected.notes}
                onChange={(event) => update("notes", event.target.value)}
                placeholder="Invitation, availability, follow-up, parking, session ideas..."
                className={inputClass}
              />
            </Field>

            <div className="flex flex-wrap gap-3">
              {selected.email ? (
                <a
                  href={`mailto:${selected.email}`}
                  className="rounded-xl bg-[#0D1B3D] px-5 py-3 font-black text-white"
                >
                  Email Professional
                </a>
              ) : null}

              {selected.phone ? (
                <a
                  href={`tel:${selected.phone}`}
                  className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-black text-slate-700"
                >
                  Call
                </a>
              ) : null}

              <button
                type="button"
                onClick={deleteProfessional}
                className="rounded-xl border border-red-200 bg-white px-5 py-3 font-black text-red-700"
              >
                Delete
              </button>
            </div>
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
