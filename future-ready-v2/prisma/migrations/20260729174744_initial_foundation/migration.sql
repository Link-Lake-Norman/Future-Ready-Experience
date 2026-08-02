-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SUPER_ADMIN', 'ORGANIZATION_ADMIN', 'SCHOOL_ADMIN', 'FACILITATOR', 'EMPLOYER', 'MENTOR', 'STUDENT');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('INVITED', 'ACTIVE', 'SUSPENDED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "OrganizationType" AS ENUM ('SCHOOL_DISTRICT', 'SCHOOL', 'NONPROFIT', 'WORKFORCE_BOARD', 'EMPLOYER_NETWORK', 'COMMUNITY_PARTNER', 'OTHER');

-- CreateEnum
CREATE TYPE "RecordStatus" AS ENUM ('DRAFT', 'ACTIVE', 'COMPLETED', 'PAUSED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'NEEDS_REVISION', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ApprovalStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ArtifactType" AS ENUM ('DOCUMENT', 'IMAGE', 'VIDEO', 'PRESENTATION', 'CERTIFICATE', 'LINK', 'OTHER');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'INTERVIEW', 'OFFERED', 'ACCEPTED', 'DECLINED', 'REJECTED', 'WITHDRAWN');

-- CreateEnum
CREATE TYPE "AttendanceStatus" AS ENUM ('PRESENT', 'ABSENT', 'LATE', 'EXCUSED');

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" "OrganizationType" NOT NULL,
    "description" TEXT,
    "website" TEXT,
    "logoUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "School" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "districtName" TEXT,
    "city" TEXT,
    "state" TEXT,
    "postalCode" TEXT,
    "website" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "School_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "displayName" TEXT,
    "phone" TEXT,
    "avatarUrl" TEXT,
    "role" "UserRole" NOT NULL,
    "status" "UserStatus" NOT NULL DEFAULT 'INVITED',
    "emailVerified" TIMESTAMP(3),
    "lastLoginAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserOrganization" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserOrganization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSchool" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserSchool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Program" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "status" "RecordStatus" NOT NULL DEFAULT 'DRAFT',
    "totalWeeks" INTEGER NOT NULL DEFAULT 36,
    "version" TEXT NOT NULL DEFAULT '1.0',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cohort" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "schoolId" TEXT,
    "programId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "status" "RecordStatus" NOT NULL DEFAULT 'DRAFT',
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "capacity" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Cohort_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "schoolId" TEXT,
    "studentNumber" TEXT,
    "graduationYear" INTEGER,
    "gradeLevel" TEXT,
    "careerSummary" TEXT,
    "readinessScore" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "profileComplete" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Facilitator" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "schoolId" TEXT,
    "title" TEXT,
    "bio" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Facilitator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CohortFacilitator" (
    "id" TEXT NOT NULL,
    "cohortId" TEXT NOT NULL,
    "facilitatorId" TEXT NOT NULL,
    "isLead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CohortFacilitator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enrollment" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "cohortId" TEXT NOT NULL,
    "status" "RecordStatus" NOT NULL DEFAULT 'ACTIVE',
    "enrolledAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Enrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LearningModule" (
    "id" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "phase" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LearningModule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lesson" (
    "id" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "summary" TEXT,
    "status" "RecordStatus" NOT NULL DEFAULT 'DRAFT',
    "weekNumber" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,
    "estimatedMinutes" INTEGER NOT NULL DEFAULT 50,
    "content" JSONB,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LessonProgress" (
    "id" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "percent" INTEGER NOT NULL DEFAULT 0,
    "timeSpent" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LessonProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reflection" (
    "id" TEXT NOT NULL,
    "lessonId" TEXT,
    "studentId" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "status" "SubmissionStatus" NOT NULL DEFAULT 'DRAFT',
    "aiFeedback" TEXT,
    "submittedAt" TIMESTAMP(3),
    "approvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reflection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReflectionFeedback" (
    "id" TEXT NOT NULL,
    "reflectionId" TEXT NOT NULL,
    "reviewerId" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReflectionFeedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Portfolio" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "headline" TEXT,
    "summary" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "publicSlug" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Portfolio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PortfolioArtifact" (
    "id" TEXT NOT NULL,
    "portfolioId" TEXT NOT NULL,
    "lessonId" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" "ArtifactType" NOT NULL,
    "fileUrl" TEXT,
    "externalUrl" TEXT,
    "approval" "ApprovalStatus" NOT NULL DEFAULT 'PENDING',
    "approvedById" TEXT,
    "approvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PortfolioArtifact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LessonSkill" (
    "lessonId" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,
    "weight" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "LessonSkill_pkey" PRIMARY KEY ("lessonId","skillId")
);

-- CreateTable
CREATE TABLE "StudentSkill" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,
    "level" TEXT NOT NULL DEFAULT 'INTRODUCTORY',
    "score" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "verifiedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArtifactSkill" (
    "artifactId" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,

    CONSTRAINT "ArtifactSkill_pkey" PRIMARY KEY ("artifactId","skillId")
);

-- CreateTable
CREATE TABLE "Badge" (
    "id" TEXT NOT NULL,
    "programId" TEXT,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "criteria" JSONB,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Badge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BadgeSkill" (
    "badgeId" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,

    CONSTRAINT "BadgeSkill_pkey" PRIMARY KEY ("badgeId","skillId")
);

-- CreateTable
CREATE TABLE "BadgeAward" (
    "id" TEXT NOT NULL,
    "badgeId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'FACILITATOR',
    "approvedById" TEXT,
    "evidence" JSONB,
    "awardedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BadgeAward_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employer" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "industry" TEXT,
    "description" TEXT,
    "website" TEXT,
    "logoUrl" TEXT,
    "city" TEXT,
    "state" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Employer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployerUser" (
    "id" TEXT NOT NULL,
    "employerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmployerUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Internship" (
    "id" TEXT NOT NULL,
    "employerId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "RecordStatus" NOT NULL DEFAULT 'DRAFT',
    "location" TEXT,
    "isRemote" BOOLEAN NOT NULL DEFAULT false,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "compensationText" TEXT,
    "openings" INTEGER NOT NULL DEFAULT 1,
    "applicationOpen" TIMESTAMP(3),
    "applicationClose" TIMESTAMP(3),
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "requirements" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Internship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InternshipApplication" (
    "id" TEXT NOT NULL,
    "internshipId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'DRAFT',
    "coverLetter" TEXT,
    "submittedAt" TIMESTAMP(3),
    "reviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InternshipApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Placement" (
    "id" TEXT NOT NULL,
    "internshipId" TEXT NOT NULL,
    "employerId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "status" "RecordStatus" NOT NULL DEFAULT 'ACTIVE',
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "hoursPlanned" INTEGER,
    "hoursCompleted" INTEGER NOT NULL DEFAULT 0,
    "evaluation" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Placement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CareerInterest" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "careerName" TEXT NOT NULL,
    "industry" TEXT,
    "interest" INTEGER NOT NULL DEFAULT 1,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CareerInterest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttendanceRecord" (
    "id" TEXT NOT NULL,
    "cohortId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" "AttendanceStatus" NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AttendanceRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Goal" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" "RecordStatus" NOT NULL DEFAULT 'ACTIVE',
    "targetDate" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Goal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "actionUrl" TEXT,
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT,
    "actorId" TEXT,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT,
    "metadata" JSONB,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization_slug_key" ON "Organization"("slug");

-- CreateIndex
CREATE INDEX "Organization_type_isActive_idx" ON "Organization"("type", "isActive");

-- CreateIndex
CREATE INDEX "School_organizationId_isActive_idx" ON "School"("organizationId", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "School_organizationId_slug_key" ON "School"("organizationId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_role_status_idx" ON "User"("role", "status");

-- CreateIndex
CREATE INDEX "UserOrganization_organizationId_role_idx" ON "UserOrganization"("organizationId", "role");

-- CreateIndex
CREATE UNIQUE INDEX "UserOrganization_userId_organizationId_role_key" ON "UserOrganization"("userId", "organizationId", "role");

-- CreateIndex
CREATE UNIQUE INDEX "UserSchool_userId_schoolId_role_key" ON "UserSchool"("userId", "schoolId", "role");

-- CreateIndex
CREATE UNIQUE INDEX "Program_organizationId_slug_key" ON "Program"("organizationId", "slug");

-- CreateIndex
CREATE INDEX "Cohort_programId_status_idx" ON "Cohort"("programId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "Cohort_organizationId_code_key" ON "Cohort"("organizationId", "code");

-- CreateIndex
CREATE UNIQUE INDEX "Student_userId_key" ON "Student"("userId");

-- CreateIndex
CREATE INDEX "Student_schoolId_graduationYear_idx" ON "Student"("schoolId", "graduationYear");

-- CreateIndex
CREATE UNIQUE INDEX "Facilitator_userId_key" ON "Facilitator"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CohortFacilitator_cohortId_facilitatorId_key" ON "CohortFacilitator"("cohortId", "facilitatorId");

-- CreateIndex
CREATE INDEX "Enrollment_cohortId_status_idx" ON "Enrollment"("cohortId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_studentId_cohortId_key" ON "Enrollment"("studentId", "cohortId");

-- CreateIndex
CREATE UNIQUE INDEX "LearningModule_programId_slug_key" ON "LearningModule"("programId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "LearningModule_programId_position_key" ON "LearningModule"("programId", "position");

-- CreateIndex
CREATE INDEX "Lesson_weekNumber_status_idx" ON "Lesson"("weekNumber", "status");

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_moduleId_slug_key" ON "Lesson"("moduleId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_moduleId_position_key" ON "Lesson"("moduleId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "LessonProgress_lessonId_studentId_key" ON "LessonProgress"("lessonId", "studentId");

-- CreateIndex
CREATE INDEX "Reflection_studentId_status_idx" ON "Reflection"("studentId", "status");

-- CreateIndex
CREATE INDEX "ReflectionFeedback_reflectionId_createdAt_idx" ON "ReflectionFeedback"("reflectionId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Portfolio_studentId_key" ON "Portfolio"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "Portfolio_publicSlug_key" ON "Portfolio"("publicSlug");

-- CreateIndex
CREATE INDEX "PortfolioArtifact_portfolioId_approval_idx" ON "PortfolioArtifact"("portfolioId", "approval");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_name_key" ON "Skill"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_slug_key" ON "Skill"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "StudentSkill_studentId_skillId_key" ON "StudentSkill"("studentId", "skillId");

-- CreateIndex
CREATE UNIQUE INDEX "Badge_programId_slug_key" ON "Badge"("programId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "BadgeAward_badgeId_studentId_key" ON "BadgeAward"("badgeId", "studentId");

-- CreateIndex
CREATE UNIQUE INDEX "Employer_organizationId_slug_key" ON "Employer"("organizationId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "EmployerUser_userId_key" ON "EmployerUser"("userId");

-- CreateIndex
CREATE INDEX "Internship_status_applicationClose_idx" ON "Internship"("status", "applicationClose");

-- CreateIndex
CREATE UNIQUE INDEX "Internship_employerId_slug_key" ON "Internship"("employerId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "InternshipApplication_internshipId_studentId_key" ON "InternshipApplication"("internshipId", "studentId");

-- CreateIndex
CREATE UNIQUE INDEX "Placement_internshipId_studentId_key" ON "Placement"("internshipId", "studentId");

-- CreateIndex
CREATE INDEX "CareerInterest_studentId_interest_idx" ON "CareerInterest"("studentId", "interest");

-- CreateIndex
CREATE UNIQUE INDEX "AttendanceRecord_cohortId_studentId_date_key" ON "AttendanceRecord"("cohortId", "studentId", "date");

-- CreateIndex
CREATE INDEX "Notification_userId_readAt_createdAt_idx" ON "Notification"("userId", "readAt", "createdAt");

-- CreateIndex
CREATE INDEX "AuditLog_organizationId_createdAt_idx" ON "AuditLog"("organizationId", "createdAt");

-- CreateIndex
CREATE INDEX "AuditLog_actorId_createdAt_idx" ON "AuditLog"("actorId", "createdAt");

-- AddForeignKey
ALTER TABLE "School" ADD CONSTRAINT "School_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOrganization" ADD CONSTRAINT "UserOrganization_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOrganization" ADD CONSTRAINT "UserOrganization_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSchool" ADD CONSTRAINT "UserSchool_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSchool" ADD CONSTRAINT "UserSchool_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cohort" ADD CONSTRAINT "Cohort_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cohort" ADD CONSTRAINT "Cohort_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cohort" ADD CONSTRAINT "Cohort_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Facilitator" ADD CONSTRAINT "Facilitator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Facilitator" ADD CONSTRAINT "Facilitator_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CohortFacilitator" ADD CONSTRAINT "CohortFacilitator_cohortId_fkey" FOREIGN KEY ("cohortId") REFERENCES "Cohort"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CohortFacilitator" ADD CONSTRAINT "CohortFacilitator_facilitatorId_fkey" FOREIGN KEY ("facilitatorId") REFERENCES "Facilitator"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_cohortId_fkey" FOREIGN KEY ("cohortId") REFERENCES "Cohort"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LearningModule" ADD CONSTRAINT "LearningModule_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "LearningModule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonProgress" ADD CONSTRAINT "LessonProgress_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonProgress" ADD CONSTRAINT "LessonProgress_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reflection" ADD CONSTRAINT "Reflection_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reflection" ADD CONSTRAINT "Reflection_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReflectionFeedback" ADD CONSTRAINT "ReflectionFeedback_reflectionId_fkey" FOREIGN KEY ("reflectionId") REFERENCES "Reflection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortfolioArtifact" ADD CONSTRAINT "PortfolioArtifact_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortfolioArtifact" ADD CONSTRAINT "PortfolioArtifact_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonSkill" ADD CONSTRAINT "LessonSkill_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonSkill" ADD CONSTRAINT "LessonSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSkill" ADD CONSTRAINT "StudentSkill_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSkill" ADD CONSTRAINT "StudentSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtifactSkill" ADD CONSTRAINT "ArtifactSkill_artifactId_fkey" FOREIGN KEY ("artifactId") REFERENCES "PortfolioArtifact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtifactSkill" ADD CONSTRAINT "ArtifactSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Badge" ADD CONSTRAINT "Badge_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BadgeSkill" ADD CONSTRAINT "BadgeSkill_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES "Badge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BadgeSkill" ADD CONSTRAINT "BadgeSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BadgeAward" ADD CONSTRAINT "BadgeAward_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES "Badge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BadgeAward" ADD CONSTRAINT "BadgeAward_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employer" ADD CONSTRAINT "Employer_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployerUser" ADD CONSTRAINT "EmployerUser_employerId_fkey" FOREIGN KEY ("employerId") REFERENCES "Employer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployerUser" ADD CONSTRAINT "EmployerUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Internship" ADD CONSTRAINT "Internship_employerId_fkey" FOREIGN KEY ("employerId") REFERENCES "Employer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InternshipApplication" ADD CONSTRAINT "InternshipApplication_internshipId_fkey" FOREIGN KEY ("internshipId") REFERENCES "Internship"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InternshipApplication" ADD CONSTRAINT "InternshipApplication_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Placement" ADD CONSTRAINT "Placement_internshipId_fkey" FOREIGN KEY ("internshipId") REFERENCES "Internship"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Placement" ADD CONSTRAINT "Placement_employerId_fkey" FOREIGN KEY ("employerId") REFERENCES "Employer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Placement" ADD CONSTRAINT "Placement_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CareerInterest" ADD CONSTRAINT "CareerInterest_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendanceRecord" ADD CONSTRAINT "AttendanceRecord_cohortId_fkey" FOREIGN KEY ("cohortId") REFERENCES "Cohort"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendanceRecord" ADD CONSTRAINT "AttendanceRecord_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
