export type ProjectVisibility =
  | "Project Team"
  | "Entire Cohort"
  | "Facilitator & Admin Only";

export type ProjectTaskStatus =
  | "Ideas"
  | "To Do"
  | "In Progress"
  | "Needs Review"
  | "Complete";

export type ProjectMember = {
  id: string;
  name: string;
  role: string;
};

export type ProjectTask = {
  id: string;
  title: string;
  ownerId: string;
  dueDate: string;
  status: ProjectTaskStatus;
  notes: string;
};

export type ProjectAsset = {
  id: string;
  name: string;
  kind: "File" | "Image" | "Video" | "Link" | "Note";
  url: string;
  dataUrl?: string;
  visibility: ProjectVisibility;
  includeInPresentation: boolean;
  includeInPortfolio: boolean;
};

export type FutureReadyProject = {
  id: string;
  title: string;
  description: string;
  cohortId: string;
  visibility: ProjectVisibility;
  members: ProjectMember[];
  tasks: ProjectTask[];
  brainstormingNotes: string;
  workflowNotes: string;
  presentationNotes: string;
  assets: ProjectAsset[];
  facilitatorFeedback: string;
  createdAt: string;
};

export const projectStatuses: ProjectTaskStatus[] = [
  "Ideas",
  "To Do",
  "In Progress",
  "Needs Review",
  "Complete",
];

export const projectVisibilities: ProjectVisibility[] = [
  "Project Team",
  "Entire Cohort",
  "Facilitator & Admin Only",
];

export const defaultProjectRoles = [
  "Project Lead",
  "Research Lead",
  "Presentation Lead",
  "Design Lead",
  "Communications Lead",
  "AI Specialist",
  "Timekeeper",
  "Quality Reviewer",
];

export const projectStudents = Array.from(
  { length: 20 },
  (_, index) => ({
    id: `ambassador-student-${String(index + 1).padStart(3, "0")}`,
    name: `Student ${index + 1}`,
  }),
);

export const starterProjects: FutureReadyProject[] = [
  {
    id: "project-001",
    title: "Sample Team Project",
    description:
      "Use this private workspace to plan, build, review, and prepare your presentation.",
    cohortId: "ambassador-2026",
    visibility: "Project Team",
    members: [
      {
        id: "ambassador-student-001",
        name: "Student 1",
        role: "Project Lead",
      },
      {
        id: "ambassador-student-002",
        name: "Student 2",
        role: "Research Lead",
      },
    ],
    tasks: [],
    brainstormingNotes: "",
    workflowNotes: "",
    presentationNotes: "",
    assets: [],
    facilitatorFeedback: "",
    createdAt: "2026-07-31T20:00:00.000Z",
  },
];

export default starterProjects;
