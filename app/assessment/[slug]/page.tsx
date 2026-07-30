import { notFound } from "next/navigation";
import AssessmentRunner from "@/components/assessment/AssessmentRunner";
import { getAssessment } from "@/content/assessments";

type AssessmentPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function AssessmentPage({
  params,
}: AssessmentPageProps) {
  const { slug } = await params;
  const assessment = getAssessment(slug);

  if (!assessment) {
    notFound();
  }

  return <AssessmentRunner assessment={assessment} />;
}
