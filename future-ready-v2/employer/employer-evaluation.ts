export const employerEvaluation = {
  title: "Future Ready™ Employer Evaluation",
  scoringScale: {
    4: "Exceeds Expectations",
    3: "Meets Expectations",
    2: "Developing",
    1: "Needs Improvement"
  },
  competencies: [
    {
      category: "Professionalism",
      criteria: [
        "Arrives on time",
        "Prepared for work",
        "Maintains professional appearance",
        "Demonstrates integrity"
      ]
    },
    {
      category: "Communication",
      criteria: [
        "Listens actively",
        "Communicates respectfully",
        "Asks thoughtful questions",
        "Provides updates appropriately"
      ]
    },
    {
      category: "Teamwork",
      criteria: [
        "Works well with others",
        "Supports team goals",
        "Accepts feedback",
        "Shows respect for coworkers"
      ]
    },
    {
      category: "Problem Solving",
      criteria: [
        "Uses critical thinking",
        "Shows initiative",
        "Adapts to change",
        "Seeks solutions"
      ]
    }
  ],
  overallQuestions: [
    "Student's greatest strength",
    "Area for continued growth",
    "Would you host this student again?",
    "Would you recommend this student for employment?"
  ],
  finalRecommendation: [
    "Outstanding",
    "Ready for Employment",
    "Needs Additional Development"
  ]
};

export default employerEvaluation;
