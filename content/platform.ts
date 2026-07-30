export type Student = {
  id: string;
  name: string;
  grade: string;
  email: string;
  cohort: string;
  currentWeek: number;
  readinessScore: number;
  attendanceRate: number;
  status: "Active" | "Inactive";
  careerInterests: string[];
  skills: string[];
  badges: string[];
};

export type Facilitator = {
  id: string;
  name: string;
  email: string;
  title: string;
  cohort: string;
  status: "Active" | "Inactive";
};

export type CurriculumWeek = {
  week: number;
  phase: string;
  title: string;
  objective: string;
  facilitatorGuide: string;
  discussionQuestions: string[];
  studentActivity: string;
  workplaceConnection: string;
  skillsEarned: string[];
  portfolioEvidence: string;
  badgeEarned: string;
};

export const organization = {
  id: "ambassador-christian-school",
  name: "Ambassador Christian School",
  cohort: "Ambassador 2026",
  program: "Launch Ready™ Professional Skills & Internship Readiness",
  currentWeek: 1,
  studentsEnrolled: 20,
};

export const facilitators: Facilitator[] = [
  {
    id: "facilitator-001",
    name: "Coach Jones",
    email: "coach.jones@ambassadorchristian.org",
    title: "Future Ready™ Facilitator",
    cohort: "Ambassador 2026",
    status: "Active",
  },
];

export const students: Student[] = Array.from(
  { length: 20 },
  (_, index) => {
    const number = index + 1;

    return {
      id: `ambassador-student-${String(number).padStart(3, "0")}`,
      name: `Student ${number}`,
      grade: "5th Year",
      email: `student${number}@ambassadorchristian.org`,
      cohort: "Ambassador 2026",
      currentWeek: 1,
      readinessScore:
        number === 1 ? 84 : number === 2 ? 82 : 75,
      attendanceRate: 100,
      status: "Active",
      careerInterests: [
        "Business",
        "Healthcare",
        "Technology",
      ],
      skills: [
        "Communication",
        "Teamwork",
        "Professionalism",
      ],
      badges: ["Future Ready Explorer"],
    };
  }
);

const curriculumTitles = [
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

function getPhase(week: number) {
  if (week <= 6) return "DISCOVER™";
  if (week <= 12) return "DEVELOP™";
  if (week <= 18) return "EXPLORE™";
  if (week <= 24) return "CONNECT™";
  if (week <= 30) return "EXPERIENCE™";
  return "LAUNCH™";
}

export const curriculum: CurriculumWeek[] =
  curriculumTitles.map((title, index) => {
    const week = index + 1;
    const phase = getPhase(week);

    return {
      week,
      phase,
      title,
      objective:
        `Students develop practical understanding and evidence connected to ${title.toLowerCase()}.`,
      facilitatorGuide:
        `Introduce the Week ${week} objective, connect it to students’ experiences, facilitate discussion, and guide completion of the weekly activity and reflection.`,
      discussionQuestions: [
        `What does ${title.toLowerCase()} mean to you?`,
        "How could this skill affect your future success?",
        "What action can you take this week?",
      ],
      studentActivity:
        `Complete the Week ${week} ${title} activity and identify one practical action to apply.`,
      workplaceConnection:
        "Employers value self-awareness, communication, reliability, teamwork, initiative, adaptability, and problem solving.",
      skillsEarned: [
        "Communication",
        "Reflection",
        "Career Readiness",
      ],
      portfolioEvidence:
        `Week ${week} ${title} portfolio artifact`,
      badgeEarned:
        `${title} Badge`,
    };
  });
