import { NextRequest, NextResponse } from "next/server";
import {
  OrganizationType,
  RecordStatus,
  UserRole,
  UserStatus,
} from "@/generated/prisma/client";
import { db } from "@/lib/db";

const AMBASSADOR = {
  organizationSlug: "ambassador-christian-school",
  schoolSlug: "ambassador-christian-school",
  programSlug: "ambassador-launch-ready",
  cohortCode: "AMBASSADOR-2026",
};

function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);

  return {
    firstName: parts[0] || "Future Ready",
    lastName: parts.slice(1).join(" ") || "Student",
  };
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

async function getAmbassadorContext() {
  const organization = await db.organization.upsert({
    where: {
      slug: AMBASSADOR.organizationSlug,
    },
    update: {
      name: "Ambassador Christian School",
      type: OrganizationType.SCHOOL,
      isActive: true,
      deletedAt: null,
    },
    create: {
      name: "Ambassador Christian School",
      slug: AMBASSADOR.organizationSlug,
      type: OrganizationType.SCHOOL,
      description:
        "Ambassador Christian School custom program inside Future Ready™.",
      isActive: true,
    },
  });

  const school = await db.school.upsert({
    where: {
      organizationId_slug: {
        organizationId: organization.id,
        slug: AMBASSADOR.schoolSlug,
      },
    },
    update: {
      name: "Ambassador Christian School",
      isActive: true,
      deletedAt: null,
    },
    create: {
      organizationId: organization.id,
      name: "Ambassador Christian School",
      slug: AMBASSADOR.schoolSlug,
      city: "Huntersville",
      state: "NC",
      isActive: true,
    },
  });

  const program = await db.program.upsert({
    where: {
      organizationId_slug: {
        organizationId: organization.id,
        slug: AMBASSADOR.programSlug,
      },
    },
    update: {
      name: "Launch Ready™: Professional Skills for Life, Leadership & Workforce Success",
      description:
        "Ambassador Christian School custom program powered by Future Ready™.",
      status: RecordStatus.ACTIVE,
      totalWeeks: 16,
      deletedAt: null,
    },
    create: {
      organizationId: organization.id,
      name: "Launch Ready™: Professional Skills for Life, Leadership & Workforce Success",
      slug: AMBASSADOR.programSlug,
      description:
        "Ambassador Christian School custom program powered by Future Ready™.",
      status: RecordStatus.ACTIVE,
      totalWeeks: 16,
      version: "1.0",
    },
  });

  const cohort = await db.cohort.upsert({
    where: {
      organizationId_code: {
        organizationId: organization.id,
        code: AMBASSADOR.cohortCode,
      },
    },
    update: {
      schoolId: school.id,
      programId: program.id,
      name: "Ambassador 2026",
      status: RecordStatus.ACTIVE,
      capacity: 25,
      deletedAt: null,
    },
    create: {
      organizationId: organization.id,
      schoolId: school.id,
      programId: program.id,
      name: "Ambassador 2026",
      code: AMBASSADOR.cohortCode,
      status: RecordStatus.ACTIVE,
      capacity: 25,
    },
  });

  return {
    organization,
    school,
    program,
    cohort,
  };
}

export async function GET() {
  try {
    const { organization, school, program, cohort } =
      await getAmbassadorContext();

    const enrollments = await db.enrollment.findMany({
      where: {
        cohortId: cohort.id,
        student: {
          deletedAt: null,
          user: {
            deletedAt: null,
          },
        },
      },
      include: {
        student: {
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        enrolledAt: "asc",
      },
    });

    const facilitatorAssignments =
      await db.cohortFacilitator.findMany({
        where: {
          cohortId: cohort.id,
          facilitator: {
            deletedAt: null,
            user: {
              deletedAt: null,
            },
          },
        },
        include: {
          facilitator: {
            include: {
              user: true,
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      });

    const students = enrollments.map((enrollment) => ({
      id: enrollment.student.id,
      userId: enrollment.student.user.id,
      name:
        enrollment.student.user.displayName ||
        `${enrollment.student.user.firstName} ${enrollment.student.user.lastName}`,
      email: enrollment.student.user.email,
      grade: enrollment.student.gradeLevel || "5th Year",
      readinessScore: Number(enrollment.student.readinessScore),
      status: enrollment.status,
      enrolledAt: enrollment.enrolledAt.toISOString(),
    }));

    const facilitators = facilitatorAssignments.map(
      (assignment) => ({
        id: assignment.facilitator.id,
        userId: assignment.facilitator.user.id,
        name:
          assignment.facilitator.user.displayName ||
          `${assignment.facilitator.user.firstName} ${assignment.facilitator.user.lastName}`,
        email: assignment.facilitator.user.email,
        title:
          assignment.facilitator.title ||
          "Future Ready™ Facilitator",
        isLead: assignment.isLead,
        status: assignment.facilitator.user.status,
      })
    );

    return NextResponse.json({
      organization: {
        id: organization.id,
        name: organization.name,
      },
      school: {
        id: school.id,
        name: school.name,
      },
      program: {
        id: program.id,
        name: program.name,
      },
      cohort: {
        id: cohort.id,
        name: cohort.name,
        code: cohort.code,
        capacity: cohort.capacity,
      },
      students,
      facilitators,
    });
  } catch (error) {
    console.error("AMBASSADOR ADMIN GET ERROR:", error);

    return NextResponse.json(
      {
        error: "Ambassador records could not be loaded.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const recordType = String(body.recordType || "").trim();
    const name = String(body.name || "").trim();
    const email = normalizeEmail(String(body.email || ""));

    if (!name || !email) {
      return NextResponse.json(
        {
          error: "Name and email are required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!email.includes("@")) {
      return NextResponse.json(
        {
          error: "Enter a valid email address.",
        },
        {
          status: 400,
        }
      );
    }

    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
      include: {
        student: true,
        facilitator: true,
      },
    });

    const { organization, school, cohort } =
      await getAmbassadorContext();

    const { firstName, lastName } = splitName(name);

    if (recordType === "student") {
      const grade =
        String(body.grade || "").trim() || "5th Year";

      const result = await db.$transaction(async (tx) => {
        let user = existingUser;

        if (!user) {
          user = await tx.user.create({
            data: {
              email,
              firstName,
              lastName,
              displayName: name,
              role: UserRole.STUDENT,
              status: UserStatus.ACTIVE,
            },
            include: {
              student: true,
              facilitator: true,
            },
          });
        }

        await tx.userOrganization.upsert({
          where: {
            userId_organizationId_role: {
              userId: user.id,
              organizationId: organization.id,
              role: UserRole.STUDENT,
            },
          },
          update: {},
          create: {
            userId: user.id,
            organizationId: organization.id,
            role: UserRole.STUDENT,
          },
        });

        await tx.userSchool.upsert({
          where: {
            userId_schoolId_role: {
              userId: user.id,
              schoolId: school.id,
              role: UserRole.STUDENT,
            },
          },
          update: {},
          create: {
            userId: user.id,
            schoolId: school.id,
            role: UserRole.STUDENT,
          },
        });

        const student = await tx.student.upsert({
          where: {
            userId: user.id,
          },
          update: {
            schoolId: school.id,
            gradeLevel: grade,
            deletedAt: null,
          },
          create: {
            userId: user.id,
            schoolId: school.id,
            gradeLevel: grade,
            readinessScore: 0,
            profileComplete: false,
          },
        });

        const enrollment = await tx.enrollment.upsert({
          where: {
            studentId_cohortId: {
              studentId: student.id,
              cohortId: cohort.id,
            },
          },
          update: {
            status: RecordStatus.ACTIVE,
            completedAt: null,
          },
          create: {
            studentId: student.id,
            cohortId: cohort.id,
            status: RecordStatus.ACTIVE,
          },
        });

        return {
          id: student.id,
          userId: user.id,
          name,
          email,
          grade,
          readinessScore: Number(student.readinessScore),
          status: enrollment.status,
          enrolledAt: enrollment.enrolledAt.toISOString(),
        };
      });

      return NextResponse.json(
        {
          message: `${name} was added to Ambassador 2026.`,
          student: result,
        },
        {
          status: 201,
        }
      );
    }

    if (recordType === "facilitator") {
      const title =
        String(body.title || "").trim() ||
        "Future Ready™ Facilitator";

      const result = await db.$transaction(async (tx) => {
        let user = existingUser;

        if (!user) {
          user = await tx.user.create({
            data: {
              email,
              firstName,
              lastName,
              displayName: name,
              role: UserRole.FACILITATOR,
              status: UserStatus.ACTIVE,
            },
            include: {
              student: true,
              facilitator: true,
            },
          });
        }

        await tx.userOrganization.upsert({
          where: {
            userId_organizationId_role: {
              userId: user.id,
              organizationId: organization.id,
              role: UserRole.FACILITATOR,
            },
          },
          update: {},
          create: {
            userId: user.id,
            organizationId: organization.id,
            role: UserRole.FACILITATOR,
          },
        });

        await tx.userSchool.upsert({
          where: {
            userId_schoolId_role: {
              userId: user.id,
              schoolId: school.id,
              role: UserRole.FACILITATOR,
            },
          },
          update: {},
          create: {
            userId: user.id,
            schoolId: school.id,
            role: UserRole.FACILITATOR,
          },
        });

        const facilitator = await tx.facilitator.upsert({
          where: {
            userId: user.id,
          },
          update: {
            schoolId: school.id,
            title,
            deletedAt: null,
          },
          create: {
            userId: user.id,
            schoolId: school.id,
            title,
          },
        });

        const assignmentCount =
          await tx.cohortFacilitator.count({
            where: {
              cohortId: cohort.id,
            },
          });

        const assignment =
          await tx.cohortFacilitator.upsert({
            where: {
              cohortId_facilitatorId: {
                cohortId: cohort.id,
                facilitatorId: facilitator.id,
              },
            },
            update: {},
            create: {
              cohortId: cohort.id,
              facilitatorId: facilitator.id,
              isLead: assignmentCount === 0,
            },
          });

        return {
          id: facilitator.id,
          userId: user.id,
          name,
          email,
          title,
          isLead: assignment.isLead,
          status: user.status,
        };
      });

      return NextResponse.json(
        {
          message: `${name} was added as an Ambassador facilitator.`,
          facilitator: result,
        },
        {
          status: 201,
        }
      );
    }

    return NextResponse.json(
      {
        error: "Record type must be student or facilitator.",
      },
      {
        status: 400,
      }
    );
  } catch (error) {
    console.error("AMBASSADOR ADMIN POST ERROR:", error);

    return NextResponse.json(
      {
        error:
          "The record could not be saved. Check the Terminal for the exact database error.",
      },
      {
        status: 500,
      }
    );
  }
}
