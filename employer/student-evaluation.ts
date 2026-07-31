export const studentEvaluation = {
  title: "Future Ready™ Student Self-Evaluation",

  scoringScale: {
    4: "Always",
    3: "Usually",
    2: "Sometimes",
    1: "Rarely"
  },

  categories: [
    {
      category: "Professionalism",
      statements: [
        "I arrived prepared and on time.",
        "I demonstrated integrity.",
        "I completed responsibilities."
      ]
    },
    {
      category: "Communication",
      statements: [
        "I listened actively.",
        "I communicated respectfully.",
        "I asked thoughtful questions."
      ]
    },
    {
      category: "Teamwork",
      statements: [
        "I contributed to my team.",
        "I accepted feedback.",
        "I supported others."
      ]
    },
    {
      category: "Growth",
      statements: [
        "I challenged myself.",
        "I learned from mistakes.",
        "I improved during this experience."
      ]
    }
  ],

  reflectionQuestions: [
    "What accomplishment are you most proud of?",
    "What challenge taught you the most?",
    "Which Future Ready™ skill grew the most?",
    "What is your next professional goal?"
  ],

  actionPlan: {
    strengths: "",
    growthAreas: "",
    nextSteps: ""
  }
};

export default studentEvaluation;
