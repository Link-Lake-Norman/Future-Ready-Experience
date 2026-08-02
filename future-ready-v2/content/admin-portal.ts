export type AdminStatus = "Active" | "Pending" | "Inactive";
export type ProgramType = "School Program" | "Employer Partnership" | "Community Cohort";

export const adminProfile = {
  name: "Jaime Lane",
  initials: "JL",
  role: "Future Ready™ Administrator",
  organization: "Future Ready™",
};

export const adminNavigation = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Organizations", href: "/admin/organizations" },
  { label: "Cohorts", href: "/admin/cohorts" },
  { label: "Students", href: "/admin/students" },
  { label: "Facilitators", href: "/admin/facilitators" },
  { label: "Employers", href: "/admin/employers" },
  { label: "Programs", href: "/admin/programs" },
  { label: "Reports", href: "/admin/reports" },
  { label: "Settings", href: "/admin/settings" },
];

export const organizations = [
  {
    id: "org-001",
    name: "Ambassador Christian School",
    type: "School",
    location: "Huntersville, NC",
    status: "Active" as AdminStatus,
    cohorts: 1,
    students: 20,
    facilitators: 2,
    primaryContact: "Coach Jones",
  },
  {
    id: "org-002",
    name: "Lake Norman Industry Partner",
    type: "Employer",
    location: "Lake Norman, NC",
    status: "Active" as AdminStatus,
    cohorts: 0,
    students: 0,
    facilitators: 0,
    primaryContact: "Morgan Ellis",
  },
  {
    id: "org-003",
    name: "Regional Community Partner",
    type: "Community Partner",
    location: "Davidson, NC",
    status: "Pending" as AdminStatus,
    cohorts: 1,
    students: 12,
    facilitators: 1,
    primaryContact: "Taylor Brooks",
  },
];

export const cohorts = [
  {
    id: "cohort-001",
    name: "2026 Student Athlete Cohort",
    organization: "Ambassador Christian School",
    program: "Launch Ready™",
    startDate: "August 2026",
    endDate: "May 2027",
    status: "Active" as AdminStatus,
    students: 20,
    facilitator: "Coach Jones",
    currentWeek: 7,
  },
  {
    id: "cohort-002",
    name: "Community Career Readiness Cohort",
    organization: "Regional Community Partner",
    program: "Future Ready™ Core",
    startDate: "September 2026",
    endDate: "May 2027",
    status: "Pending" as AdminStatus,
    students: 12,
    facilitator: "Taylor Brooks",
    currentWeek: 0,
  },
];

export const adminStudents = [
  { id: "student-001", name: "Avery Thompson", school: "Ambassador Christian School", cohort: "2026 Student Athlete Cohort", readiness: 82, attendance: 96, status: "Active" as AdminStatus },
  { id: "student-002", name: "Jordan Williams", school: "Ambassador Christian School", cohort: "2026 Student Athlete Cohort", readiness: 76, attendance: 91, status: "Active" as AdminStatus },
  { id: "student-003", name: "Maya Brooks", school: "Ambassador Christian School", cohort: "2026 Student Athlete Cohort", readiness: 79, attendance: 94, status: "Active" as AdminStatus },
  { id: "student-004", name: "Cameron Reed", school: "Ambassador Christian School", cohort: "2026 Student Athlete Cohort", readiness: 68, attendance: 86, status: "Active" as AdminStatus },
  { id: "student-005", name: "Riley Carter", school: "Ambassador Christian School", cohort: "2026 Student Athlete Cohort", readiness: 84, attendance: 97, status: "Active" as AdminStatus },
  { id: "student-006", name: "Noah Mitchell", school: "Ambassador Christian School", cohort: "2026 Student Athlete Cohort", readiness: 71, attendance: 89, status: "Active" as AdminStatus },
];

export const facilitators = [
  { id: "fac-001", name: "Coach Jones", organization: "Ambassador Christian School", cohort: "2026 Student Athlete Cohort", students: 20, completion: 84, status: "Active" as AdminStatus },
  { id: "fac-002", name: "Taylor Brooks", organization: "Regional Community Partner", cohort: "Community Career Readiness Cohort", students: 12, completion: 0, status: "Pending" as AdminStatus },
];

export const employers = [
  { id: "emp-001", name: "Lake Norman Industry Partner", industry: "Advanced Manufacturing", opportunities: 3, studentsInPipeline: 18, placements: 4, status: "Active" as AdminStatus },
  { id: "emp-002", name: "Regional Healthcare Partner", industry: "Healthcare", opportunities: 2, studentsInPipeline: 9, placements: 2, status: "Active" as AdminStatus },
  { id: "emp-003", name: "Local Business Partner", industry: "Business Services", opportunities: 1, studentsInPipeline: 6, placements: 1, status: "Pending" as AdminStatus },
];

export const programs = [
  {
    id: "program-001",
    name: "Launch Ready™",
    type: "School Program" as ProgramType,
    phases: 2,
    modules: 16,
    cohorts: 1,
    activeStudents: 20,
    status: "Active" as AdminStatus,
  },
  {
    id: "program-002",
    name: "Future Ready™ Core",
    type: "Community Cohort" as ProgramType,
    phases: 6,
    modules: 36,
    cohorts: 1,
    activeStudents: 12,
    status: "Pending" as AdminStatus,
  },
  {
    id: "program-003",
    name: "Employer Talent Partnership",
    type: "Employer Partnership" as ProgramType,
    phases: 3,
    modules: 8,
    cohorts: 0,
    activeStudents: 0,
    status: "Active" as AdminStatus,
  },
];

export const adminAlerts = [
  { id: "alert-001", title: "3 badge submissions need review", detail: "Ambassador Christian School", level: "Action" },
  { id: "alert-002", title: "1 cohort awaiting approval", detail: "Regional Community Partner", level: "Approval" },
  { id: "alert-003", title: "Attendance below 90% for 4 students", detail: "2026 Student Athlete Cohort", level: "Attention" },
];

export const adminActivity = [
  { id: "activity-001", title: "Employer profile approved", detail: "Regional Healthcare Partner", time: "1 hour ago" },
  { id: "activity-002", title: "New cohort created", detail: "Community Career Readiness Cohort", time: "Yesterday" },
  { id: "activity-003", title: "Student roster updated", detail: "Ambassador Christian School", time: "Yesterday" },
];

export const reportMetrics = [
  { label: "Average Readiness", value: 77 },
  { label: "Attendance Rate", value: 92 },
  { label: "Portfolio Completion", value: 68 },
  { label: "Badge Completion", value: 73 },
  { label: "Employer Engagement", value: 81 },
];
