export type MessageRole = "Admin" | "Facilitator" | "Student";

export type MessageAudience =
  | "Admin"
  | "Facilitator"
  | "Individual Student"
  | "Entire Cohort";

export type FutureReadyMessage = {
  id: string;
  senderRole: MessageRole;
  senderName: string;
  audience: MessageAudience;
  recipientId: string;
  recipientName: string;
  subject: string;
  body: string;
  createdAt: string;
  read: boolean;
};

export const ambassadorStudents = Array.from(
  { length: 20 },
  (_, index) => ({
    id: `ambassador-student-${String(index + 1).padStart(3, "0")}`,
    name: `Student ${index + 1}`,
  }),
);

export const starterMessages: FutureReadyMessage[] = [
  {
    id: "message-001",
    senderRole: "Admin",
    senderName: "Program Admin",
    audience: "Entire Cohort",
    recipientId: "ambassador-2026",
    recipientName: "Ambassador 2026 Cohort",
    subject: "Welcome to Future Ready™",
    body: "Welcome to the Ambassador Christian School Future Ready™ pilot.",
    createdAt: "2026-07-31T20:00:00.000Z",
    read: false,
  },
];

export default starterMessages;
