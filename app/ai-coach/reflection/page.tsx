"use client";

import { useState } from "react";
import AICoachShell from "@/components/ai-coach/AICoachShell";
import { CoachHero, coachStyles } from "@/components/ai-coach/Shared";
import { reflectionFramework } from "@/content/ai-coach";

export default function ReflectionCoachPage() {
  const [reflection, setReflection] = useState("");

  return (
    <AICoachShell activePath="/ai-coach/reflection">
      <CoachHero
        eyebrow="REFLECTION COACH"
        title="Move beyond what happened and show how you grew."
        description="Build stronger reflections that demonstrate self-awareness, learning, skill development, and next steps."
        meta="Evidence-based reflection"
        symbol="◌"
      />

      <section style={coachStyles.gridTwo}>
        <div style={{ ...coachStyles.card, ...coachStyles.padding }}>
          <div style={coachStyles.eyebrow}>REFLECTION BUILDER</div>
          <h2 style={coachStyles.title}>Paste or Draft Your Reflection</h2>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="Write about a class, project, team experience, challenge, or workplace activity."
            style={{ ...coachStyles.textarea, marginTop: "18px", minHeight: "220px" }}
          />
          <button style={{ ...coachStyles.button, marginTop: "12px" }}>Strengthen My Reflection</button>
        </div>

        <aside style={{ ...coachStyles.card, ...coachStyles.padding }}>
          <div style={coachStyles.eyebrow}>REFLECTION FRAMEWORK</div>
          <h2 style={coachStyles.title}>Four Questions to Answer</h2>
          <div style={styles.list}>
            {reflectionFramework.map((item, index) => (
              <div key={item.label} style={styles.item}>
                <div style={styles.number}>{index + 1}</div>
                <div><strong>{item.label}</strong><p>{item.prompt}</p></div>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section style={{ ...coachStyles.card, ...coachStyles.padding, marginTop: "22px" }}>
        <div style={coachStyles.eyebrow}>QUALITY CHECK</div>
        <h2 style={coachStyles.title}>Your Reflection Should Include</h2>
        <div style={styles.checkGrid}>
          {["A specific experience", "Your role and choices", "A skill you used", "What changed in your thinking", "Evidence of growth", "A clear next step"].map((item) => (
            <div key={item} style={styles.check}>✓ {item}</div>
          ))}
        </div>
      </section>
    </AICoachShell>
  );
}

const styles: Record<string, React.CSSProperties> = {
  list: { display: "grid", gap: "14px", marginTop: "20px" },
  item: { display: "flex", gap: "12px", paddingBottom: "14px", borderBottom: "1px solid #EDF0F5", fontSize: "12px" },
  number: { width: "28px", height: "28px", display: "grid", placeItems: "center", borderRadius: "999px", background: "#FFF7D6", color: "#725500", fontSize: "10px", fontWeight: 900, flexShrink: 0 },
  checkGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "12px", marginTop: "20px" },
  check: { padding: "14px", background: "#F8FAFC", borderRadius: "12px", color: "#596273", fontSize: "11px" },
};
