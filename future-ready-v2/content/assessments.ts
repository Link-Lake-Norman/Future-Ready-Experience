export type AssessmentOption = {
  label: string;
  scores: Record<string, number>;
};

export type AssessmentQuestion = {
  id: string;
  prompt: string;
  options: AssessmentOption[];
};

export type AssessmentResultProfile = {
  key: string;
  title: string;
  summary: string;
  strengths: string[];
  growthAreas: string[];
  actions: string[];
};

export type Assessment = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  estimatedMinutes: number;
  category: string;
  questions: AssessmentQuestion[];
  profiles: AssessmentResultProfile[];
};

const frequencyOptions = (
  primaryKey: string,
  secondaryKey: string,
): AssessmentOption[] => [
  {
    label: "Very much like me",
    scores: { [primaryKey]: 4, [secondaryKey]: 1 },
  },
  {
    label: "Mostly like me",
    scores: { [primaryKey]: 3, [secondaryKey]: 1 },
  },
  {
    label: "Sometimes like me",
    scores: { [primaryKey]: 2, [secondaryKey]: 2 },
  },
  {
    label: "Not usually like me",
    scores: { [primaryKey]: 1, [secondaryKey]: 3 },
  },
];

export const assessments: Assessment[] = [
  {
    slug: "strengths",
    title: "Strengths Discovery Assessment",
    shortTitle: "Strengths",
    description:
      "Identify the natural abilities, behaviors, and working styles you bring to teams, classrooms, and workplaces.",
    estimatedMinutes: 6,
    category: "Self-Discovery",
    questions: [
      {
        id: "strengths-1",
        prompt: "I naturally step forward when a group needs direction.",
        options: frequencyOptions("leadership", "support"),
      },
      {
        id: "strengths-2",
        prompt: "I enjoy examining details and finding the cause of a problem.",
        options: frequencyOptions("analysis", "creativity"),
      },
      {
        id: "strengths-3",
        prompt: "I often generate new ideas or new ways to approach a task.",
        options: frequencyOptions("creativity", "execution"),
      },
      {
        id: "strengths-4",
        prompt: "People rely on me to follow through and complete assignments.",
        options: frequencyOptions("execution", "leadership"),
      },
      {
        id: "strengths-5",
        prompt: "I notice when someone needs encouragement or assistance.",
        options: frequencyOptions("support", "analysis"),
      },
      {
        id: "strengths-6",
        prompt: "I am comfortable making decisions when time is limited.",
        options: frequencyOptions("leadership", "analysis"),
      },
      {
        id: "strengths-7",
        prompt: "I enjoy organizing information into a clear plan.",
        options: frequencyOptions("execution", "creativity"),
      },
      {
        id: "strengths-8",
        prompt: "I ask thoughtful questions before recommending a solution.",
        options: frequencyOptions("analysis", "leadership"),
      },
      {
        id: "strengths-9",
        prompt: "I help groups work through disagreements respectfully.",
        options: frequencyOptions("support", "execution"),
      },
      {
        id: "strengths-10",
        prompt: "I enjoy creating something that did not exist before.",
        options: frequencyOptions("creativity", "support"),
      },
    ],
    profiles: [
      {
        key: "leadership",
        title: "Initiative Leader",
        summary:
          "You naturally create momentum, make decisions, and help groups move toward a shared outcome.",
        strengths: [
          "Taking initiative",
          "Making timely decisions",
          "Motivating others",
          "Creating direction",
        ],
        growthAreas: [
          "Inviting perspectives before deciding",
          "Delegating responsibility",
          "Balancing speed with reflection",
        ],
        actions: [
          "Volunteer to lead one team assignment.",
          "Ask every teammate for input before finalizing a decision.",
          "Practice delegating one meaningful responsibility.",
        ],
      },
      {
        key: "analysis",
        title: "Strategic Problem Solver",
        summary:
          "You look beneath the surface, evaluate information, and work to understand why something is happening.",
        strengths: [
          "Critical thinking",
          "Research",
          "Pattern recognition",
          "Evaluating alternatives",
        ],
        growthAreas: [
          "Acting before every detail is known",
          "Explaining complex ideas simply",
          "Balancing analysis with experimentation",
        ],
        actions: [
          "Use a problem–cause–solution framework on a current challenge.",
          "Explain one complex idea in three clear sentences.",
          "Set a decision deadline before beginning research.",
        ],
      },
      {
        key: "creativity",
        title: "Creative Innovator",
        summary:
          "You see possibilities, imagine alternatives, and bring original thinking to assignments and challenges.",
        strengths: [
          "Idea generation",
          "Innovation",
          "Adaptability",
          "Seeing new possibilities",
        ],
        growthAreas: [
          "Turning ideas into structured plans",
          "Completing one idea before beginning another",
          "Testing ideas with real users",
        ],
        actions: [
          "Choose one idea and create a three-step implementation plan.",
          "Ask someone to give feedback on an early concept.",
          "Document ideas in one organized location.",
        ],
      },
      {
        key: "execution",
        title: "Reliable Builder",
        summary:
          "You create structure, complete responsibilities, and help turn goals into measurable results.",
        strengths: [
          "Follow-through",
          "Organization",
          "Dependability",
          "Process management",
        ],
        growthAreas: [
          "Adapting when plans change",
          "Making room for experimentation",
          "Avoiding unnecessary perfectionism",
        ],
        actions: [
          "Create a weekly priority list with three essential outcomes.",
          "Identify one process that can be simplified.",
          "Build flexibility into the timeline for a current project.",
        ],
      },
      {
        key: "support",
        title: "Collaborative Connector",
        summary:
          "You strengthen relationships, notice what others need, and help groups work successfully together.",
        strengths: [
          "Empathy",
          "Collaboration",
          "Listening",
          "Relationship building",
        ],
        growthAreas: [
          "Speaking up when you disagree",
          "Setting healthy boundaries",
          "Making your own contributions visible",
        ],
        actions: [
          "Share one clear opinion during your next group discussion.",
          "Practice saying no to a request that conflicts with your priorities.",
          "Document your contribution to a team outcome.",
        ],
      },
    ],
  },
  {
    slug: "communication",
    title: "Communication Style Assessment",
    shortTitle: "Communication",
    description:
      "Understand how you express ideas, listen, respond to pressure, and collaborate with different communication styles.",
    estimatedMinutes: 6,
    category: "Professional Skills",
    questions: [
      {
        id: "communication-1",
        prompt: "I communicate my opinion directly and confidently.",
        options: frequencyOptions("direct", "reflective"),
      },
      {
        id: "communication-2",
        prompt: "I prefer time to think before responding to an important question.",
        options: frequencyOptions("reflective", "expressive"),
      },
      {
        id: "communication-3",
        prompt: "I bring energy and enthusiasm into group conversations.",
        options: frequencyOptions("expressive", "supportive"),
      },
      {
        id: "communication-4",
        prompt: "I focus on helping everyone feel heard and included.",
        options: frequencyOptions("supportive", "direct"),
      },
      {
        id: "communication-5",
        prompt: "I am comfortable addressing a problem instead of avoiding it.",
        options: frequencyOptions("direct", "supportive"),
      },
      {
        id: "communication-6",
        prompt: "I organize my thoughts carefully before presenting them.",
        options: frequencyOptions("reflective", "direct"),
      },
      {
        id: "communication-7",
        prompt: "I use stories, examples, or humor to connect with people.",
        options: frequencyOptions("expressive", "reflective"),
      },
      {
        id: "communication-8",
        prompt: "I notice tone, body language, and how others are reacting.",
        options: frequencyOptions("supportive", "expressive"),
      },
      {
        id: "communication-9",
        prompt: "I keep conversations focused on decisions and next steps.",
        options: frequencyOptions("direct", "expressive"),
      },
      {
        id: "communication-10",
        prompt: "I ask questions to make sure I understand before answering.",
        options: frequencyOptions("reflective", "supportive"),
      },
    ],
    profiles: [
      {
        key: "direct",
        title: "Direct Communicator",
        summary:
          "You value clarity, efficiency, and action. Others often know where you stand and what you expect.",
        strengths: [
          "Clear expectations",
          "Decisiveness",
          "Focused conversations",
          "Addressing issues",
        ],
        growthAreas: [
          "Softening delivery when needed",
          "Allowing processing time",
          "Recognizing emotional context",
        ],
        actions: [
          "Ask one question before offering your solution.",
          "Pause after making an important point.",
          "Confirm how your message was received.",
        ],
      },
      {
        key: "reflective",
        title: "Reflective Communicator",
        summary:
          "You process information carefully and tend to communicate with precision and thoughtful consideration.",
        strengths: [
          "Thoughtful responses",
          "Active listening",
          "Accuracy",
          "Strong preparation",
        ],
        growthAreas: [
          "Speaking before every detail is perfect",
          "Responding more quickly when needed",
          "Making your perspective visible",
        ],
        actions: [
          "Prepare one point before your next meeting and share it early.",
          "Use a brief holding response when you need more time.",
          "Practice summarizing your position in 30 seconds.",
        ],
      },
      {
        key: "expressive",
        title: "Expressive Communicator",
        summary:
          "You create energy, communicate openly, and often help others connect emotionally with an idea.",
        strengths: [
          "Enthusiasm",
          "Storytelling",
          "Relationship building",
          "Engaging presentations",
        ],
        growthAreas: [
          "Staying concise",
          "Listening without interrupting",
          "Following conversations with documented next steps",
        ],
        actions: [
          "Limit your next update to three main points.",
          "Write down action items after an important conversation.",
          "Wait two seconds before responding to another speaker.",
        ],
      },
      {
        key: "supportive",
        title: "Supportive Communicator",
        summary:
          "You prioritize trust, cooperation, and psychological safety when communicating with others.",
        strengths: [
          "Empathy",
          "Diplomacy",
          "Inclusive communication",
          "Conflict de-escalation",
        ],
        growthAreas: [
          "Addressing problems directly",
          "Giving difficult feedback",
          "Protecting your own priorities",
        ],
        actions: [
          "Use a clear observation–impact–request feedback structure.",
          "State your own need before offering support.",
          "Address one small concern before it becomes larger.",
        ],
      },
    ],
  },
  {
    slug: "career-readiness",
    title: "Career Readiness Assessment",
    shortTitle: "Career Readiness",
    description:
      "Measure your current confidence across professional communication, workplace behavior, career direction, and opportunity preparation.",
    estimatedMinutes: 8,
    category: "Workforce Readiness",
    questions: [
      {
        id: "readiness-1",
        prompt: "I can introduce myself professionally in 30 seconds.",
        options: frequencyOptions("communication", "career"),
      },
      {
        id: "readiness-2",
        prompt: "I understand how my interests connect to possible careers.",
        options: frequencyOptions("career", "experience"),
      },
      {
        id: "readiness-3",
        prompt: "I know how to behave professionally in a workplace.",
        options: frequencyOptions("professionalism", "communication"),
      },
      {
        id: "readiness-4",
        prompt: "I have examples that demonstrate my skills and accomplishments.",
        options: frequencyOptions("experience", "career"),
      },
      {
        id: "readiness-5",
        prompt: "I can write a clear professional email.",
        options: frequencyOptions("communication", "professionalism"),
      },
      {
        id: "readiness-6",
        prompt: "I arrive prepared, meet deadlines, and follow through.",
        options: frequencyOptions("professionalism", "experience"),
      },
      {
        id: "readiness-7",
        prompt: "I know what education or training my target career requires.",
        options: frequencyOptions("career", "communication"),
      },
      {
        id: "readiness-8",
        prompt: "I have participated in a project, job, internship, or service experience.",
        options: frequencyOptions("experience", "professionalism"),
      },
      {
        id: "readiness-9",
        prompt: "I can ask an employer thoughtful questions about a role.",
        options: frequencyOptions("communication", "career"),
      },
      {
        id: "readiness-10",
        prompt: "I know how to receive feedback and use it to improve.",
        options: frequencyOptions("professionalism", "experience"),
      },
      {
        id: "readiness-11",
        prompt: "I have a résumé or portfolio that reflects my current abilities.",
        options: frequencyOptions("experience", "communication"),
      },
      {
        id: "readiness-12",
        prompt: "I have a clear next step for moving toward my career goals.",
        options: frequencyOptions("career", "professionalism"),
      },
    ],
    profiles: [
      {
        key: "communication",
        title: "Communication Ready",
        summary:
          "Your strongest readiness area is communicating professionally, asking questions, and presenting your ideas.",
        strengths: [
          "Professional introductions",
          "Written communication",
          "Employer conversations",
          "Presenting ideas",
        ],
        growthAreas: [
          "Expanding workplace evidence",
          "Strengthening long-term career planning",
          "Practicing communication under pressure",
        ],
        actions: [
          "Record and review a 30-second professional introduction.",
          "Draft a professional outreach email to a career contact.",
          "Complete one practice interview.",
        ],
      },
      {
        key: "career",
        title: "Career Direction Ready",
        summary:
          "You have growing clarity about your interests, possible pathways, and the steps required to move forward.",
        strengths: [
          "Career awareness",
          "Goal setting",
          "Pathway research",
          "Education planning",
        ],
        growthAreas: [
          "Building professional evidence",
          "Expanding employer relationships",
          "Testing career interests through experience",
        ],
        actions: [
          "Research three roles within your preferred industry.",
          "Schedule one career conversation.",
          "Create a 90-day career action plan.",
        ],
      },
      {
        key: "professionalism",
        title: "Workplace Ready",
        summary:
          "Your habits, reliability, and response to expectations position you to contribute effectively in professional environments.",
        strengths: [
          "Reliability",
          "Preparation",
          "Receiving feedback",
          "Workplace behavior",
        ],
        growthAreas: [
          "Communicating accomplishments",
          "Expanding career exploration",
          "Building a professional network",
        ],
        actions: [
          "Ask a supervisor or mentor for one area of feedback.",
          "Track completed responsibilities and measurable outcomes.",
          "Practice responding professionally to a workplace challenge.",
        ],
      },
      {
        key: "experience",
        title: "Experience Ready",
        summary:
          "You are building evidence through projects, employment, service, leadership, or career-connected experiences.",
        strengths: [
          "Applied learning",
          "Portfolio evidence",
          "Skill demonstration",
          "Real-world participation",
        ],
        growthAreas: [
          "Explaining the value of your experiences",
          "Connecting evidence to career goals",
          "Strengthening professional communication",
        ],
        actions: [
          "Add one completed project to your portfolio.",
          "Write three résumé bullets using action and outcome language.",
          "Identify the next experience that will close a skill gap.",
        ],
      },
    ],
  },
];

export function getAssessment(slug: string): Assessment | undefined {
  return assessments.find((assessment) => assessment.slug === slug);
}
