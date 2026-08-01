"use client";

import { useEffect, useState } from "react";

type Student = {
  id: string;
  userId: string;
  name: string;
  email: string;e
  grade: string;
  readinessScore: number;
  status: string;
  enrolledAt: string;
};

type Facilitator = {
  id: string;
  userId: string;
  name: string;
  email: string;
  title: string;
  isLead: boolean;
  status: string;
};

type StudentForm = {
  name: string;
  email: string;
  grade: string;
};

type FacilitatorForm = {
  name: string;
  email: string;
  title: string;
};

export default function AmbassadorAdminPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [facilitators, setFacilitators] = useState<Facilitator[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingType, setSavingType] = useState<
    "student" | "facilitator" | null
  >(null);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [studentForm, setStudentForm] = useState<StudentForm>({
    name: "",
    email: "",
    grade: "5th Year",
  });

  const [facilitatorForm, setFacilitatorForm] =
    useState<FacilitatorForm>({
      name: "",
      email: "",
      title: "Future Ready™ Facilitator",
    });

  async function loadData() {
    try {
      setLoading(true);
      setErrorMessage("");

      const response = await fetch("/api/ambassador/admin", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to load Ambassador records."
        );
      }

      setStudents(data.students ?? []);
      setFacilitators(data.facilitators ?? []);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to load Ambassador records.";

      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadData();
  }, []);

  async function addStudent() {
    setMessage("");
    setErrorMessage("");

    if (!studentForm.name.trim()) {
      setErrorMessage("Enter the student's name.");
      return;
    }

    if (!studentForm.email.trim()) {
      setErrorMessage("Enter the student's email.");
      return;
    }

    try {
      setSavingType("student");

      const response = await fetch("/api/ambassador/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recordType: "student",
          name: studentForm.name,
          email: studentForm.email,
          grade: studentForm.grade,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "The student could not be saved."
        );
      }

      setStudentForm({
        name: "",
        email: "",
        grade: "5th Year",
      });

      setMessage(result.message || "Student added successfully.");
      await loadData();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "The student could not be saved.";

      setErrorMessage(message);
    } finally {
      setSavingType(null);
    }
  }

  async function addFacilitator() {
    setMessage("");
    setErrorMessage("");

    if (!facilitatorForm.name.trim()) {
      setErrorMessage("Enter the facilitator's name.");
      return;
    }

    if (!facilitatorForm.email.trim()) {
      setErrorMessage("Enter the facilitator's email.");
      return;
    }

    try {
      setSavingType("facilitator");

      const response = await fetch("/api/ambassador/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recordType: "facilitator",
          name: facilitatorForm.name,
          email: facilitatorForm.email,
          title: facilitatorForm.title,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "The facilitator could not be saved."
        );
      }

      setFacilitatorForm({
        name: "",
        email: "",
        title: "Future Ready™ Facilitator",
      });

      setMessage(
        result.message || "Facilitator added successfully."
      );

      await loadData();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "The facilitator could not be saved.";

      setErrorMessage(message);
    } finally {
      setSavingType(null);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-xl font-bold text-slate-600">
          Loading Ambassador Program...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <header className="rounded-3xl bg-[#0D1B3D] px-8 py-10 text-white shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black">
              Ambassador Christian School
            </h1>

            <p className="mt-3 text-lg text-slate-200">
              Future Ready™ Administration Portal
            </p>
          </div>

          <div className="rounded-2xl bg-white/10 px-6 py-4">
            <p className="text-sm font-bold uppercase tracking-wide text-slate-300">
              Active Cohort
            </p>

            <p className="text-2xl font-black">
              Ambassador 2026
            </p>
          </div>
        </div>
      </header>

      {message ? (
        <div className="rounded-2xl border border-green-300 bg-green-50 px-6 py-4 font-bold text-green-800">
          {message}
        </div>
      ) : null}

      {errorMessage ? (
        <div className="rounded-2xl border border-red-300 bg-red-50 px-6 py-4 font-bold text-red-800">
          {errorMessage}
        </div>
      ) : null}

      <section className="grid gap-8 xl:grid-cols-2">
        <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-black text-[#0D1B3D]">
            Add Student
          </h2>

          <div className="mt-6 space-y-4">
            <input
              value={studentForm.name}
              onChange={(event) =>
                setStudentForm((current) => ({
                  ...current,
                  name: event.target.value,
                }))
              }
              placeholder="Student name"
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
            />

            <input
              type="email"
              value={studentForm.email}
              onChange={(event) =>
                setStudentForm((current) => ({
                  ...current,
                  email: event.target.value,
                }))
              }
              placeholder="Student email"
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
            />

            <input
              value={studentForm.grade}
              onChange={(event) =>
                setStudentForm((current) => ({
                  ...current,
                  grade: event.target.value,
                }))
              }
              placeholder="Grade"
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
            />

            <button
              type="button"
              onClick={() => void addStudent()}
              disabled={savingType !== null}
              className="rounded-xl bg-[#F2B705] px-6 py-3 font-black text-[#0D1B3D] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {savingType === "student"
                ? "Saving Student..."
                : "Add Student"}
            </button>
          </div>

          <p className="mt-6 font-black text-slate-700">
            Students: {students.length}
          </p>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-black text-[#0D1B3D]">
            Add Facilitator
          </h2>

          <div className="mt-6 space-y-4">
            <input
              value={facilitatorForm.name}
              onChange={(event) =>
                setFacilitatorForm((current) => ({
                  ...current,
                  name: event.target.value,
                }))
              }
              placeholder="Facilitator name"
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
            />

            <input
              type="email"
              value={facilitatorForm.email}
              onChange={(event) =>
                setFacilitatorForm((current) => ({
                  ...current,
                  email: event.target.value,
                }))
              }
              placeholder="Facilitator email"
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
            />

            <input
              value={facilitatorForm.title}
              onChange={(event) =>
                setFacilitatorForm((current) => ({
                  ...current,
                  title: event.target.value,
                }))
              }
              placeholder="Title"
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
            />

            <button
              type="button"
              onClick={() => void addFacilitator()}
              disabled={savingType !== null}
              className="rounded-xl bg-[#0D1B3D] px-6 py-3 font-black text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {savingType === "facilitator"
                ? "Saving Facilitator..."
                : "Add Facilitator"}
            </button>
          </div>

          <p className="mt-6 font-black text-slate-700">
            Facilitators: {facilitators.length}
          </p>
        </article>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-3xl font-black text-[#0D1B3D]">
            Students
          </h2>

          <span className="rounded-full bg-slate-100 px-4 py-2 font-bold text-slate-700">
            {students.length} Total
          </span>
        </div>

        <div className="mt-8 overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-slate-200 text-left">
                <th className="pb-3 pr-6">Name</th>
                <th className="pb-3 pr-6">Email</th>
                <th className="pb-3 pr-6">Grade</th>
                <th className="pb-3 pr-6">Readiness</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-8 text-center text-slate-500"
                  >
                    No students have been added yet.
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr
                    key={student.id}
                    className="border-b border-slate-100"
                  >
                    <td className="py-4 pr-6 font-bold">
                      {student.name}
                    </td>

                    <td className="py-4 pr-6">
                      {student.email}
                    </td>

                    <td className="py-4 pr-6">
                      {student.grade}
                    </td>

                    <td className="py-4 pr-6">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-28 overflow-hidden rounded-full bg-slate-200">
                          <div
                            className="h-full rounded-full bg-[#0D1B3D]"
                            style={{
                              width: `${Math.min(
                                100,
                                Math.max(
                                  0,
                                  student.readinessScore
                                )
                              )}%`,
                            }}
                          />
                        </div>

                        <span className="font-bold">
                          {student.readinessScore}%
                        </span>
                      </div>
                    </td>

                    <td className="py-4">
                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-bold text-green-700">
                        {student.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-3xl font-black text-[#0D1B3D]">
            Facilitators
          </h2>

          <span className="rounded-full bg-slate-100 px-4 py-2 font-bold text-slate-700">
            {facilitators.length} Total
          </span>
        </div>

        <div className="mt-8 overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-slate-200 text-left">
                <th className="pb-3 pr-6">Name</th>
                <th className="pb-3 pr-6">Email</th>
                <th className="pb-3 pr-6">Title</th>
                <th className="pb-3 pr-6">Role</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {facilitators.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-8 text-center text-slate-500"
                  >
                    No facilitators have been added yet.
                  </td>
                </tr>
              ) : (
                facilitators.map((facilitator) => (
                  <tr
                    key={facilitator.id}
                    className="border-b border-slate-100"
                  >
                    <td className="py-4 pr-6 font-bold">
                      {facilitator.name}
                    </td>

                    <td className="py-4 pr-6">
                      {facilitator.email}
                    </td>

                    <td className="py-4 pr-6">
                      {facilitator.title}
                    </td>

                    <td className="py-4 pr-6">
                      <span
                        className={
                          facilitator.isLead
                            ? "rounded-full bg-blue-100 px-3 py-1 text-sm font-bold text-blue-700"
                            : "rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-700"
                        }
                      >
                        {facilitator.isLead
                          ? "Lead"
                          : "Facilitator"}
                      </span>
                    </td>

                    <td className="py-4">
                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-bold text-green-700">
                        {facilitator.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-3xl bg-[#0D1B3D] px-8 py-8 text-white shadow">
        <h2 className="text-2xl font-black">
          Ambassador Program Status
        </h2>

        <p className="mt-3 text-slate-200">
          Students and facilitators added here are saved to the
          Future Ready™ database and connected to the Ambassador
          2026 cohort.
        </p>
      </section>
    </div>
  );
}
