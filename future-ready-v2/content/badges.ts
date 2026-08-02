export type BadgeRequirement = {
  label: string;
  completed: boolean;
};

export type BadgeEvidence = {
  title: string;
  type: "Lesson" | "Portfolio" | "Reflection" | "Facilitator";
  description: string;
};

export type FutureReadyBadge = {
  slug: string;
  name: string;
  shortName: string;
  phase:
    | "DISCOVER"
    | "DEVELOP"
    | "EXPLORE"
    | "CONNECT"
    | "EXPERIENCE"
    | "LAUNCH";
  description: string;
  status: "Earned" | "In Progress" | "Locked";
  progress: number;
  icon: string;
  earnedDate?: string;
  competencies: string[];
  requirements: BadgeRequirement[];
  evidence: BadgeEvidence[];
  nextStep: string;
};

export const futureReadyBadges: FutureReadyBadge[] = [
  {
    slug: "self-awareness-explorer",
    name: "Self-Awareness Explorer",
    shortName: "Self-Awareness",
    phase: "DISCOVER",
    description:
      "Recognizes personal strengths, interests, values, motivations, and growth areas.",
    status: "Earned",
    progress: 100,
    icon: "🧭",
    earnedDate: "September 18, 2026",
    competencies: [
      "Self-Awareness",
      "Reflection",
      "Personal Responsibility",
    ],
    requirements: [
      { label: "Complete Discover Who I Am", completed: true },
      { label: "Complete strengths inventory", completed: true },
      { label: "Submit personal reflection", completed: true },
      { label: "Add identity artifact to portfolio", completed: true },
    ],
    evidence: [
      {
        title: "My Strengths Snapshot",
        type: "Portfolio",
        description:
          "Created a personal strengths profile with examples from school, sports, and community experiences.",
      },
      {
        title: "Who I Am Reflection",
        type: "Reflection",
        description:
          "Explained how values and experiences influence personal goals and decisions.",
      },
    ],
    nextStep:
      "Continue connecting your strengths to future education and career opportunities.",
  },
  {
    slug: "effective-communicator",
    name: "Effective Communicator",
    shortName: "Communicator",
    phase: "DISCOVER",
    description:
      "Communicates ideas clearly, listens actively, and adjusts communication for different audiences.",
    status: "Earned",
    progress: 100,
    icon: "💬",
    earnedDate: "October 2, 2026",
    competencies: [
      "Communication",
      "Active Listening",
      "Professional Presence",
    ],
    requirements: [
      { label: "Complete Communication That Connects", completed: true },
      { label: "Practice professional introduction", completed: true },
      { label: "Complete listening activity", completed: true },
      { label: "Receive facilitator approval", completed: true },
    ],
    evidence: [
      {
        title: "Professional Introduction",
        type: "Portfolio",
        description:
          "Prepared and delivered a concise professional introduction.",
      },
      {
        title: "Facilitator Communication Review",
        type: "Facilitator",
        description:
          "Demonstrated clear speaking, active listening, and respectful participation.",
      },
    ],
    nextStep:
      "Use your communication skills in a networking, employer, or presentation setting.",
  },
  {
    slug: "confidence-builder",
    name: "Confidence Builder",
    shortName: "Confidence",
    phase: "DISCOVER",
    description:
      "Demonstrates growing confidence, self-belief, and willingness to participate in unfamiliar situations.",
    status: "Earned",
    progress: 100,
    icon: "⭐",
    earnedDate: "October 16, 2026",
    competencies: [
      "Confidence",
      "Growth Mindset",
      "Self-Advocacy",
    ],
    requirements: [
      { label: "Complete Building Confidence", completed: true },
      { label: "Participate in role-play activity", completed: true },
      { label: "Identify confidence strategies", completed: true },
      { label: "Submit growth reflection", completed: true },
    ],
    evidence: [
      {
        title: "Confidence Action Plan",
        type: "Portfolio",
        description:
          "Created strategies for managing nerves, speaking up, and preparing for new experiences.",
      },
      {
        title: "Confidence Growth Reflection",
        type: "Reflection",
        description:
          "Documented one situation where preparation improved confidence and performance.",
      },
    ],
    nextStep:
      "Choose one new leadership or speaking opportunity that stretches your confidence.",
  },
  {
    slug: "team-builder",
    name: "Team Builder",
    shortName: "Team Builder",
    phase: "DEVELOP",
    description:
      "Contributes reliably, respects different perspectives, and helps teams achieve shared goals.",
    status: "Earned",
    progress: 100,
    icon: "🤝",
    earnedDate: "November 6, 2026",
    competencies: [
      "Teamwork",
      "Collaboration",
      "Reliability",
    ],
    requirements: [
      { label: "Complete Teamwork and Collaboration", completed: true },
      { label: "Participate in team challenge", completed: true },
      { label: "Complete team-role reflection", completed: true },
      { label: "Receive peer or facilitator feedback", completed: true },
    ],
    evidence: [
      {
        title: "Team Challenge",
        type: "Lesson",
        description:
          "Worked with peers to complete a timed challenge using assigned roles and shared decisions.",
      },
      {
        title: "My Role on a Team",
        type: "Reflection",
        description:
          "Explained personal team strengths and strategies for working with different styles.",
      },
    ],
    nextStep:
      "Practice taking a different team role during your next group project.",
  },
  {
    slug: "emerging-leader",
    name: "Emerging Leader",
    shortName: "Leader",
    phase: "DEVELOP",
    description:
      "Takes initiative, accepts responsibility, and influences others through positive actions.",
    status: "In Progress",
    progress: 75,
    icon: "🏆",
    competencies: [
      "Leadership",
      "Initiative",
      "Accountability",
    ],
    requirements: [
      { label: "Complete Leadership Foundations", completed: true },
      { label: "Lead a class or team activity", completed: true },
      { label: "Submit leadership reflection", completed: true },
      { label: "Receive facilitator verification", completed: false },
    ],
    evidence: [
      {
        title: "Leadership Foundations",
        type: "Lesson",
        description:
          "Explored leadership through service, responsibility, and positive influence.",
      },
      {
        title: "Leadership in Action",
        type: "Reflection",
        description:
          "Identified a situation where personal choices affected a group outcome.",
      },
    ],
    nextStep:
      "Ask your facilitator to observe and verify your next leadership activity.",
  },
  {
    slug: "problem-solver",
    name: "Problem Solver",
    shortName: "Problem Solver",
    phase: "DEVELOP",
    description:
      "Defines problems, evaluates options, proposes solutions, and adjusts based on results.",
    status: "In Progress",
    progress: 60,
    icon: "🧩",
    competencies: [
      "Problem Solving",
      "Critical Thinking",
      "Decision-Making",
    ],
    requirements: [
      { label: "Complete Problem Solving", completed: true },
      { label: "Complete workplace scenario", completed: true },
      { label: "Submit solution brief", completed: false },
      { label: "Present proposed solution", completed: false },
    ],
    evidence: [
      {
        title: "Workplace Problem-Solving Lab",
        type: "Lesson",
        description:
          "Used a structured process to define a challenge and compare possible solutions.",
      },
    ],
    nextStep:
      "Complete and upload your one-page solution brief.",
  },
  {
    slug: "career-explorer",
    name: "Career Explorer",
    shortName: "Career Explorer",
    phase: "EXPLORE",
    description:
      "Investigates career pathways, industries, education options, and emerging opportunities.",
    status: "Locked",
    progress: 20,
    icon: "🔎",
    competencies: [
      "Career Awareness",
      "Research",
      "Opportunity Mapping",
    ],
    requirements: [
      { label: "Complete Career Discovery", completed: true },
      { label: "Research three career pathways", completed: false },
      { label: "Complete industry exploration", completed: false },
      { label: "Build career exploration map", completed: false },
    ],
    evidence: [
      {
        title: "Career Interest Starter",
        type: "Reflection",
        description:
          "Identified initial industries and careers for future exploration.",
      },
    ],
    nextStep:
      "Research three careers connected to your strengths, values, and interests.",
  },
  {
    slug: "professional-presence",
    name: "Professional Presence",
    shortName: "Professional",
    phase: "CONNECT",
    description:
      "Demonstrates professional communication, conduct, preparation, and personal presentation.",
    status: "Locked",
    progress: 10,
    icon: "💼",
    competencies: [
      "Professionalism",
      "Communication",
      "Workplace Etiquette",
    ],
    requirements: [
      { label: "Complete Professional Presence", completed: false },
      { label: "Create professional introduction", completed: true },
      { label: "Complete professional email", completed: false },
      { label: "Participate in mock networking", completed: false },
    ],
    evidence: [
      {
        title: "Professional Introduction",
        type: "Portfolio",
        description:
          "Prepared an introductory statement for professional conversations.",
      },
    ],
    nextStep:
      "Complete the Professional Presence lesson and submit a professional email sample.",
  },
  {
    slug: "workplace-ready",
    name: "Workplace Ready",
    shortName: "Workplace Ready",
    phase: "EXPERIENCE",
    description:
      "Demonstrates the foundational habits, skills, and judgment needed to contribute in a workplace.",
    status: "Locked",
    progress: 0,
    icon: "🚀",
    competencies: [
      "Professionalism",
      "Reliability",
      "Communication",
      "Adaptability",
    ],
    requirements: [
      { label: "Complete Workplace Readiness", completed: false },
      { label: "Complete workplace project", completed: false },
      { label: "Meet attendance expectation", completed: false },
      { label: "Receive facilitator verification", completed: false },
    ],
    evidence: [],
    nextStep:
      "Continue progressing through the DEVELOP, EXPLORE, and CONNECT phases.",
  },
  {
    slug: "internship-ready",
    name: "Internship Ready",
    shortName: "Internship Ready",
    phase: "EXPERIENCE",
    description:
      "Meets the communication, preparation, professionalism, and readiness standards for an internship experience.",
    status: "Locked",
    progress: 0,
    icon: "📋",
    competencies: [
      "Workplace Readiness",
      "Professional Presence",
      "Interview Preparation",
    ],
    requirements: [
      { label: "Earn Workplace Ready badge", completed: false },
      { label: "Complete internship preparation", completed: false },
      { label: "Complete résumé or profile", completed: false },
      { label: "Complete mock interview", completed: false },
    ],
    evidence: [],
    nextStep:
      "Build your portfolio, résumé, professional presence, and workplace readiness skills.",
  },
  {
    slug: "community-impact-leader",
    name: "Community Impact Leader",
    shortName: "Community Leader",
    phase: "LAUNCH",
    description:
      "Applies leadership and service to create a positive impact in a school, workplace, or community.",
    status: "Locked",
    progress: 0,
    icon: "🌎",
    competencies: [
      "Service Leadership",
      "Community Impact",
      "Collaboration",
    ],
    requirements: [
      { label: "Complete service leadership lesson", completed: false },
      { label: "Participate in community project", completed: false },
      { label: "Document project impact", completed: false },
      { label: "Present reflection or results", completed: false },
    ],
    evidence: [],
    nextStep:
      "Identify a community need that connects to your strengths and interests.",
  },
  {
    slug: "future-ready-graduate",
    name: "Future Ready™ Graduate",
    shortName: "Graduate",
    phase: "LAUNCH",
    description:
      "Completes the full Future Ready™ journey and demonstrates readiness for education, employment, leadership, and life.",
    status: "Locked",
    progress: 0,
    icon: "🎓",
    competencies: [
      "Career Readiness",
      "Leadership",
      "Professionalism",
      "Purpose",
    ],
    requirements: [
      { label: "Complete all six phases", completed: false },
      { label: "Complete capstone portfolio", completed: false },
      { label: "Complete Future Ready Showcase", completed: false },
      { label: "Receive final facilitator approval", completed: false },
    ],
    evidence: [],
    nextStep:
      "Continue completing lessons, reflections, projects, and badges throughout the journey.",
  },
];

export function getBadgeBySlug(slug: string) {
  return futureReadyBadges.find((badge) => badge.slug === slug);
}

export function getBadgeCounts() {
  return {
    earned: futureReadyBadges.filter((badge) => badge.status === "Earned")
      .length,
    inProgress: futureReadyBadges.filter(
      (badge) => badge.status === "In Progress"
    ).length,
    locked: futureReadyBadges.filter((badge) => badge.status === "Locked")
      .length,
    total: futureReadyBadges.length,
  };
}
