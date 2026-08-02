import { ambassadorPilot } from "./ambassador-pilot";

export type SpeakerStatus =
  | "Suggested"
  | "Contacted"
  | "Confirmed"
  | "Completed";

export type AmbassadorOperationWeek = {
  week: number;
  phase: string;
  sessionTopic: string;
  suggestedSpeakerType: string;
  speakerName: string;
  speakerEmail: string;
  speakerTopic: string;
  interactiveActivity: string;
  status: SpeakerStatus;
  sessionDate: string;
  materials: string;
  notes: string;
};

export const ambassadorOperations: AmbassadorOperationWeek[] =
  ambassadorPilot.map((lesson) => ({
    week: lesson.week,
    phase: lesson.phase,
    sessionTopic: lesson.title,
    suggestedSpeakerType: lesson.recommendedSpeaker,
    speakerName: "",
    speakerEmail: "",
    speakerTopic: "",
    interactiveActivity: lesson.activities[0]?.name ?? "",
    status: "Suggested",
    sessionDate: "",
    materials: "",
    notes: "",
  }));

export default ambassadorOperations;
