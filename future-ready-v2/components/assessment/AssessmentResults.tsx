"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Assessment } from "@/content/assessments";

type StoredAssessmentResult = {
  assessmentSlug: string;
  assessmentTitle: string;
  primaryKey: string;
  secondaryKey: string;
  scores: Record<string, number>;
  completedAt: string;
  answeredQuestions: number;
  totalQuestions: number;
};

type AssessmentResultsProps = {
  assessment: Assessment;
};

export default function AssessmentResults({
  assessment,
}: AssessmentResultsProps) {
  const [result, setResult] =
    useState<StoredAssessmentResult | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storageKey = `future-ready-assessment-${assessment.slug}`;
    const storedResult = window.localStorage.getItem(storageKey);

    if (storedResult) {
      try {
        setResult(
          JSON.parse(storedResult) as StoredAssessmentResult,
        );
      } catch {
        setResult(null);
      }
    }

    setIsLoaded(true);
  }, [assessment.slug]);

  const primaryProfile = useMemo(() => {
    if (!result) {
      return undefined;
    }

    return assessment.profiles.find(
      (profile) => profile.key === result.primaryKey,
    );
  }, [assessment.profiles, result]);

  const secondaryProfile = useMemo(() => {
    if (!result) {
      return undefined;
    }

    return assessment.profiles.find(
      (profile) => profile.key === result.secondaryKey,
    );
  }, [assessment.profiles, result]);

  const scoreRows = useMemo(() => {
    if (!result) {
      return [];
    }

    const scoreValues = Object.values(result.scores);
    const highestScore =
      scoreValues.length > 0 ? Math.max(...scoreValues, 1) : 1;

    return Object.entries(result.scores)
      .sort(([, firstScore], [, secondScore]) => {
        return secondScore - firstScore;
      })
      .map(([key, score]) => {
        const profile = assessment.profiles.find(
          (item) => item.key === key,
        );

        return {
          key,
          title: profile?.title ?? key,
          score,
          percentage: Math.round(
            (score / highestScore) * 100,
          ),
        };
      });
  }, [assessment.profiles, result]);

  if (!isLoaded) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-12">
        <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <p className="font-semibold text-slate-600">
            Loading your Future Ready™ assessment results...
          </p>
        </div>
      </main>
    );
  }

  if (!result || !primaryProfile) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-12">
        <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0B3B60]">
            Assessment Required
          </p>

          <h1 className="mt-3 text-3xl font-bold text-slate-950">
            Complete this assessment to view your results.
          </h1>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
            Your results will be calculated from your responses and
            saved securely in this browser.
          </p>

          <Link
            href={`/assessment/${assessment.slug}`}
            className="mt-7 inline-flex rounded-xl bg-[#0B3B60] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#145D86]"
          >
            Begin {assessment.shortTitle}
          </Link>
        </div>
      </main>
    );
  }

  const completedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(result.completedAt));

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8 sm:px-8">
      <div className="mx-auto max-w-6xl space-y-7">
        <section className="rounded-3xl bg-gradient-to-r from-[#0B3B60] to-[#145D86] p-8 text-white shadow-lg sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-200">
            Future Ready™ Assessment Complete
          </p>

          <h1 className="mt-3 text-4xl font-bold">
            {primaryProfile.title}
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-blue-50">
            {primaryProfile.summary}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-bold">
              {assessment.shortTitle}
            </span>

            <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-bold">
              Completed {completedDate}
            </span>

            {secondaryProfile &&
            secondaryProfile.key !== primaryProfile.key ? (
              <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-bold">
                Secondary Strength: {secondaryProfile.title}
              </span>
            ) : null}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0B3B60]">
              Core Strengths
            </p>

            <h2 className="mt-2 text-2xl font-bold text-slate-950">
              What you naturally bring
            </h2>

            <div className="mt-6 space-y-3">
              {primaryProfile.strengths.map((strength) => (
                <div
                  key={strength}
                  className="flex items-center gap-3 rounded-xl bg-emerald-50 p-4"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-sm font-bold text-white">
                    ✓
                  </span>

                  <p className="font-semibold text-emerald-900">
                    {strength}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0B3B60]">
              Growth Opportunities
            </p>

            <h2 className="mt-2 text-2xl font-bold text-slate-950">
              Where to stretch next
            </h2>

            <div className="mt-6 space-y-3">
              {primaryProfile.growthAreas.map((growthArea) => (
                <div
                  key={growthArea}
                  className="flex items-center gap-3 rounded-xl bg-amber-50 p-4"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-700 text-sm font-bold text-white">
                    →
                  </span>

                  <p className="font-semibold text-amber-900">
                    {growthArea}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0B3B60]">
              Score Distribution
            </p>

            <h2 className="mt-2 text-2xl font-bold text-slate-950">
              Your assessment profile
            </h2>

            <div className="mt-6 space-y-5">
              {scoreRows.map((row) => (
                <div key={row.key}>
                  <div className="flex justify-between gap-4 text-sm">
                    <p className="font-bold text-slate-700">
                      {row.title}
                    </p>

                    <p className="font-bold text-[#0B3B60]">
                      {row.score}
                    </p>
                  </div>

                  <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-[#0B3B60]"
                      style={{ width: `${row.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0B3B60]">
              Action Plan
            </p>

            <h2 className="mt-2 text-2xl font-bold text-slate-950">
              Put your results into practice
            </h2>

            <div className="mt-6 space-y-4">
              {primaryProfile.actions.map((action, index) => (
                <div
                  key={action}
                  className="flex items-start gap-4 rounded-2xl border border-slate-200 p-4"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0B3B60] text-sm font-bold text-white">
                    {index + 1}
                  </span>

                  <p className="pt-1 font-semibold leading-6 text-slate-700">
                    {action}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-5 sm:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm font-bold uppercase tracking-wide text-slate-500">
                Questions Answered
              </p>

              <p className="mt-2 text-3xl font-bold text-[#0B3B60]">
                {result.answeredQuestions}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm font-bold uppercase tracking-wide text-slate-500">
                Total Questions
              </p>

              <p className="mt-2 text-3xl font-bold text-[#0B3B60]">
                {result.totalQuestions}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm font-bold uppercase tracking-wide text-slate-500">
                Primary Profile
              </p>

              <p className="mt-2 text-xl font-bold text-[#0B3B60]">
                {primaryProfile.title}
              </p>
            </div>
          </div>
        </section>

        <section className="flex flex-col justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-950">
              Continue building your Future Ready™ profile
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Complete another assessment or retake this assessment as
              your skills, experiences, and confidence grow.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/assessment/${assessment.slug}`}
              className="rounded-xl border border-[#0B3B60] px-5 py-3 text-sm font-bold text-[#0B3B60] transition hover:bg-blue-50"
            >
              Retake Assessment
            </Link>

            <Link
              href="/assessment"
              className="rounded-xl bg-[#0B3B60] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#145D86]"
            >
              All Assessments
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
