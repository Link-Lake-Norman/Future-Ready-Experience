"use client";

import { useState } from "react";
import AICoachShell from "@/components/ai-coach/AICoachShell";
import { CoachHero, coachStyles } from "@/components/ai-coach/Shared";
import { interviewQuestions } from "@/content/ai-coach";

export default function InterviewCoachPage() {
  const [activeQuestion, setActiveQuestion] = useState(interviewQuestions[0]);
  const [answer, setAnswer] = useState("");

  return (
    <AICoachShell activePath="/ai-coach/interview">
      <CoachHero
        eyebrow="INTERVIEW COACH"
        title="Practice until your story sounds clear, confident, and real."
        description="Use structured practice to improve your examples, delivery, and professional confidence."
        meta="Internship interview practice"
        symbol="◉"
      />

      <section style={coachStyles.gridTwo}>
        <div style={{ ...coachStyles.card, ...coachStyles.padding }}>
          <div style={coachStyles.eyebrow}>PRACTICE QUESTION</div>
          <h2 style={styles.question}>{activeQuestion.question}</h2>
          <p style={coachStyles.description}>{activeQuestion.guidance}</p>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your practice answer here."
            style={{ ...coachStyles.textarea, marginTop: "18px" }}
          />
          <div style={styles.actions}>
            <button style={coachStyles.button}>Evaluate My Answer</button>
            <button style={coachStyles.secondaryButton}>Record Practice</button>
          </div>
        </div>

        <aside style={{ ...coachStyles.card, ...coachStyles.padding }}>
          <div style={coachStyles.eyebrow}>QUESTION BANK</div>
          <h2 style={coachStyles.title}>Choose a Question</h2>
          <div style={styles.list}>
            {interviewQuestions.map((item) => (
              <button key={item.id} onClick={() => { setActiveQuestion(item); setAnswer(""); }} style={styles.questionButton}>
                {item.question}
              </button>
            ))}
          </div>
        </aside>
      </section>

      <section style={{ ...coachStyles.card, ...coachStyles.padding, marginTop: "22px" }}>
        <div style={coachStyles.eyebrow}>ANSWER CHECKLIST</div>
        <h2 style={coachStyles.title}>A Strong Answer Should</h2>
        <div style={styles.checkGrid}>
          {["Answer the actual question", "Include a specific example", "Explain your actions", "Show the result or lesson", "Sound natural, not memorized", "Connect to the opportunity"].map((item) => (
            <div key={item} style={styles.check}>✓ {item}</div>
          ))}
        </div>
      </section>
    </AICoachShell>
  );
}

const styles: Record<string, React.CSSProperties> = {
  question: { margin: "10px 0 0", fontSize: "28px", lineHeight: 1.2 },
  actions: { display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "12px" },
  list: { display: "grid", gap: "10px", marginTop: "18px" },
  questionButton: { padding: "13px", border: "1px solid #E3E8F0", borderRadius: "12px", background: "#FFFFFF", color: "#0D1B3D", textAlign: "left", cursor: "pointer", fontSize: "11px", fontWeight: 750 },
  checkGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "12px", marginTop: "20px" },
  check: { padding: "14px", background: "#F8FAFC", borderRadius: "12px", color: "#596273", fontSize: "11px" },
};
