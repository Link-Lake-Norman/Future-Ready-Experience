export type AssessmentOption = {
  label: string;
  scores: Record<string, number>;
};

export type AssessmentQuestion = {
  id: string;
  prompt: string;
  options: AssessmentOption[];
};

export type AssessmentProfile = {
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
  category: string;
  questions: AssessmentQuestion[];
  profiles: AssessmentProfile[];
};

const strengthsAssessment: Assessment = {
  slug: "strengths",

  title: "Future Ready™ Strengths Assessment",

  shortTitle: "Strengths",

  category: "Self Discovery",

  questions: [
    {
      id: "s1",
      prompt: "When working on a team, I naturally...",
      options: [
        {
          label: "Organize the work and create a plan.",
          scores: { leader: 3 },
        },
        {
          label: "Support teammates wherever needed.",
          scores: { collaborator: 3 },
        },
        {
          label: "Generate creative ideas.",
          scores: { innovator: 3 },
        },
        {
          label: "Analyze details before acting.",
          scores: { analyst: 3 },
        },
      ],
    },

    {
      id: "s2",
      prompt: "People usually come to me because I...",
      options: [
        {
          label: "Help solve problems.",
          scores: { analyst: 2 },
        },
        {
          label: "Encourage others.",
          scores: { collaborator: 2 },
        },
        {
          label: "Take initiative.",
          scores: { leader: 2 },
        },
        {
          label: "Think differently.",
          scores: { innovator: 2 },
        },
      ],
    },

    {
      id: "s3",
      prompt: "I enjoy projects that...",
      options: [
        {
          label: "Require leadership.",
          scores: { leader: 2 },
        },
        {
          label: "Need teamwork.",
          scores: { collaborator: 2 },
        },
        {
          label: "Allow creativity.",
          scores: { innovator: 2 },
        },
        {
          label: "Require research.",
          scores: { analyst: 2 },
        },
      ],
    },
  ],

  profiles: [
    {
      key: "leader",

      title: "Leader",

      summary:
        "You naturally take initiative, motivate others, and enjoy creating direction.",

      strengths: [
        "Decision Making",
        "Initiative",
        "Confidence",
        "Responsibility",
      ],

      growthAreas: [
        "Listen before acting",
        "Delegate more often",
        "Seek additional perspectives",
      ],

      actions: [
        "Lead a team project.",
        "Practice coaching another student.",
        "Develop public speaking skills.",
      ],
    },

    {
      key: "collaborator",

      title: "Collaborator",

      summary:
        "You thrive in team environments and help people succeed together.",

      strengths: [
        "Empathy",
        "Communication",
        "Relationship Building",
        "Teamwork",
      ],

      growthAreas: [
        "Speak up confidently",
        "Handle conflict directly",
        "Take ownership of decisions",
      ],

      actions: [
        "Facilitate a group discussion.",
        "Volunteer for peer mentoring.",
        "Practice giving constructive feedback.",
      ],
    },

    {
      key: "innovator",

      title: "Innovator",

      summary:
        "You enjoy creating new ideas and finding better ways to solve problems.",

      strengths: [
        "Creativity",
        "Innovation",
        "Curiosity",
        "Vision",
      ],

      growthAreas: [
        "Improve execution",
        "Follow through consistently",
        "Document ideas",
      ],

      actions: [
        "Create a new solution for a school challenge.",
        "Learn design thinking.",
        "Prototype one new idea every month.",
      ],
    },

    {
      key: "analyst",

      title: "Analyst",

      summary:
        "You enjoy understanding information before making decisions.",

      strengths: [
        "Critical Thinking",
        "Research",
        "Accuracy",
        "Problem Solving",
      ],

      growthAreas: [
        "Avoid overthinking",
        "Take calculated risks",
        "Share insights sooner",
      ],

      actions: [
        "Lead a research project.",
        "Learn data visualization.",
        "Present findings to a group.",
      ],
    },
  ],
};  
const communicationAssessment: Assessment = {
  slug: "communication",
  title: "Future Ready™ Communication Assessment",
  shortTitle: "Communication",
  category: "Professional Skills",

  questions: [
    {
      id: "c1",
      prompt: "When someone disagrees with me, I usually...",
      options: [
        {
          label: "Listen carefully before responding.",
          scores: { communicator: 3 },
        },
        {
          label: "Try to solve the problem immediately.",
          scores: { leader: 3 },
        },
        {
          label: "Look for facts before responding.",
          scores: { analyst: 3 },
        },
        {
          label: "Help everyone feel included.",
          scores: { collaborator: 3 },
        },
      ],
    },
    {
      id: "c2",
      prompt: "During conversations, I naturally...",
      options: [
        {
          label: "Ask thoughtful questions.",
          scores: { communicator: 2 },
        },
        {
          label: "Encourage participation.",
          scores: { collaborator: 2 },
        },
        {
          label: "Guide the discussion.",
          scores: { leader: 2 },
        },
        {
          label: "Clarify details.",
          scores: { analyst: 2 },
        },
      ],
    },
    {
      id: "c3",
      prompt: "People describe my communication as...",
      options: [
        {
          label: "Confident",
          scores: { leader: 2 },
        },
        {
          label: "Supportive",
          scores: { collaborator: 2 },
        },
        {
          label: "Clear",
          scores: { communicator: 2 },
        },
        {
          label: "Thoughtful",
          scores: { analyst: 2 },
        },
      ],
    },
  ],

  profiles: [
    {
      key: "communicator",
      title: "Clear Communicator",
      summary:
        "You focus on listening, asking thoughtful questions, and making ideas easy to understand.",
      strengths: [
        "Active Listening",
        "Clarity",
        "Questioning",
        "Professional Communication",
      ],
      growthAreas: [
        "Speak with greater confidence",
        "Adapt your message to different audiences",
        "Practice difficult conversations",
      ],
      actions: [
        "Practice a 60-second professional introduction.",
        "Lead a short group discussion.",
        "Ask for feedback after your next presentation.",
      ],
    },
    {
      key: "leader",
      title: "Directive Communicator",
      summary:
        "You communicate with confidence and naturally help move conversations toward decisions.",
      strengths: [
        "Confidence",
        "Decision Making",
        "Direction",
        "Initiative",
      ],
      growthAreas: [
        "Pause before responding",
        "Invite more input",
        "Balance direction with listening",
      ],
      actions: [
        "Practice asking two questions before giving advice.",
        "Facilitate a team planning session.",
        "Summarize another person's perspective before responding.",
      ],
    },
    {
      key: "collaborator",
      title: "Supportive Communicator",
      summary:
        "You help people feel heard, included, and comfortable contributing.",
      strengths: [
        "Empathy",
        "Encouragement",
        "Inclusion",
        "Relationship Building",
      ],
      growthAreas: [
        "Address conflict directly",
        "State your own opinion clearly",
        "Set communication boundaries",
      ],
      actions: [
        "Practice giving constructive feedback.",
        "Invite a quieter teammate into a discussion.",
        "Use an assertive statement in your next group meeting.",
      ],
    },
    {
      key: "analyst",
      title: "Thoughtful Communicator",
      summary:
        "You value facts, details, and accuracy before sharing your perspective.",
      strengths: [
        "Critical Thinking",
        "Accuracy",
        "Preparation",
        "Attention to Detail",
      ],
      growthAreas: [
        "Respond without overthinking",
        "Simplify complex information",
        "Share ideas earlier",
      ],
      actions: [
        "Explain a complex topic in three simple sentences.",
        "Present one finding to a group.",
        "Practice answering an unexpected question.",
      ],
    },
  ],
};

const careerReadinessAssessment: Assessment = {
  slug: "career-readiness",
  title: "Future Ready™ Career Readiness Assessment",
  shortTitle: "Career Readiness",
  category: "Career Development",

  questions: [
    {
      id: "r1",
      prompt: "I understand careers that fit my interests.",
      options: [
        {
          label: "Strongly Agree",
          scores: { ready: 3 },
        },
        {
          label: "Agree",
          scores: { developing: 2 },
        },
        {
          label: "Unsure",
          scores: { exploring: 2 },
        },
        {
          label: "Not Yet",
          scores: { beginning: 2 },
        },
      ],
    },
    {
      id: "r2",
      prompt: "I feel confident introducing myself professionally.",
      options: [
        {
          label: "Very Confident",
          scores: { ready: 3 },
        },
        {
          label: "Mostly Confident",
          scores: { developing: 2 },
        },
        {
          label: "Need Practice",
          scores: { exploring: 2 },
        },
        {
          label: "Not Comfortable Yet",
          scores: { beginning: 2 },
        },
      ],
    },
    {
      id: "r3",
      prompt: "I know the next step toward my future career.",
      options: [
        {
          label: "Absolutely",
          scores: { ready: 3 },
        },
        {
          label: "Mostly",
          scores: { developing: 2 },
        },
        {
          label: "Still Exploring",
          scores: { exploring: 2 },
        },
        {
          label: "No",
          scores: { beginning: 2 },
        },
      ],
    },
  ],

  profiles: [
    {
      key: "ready",
      title: "Career Ready",
      summary:
        "You demonstrate strong confidence and are prepared for internships, workplace experiences, and career exploration.",
      strengths: [
        "Professionalism",
        "Confidence",
        "Communication",
        "Career Awareness",
      ],
      growthAreas: [
        "Expand your professional network",
        "Continue building workplace experience",
        "Refine your long-term career plan",
      ],
      actions: [
        "Apply for internships or workplace experiences.",
        "Build your Future Ready™ portfolio.",
        "Connect with mentors and employers.",
      ],
    },
    {
      key: "developing",
      title: "Developing",
      summary:
        "You have a solid foundation and are actively building workplace confidence.",
      strengths: [
        "Growth Mindset",
        "Communication",
        "Self-Awareness",
      ],
      growthAreas: [
        "Leadership",
        "Career Planning",
        "Professional Confidence",
      ],
      actions: [
        "Complete another Future Ready™ module.",
        "Attend a networking event.",
        "Practice your professional introduction.",
      ],
    },
    {
      key: "exploring",
      title: "Exploring",
      summary:
        "You are discovering your strengths, interests, and possible career direction.",
      strengths: [
        "Curiosity",
        "Potential",
        "Willingness to Learn",
      ],
      growthAreas: [
        "Career Awareness",
        "Professional Skills",
        "Decision Making",
      ],
      actions: [
        "Meet with a mentor or career advisor.",
        "Research three careers.",
        "Complete a workplace skills lesson.",
      ],
    },
    {
      key: "beginning",
      title: "Beginning the Journey",
      summary:
        "Everyone starts somewhere. Your next steps will help you quickly build confidence and direction.",
      strengths: [
        "Opportunity",
        "Potential",
        "Room to Grow",
      ],
      growthAreas: [
        "Confidence",
        "Communication",
        "Career Planning",
      ],
      actions: [
        "Begin the Future Ready™ Academy.",
        "Complete all three assessments.",
        "Identify one trusted adult who can support your goals.",
      ],
    },
  ],
};

export const assessments: Assessment[] = [
  strengthsAssessment,
  communicationAssessment,
  careerReadinessAssessment,
];

export function getAssessment(slug: string): Assessment | undefined {
  return assessments.find((assessment) => assessment.slug === slug);
}