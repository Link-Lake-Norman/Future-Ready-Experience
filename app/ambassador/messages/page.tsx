"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ambassadorStudents,
  starterMessages,
  type FutureReadyMessage,
  type MessageAudience,
  type MessageRole,
} from "@/content/messages";

const MESSAGE_KEY = "future-ready:ambassador-messages";
const PERMISSION_KEY = "future-ready:ambassador-permissions";

type PermissionSnapshot = {
  messagingEnabled?: boolean;
  studentMessageFacilitator?: boolean;
  studentMessageAdmin?: boolean;
  facilitatorMessageStudents?: boolean;
  facilitatorBlastCohort?: boolean;
};

function loadMessages(): FutureReadyMessage[] {
  if (typeof window === "undefined") return starterMessages;

  try {
    const saved = window.localStorage.getItem(MESSAGE_KEY);
    return saved
      ? (JSON.parse(saved) as FutureReadyMessage[])
      : starterMessages;
  } catch {
    return starterMessages;
  }
}

function loadPermissions(): PermissionSnapshot {
  if (typeof window === "undefined") return {};

  try {
    const saved = window.localStorage.getItem(PERMISSION_KEY);
    return saved ? (JSON.parse(saved) as PermissionSnapshot) : {};
  } catch {
    return {};
  }
}

function formatMessageDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return `${String(date.getMonth() + 1).padStart(2, "0")}/${String(
    date.getDate(),
  ).padStart(2, "0")}/${date.getFullYear()} ${String(
    date.getHours(),
  ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

export default function MessagesPage() {
  const [messages, setMessages] =
    useState<FutureReadyMessage[]>(starterMessages);
  const [role, setRole] = useState<MessageRole>("Facilitator");
  const [audience, setAudience] =
    useState<MessageAudience>("Individual Student");
  const [recipientId, setRecipientId] = useState(
    ambassadorStudents[0].id,
  );
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [permissions, setPermissions] =
    useState<PermissionSnapshot>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setMessages(loadMessages());
    setPermissions(loadPermissions());
    setHydrated(true);
  }, []);

  const messagingEnabled = permissions.messagingEnabled !== false;

  const visibleMessages = useMemo(
    () =>
      [...messages].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime(),
      ),
    [messages],
  );

  const canSend = useMemo(() => {
    if (!messagingEnabled) return false;
    if (role === "Admin") return true;

    if (role === "Facilitator") {
      if (audience === "Entire Cohort") {
        return permissions.facilitatorBlastCohort !== false;
      }

      if (audience === "Individual Student") {
        return permissions.facilitatorMessageStudents !== false;
      }

      return true;
    }

    if (audience === "Facilitator") {
      return permissions.studentMessageFacilitator !== false;
    }

    if (audience === "Admin") {
      return permissions.studentMessageAdmin === true;
    }

    return false;
  }, [audience, messagingEnabled, permissions, role]);

  function validAudienceOptions(): MessageAudience[] {
    if (role === "Admin") {
      return ["Facilitator", "Individual Student", "Entire Cohort"];
    }

    if (role === "Facilitator") {
      return ["Admin", "Individual Student", "Entire Cohort"];
    }

    return ["Facilitator", "Admin"];
  }

  function changeRole(nextRole: MessageRole) {
    setRole(nextRole);

    if (nextRole === "Student") {
      setAudience("Facilitator");
      setRecipientId("facilitator-001");
    } else if (nextRole === "Facilitator") {
      setAudience("Individual Student");
      setRecipientId(ambassadorStudents[0].id);
    } else {
      setAudience("Facilitator");
      setRecipientId("facilitator-001");
    }
  }

  function sendMessage() {
    if (!canSend || !subject.trim() || !body.trim()) return;

    let recipientName = "Program Admin";
    let resolvedRecipientId = recipientId;

    if (audience === "Facilitator") {
      recipientName = "Coach Jones";
      resolvedRecipientId = "facilitator-001";
    }

    if (audience === "Admin") {
      recipientName = "Program Admin";
      resolvedRecipientId = "admin-001";
    }

    if (audience === "Entire Cohort") {
      recipientName = "Ambassador 2026 Cohort";
      resolvedRecipientId = "ambassador-2026";
    }

    if (audience === "Individual Student") {
      recipientName =
        ambassadorStudents.find(
          (student) => student.id === recipientId,
        )?.name ?? "Student";
    }

    const senderName =
      role === "Admin"
        ? "Program Admin"
        : role === "Facilitator"
          ? "Coach Jones"
          : "Student 1";

    const message: FutureReadyMessage = {
      id: `message-${Date.now()}`,
      senderRole: role,
      senderName,
      audience,
      recipientId: resolvedRecipientId,
      recipientName,
      subject: subject.trim(),
      body: body.trim(),
      createdAt: new Date().toISOString(),
      read: false,
    };

    const next = [message, ...messages];

    setMessages(next);
    window.localStorage.setItem(MESSAGE_KEY, JSON.stringify(next));
    setSubject("");
    setBody("");
  }

  if (!hydrated) {
    return (
      <main className="min-h-screen bg-slate-50 px-5 py-8">
        <div className="mx-auto max-w-7xl">
          <p className="font-black text-slate-600">Loading messages…</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8">
      <div className="mx-auto max-w-7xl">
        <header className="rounded-[30px] bg-[#0D1B3D] px-7 py-8 text-white shadow-xl">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#F2B705]">
            Ambassador Christian School
          </p>
          <h1 className="mt-2 text-4xl font-black">
            Messages & Announcements
          </h1>
        </header>

        <section className="mt-8 grid gap-8 xl:grid-cols-[420px_1fr]">
          <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black text-[#0D1B3D]">
              New Message
            </h2>

            <label className="mt-5 block">
              <span className={labelClass}>Sending As</span>
              <select
                value={role}
                onChange={(event) =>
                  changeRole(event.target.value as MessageRole)
                }
                className={inputClass}
              >
                <option>Admin</option>
                <option>Facilitator</option>
                <option>Student</option>
              </select>
            </label>

            <label className="mt-5 block">
              <span className={labelClass}>Send To</span>
              <select
                value={audience}
                onChange={(event) =>
                  setAudience(event.target.value as MessageAudience)
                }
                className={inputClass}
              >
                {validAudienceOptions().map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>

            {audience === "Individual Student" ? (
              <label className="mt-5 block">
                <span className={labelClass}>Student</span>
                <select
                  value={recipientId}
                  onChange={(event) =>
                    setRecipientId(event.target.value)
                  }
                  className={inputClass}
                >
                  {ambassadorStudents.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.name}
                    </option>
                  ))}
                </select>
              </label>
            ) : null}

            <label className="mt-5 block">
              <span className={labelClass}>Subject</span>
              <input
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                className={inputClass}
              />
            </label>

            <label className="mt-5 block">
              <span className={labelClass}>Message</span>
              <textarea
                rows={7}
                value={body}
                onChange={(event) => setBody(event.target.value)}
                className={inputClass}
              />
            </label>

            <button
              type="button"
              onClick={sendMessage}
              disabled={!canSend || !subject.trim() || !body.trim()}
              className="mt-5 w-full rounded-xl bg-[#0D1B3D] px-5 py-3 font-black text-white disabled:opacity-40"
            >
              Send Message
            </button>
          </aside>

          <section className="space-y-4">
            {visibleMessages.map((message) => (
              <article
                key={message.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[#725500]">
                  {message.senderRole} → {message.recipientName}
                </p>
                <h3 className="mt-2 text-xl font-black text-[#0D1B3D]">
                  {message.subject}
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  From {message.senderName} ·{" "}
                  {formatMessageDate(message.createdAt)}
                </p>
                <p className="mt-5 whitespace-pre-line leading-7 text-slate-700">
                  {message.body}
                </p>
              </article>
            ))}
          </section>
        </section>
      </div>
    </main>
  );
}

const labelClass =
  "text-sm font-black uppercase tracking-[0.12em] text-[#0D1B3D]";

const inputClass =
  "mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-[#F2B705] focus:ring-2 focus:ring-[#F2B705]/20";
