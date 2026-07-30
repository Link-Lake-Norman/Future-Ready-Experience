import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import {
  PrismaClient,
  OrganizationType,
  RecordStatus,
  UserRole,
  UserStatus,
} from "../generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not configured.");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

const phases = [
  ["DISCOVER™", "discover", [
    "Discover Who I Am",
    "Strengths, Interests & Values",
    "Understanding My Story",
    "Communication That Connects",
    "Building Confidence",
    "My Future Vision",
  ]],
  ["DEVELOP™", "develop", [
    "Professional Communication",
    "Teamwork & Collaboration",
    "Leadership Foundations",
    "Problem Solving",
    "Adaptability",
    "Future Ready Skills",
  ]],
  ["EXPLORE™", "explore", [
    "Future of Work",
    "Career Discovery",
    "Industry Exploration",
    "Career Conversations",
    "Education Pathways",
    "Opportunity Mapping",
  ]],
  ["CONNECT™", "connect", [
    "Networking Skills",
    "Professional Presence",
    "Mentorship",
    "Employer Connections",
    "Workplace Expectations",
    "Building Relationships",
  ]],
  ["EXPERIENCE™", "experience", [
    "Workplace Readiness",
    "Workplace Projects",
    "Service Leadership",
    "Workplace Communication",
    "Reflection & Growth",
    "Internship Preparation",
  ]],
  ["LAUNCH™", "launch", [
    "Digital Presence",
    "Career Action Plan",
    "Capstone Portfolio Build",
    "Community Impact & Service Leadership",
    "Future Ready Showcase",
    "My Next Chapter",
  ]],
] as const;

const skills = [
  ["Communication", "communication", "Durable Skills"],
  ["Teamwork", "teamwork", "Durable Skills"],
  ["Leadership", "leadership", "Durable Skills"],
  ["Critical Thinking", "critical-thinking", "Durable Skills"],
  ["Adaptability", "adaptability", "Durable Skills"],
  ["Professionalism", "professionalism", "Workplace Readiness"],
  ["AI Literacy", "ai-literacy", "Technology"],
  ["Career Awareness", "career-awareness", "Career Development"],
  ["Networking", "networking", "Career Development"],
  ["Initiative", "initiative", "Workplace Readiness"],
] as const;

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function main() {
  const organization = await prisma.organization.upsert({
    where: { slug: "future-ready-demo" },
    update: {},
    create: {
      name: "Future Ready™ Demo Organization",
      slug: "future-ready-demo",
      type: OrganizationType.SCHOOL,
      description: "Future Ready™ demonstration environment.",
    },
  });

  const school = await prisma.school.upsert({
    where: {
      organizationId_slug: {
        organizationId: organization.id,
        slug: "future-ready-academy",
      },
    },
    update: {},
    create: {
      organizationId: organization.id,
      name: "Future Ready Academy",
      slug: "future-ready-academy",
      city: "Lake Norman",
      state: "NC",
    },
  });

  const program = await prisma.program.upsert({
    where: {
      organizationId_slug: {
        organizationId: organization.id,
        slug: "future-ready-36-week",
      },
    },
    update: {},
    create: {
      organizationId: organization.id,
      name: "Future Ready™ 36-Week Experience",
      slug: "future-ready-36-week",
      description: "Discover Purpose. Build Skills. Launch Your Future.",
      status: RecordStatus.ACTIVE,
      totalWeeks: 36,
    },
  });

  const cohort = await prisma.cohort.upsert({
    where: {
      organizationId_code: {
        organizationId: organization.id,
        code: "FR-DEMO-2026",
      },
    },
    update: {},
    create: {
      organizationId: organization.id,
      schoolId: school.id,
      programId: program.id,
      name: "Future Ready Demo Cohort 2026",
      code: "FR-DEMO-2026",
      status: RecordStatus.ACTIVE,
      capacity: 25,
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: "admin@futureready.local" },
    update: {},
    create: {
      email: "admin@futureready.local",
      firstName: "Future Ready",
      lastName: "Administrator",
      role: UserRole.SUPER_ADMIN,
      status: UserStatus.ACTIVE,
      emailVerified: new Date(),
    },
  });

  await prisma.userOrganization.upsert({
    where: {
      userId_organizationId_role: {
        userId: admin.id,
        organizationId: organization.id,
        role: UserRole.SUPER_ADMIN,
      },
    },
    update: {},
    create: {
      userId: admin.id,
      organizationId: organization.id,
      role: UserRole.SUPER_ADMIN,
    },
  });

  const facilitatorUser = await prisma.user.upsert({
    where: { email: "facilitator@futureready.local" },
    update: {},
    create: {
      email: "facilitator@futureready.local",
      firstName: "Jordan",
      lastName: "Taylor",
      role: UserRole.FACILITATOR,
      status: UserStatus.ACTIVE,
      emailVerified: new Date(),
    },
  });

  const facilitator = await prisma.facilitator.upsert({
    where: { userId: facilitatorUser.id },
    update: {},
    create: {
      userId: facilitatorUser.id,
      schoolId: school.id,
      title: "Lead Future Ready Facilitator",
    },
  });

  await prisma.cohortFacilitator.upsert({
    where: {
      cohortId_facilitatorId: {
        cohortId: cohort.id,
        facilitatorId: facilitator.id,
      },
    },
    update: { isLead: true },
    create: {
      cohortId: cohort.id,
      facilitatorId: facilitator.id,
      isLead: true,
    },
  });

  const studentUser = await prisma.user.upsert({
    where: { email: "student@futureready.local" },
    update: {},
    create: {
      email: "student@futureready.local",
      firstName: "Alex",
      lastName: "Morgan",
      role: UserRole.STUDENT,
      status: UserStatus.ACTIVE,
      emailVerified: new Date(),
    },
  });

  const student = await prisma.student.upsert({
    where: { userId: studentUser.id },
    update: {},
    create: {
      userId: studentUser.id,
      schoolId: school.id,
      studentNumber: "FR-0001",
      graduationYear: 2027,
      gradeLevel: "12",
      readinessScore: 64,
      profileComplete: true,
    },
  });

  await prisma.enrollment.upsert({
    where: {
      studentId_cohortId: {
        studentId: student.id,
        cohortId: cohort.id,
      },
    },
    update: { status: RecordStatus.ACTIVE },
    create: {
      studentId: student.id,
      cohortId: cohort.id,
      status: RecordStatus.ACTIVE,
    },
  });

  await prisma.portfolio.upsert({
    where: { studentId: student.id },
    update: {},
    create: {
      studentId: student.id,
      headline: "My Future Ready™ Portfolio",
      summary: "Evidence of my skills, growth, and career readiness.",
    },
  });

  const employer = await prisma.employer.upsert({
    where: {
      organizationId_slug: {
        organizationId: organization.id,
        slug: "lake-norman-advanced-solutions",
      },
    },
    update: {},
    create: {
      organizationId: organization.id,
      name: "Lake Norman Advanced Solutions",
      slug: "lake-norman-advanced-solutions",
      industry: "Advanced Manufacturing",
      city: "Lake Norman",
      state: "NC",
      isVerified: true,
    },
  });

  const employerUser = await prisma.user.upsert({
    where: { email: "employer@futureready.local" },
    update: {},
    create: {
      email: "employer@futureready.local",
      firstName: "Casey",
      lastName: "Reed",
      role: UserRole.EMPLOYER,
      status: UserStatus.ACTIVE,
      emailVerified: new Date(),
    },
  });

  await prisma.employerUser.upsert({
    where: { userId: employerUser.id },
    update: {},
    create: {
      employerId: employer.id,
      userId: employerUser.id,
      title: "Talent Partnership Lead",
      isPrimary: true,
    },
  });

  for (const [name, slug, category] of skills) {
    await prisma.skill.upsert({
      where: { slug },
      update: { name, category },
      create: { name, slug, category },
    });
  }

  let week = 1;

  for (let phaseIndex = 0; phaseIndex < phases.length; phaseIndex += 1) {
    const [title, slug, lessons] = phases[phaseIndex];

    const module = await prisma.learningModule.upsert({
      where: {
        programId_slug: {
          programId: program.id,
          slug,
        },
      },
      update: {
        title,
        phase: title,
        position: phaseIndex + 1,
      },
      create: {
        programId: program.id,
        title,
        slug,
        description: `${title} phase of the Future Ready™ journey.`,
        phase: title,
        position: phaseIndex + 1,
      },
    });

    for (let lessonIndex = 0; lessonIndex < lessons.length; lessonIndex += 1) {
      const lessonTitle = lessons[lessonIndex];
      const lessonSlug = slugify(lessonTitle);

      await prisma.lesson.upsert({
        where: {
          moduleId_slug: {
            moduleId: module.id,
            slug: lessonSlug,
          },
        },
        update: {
          title: lessonTitle,
          status: RecordStatus.ACTIVE,
          weekNumber: week,
          position: lessonIndex + 1,
        },
        create: {
          moduleId: module.id,
          title: lessonTitle,
          slug: lessonSlug,
          summary: `Week ${week}: ${lessonTitle}`,
          status: RecordStatus.ACTIVE,
          weekNumber: week,
          position: lessonIndex + 1,
          estimatedMinutes: 50,
          publishedAt: new Date(),
        },
      });

      week += 1;
    }
  }

  console.log("Future Ready™ database seeded successfully.");
  console.table([
    { role: "Administrator", email: admin.email },
    { role: "Facilitator", email: facilitatorUser.email },
    { role: "Student", email: studentUser.email },
    { role: "Employer", email: employerUser.email },
  ]);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
