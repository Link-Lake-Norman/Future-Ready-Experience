import StudentShell from "@/components/student/StudentShell";
import { StudentHero, MetricCard, Pill, studentStyles } from "@/components/student/Shared";
import { studentProfile, studentReflections } from "@/content/student-portal";

export default function ReflectionsPage() {
  return (
    <StudentShell activePath="/ambassador/student-passport/ambassador-student-001/reflections">
      <StudentHero
        eyebrow="MY REFLECTIONS"
        title="Growth becomes powerful when you can name it."
        description="Your reflections help you understand how your experiences are changing your skills, confidence, and decisions."
        meta={`${studentProfile.reflectionsCompleted} reflections completed`}
        symbol="◫"
      />

      <section style={studentStyles.metricGrid}>
        <MetricCard label="Completed" value={studentProfile.reflectionsCompleted} description="Total reflections submitted" />
        <MetricCard label="Approved" value={studentReflections.filter((item) => item.status === "Approved").length} description="Facilitator reviewed" />
        <MetricCard label="Current Phase" value={studentProfile.currentPhase} description={`Week ${studentProfile.currentWeek}`} />
      </section>

      <section style={{ ...studentStyles.card, ...studentStyles.padding, marginTop: "22px" }}>
        <div style={studentStyles.eyebrow}>REFLECTION JOURNAL</div>
        <h2 style={studentStyles.sectionTitle}>My Learning and Growth</h2>
        <div style={styles.list}>
          {studentReflections.map((item) => (
            <article key={item.id} style={styles.card}>
              <div style={styles.top}>
                <div><strong>{item.lesson}</strong><div style={styles.date}>{item.date}</div></div>
                <Pill value={item.status} />
              </div>
              <div style={styles.prompt}><div style={styles.label}>PROMPT</div>{item.prompt}</div>
              <div style={styles.response}><div style={styles.label}>MY RESPONSE</div>{item.response}</div>
              <div style={styles.feedback}><div style={styles.label}>FACILITATOR FEEDBACK</div>{item.feedback}</div>
            </article>
          ))}
        </div>
      </section>
    </StudentShell>
  );
}

const styles: Record<string, React.CSSProperties> = {
  list: { display: "grid", gap: "16px", marginTop: "20px" },
  card: { padding: "20px", border: "1px solid #E3E8F0", borderRadius: "18px" },
  top: { display: "flex", justifyContent: "space-between", gap: "12px" },
  date: { marginTop: "4px", color: "#7A8494", fontSize: "9px" },
  label: { marginBottom: "6px", color: "#A47700", fontSize: "9px", fontWeight: 900, letterSpacing: ".1em" },
  prompt: { marginTop: "18px", padding: "13px", background: "#F8FAFC", borderRadius: "12px", color: "#596273", fontSize: "11px", lineHeight: 1.6 },
  response: { marginTop: "13px", color: "#0D1B3D", fontSize: "12px", lineHeight: 1.7 },
  feedback: { marginTop: "14px", paddingTop: "14px", borderTop: "1px solid #EDF0F5", color: "#596273", fontSize: "11px", lineHeight: 1.6 },
};
