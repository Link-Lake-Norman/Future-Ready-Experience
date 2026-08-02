import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

const VALID_STATUSES = new Set([
  "PRESENT",
  "LATE",
  "ABSENT",
  "EXCUSED",
]);

type AttendanceInput = {
  studentId: string;
  status: "PRESENT" | "LATE" | "ABSENT" | "EXCUSED";
  notes?: string;
};

function normalizeAttendanceDate(value: string) {
  const date = new Date(`${value}T00:00:00.000Z`);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

export async function GET(request: NextRequest) {
  try {
    const cohortId = request.nextUrl.searchParams.get("cohortId");
    const dateValue = request.nextUrl.searchParams.get("date");

    if (!cohortId || !dateValue) {
      return NextResponse.json(
        {
          success: false,
          error: "cohortId and date are required.",
        },
        { status: 400 }
      );
    }

    const date = normalizeAttendanceDate(dateValue);

    if (!date) {
      return NextResponse.json(
        {
          success: false,
          error: "The attendance date is invalid.",
        },
        { status: 400 }
      );
    }

    const records = await db.attendanceRecord.findMany({
      where: {
        cohortId,
        date,
      },
      include: {
        student: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json({
      success: true,
      records: records.map((record) => ({
        id: record.id,
        cohortId: record.cohortId,
        studentId: record.studentId,
        studentName:
          `${record.student.user.firstName} ${record.student.user.lastName}`.trim(),
        email: record.student.user.email,
        date: record.date,
        status: record.status,
        note: record.notes ?? "",
      })),
    });
  } catch (error) {
    console.error("GET /api/attendance failed:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to load attendance.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      cohortId?: string;
      date?: string;
      records?: AttendanceInput[];
    };

    const cohortId = body.cohortId?.trim();
    const dateValue = body.date?.trim();
    const records = body.records;

    if (!cohortId) {
      return NextResponse.json(
        {
          success: false,
          error: "A cohort ID is required.",
        },
        { status: 400 }
      );
    }

    if (!dateValue) {
      return NextResponse.json(
        {
          success: false,
          error: "An attendance date is required.",
        },
        { status: 400 }
      );
    }

    if (!Array.isArray(records) || records.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "At least one attendance record is required.",
        },
        { status: 400 }
      );
    }

    const date = normalizeAttendanceDate(dateValue);

    if (!date) {
      return NextResponse.json(
        {
          success: false,
          error: "The attendance date is invalid.",
        },
        { status: 400 }
      );
    }

    for (const record of records) {
      if (!record.studentId?.trim()) {
        return NextResponse.json(
          {
            success: false,
            error: "Every attendance record must include a student ID.",
          },
          { status: 400 }
        );
      }

      if (!VALID_STATUSES.has(record.status)) {
        return NextResponse.json(
          {
            success: false,
            error: `Invalid attendance status for student ${record.studentId}.`,
          },
          { status: 400 }
        );
      }
    }

    const cohort = await db.cohort.findUnique({
      where: {
        id: cohortId,
      },
      select: {
        id: true,
        enrollments: {
          where: {
            status: "ACTIVE",
          },
          select: {
            studentId: true,
          },
        },
      },
    });

    if (!cohort) {
      return NextResponse.json(
        {
          success: false,
          error: "The selected cohort could not be found.",
        },
        { status: 404 }
      );
    }

    const enrolledStudentIds = new Set(
      cohort.enrollments.map((enrollment) => enrollment.studentId)
    );

    const invalidStudent = records.find(
      (record) => !enrolledStudentIds.has(record.studentId)
    );

    if (invalidStudent) {
      return NextResponse.json(
        {
          success: false,
          error: `Student ${invalidStudent.studentId} is not actively enrolled in this cohort.`,
        },
        { status: 400 }
      );
    }

    const savedRecords = await db.$transaction(
      records.map((record) =>
        db.attendanceRecord.upsert({
          where: {
            cohortId_studentId_date: {
              cohortId,
              studentId: record.studentId,
              date,
            },
          },
          update: {
            status: record.status,
            notes: record.notes?.trim() || null,
          },
          create: {
            cohortId,
            studentId: record.studentId,
            date,
            status: record.status,
            notes: record.notes?.trim() || null,
          },
        })
      )
    );

    return NextResponse.json({
      success: true,
      saved: savedRecords.length,
      message: `${savedRecords.length} attendance records saved.`,
    });
  } catch (error) {
    console.error("POST /api/attendance failed:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to save attendance.",
      },
      { status: 500 }
    );
  }
}
