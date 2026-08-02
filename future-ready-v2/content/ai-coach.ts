export type CoachMode = "Career Coach" | "Resume Coach" | "Interview Coach" | "Reflection Coach" | "Goal Coach";

export const aiCoachNavigation = [
  { label: "Coach Home", href: "/ai-coach" },
  { label: "Career Coach", href: "/ai-coach/career" },
  { label: "Resume Coach", href: "/ai-coach/resume" },
  { label: "Interview Coach", href: "/ai-coach/interview" },
  { label: "Reflection Coach", href: "/ai-coach/reflection" },
  { label: "Goals", href: "/ai-coach/goals" },
];

export const coachProfile = {
  studentName: "Avery Thompson",
  initials: "AT",
  school: "Ambassador Christian School",
  readinessScore: 82,
  currentPhase: "DEVELOP™",
  currentWeek: 7,
  careerInterests: ["Business", "Sports Management", "Community Leadership"],
  topSkills: ["Communication", "Leadership", "Teamwork"],
};

export const coachPrompts = [
  {
    id: "prompt-001",
    title: "Clarify My Career Direction",
    mode: "Career Coach" as CoachMode,
    description: "Connect your interests, strengths, values, and experiences to possible career paths.",
    starter: "Help me understand which career paths fit my strengths and interests.",
  },
  {
    id: "prompt-002",
    title: "Strengthen My Résumé",
    mode: "Resume Coach" as CoachMode,
    description: "Turn school, athletics, service, and project work into professional evidence.",
    starter: "Help me turn my experiences into strong résumé bullet points.",
  },
  {
    id: "prompt-003",
    title: "Practice an Interview",
    mode: "Interview Coach" as CoachMode,
    description: "Practice common interview questions and improve your answers.",
    starter: "Give me a practice interview for an internship.",
  },
  {
    id: "prompt-004",
    title: "Improve My Reflection",
    mode: "Reflection Coach" as CoachMode,
    description: "Move from describing what happened to explaining what you learned and how you grew.",
    starter: "Help me improve this reflection so it shows growth and evidence.",
  },
  {
    id: "prompt-005",
    title: "Build My Next Goal",
    mode: "Goal Coach" as CoachMode,
    description: "Create a specific, realistic next step tied to your Future Ready™ journey.",
    starter: "Help me set one strong goal for this week.",
  },
];

export const suggestedCareerPaths = [
  {
    title: "Business Operations",
    match: 91,
    reason: "Strong communication, teamwork, leadership, and interest in business systems.",
    nextSteps: ["Shadow an operations leader", "Complete a workflow project", "Practice spreadsheet and project tracking skills"],
  },
  {
    title: "Sports Management",
    match: 88,
    reason: "Athletic experience, leadership, communication, and interest in team environments.",
    nextSteps: ["Interview a sports operations professional", "Volunteer at an event", "Build a leadership reflection"],
  },
  {
    title: "Community Engagement",
    match: 84,
    reason: "Relationship-building strengths and interest in leadership and community impact.",
    nextSteps: ["Support a community event", "Practice outreach messaging", "Create a stakeholder map"],
  },
];

export const resumeSections = [
  {
    title: "Professional Summary",
    status: "Needs Review",
    score: 62,
    suggestion: "Lead with your strongest value: communication, leadership, teamwork, and readiness to learn.",
  },
  {
    title: "Experience",
    status: "In Progress",
    score: 70,
    suggestion: "Translate school, athletics, volunteer work, and projects into action-and-impact bullet points.",
  },
  {
    title: "Skills",
    status: "Strong",
    score: 86,
    suggestion: "Keep the list focused on skills you can prove with examples.",
  },
  {
    title: "Education",
    status: "Strong",
    score: 90,
    suggestion: "Add expected graduation date and relevant Future Ready™ learning.",
  },
];

export const interviewQuestions = [
  {
    id: "question-001",
    question: "Tell me about yourself.",
    guidance: "Use a present-past-future structure: who you are now, what has prepared you, and what you want next.",
  },
  {
    id: "question-002",
    question: "Tell me about a time you worked through a challenge.",
    guidance: "Use STAR: Situation, Task, Action, Result.",
  },
  {
    id: "question-003",
    question: "Why are you interested in this internship?",
    guidance: "Connect the organization, the role, your skills, and what you hope to learn.",
  },
  {
    id: "question-004",
    question: "What is one area you are working to improve?",
    guidance: "Choose a real growth area, explain what you are doing, and show progress.",
  },
];

export const reflectionFramework = [
  { label: "What happened?", prompt: "Describe the experience clearly and briefly." },
  { label: "What did you do?", prompt: "Explain your role, choices, and contribution." },
  { label: "What did you learn?", prompt: "Identify the skill, insight, or mindset you developed." },
  { label: "What will you do next?", prompt: "Name the next action you will take." },
];

export const studentGoals = [
  {
    id: "goal-001",
    title: "Complete professional introduction video",
    category: "Professional Presence",
    due: "August 14, 2026",
    progress: 65,
    nextStep: "Record the final version and upload it to the portfolio.",
  },
  {
    id: "goal-002",
    title: "Schedule one career conversation",
    category: "Career Exploration",
    due: "August 21, 2026",
    progress: 40,
    nextStep: "Send an outreach message to one professional.",
  },
  {
    id: "goal-003",
    title: "Improve résumé experience section",
    category: "Career Readiness",
    due: "August 28, 2026",
    progress: 25,
    nextStep: "Write three action-and-impact bullet points.",
  },
];

export const coachInsights = [
  {
    title: "Your strongest pattern",
    text: "You consistently show communication, leadership, and teamwork across your activities.",
  },
  {
    title: "Your next growth edge",
    text: "Add more measurable evidence to your portfolio so employers can see the impact of your work.",
  },
  {
    title: "Your best next move",
    text: "Complete one career conversation and connect what you learn to your career pathway map.",
  },
];
