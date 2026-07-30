import Link from "next/link";
import AICoachShell from "@/components/ai-coach/AICoachShell";
import { CoachHero, StatCard, ProgressBar, coachStyles } from "@/components/ai-coach/Shared";
import { coachInsights, coachProfile, coachPrompts, studentGoals } from "@/content/ai-coach";

export default function AICoachHomePage() {
  return (
    <AICoachShell activePath="/ai-coach">
      <CoachHero
        eyebrow="PERSONALIZED FUTURE READY™ GUIDANCE"
        title={`Your next step is clearer when you know what to work on, ${coachProfile.studentName.split(" ")[0]}.`}
        description="Use the AI Coach to strengthen your résumé, prepare for interviews, reflect on growth, explore careers, and build goals."
        meta={`${coachProfile.currentPhase} • Week ${coachProfile.currentWeek} • ${coachProfile.readinessScore}% readiness`}
        symbol="✦"
      />

      <section style={coachStyles.statGrid}>
        <StatCard label="Readiness Score" value={`${coachProfile.readinessScore}%`} description="Current Future Ready™ indicator" />
        <StatCard label="Current Phase" value={coachProfile.currentPhase} description={`Week ${coachProfile.currentWeek}`} />
        <StatCard label="Active Goals" value={studentGoals.length} description="Current development priorities" />
        <StatCard label="Top Skill" value={coachProfile.topSkills[0]} description="Strongest demonstrated pattern" />
      </section>

      <section style={coachStyles.gridTwo}>
        <div style={{ ...coachStyles.card, ...coachStyles.padding }}>
          <div style={coachStyles.eyebrow}>START A COACHING SESSION</div>
          <h2 style={coachStyles.title}>Choose What You Want to Work On</h2>
          <div style={styles.promptGrid}>
            {coachPrompts.map((prompt) => (
              <Link key={prompt.id} href={modeHref(prompt.mode)} style={styles.promptCard}>
                <div style={styles.mode}>{prompt.mode}</div>
                <h3 style={styles.promptTitle}>{prompt.title}</h3>
                <p style={styles.small}>{prompt.description}</p>
                <div style={styles.start}>Start Session →</div>
              </Link>
            ))}
          </div>
        </div>

        <aside style={{ ...coachStyles.card, ...coachStyles.padding }}>
          <div style={coachStyles.eyebrow}>COACH INSIGHTS</div>
          <h2 style={coachStyles.title}>What Your Progress Shows</h2>
          <div style={styles.insightList}>
            {coachInsights.map((insight) => (
              <div key={insight.title} style={styles.insight}>
                <strong>{insight.title}</strong>
                <p>{insight.text}</p>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section style={{ ...coachStyles.card, ...coachStyles.padding, marginTop: "22px" }}>
        <div style={coachStyles.eyebrow}>ACTIVE GOALS</div>
        <h2 style={coachStyles.title}>Your Current Priorities</h2>
        <div style={styles.goalGrid}>
          {studentGoals.map((goal) => (
            <article key={goal.id} style={styles.goalCard}>
              <div style={styles.goalCategory}>{goal.category}</div>
              <strong>{goal.title}</strong>
              <div style={styles.goalTop}><span>Progress</span><strong>{goal.progress}%</strong></div>
              <ProgressBar value={goal.progress} />
              <p style={styles.small}>{goal.nextStep}</p>
            </article>
          ))}
        </div>
      </section>
    </AICoachShell>
  );
}

function modeHref(mode: string) {
  if (mode.includes("Career")) return "/ai-coach/career";
  if (mode.includes("Resume")) return "/ai-coach/resume";
  if (mode.includes("Interview")) return "/ai-coach/interview";
  if (mode.includes("Reflection")) return "/ai-coach/reflection";
  return "/ai-coach/goals";
}

const styles: Record<string, React.CSSProperties> = {
  promptGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "14px", marginTop: "22px" },
  promptCard: { padding: "18px", border: "1px solid #E3E8F0", borderRadius: "16px", textDecoration: "none", color: "#0D1B3D" },
  mode: { color: "#A47700", fontSize: "9px", fontWeight: 900, letterSpacing: ".08em" },
  promptTitle: { margin: "9px 0 0", fontSize: "15px" },
  small: { marginTop: "8px", color: "#6B7280", fontSize: "10px", lineHeight: 1.6 },
  start: { marginTop: "13px", fontSize: "10px", fontWeight: 850 },
  insightList: { display: "grid", gap: "14px", marginTop: "20px" },
  insight: { paddingBottom: "14px", borderBottom: "1px solid #EDF0F5", fontSize: "12px" },
  goalGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "16px", marginTop: "20px" },
  goalCard: { padding: "18px", border: "1px solid #E3E8F0", borderRadius: "16px", fontSize: "12px" },
  goalCategory: { marginBottom: "8px", color: "#A47700", fontSize: "9px", fontWeight: 900, letterSpacing: ".08em" },
  goalTop: { display: "flex", justifyContent: "space-between", margin: "14px 0 7px", color: "#596273", fontSize: "10px" },
};
