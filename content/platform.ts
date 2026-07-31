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

  dailyLessons?: {
    day: string;
    title: string;
    objective: string;
    activity: string;
    reflection: string;
  }[];

  aiCoachPrompt?: string;

  weeklyReflection?: string;

  assessmentTitle?: string;

  assessmentDescription?: string;

  homework?: string;
};