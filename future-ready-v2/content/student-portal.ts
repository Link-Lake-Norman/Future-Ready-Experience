export type StudentPhase =
  | "DISCOVER™"
  | "DEVELOP™"
  | "EXPLORE™"
  | "CONNECT™"
  | "EXPERIENCE™"
  | "LAUNCH™";

export const studentProfile = {
  id: "ambassador-student-001",
  name: "Avery Thompson",
  email: "avery@example.com",
  school: "Ambassador Christian School",
  cohort: "2026 Student Athlete Cohort",
  grade: "5th Year",
  currentWeek: 7,
  currentPhase: "DEVELOP™" as StudentPhase,
  readinessScore: 82,
  attendanceRate: 96,
  portfolioProgress: 78,
  reflectionsCompleted: 8,
  badgesEarned: 6,
  initials: "AT",
  headline: "Emerging leader building communication, teamwork, and career readiness.",
  careerInterests: ["Sports Management", "Business", "Community Leadership"],
  strengths: ["Communication", "Leadership", "Teamwork"],
  values: ["Growth", "Service", "Integrity"],
};

export const studentNavigation = [
  { label: "Dashboard", href: "/ambassador/student-dashboard/ambassador-student-001" },
  { label: "Passport", href: "/ambassador/student-passport/ambassador-student-001" },
  { label: "Profile", href: "/ambassador/student-passport/ambassador-student-001/profile" },
  { label: "Portfolio", href: "/ambassador/student-passport/ambassador-student-001/portfolio" },
  { label: "Reflections", href: "/ambassador/student-passport/ambassador-student-001/reflections" },
  { label: "Skills", href: "/skills" },
  { label: "Badges", href: "/badges" },
  { label: "Journey", href: "/journey" },
];

export const journeyPhases = [
  {
    id: "discover",
    name: "DISCOVER™",
    weeks: "Weeks 1–6",
    description: "Understand who you are, what matters to you, and where you want to go.",
    progress: 100,
    status: "Complete",
  },
  {
    id: "develop",
    name: "DEVELOP™",
    weeks: "Weeks 7–12",
    description: "Build communication, teamwork, leadership, problem-solving, and adaptability.",
    progress: 18,
    status: "Current",
  },
  {
    id: "explore",
    name: "EXPLORE™",
    weeks: "Weeks 13–18",
    description: "Explore industries, pathways, careers, and the future of work.",
    progress: 0,
    status: "Upcoming",
  },
  {
    id: "connect",
    name: "CONNECT™",
    weeks: "Weeks 19–24",
    description: "Build relationships, professional presence, and mentor connections.",
    progress: 0,
    status: "Upcoming",
  },
  {
    id: "experience",
    name: "EXPERIENCE™",
    weeks: "Weeks 25–30",
    description: "Apply your skills through projects, service, and workplace readiness.",
    progress: 0,
    status: "Upcoming",
  },
  {
    id: "launch",
    name: "LAUNCH™",
    weeks: "Weeks 31–36",
    description: "Complete your portfolio, action plan, showcase, and next-step strategy.",
    progress: 0,
    status: "Upcoming",
  },
];

export const studentSkills = [
  { id: "communication", name: "Communication", score: 86, level: "Strong", evidence: 4 },
  { id: "teamwork", name: "Teamwork", score: 82, level: "Strong", evidence: 3 },
  { id: "leadership", name: "Leadership", score: 78, level: "Developing", evidence: 3 },
  { id: "problem-solving", name: "Problem Solving", score: 74, level: "Developing", evidence: 2 },
  { id: "adaptability", name: "Adaptability", score: 71, level: "Developing", evidence: 2 },
  { id: "professionalism", name: "Professionalism", score: 84, level: "Strong", evidence: 4 },
];

export const studentBadges = [
  { id: "self-awareness", name: "Self-Awareness", status: "Earned", date: "June 12, 2026", description: "Identified personal strengths, values, and interests." },
  { id: "story-builder", name: "Story Builder", status: "Earned", date: "June 19, 2026", description: "Created a clear personal story and professional introduction." },
  { id: "confident-communicator", name: "Confident Communicator", status: "Earned", date: "June 26, 2026", description: "Demonstrated clear and audience-aware communication." },
  { id: "future-vision", name: "Future Vision", status: "Earned", date: "July 3, 2026", description: "Built a personal vision and future pathway map." },
  { id: "professional-communicator", name: "Professional Communicator", status: "Pending", date: "Submitted July 27, 2026", description: "Professional communication evidence is awaiting review." },
  { id: "collaborative-teammate", name: "Collaborative Teammate", status: "Locked", date: "Complete Week 8", description: "Demonstrate teamwork, ownership, and constructive collaboration." },
];

export const portfolioItems = [
  {
    id: "portfolio-1",
    title: "Personal Vision Map",
    category: "Discover",
    status: "Complete",
    description: "A visual map connecting strengths, values, interests, and long-term goals.",
    evidenceType: "PDF",
    updated: "July 3, 2026",
  },
  {
    id: "portfolio-2",
    title: "Professional Introduction",
    category: "Communication",
    status: "Complete",
    description: "A two-minute introduction designed for employers and mentors.",
    evidenceType: "Video",
    updated: "July 27, 2026",
  },
  {
    id: "portfolio-3",
    title: "Team Project Reflection",
    category: "Teamwork",
    status: "In Progress",
    description: "Reflection on role ownership, communication, and collaborative problem-solving.",
    evidenceType: "Written Reflection",
    updated: "July 28, 2026",
  },
];

export const studentReflections = [
  {
    id: "reflection-1",
    lesson: "Teamwork & Collaboration",
    date: "July 28, 2026",
    prompt: "What did you learn about your role on a team?",
    response: "I naturally organize the work, but I need to pause and make sure everyone has a voice before decisions are finalized.",
    status: "Approved",
    feedback: "Excellent self-awareness and a strong next step.",
  },
  {
    id: "reflection-2",
    lesson: "Professional Communication",
    date: "July 24, 2026",
    prompt: "How did you adapt your communication for a professional audience?",
    response: "I planned my main points, removed slang, and focused on being clear and respectful.",
    status: "Approved",
    feedback: "Clear evidence of audience awareness.",
  },
  {
    id: "reflection-3",
    lesson: "Building Confidence",
    date: "July 17, 2026",
    prompt: "What action helps you move through self-doubt?",
    response: "Preparation helps me feel confident because I know what I want to say before I walk into the room.",
    status: "Approved",
    feedback: "Continue using preparation as a repeatable confidence strategy.",
  },
];

export const careerMatches = [
  { title: "Community Engagement Coordinator", fit: 91, field: "Community & Business", reason: "Strong communication, service, and relationship-building alignment." },
  { title: "Sports Operations Assistant", fit: 87, field: "Sports Management", reason: "Matches leadership, teamwork, and interest in athletics." },
  { title: "Business Development Associate", fit: 83, field: "Business", reason: "Aligns with communication, initiative, and relationship-building strengths." },
];

export const opportunities = [
  { title: "Employer Career Conversation", organization: "Local Business Partner", date: "August 14, 2026", type: "Career Exposure" },
  { title: "Workplace Tour", organization: "Regional Healthcare Partner", date: "August 28, 2026", type: "Industry Exploration" },
  { title: "Mock Interview Lab", organization: "Future Ready™", date: "September 11, 2026", type: "Skill Practice" },
];
