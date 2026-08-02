export type InteractiveStyle =
  | "Role Playing"
  | "Improv"
  | "Case Scenarios"
  | "Team Challenge"
  | "Mock Interview"
  | "Résumé Review"
  | "AI Workshop"
  | "Conflict Management"
  | "Communication"
  | "Leadership"
  | "Networking"
  | "Professionalism";

export type ProfessionalStatus =
  | "Prospect"
  | "Invited"
  | "Confirmed"
  | "Completed";

export type FutureReadyProfessional = {
  id: string;
  name: string;
  organization: string;
  title: string;
  email: string;
  phone: string;
  website: string;
  bio: string;
  softSkills: string[];
  interactiveStyles: InteractiveStyle[];
  assignedWeek: number | null;
  status: ProfessionalStatus;
  notes: string;
};

export const interactiveStyles: InteractiveStyle[] = [
  "Role Playing",
  "Improv",
  "Case Scenarios",
  "Team Challenge",
  "Mock Interview",
  "Résumé Review",
  "AI Workshop",
  "Conflict Management",
  "Communication",
  "Leadership",
  "Networking",
  "Professionalism",
];

export const professionalStatuses: ProfessionalStatus[] = [
  "Prospect",
  "Invited",
  "Confirmed",
  "Completed",
];

export const futureReadyProfessionals: FutureReadyProfessional[] = [
  {
    id: "professional-001",
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
  },
];

export default futureReadyProfessionals;
