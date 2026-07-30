import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import { AdminHero, StatCard, ProgressBar, StatusPill, adminStyles } from "@/components/admin/Shared";
import { adminActivity, adminAlerts, adminStudents, cohorts, employers, facilitators, organizations, programs, reportMetrics } from "@/content/admin-portal";

export default function AdminDashboardPage() {
  return (
    <AdminShell activePath="/admin/dashboard">
      <AdminHero
        eyebrow="FUTURE READY™ OPERATING SYSTEM"
        title="Manage the people, programs, partners, and outcomes behind the platform."
        description="See the full ecosystem across schools, cohorts, students, facilitators, employers, curriculum, and reporting."
        meta={`${organizations.length} organizations • ${cohorts.length} cohorts • ${adminStudents.length} students`}
        symbol="◆"
      />

      <section style={adminStyles.statGrid}>
        <StatCard label="Organizations" value={organizations.length} description="Schools, employers, and partners" />
        <StatCard label="Active Students" value={adminStudents.length} description="Across all cohorts" />
        <StatCard label="Facilitators" value={facilitators.length} description="Assigned program leaders" />
        <StatCard label="Employer Partners" value={employers.length} description="Workforce pathway partners" />
        <StatCard label="Programs" value={programs.length} description="Active program models" />
      </section>

      <section style={adminStyles.gridTwo}>
        <div style={adminStyles.card}>
          <div style={adminStyles.padding}>
            <div style={adminStyles.eyebrow}>PROGRAM PERFORMANCE</div>
            <h2 style={adminStyles.title}>Platform Health</h2>
            <p style={adminStyles.description}>A high-level view of student progress and ecosystem activity.</p>
          </div>
          <div style={styles.metrics}>
            {reportMetrics.map((metric) => (
              <div key={metric.label} style={styles.metricRow}>
                <div style={styles.metricTop}><span>{metric.label}</span><strong>{metric.value}%</strong></div>
                <ProgressBar value={metric.value} />
              </div>
            ))}
          </div>
        </div>

        <aside style={styles.stack}>
          <div style={{ ...adminStyles.card, ...adminStyles.padding }}>
            <div style={adminStyles.eyebrow}>ADMIN ALERTS</div>
            <h2 style={adminStyles.title}>Needs Attention</h2>
            <div style={styles.list}>
              {adminAlerts.map((item) => (
                <div key={item.id} style={styles.listItem}>
                  <div style={styles.listTop}><strong>{item.title}</strong><StatusPill value={item.level} /></div>
                  <div style={styles.small}>{item.detail}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ ...adminStyles.card, ...adminStyles.padding }}>
            <div style={adminStyles.eyebrow}>RECENT ACTIVITY</div>
            <h2 style={adminStyles.title}>System Updates</h2>
            <div style={styles.list}>
              {adminActivity.map((item) => (
                <div key={item.id} style={styles.listItem}>
                  <strong>{item.title}</strong>
                  <div style={styles.small}>{item.detail}</div>
                  <div style={styles.time}>{item.time}</div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section style={{ ...adminStyles.card, ...adminStyles.padding, marginTop: "22px" }}>
        <div style={styles.heading}>
          <div>
            <div style={adminStyles.eyebrow}>ACTIVE COHORTS</div>
            <h2 style={adminStyles.title}>Program Delivery</h2>
          </div>
          <Link href="/admin/cohorts" style={styles.link}>Manage Cohorts →</Link>
        </div>

        <div style={styles.cohortGrid}>
          {cohorts.map((cohort) => (
            <article key={cohort.id} style={styles.cohortCard}>
              <div style={styles.listTop}><strong>{cohort.name}</strong><StatusPill value={cohort.status} /></div>
              <div style={styles.small}>{cohort.organization} • {cohort.program}</div>
              <div style={styles.cohortStats}>
                <Mini label="Students" value={cohort.students} />
                <Mini label="Week" value={cohort.currentWeek} />
                <Mini label="Facilitator" value={cohort.facilitator} />
              </div>
            </article>
          ))}
        </div>
      </section>
    </AdminShell>
  );
}

function Mini({ label, value }: { label: string; value: string | number }) {
  return <div><div style={styles.miniValue}>{value}</div><div style={styles.miniLabel}>{label}</div></div>;
}

const styles: Record<string, React.CSSProperties> = {
  metrics: { display: "grid", gap: "18px", padding: "0 24px 24px" },
  metricRow: {},
  metricTop: { display: "flex", justifyContent: "space-between", marginBottom: "7px", color: "#596273", fontSize: "11px" },
  stack: { display: "grid", gap: "18px" },
  list: { display: "grid", gap: "12px", marginTop: "18px" },
  listItem: { paddingBottom: "12px", borderBottom: "1px solid #EDF0F5", fontSize: "12px" },
  listTop: { display: "flex", justifyContent: "space-between", gap: "10px", alignItems: "center" },
  small: { marginTop: "5px", color: "#7A8494", fontSize: "9px", lineHeight: 1.5 },
  time: { marginTop: "5px", color: "#A47700", fontSize: "9px", fontWeight: 800 },
  heading: { display: "flex", justifyContent: "space-between", gap: "16px", flexWrap: "wrap", alignItems: "center" },
  link: { color: "#0D1B3D", textDecoration: "none", fontSize: "11px", fontWeight: 850 },
  cohortGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "16px", marginTop: "20px" },
  cohortCard: { padding: "20px", border: "1px solid #E3E8F0", borderRadius: "18px" },
  cohortStats: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "8px", marginTop: "16px", padding: "13px", background: "#F8FAFC", borderRadius: "12px", textAlign: "center" },
  miniValue: { fontSize: "13px", fontWeight: 900 },
  miniLabel: { marginTop: "4px", color: "#7A8494", fontSize: "8px" },
};
