"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Assessment } from "@/content/assessments";

type AssessmentRunnerProps = {
  assessment: Assessment;
};

export default function AssessmentRunner({
  assessment,
}: AssessmentRunnerProps) {
  const router = useRouter();

  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [errorMessage, setErrorMessage] = useState("");

  const question = assessment.questions[questionIndex];
  const selectedAnswer = answers[question.id];

  const progress = Math.round(
    ((questionIndex + 1) / assessment.questions.length) * 100,
  );

  function selectAnswer(optionIndex: number) {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [question.id]: optionIndex,
    }));

    setErrorMessage("");
  }

  function previousQuestion() {
    if (questionIndex === 0) {
      return;
    }

    setQuestionIndex((currentIndex) => currentIndex - 1);
    setErrorMessage("");
  }

  function saveResults() {
    const scores: Record<string, number> = {};

    assessment.questions.forEach((assessmentQuestion) => {
      const answerIndex = answers[assessmentQuestion.id];

      if (answerIndex === undefined) {
        return;
      }

      const selectedOption = assessmentQuestion.options[answerIndex];

      Object.entries(selectedOption.scores).forEach(([profileKey, score]) => {
        scores[profileKey] = (scores[profileKey] ?? 0) + score;
      });
    });

    const rankedScores = Object.entries(scores).sort(
      ([, firstScore], [, secondScore]) => secondScore - firstScore,
    );

    const fallbackProfileKey = assessment.profiles[0]?.key ?? "";

    const result = {
      assessmentSlug: assessment.slug,
      assessmentTitle: assessment.title,
      primaryKey: rankedScores[0]?.[0] ?? fallbackProfileKey,
      secondaryKey:
        rankedScores[1]?.[0] ??
        rankedScores[0]?.[0] ??
        fallbackProfileKey,
      scores,
      completedAt: new Date().toISOString(),
      answeredQuestions: Object.keys(answers).length,
      totalQuestions: assessment.questions.length,
    };

    window.localStorage.setItem(
      `future-ready-assessment-${assessment.slug}`,
      JSON.stringify(result),
    );

    try {
      const storedHistory = window.localStorage.getItem(
        "future-ready-assessment-history",
      );

      const history = storedHistory
        ? (JSON.parse(storedHistory) as typeof result[])
        : [];

      const updatedHistory = [
        result,
        ...history.filter(
          (historyItem) =>
            historyItem.assessmentSlug !== assessment.slug,
        ),
      ];

      window.localStorage.setItem(
        "future-ready-assessment-history",
        JSON.stringify(updatedHistory),
      );
    } catch {
      window.localStorage.setItem(
        "future-ready-assessment-history",
        JSON.stringify([result]),
      );
    }

    router.push(`/assessment/results/${assessment.slug}`);
  }

  function nextQuestion() {
    if (selectedAnswer === undefined) {
      setErrorMessage(
        "Select the response that best represents you before continuing.",
      );
      return;
    }

    if (questionIndex < assessment.questions.length - 1) {
      setQuestionIndex((currentIndex) => currentIndex + 1);
      setErrorMessage("");
      return;
    }

    saveResults();
  }

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8 sm:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <section className="rounded-3xl bg-gradient-to-r from-[#0B3B60] to-[#145D86] p-7 text-white shadow-lg sm:p-9">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">
                Future Ready™ {assessment.category}
              </p>

              <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
                {assessment.title}
              </h1>

              <p className="mt-3 max-w-3xl leading-7 text-blue-50">
                Choose the response that best reflects you today. There are
                no right or wrong answers.
              </p>
            </div>

            <Link
              href="/assessment"
              className="w-fit rounded-xl border border-white/30 bg-white/10 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/20"
            >
              Exit Assessment
            </Link>
          </div>

          <div className="mt-7">
            <div className="flex items-center justify-between text-sm font-bold">
              <span>
                Question {questionIndex + 1} of{" "}
                {assessment.questions.length}
              </span>

              <span>{progress}% Complete</span>
            </div>

            <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-white transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0B3B60]">
            Your Response
          </p>

          <h2 className="mt-3 text-2xl font-bold leading-tight text-slate-950 sm:text-3xl">
            {question.prompt}
          </h2>

          <div className="mt-7 space-y-3">
            {question.options.map((option, optionIndex) => {
              const isSelected = selectedAnswer === optionIndex;

              return (
                <button
                  key={`${question.id}-${optionIndex}`}
                  type="button"
                  onClick={() => selectAnswer(optionIndex)}
                  className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
                    isSelected
                      ? "border-[#0B3B60] bg-blue-50 ring-2 ring-blue-100"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 ${
                      isSelected
                        ? "border-[#0B3B60] bg-[#0B3B60]"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {isSelected ? (
                      <span className="h-2.5 w-2.5 rounded-full bg-white" />
                    ) : null}
                  </span>

                  <span
                    className={`font-semibold leading-6 ${
                      isSelected
                        ? "text-[#0B3B60]"
                        : "text-slate-700"
                    }`}
                  >
                    {option.label}
                  </span>
                </button>
              );
            })}
          </div>

          {errorMessage ? (
            <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {errorMessage}
            </p>
          ) : null}

          <div className="mt-8 flex flex-col-reverse justify-between gap-3 sm:flex-row">
            <button
              type="button"
              onClick={previousQuestion}
              disabled={questionIndex === 0}
              className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            <button
              type="button"
              onClick={nextQuestion}
              className="rounded-xl bg-[#0B3B60] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#145D86]"
            >
              {questionIndex === assessment.questions.length - 1
                ? "Complete Assessment"
                : "Next Question"}
            </button>
          </div>
        </section>

        <p className="text-center text-sm text-slate-500">
          Your responses are saved in this browser when you complete the
          assessment.
        </p>
      </div>
    </main>
  );
}
