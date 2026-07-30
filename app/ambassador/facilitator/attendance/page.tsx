"use client";

import { useMemo, useState } from "react";
import FacilitatorShell from "@/components/facilitator/FacilitatorShell";
import {
  Hero,
  StatCard,
  sharedStyles,
} from "@/components/facilitator/Shared";
import {
  activeCohort,
  attendanceRecords,
  AttendanceStatus,
} from "@/content/facilitator";

const options: AttendanceStatus[] = [
  "Present",
  "Late",
  "Absent",
  "Excused",
];

const statusMap: Record<
  AttendanceStatus,
  "PRESENT" | "LATE" | "ABSENT" | "EXCUSED"
> = {
  Present: "PRESENT",
  Late: "LATE",
  Absent: "ABSENT",
  Excused: "EXCUSED",
};

function getToday() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function Page() {
  const [rows, setRows] = useState(attendanceRecords);
  const [attendanceDate, setAttendanceDate] = useState(getToday());
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const totals = useMemo(
    () =>
      options.reduce(
        (totalsByStatus, option) => ({
          ...totalsByStatus,
          [option]: rows.filter((row) => row.status === option).length,
        }),
        {} as Record<AttendanceStatus, number>
      ),
    [rows]
  );

  async function saveAttendance() {
    setSaving(true);
    setSaved(false);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cohortId: activeCohort.id,
          date: attendanceDate,
          records: rows.map((row) => ({
            studentId: row.studentId,
            status: statusMap[row.status],
            notes: row.note,
          })),
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Attendance could not be saved.");
      }

      setSaved(true);
      setMessage(
        result.message ||
          `${result.saved ?? rows.length} attendance records saved.`
      );
    } catch (saveError) {
      console.error(saveError);

      setError(
        saveError instanceof Error
          ? saveError.message
          : "Attendance could not be saved."
      );
    } finally {
      setSaving(false);
    }
  }

  function updateStatus(recordId: string, status: AttendanceStatus) {
    setRows((currentRows) =>
      currentRows.map((row) =>
        row.id === recordId
          ? {
              ...row,
              status,
            }
          : row
      )
    );

    setSaved(false);
    setMessage("");
    setError("");
  }

  function updateNote(recordId: string, note: string) {
    setRows((currentRows) =>
      currentRows.map((row) =>
        row.id === recordId
          ? {
              ...row,
              note,
            }
          : row
      )
    );

    setSaved(false);
    setMessage("");
    setError("");
  }

  return (
    <FacilitatorShell activePath="/ambassador/facilitator/attendance">
      <Hero
        eyebrow="ATTENDANCE CENTER"
        title="Participation is the first readiness signal."
        description="Record attendance, document context, and identify engagement patterns before students fall behind."
        meta={activeCohort.name}
        symbol="✓"
      />

      <section style={sharedStyles.statGrid}>
        <StatCard
          label="Students"
          value={rows.length}
          description="Active roster"
        />
        <StatCard
          label="Present"
          value={totals.Present}
          description="In attendance"
        />
        <StatCard
          label="Late"
          value={totals.Late}
          description="Arrived after start"
        />
        <StatCard
          label="Absent"
          value={totals.Absent}
          description="Not attending"
        />
      </section>

      <section
        style={{
          ...sharedStyles.card,
          marginTop: 22,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
            padding: "18px 24px",
            background: "#F8FAFC",
            borderBottom: "1px solid #EDF0F5",
          }}
        >
          <div>
            <strong
              style={{
                display: "block",
                color: "#0D1B3D",
                fontSize: 13,
              }}
            >
              Attendance Date
            </strong>
            <span
              style={{
                display: "block",
                marginTop: 4,
                color: "#7A8494",
                fontSize: 10,
              }}
            >
              Select the class date before saving attendance.
            </span>
          </div>

          <input
            type="date"
            value={attendanceDate}
            onChange={(event) => {
              setAttendanceDate(event.target.value);
              setSaved(false);
              setMessage("");
              setError("");
            }}
            style={{
              ...sharedStyles.input,
              width: 180,
            }}
          />
        </div>

        {rows.map((row) => (
          <div
            key={row.id}
            style={{
              display: "grid",
              gridTemplateColumns:
                "minmax(220px, 1fr) minmax(320px, auto) minmax(150px, 220px)",
              gap: 16,
              alignItems: "center",
              padding: "17px 24px",
              borderTop: "1px solid #EDF0F5",
            }}
          >
            <div style={{ fontSize: 12 }}>
              <strong>{row.studentName}</strong>
              <div
                style={{
                  color: "#7A8494",
                  fontSize: 9,
                  marginTop: 3,
                }}
              >
                {row.studentId}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: 6,
                flexWrap: "wrap",
              }}
            >
              {options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => updateStatus(row.id, option)}
                  style={{
                    minHeight: 34,
                    padding: "7px 10px",
                    border: "1px solid #DDE3EB",
                    borderRadius: 9,
                    background:
                      row.status === option ? "#FFF7D6" : "#FFFFFF",
                    color:
                      row.status === option ? "#725500" : "#687284",
                    cursor: "pointer",
                    fontSize: 10,
                    fontWeight: 800,
                  }}
                >
                  {option}
                </button>
              ))}
            </div>

            <input
              value={row.note}
              onChange={(event) =>
                updateNote(row.id, event.target.value)
              }
              placeholder="Add note"
              style={sharedStyles.input}
            />
          </div>
        ))}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
            alignItems: "center",
            padding: "20px 24px",
            borderTop: "1px solid #EDF0F5",
            background: error ? "#FFF4F4" : "#FFFDF4",
            fontSize: 12,
          }}
        >
          <div>
            <strong
              style={{
                color: error ? "#A61B1B" : "#0D1B3D",
              }}
            >
              {saving
                ? "Saving attendance..."
                : error
                  ? "Attendance was not saved"
                  : saved
                    ? "Attendance saved"
                    : "Ready to save"}
            </strong>

            {(message || error) && (
              <div
                style={{
                  marginTop: 5,
                  color: error ? "#A61B1B" : "#687284",
                  fontSize: 10,
                }}
              >
                {error || message}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={saveAttendance}
            disabled={saving || !attendanceDate}
            style={{
              ...sharedStyles.button,
              cursor: saving ? "not-allowed" : "pointer",
              opacity: saving ? 0.65 : 1,
            }}
          >
            {saving
              ? "Saving..."
              : saved
                ? "Saved"
                : "Save Attendance"}
          </button>
        </div>
      </section>
    </FacilitatorShell>
  );
}
