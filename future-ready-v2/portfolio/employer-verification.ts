export const employerVerification = {
  title: "Future Ready™ Employer Verification",

  purpose:
    "Provide employers with a standardized process to verify a student's successful completion of work-based learning and Future Ready™ competencies.",

  employerInformation: {
    fields: [
      "Organization Name",
      "Supervisor Name",
      "Supervisor Title",
      "Email",
      "Phone",
      "Internship Dates"
    ]
  },

  verificationChecklist: [
    "Student completed required internship hours.",
    "Student demonstrated professional workplace behavior.",
    "Student participated in meaningful projects.",
    "Student received regular coaching and feedback.",
    "Final employer evaluation completed."
  ],

  competencyVerification: [
    "Communication",
    "Professionalism",
    "Teamwork",
    "Leadership",
    "Critical Thinking",
    "Adaptability",
    "Digital Literacy",
    "Career Readiness"
  ],

  recommendationLevels: [
    "Verified Completion",
    "Verified with Distinction",
    "Employment Recommended",
    "Future Internship Recommended"
  ],

  digitalVerification: {
    certificateId: "",
    verificationDate: "",
    qrCodeEnabled: true,
    verificationUrl: "/verify"
  },

  employerComments: {
    strengths: "",
    futureRecommendations: "",
    additionalNotes: ""
  },

  signatures: [
    "Employer Supervisor",
    "Program Coordinator",
    "Student"
  ]
};

export default employerVerification;
