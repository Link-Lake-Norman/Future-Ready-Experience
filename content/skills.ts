export type SkillEvidence = {
  title: string;
  type: "Lesson" | "Portfolio" | "Reflection" | "Facilitator";
  description: string;
  date: string;
};

export type SkillActivity = {
  title: string;
  description: string;
  action: string;
};

export type FutureReadySkill = {
  slug: string;
  name: string;
  category: string;
  score: number;
  level: "Beginning" | "Developing" | "Proficient" | "Advanced";
  description: string;
  employerValue: string;
  demonstratedBy: string[];
  evidence: SkillEvidence[];
  recommendedActivities: SkillActivity[];
  growth: {
    label: string;
    score: number;
  }[];
};

export const futureReadySkills: FutureReadySkill[] = [
  {
    slug: "communication",
    name: "Communication",
    category: "People Skills",
    score: 82,
    level: "Proficient",
    description:
      "Express ideas clearly, listen actively, ask thoughtful questions, and adjust communication for different audiences.",
    employerValue:
      "Employers rely on strong communicators to collaborate, serve customers, prevent misunderstandings, and represent the organization professionally.",
    demonstratedBy: [
      "Professional introductions",
      "Active listening",
      "Written communication",
      "Presentations",
      "Workplace conversations",
    ],
    evidence: [
      {
        title: "My Professional Introduction",
        type: "Portfolio",
        description:
          "Created and practiced a concise professional introduction for employer and networking conversations.",
        date: "Week 4",
      },
      {
        title: "Communication That Connects",
        type: "Lesson",
        description:
          "Completed activities focused on listening, body language, tone, and audience awareness.",
        date: "Week 4",
      },
      {
        title: "Communication Reflection",
        type: "Reflection",
        description:
          "Identified personal communication strengths and one area for continued improvement.",
        date: "Week 5",
      },
    ],
    recommendedActivities: [
      {
        title: "Practice a Workplace Introduction",
        description:
          "Record a 45-second introduction that explains who you are, what you are learning, and what interests you.",
        action: "Add recording to portfolio",
      },
      {
        title: "Lead a Team Check-In",
        description:
          "Open the next group activity by stating the goal, assigning roles, and inviting questions.",
        action: "Ask facilitator for feedback",
      },
    ],
    growth: [
      { label: "Starting Point", score: 58 },
      { label: "Week 4", score: 67 },
      { label: "Week 8", score: 75 },
      { label: "Current", score: 82 },
    ],
  },
  {
    slug: "teamwork",
    name: "Teamwork",
    category: "People Skills",
    score: 86,
    level: "Advanced",
    description:
      "Contribute reliably, respect different perspectives, share responsibility, and help a group accomplish a common goal.",
    employerValue:
      "Workplaces depend on people who can cooperate across roles, resolve tension, support colleagues, and remain accountable to the team.",
    demonstratedBy: [
      "Shared responsibility",
      "Collaboration",
      "Reliability",
      "Conflict navigation",
      "Team contribution",
    ],
    evidence: [
      {
        title: "Team Challenge",
        type: "Lesson",
        description:
          "Worked with a group to solve a timed challenge using assigned roles and shared decision-making.",
        date: "Week 8",
      },
      {
        title: "Facilitator Teamwork Review",
        type: "Facilitator",
        description:
          "Demonstrated reliability, encouragement, and active participation during team activities.",
        date: "Week 9",
      },
      {
        title: "My Role on a Team",
        type: "Reflection",
        description:
          "Reflected on natural team roles and strategies for supporting different working styles.",
        date: "Week 9",
      },
    ],
    recommendedActivities: [
      {
        title: "Rotate Team Roles",
        description:
          "Choose a role you do not normally take, such as presenter, timekeeper, facilitator, or recorder.",
        action: "Document what you learned",
      },
      {
        title: "Give Specific Recognition",
        description:
          "Recognize a teammate for one concrete behavior that improved the team's work.",
        action: "Record reflection",
      },
    ],
    growth: [
      { label: "Starting Point", score: 63 },
      { label: "Week 4", score: 70 },
      { label: "Week 8", score: 80 },
      { label: "Current", score: 86 },
    ],
  },
  {
    slug: "leadership",
    name: "Leadership",
    category: "Leadership Skills",
    score: 74,
    level: "Proficient",
    description:
      "Take initiative, influence others positively, make responsible decisions, and help a group move toward a shared purpose.",
    employerValue:
      "Leadership is valuable at every level because employers need people who take ownership, support others, and act without waiting to be directed.",
    demonstratedBy: [
      "Initiative",
      "Decision-making",
      "Positive influence",
      "Responsibility",
      "Service leadership",
    ],
    evidence: [
      {
        title: "Leadership Foundations",
        type: "Lesson",
        description:
          "Explored the difference between position-based leadership and behavior-based leadership.",
        date: "Week 9",
      },
      {
        title: "Leadership in Action",
        type: "Reflection",
        description:
          "Identified a time when personal choices positively influenced a group.",
        date: "Week 10",
      },
    ],
    recommendedActivities: [
      {
        title: "Lead a Five-Minute Activity",
        description:
          "Prepare instructions, explain the goal, invite participation, and close with a brief reflection.",
        action: "Request facilitator observation",
      },
      {
        title: "Solve Before Escalating",
        description:
          "When a small issue arises, propose one responsible solution before asking someone else to resolve it.",
        action: "Record the outcome",
      },
    ],
    growth: [
      { label: "Starting Point", score: 48 },
      { label: "Week 4", score: 56 },
      { label: "Week 8", score: 66 },
      { label: "Current", score: 74 },
    ],
  },
  {
    slug: "professionalism",
    name: "Professionalism",
    category: "Workplace Skills",
    score: 88,
    level: "Advanced",
    description:
      "Demonstrate reliability, preparation, respect, appropriate conduct, and accountability in professional settings.",
    employerValue:
      "Professional behavior builds trust. Employers value people who arrive prepared, communicate respectfully, meet expectations, and represent the organization well.",
    demonstratedBy: [
      "Preparation",
      "Reliability",
      "Professional conduct",
      "Accountability",
      "Workplace etiquette",
    ],
    evidence: [
      {
        title: "Professional Presence Checklist",
        type: "Portfolio",
        description:
          "Completed a personal checklist covering punctuality, preparation, appearance, conduct, and follow-through.",
        date: "Week 7",
      },
      {
        title: "Attendance and Participation",
        type: "Facilitator",
        description:
          "Consistently arrives prepared and participates respectfully in class activities.",
        date: "Current",
      },
    ],
    recommendedActivities: [
      {
        title: "Prepare for a Mock Meeting",
        description:
          "Review the agenda, bring notes, arrive early, and contribute at least one relevant idea.",
        action: "Complete meeting reflection",
      },
      {
        title: "Professional Email Practice",
        description:
          "Write an email with a clear subject, greeting, concise request, and professional closing.",
        action: "Add approved email to portfolio",
      },
    ],
    growth: [
      { label: "Starting Point", score: 69 },
      { label: "Week 4", score: 76 },
      { label: "Week 8", score: 84 },
      { label: "Current", score: 88 },
    ],
  },
  {
    slug: "critical-thinking",
    name: "Critical Thinking",
    category: "Thinking Skills",
    score: 69,
    level: "Developing",
    description:
      "Evaluate information, identify assumptions, compare options, and make decisions using evidence rather than impulse.",
    employerValue:
      "Employers need people who can assess information carefully, recognize risk, ask productive questions, and make sound judgments.",
    demonstratedBy: [
      "Information evaluation",
      "Questioning",
      "Decision-making",
      "Evidence use",
      "Risk awareness",
    ],
    evidence: [
      {
        title: "Decision-Making Scenario",
        type: "Lesson",
        description:
          "Compared several workplace responses and explained the likely consequences of each choice.",
        date: "Week 10",
      },
      {
        title: "How I Make Decisions",
        type: "Reflection",
        description:
          "Identified personal decision-making habits and strategies for slowing down before acting.",
        date: "Week 10",
      },
    ],
    recommendedActivities: [
      {
        title: "Use the Evidence Check",
        description:
          "Before making a decision, list what you know, what you assume, and what information is still missing.",
        action: "Upload completed evidence check",
      },
      {
        title: "Compare Three Options",
        description:
          "For an upcoming choice, identify three options and evaluate the benefits, risks, and likely results.",
        action: "Discuss with facilitator",
      },
    ],
    growth: [
      { label: "Starting Point", score: 46 },
      { label: "Week 4", score: 52 },
      { label: "Week 8", score: 61 },
      { label: "Current", score: 69 },
    ],
  },
  {
    slug: "problem-solving",
    name: "Problem Solving",
    category: "Thinking Skills",
    score: 76,
    level: "Proficient",
    description:
      "Define problems accurately, identify possible causes, generate solutions, test ideas, and adjust based on results.",
    employerValue:
      "Problem solvers reduce delays, improve processes, respond constructively to challenges, and help organizations move forward.",
    demonstratedBy: [
      "Problem definition",
      "Solution generation",
      "Resourcefulness",
      "Testing",
      "Improvement",
    ],
    evidence: [
      {
        title: "Workplace Problem-Solving Lab",
        type: "Lesson",
        description:
          "Used a structured process to define a workplace challenge and propose a realistic response.",
        date: "Week 10",
      },
      {
        title: "Team Solution Brief",
        type: "Portfolio",
        description:
          "Created a one-page solution brief explaining the issue, recommendation, and expected result.",
        date: "Week 11",
      },
    ],
    recommendedActivities: [
      {
        title: "Complete a Root-Cause Map",
        description:
          "Choose a recurring issue and identify the symptoms, contributing factors, and likely root cause.",
        action: "Add map to portfolio",
      },
      {
        title: "Test a Small Improvement",
        description:
          "Propose and test one small change that improves a class, team, or personal process.",
        action: "Track the result",
      },
    ],
    growth: [
      { label: "Starting Point", score: 52 },
      { label: "Week 4", score: 60 },
      { label: "Week 8", score: 69 },
      { label: "Current", score: 76 },
    ],
  },
  {
    slug: "adaptability",
    name: "Adaptability",
    category: "Personal Effectiveness",
    score: 72,
    level: "Proficient",
    description:
      "Respond productively to change, accept feedback, learn new approaches, and remain effective when plans shift.",
    employerValue:
      "Technology, customer needs, teams, and business conditions change quickly. Adaptable employees remain effective and continue learning.",
    demonstratedBy: [
      "Flexibility",
      "Feedback response",
      "Learning agility",
      "Resilience",
      "Change readiness",
    ],
    evidence: [
      {
        title: "Changing the Plan",
        type: "Lesson",
        description:
          "Completed a team activity in which expectations changed midway through the assignment.",
        date: "Week 11",
      },
      {
        title: "Responding to Feedback",
        type: "Reflection",
        description:
          "Created a personal strategy for receiving feedback without becoming defensive.",
        date: "Week 11",
      },
    ],
    recommendedActivities: [
      {
        title: "Feedback-to-Action Plan",
        description:
          "Ask for one specific piece of feedback and identify the next action you will take.",
        action: "Record progress",
      },
      {
        title: "Try a New Method",
        description:
          "Complete a familiar task using a different tool, process, or role.",
        action: "Compare both approaches",
      },
    ],
    growth: [
      { label: "Starting Point", score: 50 },
      { label: "Week 4", score: 57 },
      { label: "Week 8", score: 65 },
      { label: "Current", score: 72 },
    ],
  },
  {
    slug: "emotional-intelligence",
    name: "Emotional Intelligence",
    category: "Personal Effectiveness",
    score: 70,
    level: "Proficient",
    description:
      "Recognize emotions, manage reactions, understand other perspectives, and interact with empathy and self-awareness.",
    employerValue:
      "Emotional intelligence improves teamwork, leadership, customer service, conflict management, and professional judgment.",
    demonstratedBy: [
      "Self-awareness",
      "Self-management",
      "Empathy",
      "Perspective-taking",
      "Relationship management",
    ],
    evidence: [
      {
        title: "Recognizing My Triggers",
        type: "Reflection",
        description:
          "Identified situations that create stress and selected strategies for responding productively.",
        date: "Week 5",
      },
      {
        title: "Perspective Practice",
        type: "Lesson",
        description:
          "Practiced interpreting a workplace disagreement from multiple perspectives.",
        date: "Week 8",
      },
    ],
    recommendedActivities: [
      {
        title: "Pause and Name the Emotion",
        description:
          "During a challenging moment, pause before responding and identify the emotion influencing your reaction.",
        action: "Write a private reflection",
      },
      {
        title: "Practice Perspective-Taking",
        description:
          "Describe a disagreement from the other person's point of view before explaining your own.",
        action: "Discuss with facilitator",
      },
    ],
    growth: [
      { label: "Starting Point", score: 49 },
      { label: "Week 4", score: 58 },
      { label: "Week 8", score: 64 },
      { label: "Current", score: 70 },
    ],
  },
  {
    slug: "digital-literacy",
    name: "Digital Literacy",
    category: "Technology Skills",
    score: 80,
    level: "Proficient",
    description:
      "Use digital tools responsibly, evaluate online information, protect personal data, and apply technology to complete meaningful work.",
    employerValue:
      "Nearly every career requires responsible technology use, sound information judgment, digital communication, and awareness of privacy and security.",
    demonstratedBy: [
      "Digital responsibility",
      "Information literacy",
      "AI awareness",
      "Online safety",
      "Technology use",
    ],
    evidence: [
      {
        title: "Responsible AI Use",
        type: "Lesson",
        description:
          "Explored appropriate AI use, verification, authorship, privacy, and accountability.",
        date: "Week 12",
      },
      {
        title: "Digital Citizenship Commitment",
        type: "Portfolio",
        description:
          "Created a personal commitment for responsible, secure, and transparent technology use.",
        date: "Week 12",
      },
    ],
    recommendedActivities: [
      {
        title: "Verify an AI Response",
        description:
          "Use two reliable sources to verify the accuracy of an AI-generated answer.",
        action: "Document the verification",
      },
      {
        title: "Complete a Privacy Check",
        description:
          "Review the privacy settings and public information on one professional or educational account.",
        action: "Record completed changes",
      },
    ],
    growth: [
      { label: "Starting Point", score: 61 },
      { label: "Week 4", score: 66 },
      { label: "Week 8", score: 72 },
      { label: "Current", score: 80 },
    ],
  },
];

export function getSkillBySlug(slug: string) {
  return futureReadySkills.find((skill) => skill.slug === slug);
}

export function getOverallSkillScore() {
  const total = futureReadySkills.reduce(
    (sum, skill) => sum + skill.score,
    0
  );

  return Math.round(total / futureReadySkills.length);
}
