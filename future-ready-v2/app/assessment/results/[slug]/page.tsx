import { notFound } from "next/navigation";
import AssessmentResults from "@/components/assessment/AssessmentResults";
import { getAssessment } from "@/content/assessments";

type AssessmentResultsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function AssessmentResultsPage({
  params,
}: AssessmentResultsPageProps) {
  const { slug } = await params;
  const assessment = getAssessment(slug);

  if (!assessment) {
    notFound();
  }

  return <AssessmentResults assessment={assessment} />;
}
