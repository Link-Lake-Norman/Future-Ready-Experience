"use client";

import { useState } from "react";
import AICoachShell from "@/components/ai-coach/AICoachShell";
import { CoachHero, ProgressBar, coachStyles } from "@/components/ai-coach/Shared";
import { studentGoals } from "@/content/ai-coach";

export default function GoalsPage() {
  const [goal, setGoal] = useState("");

  return (
    <AICoachShell activePath="/ai-coach/goals">
      <CoachHero
        eyebrow="GOAL COACH"
        title="Turn your next step into a goal you can actually complete."
        description="Create specific goals tied to your Future Ready™ skills, career direction, portfolio, and professional growth."
        meta={`${studentGoals.length} active goals`}
        symbol="◎"
      />

      <section style={coachStyles.gridTwo}>
        <div style={{ ...coachStyles.card, ...coachStyles.padding }}>
          <div style={coachStyles.eyebrow}>BUILD A GOAL</div>
          <h2 style={coachStyles.title}>What do you want to accomplish?</h2>
          <textarea
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="Example: I want to improve my résumé."
            style={{ ...coachStyles.textarea, marginTop: "18px" }}
          />
          <button style={{ ...coachStyles.button, marginTop: "12px" }}>Turn This Into a Strong Goal</button>
          <p style={coachStyles.description}>A strong goal is specific, measurable, realistic, relevant, and connected to a deadline.</p>
        </div>

        <aside style={{ ...coachStyles.card, ...coachStyles.padding }}>
          <div style={coachStyles.eyebrow}>GOAL FORMULA</div>
          <h2 style={coachStyles.title}>Specific + Evidence + Deadline</h2>
          <div style={styles.example}>
            By August 28, I will strengthen my résumé by writing three action-and-impact bullet points and reviewing them with my facilitator.
          </div>
        </aside>
      </section>

      <section style={{ ...coachStyles.card, ...coachStyles.padding, marginTop: "22px" }}>
        <div style={coachStyles.eyebrow}>ACTIVE GOALS</div>
        <h2 style={coachStyles.title}>Track Your Progress</h2>
        <div style={styles.grid}>
          {studentGoals.map((item) => (
            <article key={item.id} style={styles.card}>
              <div style={styles.category}>{item.category}</div>
              <strong>{item.title}</strong>
              <div style={styles.top}><span>Progress</span><strong>{item.progress}%</strong></div>
              <ProgressBar value={item.progress} />
              <div style={styles.due}>Due {item.due}</div>
              <p style={styles.text}>{item.nextStep}</p>
              <button style={coachStyles.secondaryButton}>Update Goal</button>
            </article>
          ))}
        </div>
      </section>
    </AICoachShell>
  );
}

const styles: Record<string, React.CSSProperties> = {
  example: { marginTop: "20px", padding: "18px", background: "#F8FAFC", borderRadius: "14px", color: "#596273", fontSize: "12px", lineHeight: 1.7 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "16px", marginTop: "20px" },
  card: { padding: "18px", border: "1px solid #E3E8F0", borderRadius: "16px", fontSize: "12px" },
  category: { marginBottom: "8px", color: "#A47700", fontSize: "9px", fontWeight: 900, letterSpacing: ".08em" },
  top: { display: "flex", justifyContent: "space-between", margin: "14px 0 7px", color: "#596273", fontSize: "10px" },
  due: { marginTop: "10px", color: "#A47700", fontSize: "9px", fontWeight: 800 },
  text: { minHeight: "48px", color: "#596273", fontSize: "10px", lineHeight: 1.6 },
};
