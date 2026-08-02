"use client";

import { useState } from "react";
import AICoachShell from "@/components/ai-coach/AICoachShell";
import { CoachHero, ProgressBar, coachStyles } from "@/components/ai-coach/Shared";
import { coachProfile, suggestedCareerPaths } from "@/content/ai-coach";

export default function CareerCoachPage() {
  const [response, setResponse] = useState("");

  return (
    <AICoachShell activePath="/ai-coach/career">
      <CoachHero
        eyebrow="CAREER COACH"
        title="Connect who you are to where you could go."
        description="Explore career paths based on your interests, strengths, values, and demonstrated skills."
        meta={coachProfile.careerInterests.join(" • ")}
        symbol="⌖"
      />

      <section style={coachStyles.gridTwo}>
        <div style={{ ...coachStyles.card, ...coachStyles.padding }}>
          <div style={coachStyles.eyebrow}>CAREER EXPLORATION PROMPT</div>
          <h2 style={coachStyles.title}>What are you trying to understand?</h2>
          <textarea
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="Example: I like leadership, sports, business, and working with people, but I am not sure what careers fit."
            style={{ ...coachStyles.textarea, marginTop: "18px" }}
          />
          <button style={{ ...coachStyles.button, marginTop: "12px" }}>Analyze My Direction</button>
          <p style={coachStyles.description}>This prototype captures the coaching workflow. Live AI responses will connect during the production integration phase.</p>
        </div>

        <aside style={{ ...coachStyles.card, ...coachStyles.padding }}>
          <div style={coachStyles.eyebrow}>YOUR CURRENT PATTERN</div>
          <h2 style={coachStyles.title}>Skills and Interests</h2>
          <div style={styles.tags}>{[...coachProfile.topSkills, ...coachProfile.careerInterests].map((item) => <span key={item} style={styles.tag}>{item}</span>)}</div>
        </aside>
      </section>

      <section style={{ ...coachStyles.card, ...coachStyles.padding, marginTop: "22px" }}>
        <div style={coachStyles.eyebrow}>SUGGESTED PATHWAYS</div>
        <h2 style={coachStyles.title}>Career Directions to Explore</h2>
        <div style={styles.grid}>
          {suggestedCareerPaths.map((path) => (
            <article key={path.title} style={styles.card}>
              <div style={styles.top}><strong>{path.title}</strong><span>{path.match}% match</span></div>
              <ProgressBar value={path.match} />
              <p style={styles.text}>{path.reason}</p>
              <div style={styles.next}>Next steps</div>
              <ul style={styles.list}>{path.nextSteps.map((step) => <li key={step}>{step}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>
    </AICoachShell>
  );
}

const styles: Record<string, React.CSSProperties> = {
  tags: { display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "18px" },
  tag: { padding: "7px 10px", background: "#FFF7D6", color: "#725500", borderRadius: "999px", fontSize: "10px", fontWeight: 800 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "16px", marginTop: "20px" },
  card: { padding: "19px", border: "1px solid #E3E8F0", borderRadius: "16px" },
  top: { display: "flex", justifyContent: "space-between", gap: "12px", marginBottom: "10px", fontSize: "12px" },
  text: { color: "#596273", fontSize: "10px", lineHeight: 1.6 },
  next: { marginTop: "12px", fontSize: "9px", fontWeight: 900, textTransform: "uppercase", letterSpacing: ".08em" },
  list: { paddingLeft: "18px", color: "#596273", fontSize: "10px", lineHeight: 1.7 },
};
