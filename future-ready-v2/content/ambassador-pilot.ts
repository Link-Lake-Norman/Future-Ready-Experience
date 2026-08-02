export type AmbassadorLessonSegment = {
  segment: string;
  minutes: number;
  instructions: string;
};

export type AmbassadorActivity = {
  name: string;
  type: string;
  minutes: number;
  materials: string[];
  instructions: string;
};

export type AmbassadorWorkbookPage = {
  title: string;
  directions: string;
};

export type AmbassadorStudentWorkbook = {
  warmUp: string;
  reflectionPrompt: string;
  workbookPages: AmbassadorWorkbookPage[];
  aiLabPrompt: string;
  googleWorkspaceTask: string;
  employerConnection: string;
  exitTicket: string;
};

export type AmbassadorWeek = {
  week: number;
  phase: "DISCOVER™" | "DEVELOP™" | "EXPLORE™" | "CONNECT™";
  title: string;
  essentialQuestion: string;
  objective: string;
  outcomes: string[];
  preparation: string[];
  lessonFlow: AmbassadorLessonSegment[];
  activities: AmbassadorActivity[];
  discussionQuestions: string[];
  facilitatorNotes: string;
  differentiation: string;
  workplaceConnection: string;
  recommendedSpeaker: string;
  skillsEarned: string[];
  studentWorkbook: AmbassadorStudentWorkbook;
  assessmentRubric: string[];
  portfolioArtifact: string;
  badgeEarned: string;
  homework: string;
};

export const ambassadorPilot: AmbassadorWeek[] = [
  {
    week: 1,
    phase: "DISCOVER™",
    title: "Discover Who I Am",
    essentialQuestion: "Who am I today, and what do I want to gain from this experience?",
    objective:
      "Students begin their Future Ready™ Ambassador journey by understanding the program's purpose, building classroom community, and starting their personal portfolio.",
    outcomes: [
      "Understand the purpose and expectations of the Future Ready™ Ambassador Pilot.",
      "Create a personal profile and three program goals.",
      "Begin building classroom community and trust.",
      "Identify one workplace skill worth developing."
    ],
    preparation: [
      "Review the Week 1 curriculum and workbook pages.",
      "Prepare name cards, chart paper, markers, and portfolio access.",
      "Create a welcoming room setup that supports small-group discussion.",
      "Prepare a brief personal story about a skill you had to develop."
    ],
    lessonFlow: [
      { segment: "Opening", minutes: 8, instructions: "Students complete: My future matters because... Invite voluntary sharing." },
      { segment: "Program Introduction", minutes: 10, instructions: "Explain the Future Ready™ promise: Discover Purpose. Build Skills. Launch Your Future." },
      { segment: "Partner Interview", minutes: 15, instructions: "Students interview a partner about strengths, interests, goals, and one future possibility." },
      { segment: "Personal Profile", minutes: 12, instructions: "Students complete their Future Ready™ Personal Profile and three goals." },
      { segment: "Reflection", minutes: 5, instructions: "Students identify one commitment they will make to the program." }
    ],
    activities: [
      { name: "Future Ready™ Speed Connections", type: "Icebreaker", minutes: 8, materials: ["Timer", "Prompt cards"], instructions: "Students rotate every 60 seconds and answer one prompt: a strength, a goal, something they want to learn, or one future possibility." },
      { name: "My Future Ready™ Profile", type: "Individual Activity", minutes: 15, materials: ["Student workbook", "Pens"], instructions: "Students complete a personal profile with strengths, interests, values, goals, and one skill they want to strengthen." },
      { name: "Team Success Agreement", type: "Team Challenge", minutes: 12, materials: ["Chart paper", "Markers"], instructions: "Teams create five commitments for a safe, respectful, high-expectation learning environment." },
      { name: "Employer Scenario: Tell Me About Yourself", type: "Role Play", minutes: 10, materials: ["Scenario cards"], instructions: "Students practice a 30-second introduction with a student candidate, employer, and observer." }
    ],
    discussionQuestions: [
      "What makes a learning environment feel safe and useful?",
      "What skills matter beyond grades and technical knowledge?",
      "What do you want to be able to prove by the end of the program?"
    ],
    facilitatorNotes: "Do not force personal disclosure. Allow written, paired, or recorded responses. Reinforce that the program measures growth, not personality.",
    differentiation: "Provide sentence starters, visual examples, and the option to complete introductions in pairs instead of in front of the full group.",
    workplaceConnection: "Employers hire for attitude, communication, professionalism, and willingness to learn.",
    recommendedSpeaker: "Young professional, entrepreneur, coach, or community leader with a nonlinear career story.",
    skillsEarned: ["Self Awareness", "Communication", "Goal Setting", "Growth Mindset"],
    studentWorkbook: {
      warmUp: "My future matters because...",
      reflectionPrompt: "Describe who you are today and who you want to become.",
      workbookPages: [
        { title: "My Future Ready™ Profile", directions: "Complete your profile with strengths, interests, values, and one skill to strengthen." },
        { title: "Goal Setting", directions: "Write three goals for your Ambassador Pilot experience." }
      ],
      aiLabPrompt: "Help me identify my strengths and suggest careers that match.",
      googleWorkspaceTask: "Create your Future Ready™ portfolio folder in Google Drive and share editing access with your facilitator.",
      employerConnection: "Interview an adult about the most important workplace skill they use.",
      exitTicket: "One commitment I am making to this program is..."
    },
    assessmentRubric: ["Participates respectfully", "Completes personal profile", "Contributes to team agreement", "States one measurable goal"],
    portfolioArtifact: "Future Ready™ Personal Profile",
    badgeEarned: "Future Ready Explorer",
    homework: "Interview an adult about the most important workplace skill they use, and bring their answer to share next week."
  },
  {
    week: 2,
    phase: "DISCOVER™",
    title: "Strengths & Interests",
    essentialQuestion: "What do I naturally bring, what energizes me, and what matters most?",
    objective:
      "Students identify their personal strengths, interests, and values to build self-awareness as a foundation for future career decisions.",
    outcomes: [
      "Distinguish strengths, interests, and values.",
      "Identify examples of strengths in action.",
      "Connect values to decisions and work environments.",
      "Create a strengths and values profile."
    ],
    preparation: [
      "Prepare strengths and values cards.",
      "Review the student workbook pages.",
      "Create examples that show the difference between interests and strengths.",
      "Prepare peer-feedback sentence stems."
    ],
    lessonFlow: [
      { segment: "Strengths Warm-Up", minutes: 8, instructions: "Students name one task they enjoy and identify the strength used." },
      { segment: "Mini Lesson", minutes: 10, instructions: "Explain strengths, interests, and values using practical examples." },
      { segment: "Card Sort", minutes: 15, instructions: "Students sort strengths and values, then select their top choices." },
      { segment: "Peer Evidence", minutes: 12, instructions: "Partners provide one specific example of a strength they have observed." },
      { segment: "Reflection", minutes: 5, instructions: "Students identify one strength they want to use more intentionally." }
    ],
    activities: [
      { name: "Strengths in Motion", type: "Icebreaker", minutes: 7, materials: ["Strength cards"], instructions: "Students select a strength card and demonstrate how that strength could appear in a team, class, or workplace." },
      { name: "Strengths Evidence Hunt", type: "Skill Builder", minutes: 12, materials: ["Workbook"], instructions: "Students identify three strengths and record one real example that proves each one." },
      { name: "Build the Dream Team", type: "Team Challenge", minutes: 15, materials: ["Team role cards", "Scenario sheet"], instructions: "Teams assign roles based on strengths to solve a realistic project challenge." },
      { name: "Values Under Pressure", type: "Case Scenario", minutes: 12, materials: ["Values cards", "Case cards"], instructions: "Students discuss choices where two important values conflict and explain their decision." }
    ],
    discussionQuestions: [
      "Which strength was easiest to prove?",
      "Which value would be difficult to compromise?",
      "Where could your strengths create value for others?"
    ],
    facilitatorNotes: "Avoid treating any assessment as a fixed identity. Students may develop strengths over time and use them differently across settings.",
    differentiation: "Use visual cards, examples, and sentence starters. Permit students to select fewer items if the full sort feels overwhelming.",
    workplaceConnection: "Employers look for people who understand their own strengths and can explain how those strengths add value to a team.",
    recommendedSpeaker: "Recruiter, talent development professional, counselor, or manager.",
    skillsEarned: ["Self Awareness", "Strengths Identification", "Values Clarification"],
    studentWorkbook: {
      warmUp: "Name one task you enjoy so much you lose track of time.",
      reflectionPrompt: "How do your strengths influence your future?",
      workbookPages: [
        { title: "Strength Inventory", directions: "Identify three strengths and one piece of evidence for each." },
        { title: "Interests & Values Sort", directions: "Rank your top interests and top five values." }
      ],
      aiLabPrompt: "Based on my strengths, interests, and values, what career paths might be a good fit for me?",
      googleWorkspaceTask: "Add your Strength Inventory to your Future Ready™ portfolio slide deck.",
      employerConnection: "Ask a family member or mentor to name one strength they see in you.",
      exitTicket: "One strength I will use more intentionally this week is..."
    },
    assessmentRubric: ["Identifies strengths accurately", "Provides evidence", "Participates in team decision", "Explains a value-based choice"],
    portfolioArtifact: "Strength, Interest & Values Assessment",
    badgeEarned: "Strengths Discoverer",
    homework: "Ask a family member or mentor to name one strength they see in you, and record their answer along with your reaction."
  },
  {
    week: 3,
    phase: "DISCOVER™",
    title: "Values & Purpose",
    essentialQuestion: "What matters most to me, and what purpose do I want my future to serve?",
    objective:
      "Students connect their core values to a sense of purpose and begin imagining the future that purpose could build.",
    outcomes: [
      "Imagine multiple future possibilities.",
      "Connect values and strengths to future goals.",
      "Create a personal vision statement grounded in purpose.",
      "Identify one immediate action toward the vision."
    ],
    preparation: [
      "Prepare magazines, images, or digital design access.",
      "Create a sample vision map.",
      "Gather examples of multiple education and career pathways.",
      "Prepare future-self reflection prompts."
    ],
    lessonFlow: [
      { segment: "Future Headlines", minutes: 8, instructions: "Students write a positive headline about themselves five years from now." },
      { segment: "Vision and Goals", minutes: 10, instructions: "Explain the difference between a broad vision, a goal, and a next action." },
      { segment: "Possibility Mapping", minutes: 12, instructions: "Students generate several possible futures without choosing only one." },
      { segment: "Vision Build", minutes: 15, instructions: "Students create a vision board, map, or one-page future statement grounded in their values." },
      { segment: "Commitment", minutes: 5, instructions: "Students identify one action they can complete within seven days." }
    ],
    activities: [
      { name: "Future Headline", type: "Icebreaker", minutes: 6, materials: ["Index cards"], instructions: "Students write a positive headline about themselves five years from now." },
      { name: "Possibility Map", type: "Skill Builder", minutes: 12, materials: ["Workbook", "Markers"], instructions: "Students generate at least three possible futures instead of locking into one path." },
      { name: "Vision Board Sprint", type: "Creative Challenge", minutes: 18, materials: ["Magazines or digital design tools", "Scissors", "Glue"], instructions: "Students create a vision board connecting values, strengths, work, lifestyle, learning, and impact." },
      { name: "Future Advisor Panel", type: "Role Play", minutes: 10, materials: ["Advisor role cards"], instructions: "Peers act as career, education, financial, and wellness advisors and ask questions that strengthen the student's plan." }
    ],
    discussionQuestions: [
      "What do you want your future to feel like, not just look like?",
      "How can your strengths and values guide your choices?",
      "What is one action that makes the future less distant?"
    ],
    facilitatorNotes: "Present the future as flexible. Avoid pressuring students to select one permanent career. Emphasize exploration, agency, and revision.",
    differentiation: "Accept written, visual, audio, or presentation-based vision artifacts.",
    workplaceConnection: "People who set clear goals rooted in their values are more likely to follow through and find work that feels meaningful.",
    recommendedSpeaker: "Career coach, wealth-management professional, financial planner, entrepreneur, or professional who intentionally designed a career transition.",
    skillsEarned: ["Goal Setting", "Vision Casting", "Values Clarification"],
    studentWorkbook: {
      warmUp: "Write a headline about yourself, five years from now.",
      reflectionPrompt: "What do you want your future to feel like, not just look like?",
      workbookPages: [
        { title: "Vision Map", directions: "Create your values-driven vision for the next 1, 5, and 10 years." }
      ],
      aiLabPrompt: "Help me turn my future vision into one SMART goal with clear action steps.",
      googleWorkspaceTask: "Build your Vision Board as a Google Slides page and add it to your portfolio.",
      employerConnection: "Share your Vision Board with a parent, guardian, or mentor and ask for one piece of encouragement or advice.",
      exitTicket: "The next action I will take within seven days is..."
    },
    assessmentRubric: ["Connects vision to strengths and values", "Considers multiple pathways", "Creates a complete artifact", "Identifies an immediate next action"],
    portfolioArtifact: "Values & Purpose Vision Board",
    badgeEarned: "Purpose-Driven Visionary",
    homework: "Share your Vision Board with a parent, guardian, or mentor and ask them to add one piece of encouragement or advice."
  },
  {
    week: 4,
    phase: "DISCOVER™",
    title: "Building Confidence",
    essentialQuestion: "How can I act with confidence while continuing to learn and grow?",
    objective:
      "Students distinguish confidence from arrogance, recognize evidence of their own capability, and build a personal confidence action plan.",
    outcomes: [
      "Distinguish confidence from arrogance.",
      "Recognize evidence of personal capability.",
      "Practice constructive self-talk.",
      "Create a confidence-building action plan."
    ],
    preparation: [
      "Prepare accomplishment prompts and confidence scenarios.",
      "Review growth-mindset language.",
      "Create examples of confidence that do not depend on being loud.",
      "Prepare a private reflection option."
    ],
    lessonFlow: [
      { segment: "Confidence Continuum", minutes: 8, instructions: "Students compare uncertainty, confidence, and arrogance through examples." },
      { segment: "Evidence Before Feeling", minutes: 10, instructions: "Teach students to build confidence through preparation, practice, and evidence." },
      { segment: "Accomplishment Inventory", minutes: 15, instructions: "Students identify five accomplishments and the skills behind each." },
      { segment: "Courageous Practice", minutes: 12, instructions: "Students practice an introduction, question, request, or presentation opening." },
      { segment: "Reflection", minutes: 5, instructions: "Students choose one confidence action for the coming week." }
    ],
    activities: [
      { name: "Confidence Continuum", type: "Icebreaker", minutes: 7, materials: ["Scenario cards"], instructions: "Students sort examples into uncertainty, confidence, and arrogance, then defend their choices." },
      { name: "Accomplishment Evidence", type: "Skill Builder", minutes: 12, materials: ["Workbook"], instructions: "Students identify five accomplishments and the preparation, persistence, or skill behind each." },
      { name: "Courage Repetition Lab", type: "Practice Challenge", minutes: 15, materials: ["Prompt cards", "Timer"], instructions: "Students repeat a short introduction, question, or presentation opening three times using feedback." },
      { name: "Case Scenario: Qualified but Quiet", type: "Case Study", minutes: 10, materials: ["Case sheet"], instructions: "Students coach a capable candidate who struggles to communicate confidence." }
    ],
    discussionQuestions: [
      "What is the difference between confidence and arrogance?",
      "How does preparation change confidence?",
      "Where do you need courage more than certainty?"
    ],
    facilitatorNotes: "Praise preparation, persistence, and growth rather than charisma. Avoid ranking students publicly.",
    differentiation: "Offer recorded practice, partner rehearsal, sentence stems, and graduated participation choices.",
    workplaceConnection: "The future of work requires people who can adapt, learn from mistakes, and keep growing — a growth mindset is a lifelong career skill.",
    recommendedSpeaker: "Public speaker, athlete, entrepreneur, performing artist, or leader who can discuss preparation and confidence.",
    skillsEarned: ["Growth Mindset", "Confidence", "Resilience"],
    studentWorkbook: {
      warmUp: "Sort these three moments into uncertainty, confidence, and arrogance.",
      reflectionPrompt: "Where do you need courage more than certainty?",
      workbookPages: [
        { title: "Confidence Builder", directions: "List five accomplishments and the skill or effort behind each." }
      ],
      aiLabPrompt: "Help me reframe a challenge I'm facing right now using a growth mindset.",
      googleWorkspaceTask: "Record a 30-second video of your Courageous Practice introduction and save it to your portfolio.",
      employerConnection: "Notice one moment this week when you used a growth mindset instead of a fixed mindset, and describe what happened.",
      exitTicket: "One confidence-building action I will take is..."
    },
    assessmentRubric: ["Identifies evidence of capability", "Uses feedback", "Completes repeated practice", "Sets a specific confidence goal"],
    portfolioArtifact: "Confidence Plan",
    badgeEarned: "Confidence Builder",
    homework: "Notice one moment this week when you used a growth mindset instead of a fixed mindset, and write about what happened."
  },
  {
    week: 5,
    phase: "DEVELOP™",
    title: "Professional Communication",
    essentialQuestion: "How do professionals communicate with clarity and respect?",
    objective: "Students communicate clearly and professionally in school, work, and life.",
    outcomes: [
      "Practice active listening.",
      "Write professional emails.",
      "Deliver a confident introduction.",
      "Adapt communication to different audiences."
    ],
    preparation: ["Prepare sample emails.", "Print communication scenarios.", "Review workbook pages."],
    lessonFlow: [
      { segment: "Opening", minutes: 5, instructions: "Students introduce themselves to a new partner." },
      { segment: "Mini Lesson", minutes: 10, instructions: "Teach verbal, written, and nonverbal communication." },
      { segment: "Practice", minutes: 20, instructions: "Role-play workplace conversations and email writing." },
      { segment: "Reflection", minutes: 10, instructions: "Students revise their communication based on peer feedback." }
    ],
    activities: [
      { name: "Email Makeover", type: "Skill Builder", minutes: 15, materials: ["Sample emails"], instructions: "Rewrite an informal message into a professional email." },
      { name: "Two-Minute Introductions", type: "Role Play", minutes: 20, materials: ["Prompt cards"], instructions: "Practice introducing yourself to a supervisor, client, and teammate." }
    ],
    discussionQuestions: ["What makes communication professional?", "How does listening build trust?", "How do words affect culture?"],
    facilitatorNotes: "Model professional communication throughout the lesson.",
    differentiation: "Allow verbal, written, or recorded responses.",
    workplaceConnection: "Communication is consistently ranked as a top employability skill.",
    recommendedSpeaker: "Communications professional, HR leader, broadcaster, or sales executive.",
    skillsEarned: ["Communication", "Active Listening", "Professionalism"],
    studentWorkbook: {
      warmUp: "Introduce yourself to a new partner in 15 seconds.",
      reflectionPrompt: "Which communication skill needs the most practice?",
      workbookPages: [
        { title: "Email Makeover", directions: "Rewrite an informal message into a professional email." },
        { title: "Communication Self-Assessment", directions: "Rate your listening, tone, and clarity, and set one goal." }
      ],
      aiLabPrompt: "Review my professional introduction and suggest ways to sound more clear and confident.",
      googleWorkspaceTask: "Draft your practice email in Google Docs and share it with your facilitator for feedback.",
      employerConnection: "Send (or draft) a polite, professional email or message to a real mentor, coach, or teacher thanking them for their support.",
      exitTicket: "One communication habit I will improve this week is..."
    },
    assessmentRubric: ["Uses professional language", "Listens actively", "Communicates clearly", "Responds respectfully"],
    portfolioArtifact: "Professional Introduction Video",
    badgeEarned: "Professional Communicator",
    homework: "Practice a 30-second introduction with a family member and ask for one piece of feedback."
  },
  {
    week: 6,
    phase: "DEVELOP™",
    title: "Teamwork",
    essentialQuestion: "How do successful teams work together?",
    objective: "Students develop collaboration and conflict-resolution skills.",
    outcomes: [
      "Identify team roles.",
      "Practice collaboration.",
      "Resolve conflict respectfully.",
      "Reflect on team contribution."
    ],
    preparation: ["Create team challenge materials.", "Assign mixed teams."],
    lessonFlow: [
      { segment: "Challenge", minutes: 30, instructions: "Complete a collaborative problem-solving activity." },
      { segment: "Debrief", minutes: 20, instructions: "Reflect on team behaviors and outcomes." }
    ],
    activities: [
      { name: "Marshmallow Tower", type: "Team Challenge", minutes: 25, materials: ["Tape", "String", "Marshmallows", "Spaghetti"], instructions: "Build the tallest free-standing tower." }
    ],
    discussionQuestions: ["What made your team effective?", "How was conflict handled?", "How did everyone contribute?"],
    facilitatorNotes: "Observe behaviors rather than assigning grades during activities.",
    differentiation: "Assign flexible team roles.",
    workplaceConnection: "Most work is completed by teams.",
    recommendedSpeaker: "Project manager or athletic coach.",
    skillsEarned: ["Collaboration", "Conflict Resolution", "Trust"],
    studentWorkbook: {
      warmUp: "Name one role you naturally take on a team (leader, organizer, encourager, doer).",
      reflectionPrompt: "How did your team handle disagreement?",
      workbookPages: [
        { title: "Team Project Reflection", directions: "Describe your role, one conflict, and how it was resolved." }
      ],
      aiLabPrompt: "Help me think through how to resolve a disagreement with a teammate respectfully.",
      googleWorkspaceTask: "Add a photo or summary of your team challenge to your portfolio slide deck.",
      employerConnection: "Notice one example of teamwork at home, in a club, or in sports this week and describe what made it effective.",
      exitTicket: "One way I contributed today..."
    },
    assessmentRubric: ["Participates", "Collaborates", "Supports teammates", "Reflects honestly"],
    portfolioArtifact: "Team Project Reflection",
    badgeEarned: "Collaborator",
    homework: "Notice one example of teamwork at home, in a club, or in sports this week and describe what made it effective."
  },
  {
    week: 7,
    phase: "DEVELOP™",
    title: "Leadership",
    essentialQuestion: "What does leadership look like before you have a title?",
    objective: "Students learn to lead themselves before leading others.",
    outcomes: ["Define leadership.", "Demonstrate initiative.", "Build accountability."],
    preparation: ["Prepare leadership case studies."],
    lessonFlow: [
      { segment: "Discussion", minutes: 15, instructions: "Compare leadership and management." },
      { segment: "Case Study", minutes: 20, instructions: "Solve leadership scenarios." },
      { segment: "Reflection", minutes: 15, instructions: "Write a personal leadership philosophy." }
    ],
    activities: [
      { name: "Lead Without a Title", type: "Scenario", minutes: 25, materials: ["Leadership cards"], instructions: "Solve team challenges while rotating leadership." }
    ],
    discussionQuestions: ["Who influenced you?", "How do leaders build trust?", "What is leadership?"],
    facilitatorNotes: "Focus on servant leadership and influence.",
    differentiation: "Offer written or discussion responses.",
    workplaceConnection: "Leadership is influence, not position.",
    recommendedSpeaker: "Business owner or nonprofit executive.",
    skillsEarned: ["Leadership", "Initiative", "Accountability"],
    studentWorkbook: {
      warmUp: "Name someone who leads without a formal title, and describe how they do it.",
      reflectionPrompt: "What leadership behavior came naturally to you today?",
      workbookPages: [
        { title: "Leadership Statement", directions: "Write a personal leadership philosophy in three to five sentences." }
      ],
      aiLabPrompt: "Help me write a leadership statement that reflects my values and how I want to influence others.",
      googleWorkspaceTask: "Type your Leadership Statement in Google Docs and add it to your portfolio.",
      employerConnection: "Identify one person you can support or serve this week without being asked, and reflect on how it felt.",
      exitTicket: "One leadership action I'll practice..."
    },
    assessmentRubric: ["Shows initiative", "Builds trust", "Includes others", "Reflects on growth"],
    portfolioArtifact: "Leadership Statement",
    badgeEarned: "Emerging Leader",
    homework: "Identify one person you can support or serve this week without being asked, and reflect on how it felt."
  },
  {
    week: 8,
    phase: "DEVELOP™",
    title: "Problem Solving",
    essentialQuestion: "How do professionals solve complex problems?",
    objective: "Students solve challenges using structured thinking.",
    outcomes: ["Use structured thinking.", "Evaluate solutions.", "Make informed decisions."],
    preparation: ["Prepare workplace case studies."],
    lessonFlow: [
      { segment: "Scenario", minutes: 20, instructions: "Teams analyze a workplace challenge." },
      { segment: "Presentation", minutes: 20, instructions: "Present recommended solutions." },
      { segment: "Reflection", minutes: 10, instructions: "Discuss lessons learned." }
    ],
    activities: [
      { name: "Workplace Case Lab", type: "Case Study", minutes: 30, materials: ["Case packets"], instructions: "Analyze a workplace problem and recommend a solution." }
    ],
    discussionQuestions: ["What is the real problem?", "Which solution creates the most value?", "What evidence supports your solution?"],
    facilitatorNotes: "Reward reasoning, not just answers.",
    differentiation: "Provide guided templates.",
    workplaceConnection: "Employers value critical thinkers.",
    recommendedSpeaker: "Engineer or operations leader.",
    skillsEarned: ["Critical Thinking", "Decision Making", "Analysis"],
    studentWorkbook: {
      warmUp: "Describe a small problem you solved this week and how you solved it.",
      reflectionPrompt: "How did evidence improve your decision?",
      workbookPages: [
        { title: "Case Study Solution", directions: "Define the problem, list your evidence, and recommend a solution." }
      ],
      aiLabPrompt: "Walk me through how to break down a real problem I'm facing using define, gather, weigh, and decide.",
      googleWorkspaceTask: "Type your Case Study Solution in Google Docs and add it to your portfolio.",
      employerConnection: "Apply the define-gather-weigh-decide framework to a real decision you're facing and write down each step.",
      exitTicket: "The first step in solving a problem is..."
    },
    assessmentRubric: ["Defines problem", "Evaluates options", "Explains reasoning", "Works as a team"],
    portfolioArtifact: "Case Study Solution",
    badgeEarned: "Problem Solver",
    homework: "Apply the define-gather-weigh-decide framework to a real decision you're facing and write down each step."
  },
  {
    week: 9,
    phase: "EXPLORE™",
    title: "Career Exploration",
    essentialQuestion: "How do my strengths align with career possibilities?",
    objective: "Students discover careers aligned with their interests, values, and strengths.",
    outcomes: ["Interpret career assessments.", "Compare career clusters.", "Connect strengths with occupations."],
    preparation: ["Career assessment results.", "Career cluster resources."],
    lessonFlow: [
      { segment: "Assessment Review", minutes: 15, instructions: "Students analyze results." },
      { segment: "Career Exploration", minutes: 20, instructions: "Research top career matches." },
      { segment: "Reflection", minutes: 15, instructions: "Select three careers for deeper exploration." }
    ],
    activities: [
      { name: "Career Cluster Quest", type: "Exploration", minutes: 30, materials: ["Career profiles"], instructions: "Research three careers and compare education, salary, demand, and daily work." }
    ],
    discussionQuestions: ["What surprised you?", "What careers fit your strengths?", "What motivates you?"],
    facilitatorNotes: "Emphasize exploration, not fixed decisions.",
    differentiation: "Offer printed and digital resources.",
    workplaceConnection: "Self-awareness leads to better career decisions.",
    recommendedSpeaker: "Career counselor or recruiter.",
    skillsEarned: ["Career Awareness", "Reflection", "Planning"],
    studentWorkbook: {
      warmUp: "List three careers you're curious about, even if you're not sure why.",
      reflectionPrompt: "Which career surprised you most?",
      workbookPages: [
        { title: "Career Match Profile", directions: "List your top five careers and why each fits your strengths." }
      ],
      aiLabPrompt: "Based on my strengths, values, and what motivates me, suggest a few careers I should research further.",
      googleWorkspaceTask: "Build your Career Cluster Quest research into a Google Slides page for your portfolio.",
      employerConnection: "Look up one career you're curious about and write down the typical education path and starting skills required.",
      exitTicket: "One career I will continue researching..."
    },
    assessmentRubric: ["Research quality", "Career comparison", "Reflection", "Participation"],
    portfolioArtifact: "Career Match Profile",
    badgeEarned: "Career Explorer",
    homework: "Look up one career you're curious about and write down the typical education path and starting skills required."
  },
  {
    week: 10,
    phase: "EXPLORE™",
    title: "Industries",
    essentialQuestion: "Which industries are growing, and why?",
    objective: "Students compare industries and understand workforce needs.",
    outcomes: ["Compare industries.", "Identify transferable skills.", "Understand local opportunities."],
    preparation: ["Industry profiles.", "Regional workforce data."],
    lessonFlow: [
      { segment: "Industry Overview", minutes: 15, instructions: "Introduce growth sectors." },
      { segment: "Team Research", minutes: 20, instructions: "Compare two industries." },
      { segment: "Share Out", minutes: 15, instructions: "Present findings." }
    ],
    activities: [
      { name: "Industry Investigation", type: "Research Challenge", minutes: 30, materials: ["Industry fact sheets"], instructions: "Teams investigate one industry and present opportunities, challenges, and trends." }
    ],
    discussionQuestions: ["Which industries interest you?", "What skills transfer across industries?", "Which industries fit your goals?"],
    facilitatorNotes: "Include local employers where possible.",
    differentiation: "Assign industries by interest.",
    workplaceConnection: "Career paths exist in every sector.",
    recommendedSpeaker: "Local employer or chamber representative.",
    skillsEarned: ["Research", "Industry Knowledge", "Analysis"],
    studentWorkbook: {
      warmUp: "Name one industry represented in your community that you know the least about.",
      reflectionPrompt: "Which industry aligns with your goals?",
      workbookPages: [
        { title: "Industry Comparison", directions: "Compare two industries by growth, salary, education, and opportunities." }
      ],
      aiLabPrompt: "Help me compare two industries I'm interested in, including pay, education needed, and day-to-day work.",
      googleWorkspaceTask: "Add your Industry Comparison chart to your portfolio in Google Sheets or Slides.",
      employerConnection: "Ask a family member or family friend what industry they work in and what a typical day looks like for them.",
      exitTicket: "One industry I want to learn more about..."
    },
    assessmentRubric: ["Research", "Presentation", "Teamwork", "Reflection"],
    portfolioArtifact: "Industry Comparison",
    badgeEarned: "Industry Investigator",
    homework: "Ask a family member or family friend what industry they work in and what a typical day looks like for them."
  },
  {
    week: 11,
    phase: "EXPLORE™",
    title: "Postsecondary Options",
    essentialQuestion: "What pathway best supports my goals?",
    objective: "Students compare college, apprenticeships, military, certifications, and direct employment without bias.",
    outcomes: ["Compare education options.", "Evaluate cost and outcomes.", "Develop a pathway plan."],
    preparation: ["Gather college, apprenticeship, military, and certification resources."],
    lessonFlow: [
      { segment: "Overview", minutes: 15, instructions: "Review pathways." },
      { segment: "Comparison", minutes: 20, instructions: "Evaluate benefits and tradeoffs." },
      { segment: "Planning", minutes: 15, instructions: "Complete pathway plan." }
    ],
    activities: [
      { name: "Pathway Comparison", type: "Decision Lab", minutes: 30, materials: ["College, apprenticeship, military, certification resources"], instructions: "Compare multiple education pathways and build a personalized plan." }
    ],
    discussionQuestions: ["Which pathway fits you?", "How will you continue learning?", "How do costs and outcomes compare?"],
    facilitatorNotes: "Present every pathway with equal respect.",
    differentiation: "Provide comparison charts.",
    workplaceConnection: "There is more than one path to success — what matters most is a clear plan.",
    recommendedSpeaker: "Admissions, apprenticeship, military, or workforce representative.",
    skillsEarned: ["Planning", "Decision Making", "Career Readiness"],
    studentWorkbook: {
      warmUp: "List every pathway you know of after high school (college, trade school, apprenticeship, military, direct employment).",
      reflectionPrompt: "Which pathway best supports your future?",
      workbookPages: [
        { title: "Pathway Planner", directions: "Compare college, apprenticeship, military, certification, and direct employment." }
      ],
      aiLabPrompt: "Help me compare two postsecondary pathways, including cost, time, and typical outcomes.",
      googleWorkspaceTask: "Complete your Pathway Planner in Google Sheets and add it to your portfolio.",
      employerConnection: "Ask an adult which postsecondary pathway they took and whether they'd choose the same path again.",
      exitTicket: "My next educational step is..."
    },
    assessmentRubric: ["Research", "Comparison", "Planning", "Reflection"],
    portfolioArtifact: "Education Pathway Plan",
    badgeEarned: "Pathway Planner",
    homework: "Ask an adult which postsecondary pathway they took and whether they'd choose the same path again."
  },
  {
    week: 12,
    phase: "EXPLORE™",
    title: "Workplace Visits",
    essentialQuestion: "What can I learn about a career by seeing it in action?",
    objective:
      "Students prepare for, participate in, and reflect on a workplace visit, job shadow, or virtual site tour to see a real career environment firsthand.",
    outcomes: [
      "Identify what to observe during a workplace visit.",
      "Prepare thoughtful, professional questions for the visit.",
      "Practice professional behavior as a guest in a workplace.",
      "Reflect on how the visit confirmed or changed a career interest."
    ],
    preparation: [
      "Confirm a workplace visit, job shadow, or virtual tour with a partner employer (in person or by video).",
      "Review basic visitor etiquette and safety expectations with students beforehand.",
      "Prepare an observation guide covering people, environment, tools, and daily tasks.",
      "Arrange transportation, permission forms, or video-call logistics as needed."
    ],
    lessonFlow: [
      { segment: "Before the Visit", minutes: 15, instructions: "Review visitor etiquette, dress, punctuality, and the observation guide." },
      { segment: "Question Prep", minutes: 15, instructions: "Students draft three to five questions about the role, the industry, and a typical day." },
      { segment: "The Visit or Tour", minutes: 30, instructions: "Students observe and participate in a workplace visit, job shadow, or virtual site tour, taking notes on the observation guide." },
      { segment: "Debrief", minutes: 15, instructions: "Students share one observation and one surprise from the visit." },
      { segment: "Reflection", minutes: 5, instructions: "Students write a thank-you note to the host." }
    ],
    activities: [
      { name: "Visitor Etiquette Briefing", type: "Mini Lesson", minutes: 10, materials: ["Etiquette checklist"], instructions: "Review professional guest behavior: punctuality, dress, phone use, questions, and gratitude." },
      { name: "Observation Guide Prep", type: "Skill Builder", minutes: 15, materials: ["Observation guide", "Workbook"], instructions: "Students prepare what to look for: people, environment, tools, tasks, and culture." },
      { name: "Workplace Visit / Job Shadow", type: "Field Experience", minutes: 45, materials: ["Observation guide", "Permission forms if off-site"], instructions: "Students visit a workplace in person or by video call, observe daily work, and ask prepared questions." },
      { name: "Visit Debrief Circle", type: "Discussion", minutes: 15, materials: ["Workbook"], instructions: "Students share one thing that confirmed their interest and one thing that surprised them." }
    ],
    discussionQuestions: [
      "What did you notice about the workplace culture and environment?",
      "What part of the job looked different from what you expected?",
      "Did this visit make you more or less interested in this field, and why?"
    ],
    facilitatorNotes: "Confirm host expectations and student behavior guidelines in advance. If an in-person visit or job shadow is not possible, substitute a live or recorded virtual tour with the same observation guide and debrief.",
    differentiation: "Offer virtual visit options for students with transportation or scheduling barriers. Provide a simplified observation guide with picture or checklist prompts.",
    workplaceConnection: "Seeing a workplace firsthand builds realistic expectations and helps students confirm or redirect their career interest before committing time to a pathway.",
    recommendedSpeaker: "Workplace host, HR coordinator, or hiring manager at the visit site.",
    skillsEarned: ["Professionalism", "Observation", "Career Awareness"],
    studentWorkbook: {
      warmUp: "What do you expect to see, hear, and do during this workplace visit?",
      reflectionPrompt: "Did this visit make you more or less interested in this career, and why?",
      workbookPages: [
        { title: "Workplace Visit Observation Guide", directions: "Record what you notice about people, environment, tools, tasks, and culture." },
        { title: "Workplace Visit Reflection", directions: "Describe one thing that confirmed your interest and one thing that surprised you." }
      ],
      aiLabPrompt: "Help me prepare five thoughtful questions to ask during a workplace visit or job shadow.",
      googleWorkspaceTask: "Upload a photo, note, or short video from your visit to your Future Ready™ portfolio in Google Drive.",
      employerConnection: "Send a thank-you note or email to your workplace visit host within 48 hours.",
      exitTicket: "One thing I learned from seeing this workplace in person is..."
    },
    assessmentRubric: ["Prepares thoughtful questions", "Demonstrates professional visitor behavior", "Completes the observation guide", "Reflects on the experience"],
    portfolioArtifact: "Workplace Visit Observation Guide & Reflection",
    badgeEarned: "Workplace Explorer",
    homework: "Send a thank-you note or email to your workplace visit host within 48 hours."
  },
  {
    week: 13,
    phase: "CONNECT™",
    title: "Networking",
    essentialQuestion: "How do authentic professional relationships create opportunities?",
    objective: "Students build authentic professional relationships and practice networking skills.",
    outcomes: [
      "Build confidence introducing yourself.",
      "Practice meaningful networking conversations.",
      "Create a professional relationship map.",
      "Use professional follow-up."
    ],
    preparation: [
      "Prepare name tags and networking scenario cards.",
      "Print or display conversation starters.",
      "Review the Week 13 student workbook pages.",
      "Arrange the room for short networking rotations."
    ],
    lessonFlow: [
      { segment: "Opening Connection", minutes: 8, instructions: "Students introduce themselves to a partner using their name, one interest, one strength, and one future goal." },
      { segment: "Mini Lesson", minutes: 10, instructions: "Teach that networking is relationship building, not asking strangers for favors. Model a clear professional introduction." },
      { segment: "Networking Rotations", minutes: 20, instructions: "Students rotate through short conversations using employer, mentor, and community scenarios." },
      { segment: "Follow-Up Practice", minutes: 7, instructions: "Students draft a short thank-you or follow-up message." },
      { segment: "Reflection", minutes: 5, instructions: "Students identify one relationship they will strengthen this month." }
    ],
    activities: [
      { name: "Networking Mixer", type: "Simulation", minutes: 25, materials: ["Name tags", "Conversation cards"], instructions: "Students rotate through professional networking conversations, practicing introductions, listening, and follow-up." },
      { name: "Elevator Pitch Lab", type: "Skill Builder", minutes: 15, materials: ["Pitch template"], instructions: "Create and deliver a 60-second professional introduction." }
    ],
    discussionQuestions: ["What makes a professional introduction memorable?", "Why is curiosity more effective than trying to impress someone?", "What does a strong professional follow-up include?"],
    facilitatorNotes: "Encourage natural conversation rather than memorized scripts. Reinforce listening, curiosity, respectful questions, and follow-through.",
    differentiation: "Provide sentence starters, written introductions, partner rehearsal, and observer roles before full networking rotations.",
    workplaceConnection: "Opportunities often come through relationships.",
    recommendedSpeaker: "Chamber leader, recruiter, entrepreneur, business-development professional, or community connector.",
    skillsEarned: ["Networking", "Communication", "Confidence"],
    studentWorkbook: {
      warmUp: "Introduce yourself to a partner using your name, one interest, one strength, and one future goal.",
      reflectionPrompt: "Which networking strategy felt most natural?",
      workbookPages: [
        { title: "Relationship Map", directions: "List people who could support your future goals and one way to stay connected with each." }
      ],
      aiLabPrompt: "Help me prepare a 60-second professional introduction I can use when networking.",
      googleWorkspaceTask: "Record your Elevator Pitch and save it to your Future Ready™ portfolio.",
      employerConnection: "Send a follow-up or thank-you message to one person in your relationship map this week.",
      exitTicket: "One relationship I will intentionally build is..."
    },
    assessmentRubric: ["Professional introduction", "Active listening", "Confidence", "Follow-up plan"],
    portfolioArtifact: "Elevator Pitch Video & Relationship Map",
    badgeEarned: "Network Builder",
    homework: "Send a follow-up or thank-you message to one person in your relationship map this week."
  },
  {
    week: 14,
    phase: "CONNECT™",
    title: "Professional Presence",
    essentialQuestion: "What do people experience when I enter a room, conversation, or digital space?",
    objective: "Students develop a professional image online and in person.",
    outcomes: [
      "Recognize the elements of professional presence.",
      "Evaluate personal and digital first impressions.",
      "Practice professional etiquette.",
      "Create a professional presence improvement plan."
    ],
    preparation: [
      "Prepare examples of professional profiles.",
      "Review digital-footprint safety guidance.",
      "Print the professional presence checklist.",
      "Prepare workplace first-impression scenarios."
    ],
    lessonFlow: [
      { segment: "First-Impression Warm-Up", minutes: 8, instructions: "Students identify what can be communicated through posture, preparation, tone, appearance, and follow-through." },
      { segment: "Mini Lesson", minutes: 10, instructions: "Explain that professional presence includes reliability, communication, confidence, respect, preparation, and digital behavior." },
      { segment: "Presence Audit", minutes: 17, instructions: "Students review their in-person habits and digital footprint using the workbook checklist." },
      { segment: "Practice Lab", minutes: 10, instructions: "Students practice entering a room, greeting someone, introducing themselves, and ending a conversation professionally." },
      { segment: "Reflection", minutes: 5, instructions: "Students choose one professional-presence behavior to improve." }
    ],
    activities: [
      { name: "First Impressions Challenge", type: "Workshop", minutes: 30, materials: ["Professional checklist"], instructions: "Students audit appearance, body language, communication, and digital presence." }
    ],
    discussionQuestions: ["What communicates professionalism before someone sees your résumé?", "How can digital content affect future opportunities?", "What is the difference between confidence and performance?"],
    facilitatorNotes: "Avoid judging students based on income, clothing brands, culture, disability, or personality. Focus on preparation, respect, cleanliness, context, communication, and reliability.",
    differentiation: "Allow students to complete digital audits privately. Provide verbal, written, or recorded practice options.",
    workplaceConnection: "Employers review professionalism before hiring.",
    recommendedSpeaker: "Marketing professional, recruiter, image consultant, communications leader, or human-resources professional.",
    skillsEarned: ["Professionalism", "Personal Branding", "Digital Citizenship"],
    studentWorkbook: {
      warmUp: "What does your digital footprint say about you right now?",
      reflectionPrompt: "What habit would most improve your professional presence?",
      workbookPages: [
        { title: "Professional Presence Audit", directions: "Review your in-person habits and digital footprint using the checklist, then set one improvement goal." }
      ],
      aiLabPrompt: "Help me write a professional bio or profile description I could use for a portfolio or social platform.",
      googleWorkspaceTask: "Create a professional profile page or slide for your Future Ready™ portfolio.",
      employerConnection: "Ask a trusted adult to review your professional profile or introduction and give one piece of feedback.",
      exitTicket: "One improvement I'll make this week..."
    },
    assessmentRubric: ["Participation", "Professionalism", "Reflection", "Action plan"],
    portfolioArtifact: "Professional Profile",
    badgeEarned: "Professional Presence",
    homework: "Ask a trusted adult to review your professional profile or introduction and give one piece of feedback."
  },
  {
    week: 15,
    phase: "CONNECT™",
    title: "Mentorship",
    essentialQuestion: "How can mentors, coaches, sponsors, and peers accelerate my growth?",
    objective: "Students understand the value of mentors and coaching and identify potential mentors.",
    outcomes: [
      "Understand different types of developmental relationships.",
      "Identify possible mentors.",
      "Practice requesting guidance professionally.",
      "Prepare for a productive mentor conversation."
    ],
    preparation: [
      "Prepare mentor-role examples.",
      "Print mentor outreach templates.",
      "Review the Week 15 workbook pages.",
      "Create sample questions for a mentor meeting."
    ],
    lessonFlow: [
      { segment: "Support-Team Map", minutes: 10, instructions: "Students identify people who provide encouragement, expertise, feedback, opportunity, or accountability." },
      { segment: "Mini Lesson", minutes: 10, instructions: "Explain the differences among mentors, coaches, sponsors, peers, teachers, and supervisors." },
      { segment: "Outreach Workshop", minutes: 15, instructions: "Students draft a respectful request for a short conversation or ongoing guidance." },
      { segment: "Mentor Meeting Practice", minutes: 10, instructions: "Students practice opening a mentor conversation, asking focused questions, taking notes, and closing with gratitude." },
      { segment: "Reflection", minutes: 5, instructions: "Students identify the type of guidance they need most." }
    ],
    activities: [
      { name: "Mentor Mapping", type: "Planning", minutes: 30, materials: ["Workbook"], instructions: "Identify current and future mentors and draft an outreach message." }
    ],
    discussionQuestions: ["What makes someone a strong mentor for you?", "How should a student prepare before asking for guidance?", "What responsibilities does a mentee have?"],
    facilitatorNotes: "Do not pressure students to contact strangers. Help them recognize trusted adults already present in school, family, sports, work, faith, and community settings.",
    differentiation: "Provide outreach templates, practice scripts, and the option to create a mentor plan without sending a message immediately.",
    workplaceConnection: "Successful professionals continue learning from mentors.",
    recommendedSpeaker: "Executive coach, community mentor, alumni leader, counselor, or professional with a strong mentoring story.",
    skillsEarned: ["Relationship Building", "Coachability", "Initiative"],
    studentWorkbook: {
      warmUp: "Name one adult who has given you good advice, and what made it helpful.",
      reflectionPrompt: "Who could help accelerate your growth?",
      workbookPages: [
        { title: "Mentor Plan", directions: "Identify three potential mentors, why you chose them, and draft an outreach message to one." }
      ],
      aiLabPrompt: "Help me draft a respectful message asking someone to be a mentor or have a short guidance conversation.",
      googleWorkspaceTask: "Save your Mentor Plan and outreach draft to your Future Ready™ portfolio in Google Docs.",
      employerConnection: "Send your outreach message to one potential mentor, or schedule a first mentor conversation.",
      exitTicket: "One mentor I'll connect with..."
    },
    assessmentRubric: ["Mentor map", "Outreach draft", "Reflection", "Participation"],
    portfolioArtifact: "Mentor Plan",
    badgeEarned: "Mentorship Champion",
    homework: "Send your outreach message to one potential mentor, or schedule a first mentor conversation."
  },
  {
    week: 16,
    phase: "CONNECT™",
    title: "Internship Readiness",
    essentialQuestion: "Am I ready to start my internship next semester, and what will I do to make the most of it?",
    objective:
      "Students complete a full internship-readiness review, finalize their portfolio and résumé, confirm placement logistics, and set personal goals for their internship the following semester.",
    outcomes: [
      "Complete the Future Ready™ Internship Readiness Checklist.",
      "Finalize a résumé and portfolio ready to share with an employer.",
      "Understand first-week and ongoing internship expectations.",
      "Set personal learning goals for the internship."
    ],
    preparation: [
      "Gather each student's confirmed or likely internship placement information.",
      "Print or share the Internship Readiness Checklist and portfolio review rubric.",
      "Review first-week and weekly expectations from the Internship Toolkit.",
      "Coordinate with the Ambassador Admin/employer contact on placement confirmations."
    ],
    lessonFlow: [
      { segment: "Readiness Check-In", minutes: 10, instructions: "Students self-assess against the Internship Readiness Checklist (curriculum complete, résumé finalized, schedule confirmed, forms complete)." },
      { segment: "Portfolio & Résumé Polish", minutes: 20, instructions: "Students do a final review of their Future Ready™ portfolio and résumé, incorporating 16 weeks of evidence." },
      { segment: "What to Expect", minutes: 15, instructions: "Review first-week expectations: orientation, workplace tour, learning goals, and daily reflection habits." },
      { segment: "Setting Internship Goals", minutes: 10, instructions: "Students write two to three personal learning goals for their internship." },
      { segment: "Commitment Ceremony", minutes: 5, instructions: "Students share one commitment they are making as they move from the Ambassador Pilot into their internship." }
    ],
    activities: [
      { name: "Internship Readiness Checklist", type: "Self-Assessment", minutes: 15, materials: ["Internship Readiness Checklist"], instructions: "Students confirm they have completed curriculum requirements, finalized their résumé and portfolio, confirmed their schedule, and completed required forms." },
      { name: "Portfolio Showcase Review", type: "Portfolio Review", minutes: 20, materials: ["16-week portfolio evidence"], instructions: "Students present their strongest portfolio artifact from the past 16 weeks and explain what it shows an employer." },
      { name: "First Day Simulation", type: "Simulation", minutes: 20, materials: ["Employee handbook", "Scenario cards"], instructions: "Students walk through a realistic first day: introductions, expectations, and workplace decisions." },
      { name: "Internship Goal Setting", type: "Planning", minutes: 15, materials: ["Workbook"], instructions: "Students write two to three specific, measurable learning goals for their internship." }
    ],
    discussionQuestions: [
      "What are you most excited about, and most nervous about, going into your internship?",
      "What habit from the last 16 weeks will help you most on day one?",
      "What does a successful first week of your internship look like?"
    ],
    facilitatorNotes: "This week closes the Ambassador Pilot and formally hands students off toward their internship placement next semester. Confirm every student has a placement in progress or a clear next step if one is still pending. Celebrate growth across all 16 weeks before turning attention to next steps.",
    differentiation: "Provide a simplified readiness checklist for students still finalizing placement details, and offer one-on-one portfolio review time for students who need it.",
    workplaceConnection: "Employers expect interns to arrive prepared, professional, and ready to learn — this readiness review is the same standard employers use to onboard new hires.",
    recommendedSpeaker: "Internship coordinator, HR onboarding specialist, or a past intern/alumnus of the program.",
    skillsEarned: ["Professionalism", "Goal Setting", "Self-Assessment", "Reliability"],
    studentWorkbook: {
      warmUp: "What is one thing you're excited about, and one thing you're nervous about, starting your internship?",
      reflectionPrompt: "Looking back across all 16 weeks, what has changed the most about how you see yourself and your future?",
      workbookPages: [
        { title: "Internship Readiness Checklist", directions: "Confirm: curriculum complete, résumé and portfolio finalized, placement and schedule confirmed, required forms submitted." },
        { title: "Internship Goals", directions: "Write two to three specific learning goals for your internship." }
      ],
      aiLabPrompt: "Review my internship goals and suggest how to make them more specific and measurable.",
      googleWorkspaceTask: "Finalize your Future Ready™ portfolio in Google Drive and share access with your facilitator and internship site contact.",
      employerConnection: "Reach out to confirm your internship start date, schedule, and first-day logistics with your placement site.",
      exitTicket: "One commitment I'm making as I move from the Ambassador Pilot into my internship is..."
    },
    assessmentRubric: ["Completes readiness checklist", "Finalizes résumé and portfolio", "Sets specific internship goals", "Demonstrates professionalism in first-day simulation"],
    portfolioArtifact: "Finalized Future Ready™ Portfolio & Internship Readiness Checklist",
    badgeEarned: "Internship Ready",
    homework: "Reach out to confirm your internship start date, schedule, and first-day logistics with your placement site."
  }
];

export default ambassadorPilot;
