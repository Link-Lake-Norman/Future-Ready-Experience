"use client";

import { useState } from "react";
import AICoachShell from "@/components/ai-coach/AICoachShell";
import { CoachHero, ProgressBar, coachStyles } from "@/components/ai-coach/Shared";
import { resumeSections } from "@/content/ai-coach";

export default function ResumeCoachPage() {
  const [experience, setExperience] = useState("");

  return (
    <AICoachShell activePath="/ai-coach/resume">
      <CoachHero
        eyebrow="RÉSUMÉ COACH"
        title="Turn what you have done into evidence employers understand."
        description="Use your schoolwork, athletics, service, leadership, projects, and responsibilities to build a stronger résumé."
        meta="Future Ready™ résumé development"
        symbol="▤"
      />

      <section style={coachStyles.gridTwo}>
        <div style={{ ...coachStyles.card, ...coachStyles.padding }}>
          <div style={coachStyles.eyebrow}>EXPERIENCE BUILDER</div>
          <h2 style={coachStyles.title}>Describe One Experience</h2>
          <textarea
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            placeholder="Example: I helped organize a team event and communicated with players, families, and coaches."
            style={{ ...coachStyles.textarea, marginTop: "18px" }}
          />
          <button style={{ ...coachStyles.button, marginTop: "12px" }}>Create Strong Résumé Bullets</button>
          <p style={coachStyles.description}>Strong bullets begin with an action, explain what you did, and show the result or value.</p>
        </div>

        <aside style={{ ...coachStyles.card, ...coachStyles.padding }}>
          <div style={coachStyles.eyebrow}>BULLET FORMULA</div>
          <h2 style={coachStyles.title}>Action + Work + Impact</h2>
          <div style={styles.example}>
            <strong>Coordinated</strong> team event communication across players, families, and coaches, helping improve participation and schedule clarity.
          </div>
        </aside>
      </section>

      <section style={{ ...coachStyles.card, ...coachStyles.padding, marginTop: "22px" }}>
        <div style={coachStyles.eyebrow}>RÉSUMÉ HEALTH</div>
        <h2 style={coachStyles.title}>Section Review</h2>
        <div style={styles.grid}>
          {resumeSections.map((section) => (
            <article key={section.title} style={styles.card}>
              <div style={styles.top}><strong>{section.title}</strong><span>{section.status}</span></div>
              <div style={styles.score}><span>Strength</span><strong>{section.score}%</strong></div>
              <ProgressBar value={section.score} />
              <p style={styles.text}>{section.suggestion}</p>
              <button style={coachStyles.secondaryButton}>Improve Section</button>
            </article>
          ))}
        </div>
      </section>
    </AICoachShell>
  );
}

const styles: Record<string, React.CSSProperties> = {
  example: { marginTop: "20px", padding: "18px", background: "#F8FAFC", borderRadius: "14px", color: "#596273", fontSize: "12px", lineHeight: 1.7 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "16px", marginTop: "20px" },
  card: { padding: "18px", border: "1px solid #E3E8F0", borderRadius: "16px" },
  top: { display: "flex", justifyContent: "space-between", gap: "12px", fontSize: "12px" },
  score: { display: "flex", justifyContent: "space-between", margin: "14px 0 7px", color: "#596273", fontSize: "10px" },
  text: { minHeight: "62px", color: "#596273", fontSize: "10px", lineHeight: 1.6 },
};
