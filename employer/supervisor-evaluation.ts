export const supervisorEvaluation = {
  title: "Future Ready™ Supervisor Evaluation",

  scoringScale: {
    4: "Exceeds Expectations",
    3: "Meets Expectations",
    2: "Developing",
    1: "Needs Improvement"
  },

  categories: [
    {
      category: "Attendance & Reliability",
      criteria: [
        "Arrives on time",
        "Completes assigned work",
        "Uses time effectively",
        "Communicates schedule changes"
      ]
    },
    {
      category: "Professionalism",
      criteria: [
        "Demonstrates integrity",
        "Accepts responsibility",
        "Maintains appropriate workplace behavior",
        "Respects policies and confidentiality"
      ]
    },
    {
      category: "Communication",
      criteria: [
        "Listens effectively",
        "Communicates clearly",
        "Accepts feedback",
        "Works respectfully with others"
      ]
    },
    {
      category: "Growth Mindset",
      criteria: [
        "Shows initiative",
        "Adapts to change",
        "Seeks learning opportunities",
        "Improves from feedback"
      ]
    }
  ],

  narrativeFeedback: {
    strengths: "",
    growthAreas: "",
    recommendedNextSteps: ""
  },

  recommendation: [
    "Ready for continued internship",
    "Ready for employment",
    "Ready for advanced responsibilities",
    "Additional development recommended"
  ]
};

export default supervisorEvaluation;
