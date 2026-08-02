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

const phaseForWeek = (week: number) => {
  if (week <= 6) return "DISCOVER™";
  if (week <= 12) return "DEVELOP™";
  if (week <= 18) return "EXPLORE™";
  if (week <= 24) return "CONNECT™";
  if (week <= 30) return "EXPERIENCE™";
  return "LAUNCH™";
};

const topics = [
  "Welcome to Future Ready™",
  "Strengths, Interests & Values",
  "Understanding My Story",
  "Communication That Connects",
  "Building Confidence",
  "My Future Vision",
  "Professional Communication",
  "Teamwork & Collaboration",
  "Leadership Foundations",
  "Problem Solving",
  "Adaptability",
  "Future Ready Skills",
  "Future of Work",
  "Career Discovery",
  "Industry Exploration",
  "Career Conversations",
  "Education Pathways",
  "Opportunity Mapping",
  "Networking Skills",
  "Professional Presence",
  "Mentorship",
  "Employer Connections",
  "Workplace Expectations",
  "Building Relationships",
  "Workplace Readiness",
  "Workplace Projects",
  "Service Leadership",
  "Workplace Communication",
  "Reflection & Growth",
  "Internship Preparation",
  "Digital Presence",
  "Career Action Plan",
  "Capstone Portfolio Build",
  "Community Impact",
  "Future Ready Showcase",
  "My Next Chapter",
];

const suggestedSpeakerTypes = [
  "Interactive confidence coach",
  "Strengths and self-awareness facilitator",
  "Professional storytelling coach",
  "Communication and improv facilitator",
  "Confidence and executive presence coach",
  "Purpose and goal-setting coach",
  "Professional communication trainer",
  "Team-building facilitator",
  "Leadership coach",
  "Problem-solving facilitator",
  "Adaptability and resilience coach",
  "Workplace-readiness coach",
  "AI and future-of-work facilitator",
  "Career discovery coach",
  "Skills-transfer facilitator",
  "Networking conversation coach",
  "Education pathway advisor",
  "Opportunity-mapping facilitator",
  "Networking and relationship coach",
  "Professional presence coach",
  "Mentorship facilitator",
  "Employer communication coach",
  "HR or workplace expectations trainer",
  "Relationship-building facilitator",
  "Workplace-readiness facilitator",
  "Project management coach",
  "Service leadership facilitator",
  "Conflict-management coach",
  "Reflection and growth coach",
  "Interview coach",
  "Digital professionalism and AI coach",
  "Career action-planning coach",
  "Portfolio and résumé coach",
  "Community-impact facilitator",
  "Presentation and public-speaking coach",
  "Transition and next-steps coach",
];

const activities = [
  "Fast-paced introductions and peer coaching",
  "Strengths card sort and team challenge",
  "Story-to-skill role play",
  "Improv listening challenge",
  "Confidence repetition lab",
  "Future vision mapping",
  "Professional email and conversation role play",
  "Team challenge with rotating roles",
  "Lead-without-a-title simulation",
  "Workplace case scenario",
  "Changing-rules team challenge",
  "Skills showcase",
  "AI-versus-human workplace challenge",
  "Career-match coaching activity",
  "Transferable-skills challenge",
  "Mock informational interviews",
  "Pathway decision case study",
  "Opportunity-map workshop",
  "Networking mixer",
  "First-impression coaching lab",
  "Mentor outreach practice",
  "Employer conversation simulation",
  "Workplace expectations case scenarios",
  "Professional follow-up challenge",
  "First-day workplace simulation",
  "Client project sprint",
  "Community-impact challenge",
  "Difficult-conversation role play",
  "Growth gallery and peer feedback",
  "Mock interview lab",
  "Digital presence audit",
  "Career roadmap workshop",
  "Résumé and portfolio coaching studio",
  "Impact pitch challenge",
  "Showcase rehearsal with live coaching",
  "Future-self reflection and celebration",
];

export const ambassadorOperations: AmbassadorOperationWeek[] = topics.map(
  (sessionTopic, index) => ({
    week: index + 1,
    phase: phaseForWeek(index + 1),
    sessionTopic,
    suggestedSpeakerType: suggestedSpeakerTypes[index],
    speakerName: "",
    speakerEmail: "",
    speakerTopic: "",
    interactiveActivity: activities[index],
    status: "Suggested",
    sessionDate: "",
    materials: "",
    notes: "",
  }),
);

export default ambassadorOperations;
