"use client";

import { useEffect, useState } from "react";
import { students } from "@/content/platform";

type AttendanceStatus =
  | "Present"
  | "Late"
  | "Absent"
  | "Excused"
  | "Not Recorded";

type AttendanceEntry = {
  studentId: string;
  status: AttendanceStatus;
  notes: string;
};

const storageKey = "future-ready-v2-attendance-week-1";

export default function AttendancePage() {
  const [entries, setEntries] = useState<
    AttendanceEntry[]
  >(
    students.map((student) => ({
      studentId: student.id,
      status: "Not Recorded",
      notes: "",
    }))
  );

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);

    if (!stored) return;

    try {
      setEntries(JSON.parse(stored));
    } catch {
      localStorage.removeItem(storageKey);
    }
  }, []);

  function updateStatus(
    studentId: string,
    status: AttendanceStatus
  ) {
    setEntries((current) =>
      current.map((entry) =>
        entry.studentId === studentId
          ? { ...entry, status }
          : entry
      )
    );

    setSaved(false);
  }

  function updateNotes(
    studentId: string,
    notes: string
  ) {
    setEntries((current) =>
      current.map((entry) =>
        entry.studentId === studentId
          ? { ...entry, notes }
          : entry
      )
    );

    setSaved(false);
  }

  function saveAttendance() {
    localStorage.setItem(
      storageKey,
      JSON.stringify(entries)
    );

    setSaved(true);
  }

  function markAllPresent() {
    setEntries((current) =>
      current.map((entry) => ({
        ...entry,
        status: "Present",
      }))
    );

    setSaved(false);
  }

  return (
    <div className="space-y-10">
      <header className="rounded-3xl bg-[#0D1B3D] px-8 py-10 text-white">
        <h1 className="text-4xl font-black">
          Weekly Attendance
        </h1>

        <p className="mt-4 text-lg text-slate-200">
          Week 1 · Ambassador Christian School
        </p>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-wrap gap-3 border-b border-slate-200 p-6">
          <button
            type="button"
            onClick={markAllPresent}
            className="rounded-xl border-2 border-[#0D1B3D] px-5 py-3 font-black text-[#0D1B3D]"
          >
            Mark All Present
          </button>

          <button
            type="button"
            onClick={saveAttendance}
            className="rounded-xl bg-[#F2B705] px-5 py-3 font-black text-[#0D1B3D]"
          >
            Save Attendance
          </button>

          {saved ? (
            <p className="self-center font-black text-emerald-700">
              Attendance saved.
            </p>
          ) : null}
        </div>

        <div className="divide-y divide-slate-100">
          {students.map((student) => {
            const entry = entries.find(
              (item) =>
                item.studentId === student.id
            );

            return (
              <article
                key={student.id}
                className="grid gap-4 p-6 xl:grid-cols-[1fr_auto_1fr] xl:items-center"
              >
                <div>
                  <p className="font-black text-slate-900">
                    {student.name}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {student.grade}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      "Present",
                      "Late",
                      "Absent",
                      "Excused",
                    ] as AttendanceStatus[]
                  ).map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() =>
                        updateStatus(
                          student.id,
                          status
                        )
                      }
                      className={`rounded-lg border px-4 py-2 text-sm font-black ${
                        entry?.status === status
                          ? "border-[#0D1B3D] bg-[#0D1B3D] text-white"
                          : "border-slate-300 bg-white text-slate-700"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>

                <input
                  value={entry?.notes ?? ""}
                  onChange={(event) =>
                    updateNotes(
                      student.id,
                      event.target.value
                    )
                  }
                  placeholder="Attendance notes"
                  className="rounded-xl border border-slate-300 px-4 py-3"
                />
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
