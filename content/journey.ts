export type JourneyPhaseStatus =
  | "Completed"
  | "Current"
  | "Upcoming"
  | "Locked";

export type JourneyMilestone = {
  label: string;
  completed: boolean;
};

export type JourneyPhase = {
  slug: string;
  name: string;
  number: number;
  icon: string;
  status: JourneyPhaseStatus;
  progress: number;
  tagline: string;
  description: string;
  lessonsCompleted: number;
  lessonsTotal: number;
  skills: string[];
  badges: string[];
  portfolioEvidence: string[];
  reflections: number;
  milestones: JourneyMilestone[];
  nextStep: string;
};

export const journeyStats = {
  overallProgress: 58,
  lessonsCompleted: 18,
  lessonsTotal: 36,
  skillsEarned: 9,
  skillsTotal: 12,
  badgesEarned: 4,
  badgesTotal: 12,
  portfolioPieces: 8,
  reflectionEntries: 12,
  currentPhase: "DEVELOP",
  nextMilestone: "Complete Emerging Leader verification",
  estimatedCompletion: "May 2027",
};

export const journeyPhases: JourneyPhase[] = [
  {
    slug: "discover",
    name: "DISCOVER",
    number: 1,
    icon: "🧭",
    status: "Completed",
    progress: 100,
    tagline: "Know who you are.",
    description:
      "Build self-awareness by exploring strengths, interests, values, motivations, confidence, and personal direction.",
    lessonsCompleted: 6,
    lessonsTotal: 6,
    skills: [
      "Self-Awareness",
      "Communication",
      "Confidence",
      "Reflection",
    ],
    badges: [
      "Self-Awareness Explorer",
      "Effective Communicator",
      "Confidence Builder",
    ],
    portfolioEvidence: [
      "Strengths Snapshot",
      "Personal Vision",
      "Professional Introduction",
    ],
    reflections: 4,
    milestones: [
      {
        label: "Complete personal strengths inventory",
        completed: true,
      },
      {
        label: "Identify core values and interests",
        completed: true,
      },
      {
        label: "Create a professional introduction",
        completed: true,
      },
      {
        label: "Complete personal vision reflection",
        completed: true,
      },
    ],
    nextStep:
      "Continue using your strengths and values to guide future decisions.",
  },
  {
    slug: "develop",
    name: "DEVELOP",
    number: 2,
    icon: "💡",
    status: "Current",
    progress: 72,
    tagline: "Build the skills that move you forward.",
    description:
      "Strengthen communication, teamwork, leadership, problem-solving, adaptability, reliability, and professional habits.",
    lessonsCompleted: 7,
    lessonsTotal: 10,
    skills: [
      "Teamwork",
      "Leadership",
      "Problem Solving",
      "Adaptability",
      "Reliability",
    ],
    badges: [
      "Team Builder",
      "Emerging Leader",
      "Problem Solver",
    ],
    portfolioEvidence: [
      "Team Challenge Reflection",
      "Leadership Action Plan",
      "Problem-Solving Brief",
    ],
    reflections: 5,
    milestones: [
      {
        label: "Complete teamwork and collaboration lesson",
        completed: true,
      },
      {
        label: "Lead a classroom or team activity",
        completed: true,
      },
      {
        label: "Complete leadership reflection",
        completed: true,
      },
      {
        label: "Receive Emerging Leader verification",
        completed: false,
      },
      {
        label: "Submit problem-solving brief",
        completed: false,
      },
    ],
    nextStep:
      "Ask your facilitator to verify your Emerging Leader badge requirements.",
  },
  {
    slug: "explore",
    name: "EXPLORE",
    number: 3,
    icon: "🔎",
    status: "Upcoming",
    progress: 24,
    tagline: "Explore where your strengths can lead.",
    description:
      "Research industries, careers, education pathways, emerging opportunities, and future workforce trends.",
    lessonsCompleted: 2,
    lessonsTotal: 7,
    skills: [
      "Career Awareness",
      "Research",
      "Opportunity Mapping",
    ],
    badges: ["Career Explorer"],
    portfolioEvidence: ["Career Interest Starter"],
    reflections: 2,
    milestones: [
      {
        label: "Complete career interest starter",
        completed: true,
      },
      {
        label: "Research three career pathways",
        completed: false,
      },
      {
        label: "Explore education and training options",
        completed: false,
      },
      {
        label: "Build a career exploration map",
        completed: false,
      },
    ],
    nextStep:
      "Research three careers connected to your strengths, interests, and values.",
  },
  {
    slug: "connect",
    name: "CONNECT",
    number: 4,
    icon: "🤝",
    status: "Upcoming",
    progress: 8,
    tagline: "Build relationships that create opportunity.",
    description:
      "Develop professional presence, networking skills, communication habits, and connections with mentors and employers.",
    lessonsCompleted: 1,
    lessonsTotal: 5,
    skills: [
      "Networking",
      "Professional Presence",
      "Relationship Building",
    ],
    badges: ["Professional Presence"],
    portfolioEvidence: ["Professional Introduction"],
    reflections: 1,
    milestones: [
      {
        label: "Create professional introduction",
        completed: true,
      },
      {
        label: "Complete professional email activity",
        completed: false,
      },
      {
        label: "Participate in networking practice",
        completed: false,
      },
      {
        label: "Connect with a mentor or employer",
        completed: false,
      },
    ],
    nextStep:
      "Complete the Professional Presence lesson and prepare a professional email.",
  },
  {
    slug: "experience",
    name: "EXPERIENCE",
    number: 5,
    icon: "💼",
    status: "Locked",
    progress: 0,
    tagline: "Apply what you know in the real world.",
    description:
      "Demonstrate workplace readiness through projects, employer engagement, internships, job shadowing, and applied learning.",
    lessonsCompleted: 0,
    lessonsTotal: 5,
    skills: [
      "Workplace Readiness",
      "Professionalism",
      "Initiative",
      "Accountability",
    ],
    badges: [
      "Workplace Ready",
      "Internship Ready",
    ],
    portfolioEvidence: [],
    reflections: 0,
    milestones: [
      {
        label: "Complete workplace readiness preparation",
        completed: false,
      },
      {
        label: "Complete résumé or professional profile",
        completed: false,
      },
      {
        label: "Participate in employer experience",
        completed: false,
      },
      {
        label: "Complete workplace reflection",
        completed: false,
      },
    ],
    nextStep:
      "Complete the DEVELOP, EXPLORE, and CONNECT phases to unlock this phase.",
  },
  {
    slug: "launch",
    name: "LAUNCH",
    number: 6,
    icon: "🚀",
    status: "Locked",
    progress: 0,
    tagline: "Launch the future you are prepared to build.",
    description:
      "Complete the capstone journey, present your portfolio, finalize your action plan, and prepare for your next step.",
    lessonsCompleted: 0,
    lessonsTotal: 3,
    skills: [
      "Purpose",
      "Career Readiness",
      "Leadership",
      "Future Planning",
    ],
    badges: [
      "Community Impact Leader",
      "Future Ready™ Graduate",
    ],
    portfolioEvidence: [],
    reflections: 0,
    milestones: [
      {
        label: "Complete Future Ready™ capstone portfolio",
        completed: false,
      },
      {
        label: "Present Future Ready™ Showcase",
        completed: false,
      },
      {
        label: "Finalize career action plan",
        completed: false,
      },
      {
        label: "Receive final facilitator approval",
        completed: false,
      },
    ],
    nextStep:
      "Continue building skills, evidence, relationships, and workplace experience.",
  },
];

export const futurePathways = [
  {
    icon: "🎓",
    title: "College",
    description:
      "Use your strengths, portfolio, and career plan to choose an education pathway that fits.",
  },
  {
    icon: "🛠️",
    title: "Apprenticeship",
    description:
      "Build technical skills while earning experience through work-based learning.",
  },
  {
    icon: "💼",
    title: "Workforce",
    description:
      "Enter the workforce with verified skills, professional evidence, and confidence.",
  },
  {
    icon: "🚀",
    title: "Entrepreneurship",
    description:
      "Apply creativity, leadership, and problem-solving to build something of your own.",
  },
  {
    icon: "🪖",
    title: "Military",
    description:
      "Explore service pathways that align with your interests, goals, and strengths.",
  },
  {
    icon: "🌎",
    title: "Community Leadership",
    description:
      "Use your skills and voice to create positive impact in your community.",
  },
];
