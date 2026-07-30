import StudentShell from "@/components/student/StudentShell";
import { StudentHero, MetricCard, Pill, studentStyles } from "@/components/student/Shared";
import { portfolioItems, studentProfile } from "@/content/student-portal";

export default function PortfolioPage() {
  const complete = portfolioItems.filter((item) => item.status === "Complete").length;

  return (
    <StudentShell activePath="/ambassador/student-passport/ambassador-student-001/portfolio">
      <StudentHero
        eyebrow="MY PORTFOLIO"
        title="Build proof of what you can do."
        description="Your portfolio turns learning into visible evidence for employers, mentors, educators, and future opportunities."
        meta={`${studentProfile.name} • ${studentProfile.portfolioProgress}% portfolio progress`}
        symbol="▣"
      />

      <section style={studentStyles.metricGrid}>
        <MetricCard label="Portfolio Progress" value={`${studentProfile.portfolioProgress}%`} description="Overall evidence completion" />
        <MetricCard label="Completed Items" value={complete} description="Ready to share" />
        <MetricCard label="In Progress" value={portfolioItems.length - complete} description="Evidence being developed" />
        <MetricCard label="Total Items" value={portfolioItems.length} description="Current portfolio collection" />
      </section>

      <section style={{ ...studentStyles.card, ...studentStyles.padding, marginTop: "22px" }}>
        <div style={studentStyles.eyebrow}>PORTFOLIO EVIDENCE</div>
        <h2 style={studentStyles.sectionTitle}>My Work and Growth</h2>
        <div style={styles.grid}>
          {portfolioItems.map((item) => (
            <article key={item.id} style={styles.card}>
              <div style={styles.top}><div style={styles.icon}>▣</div><Pill value={item.status} /></div>
              <h3 style={styles.title}>{item.title}</h3>
              <div style={styles.meta}>{item.category} • {item.evidenceType}</div>
              <p style={styles.description}>{item.description}</p>
              <div style={styles.updated}>Updated {item.updated}</div>
            </article>
          ))}
        </div>
      </section>
    </StudentShell>
  );
}

const styles: Record<string, React.CSSProperties> = {
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "16px", marginTop: "20px" },
  card: { padding: "20px", border: "1px solid #E3E8F0", borderRadius: "18px" },
  top: { display: "flex", justifyContent: "space-between", gap: "12px" },
  icon: { color: "#F2B705", fontSize: "25px" },
  title: { margin: "16px 0 0", fontSize: "16px" },
  meta: { marginTop: "6px", color: "#A47700", fontSize: "9px", fontWeight: 850 },
  description: { minHeight: "62px", color: "#596273", fontSize: "11px", lineHeight: 1.65 },
  updated: { marginTop: "14px", color: "#7A8494", fontSize: "9px" },
};
