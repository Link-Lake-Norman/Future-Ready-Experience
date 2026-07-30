import AdminShell from "@/components/admin/AdminShell";
import { AdminHero, StatCard, ProgressBar, adminStyles } from "@/components/admin/Shared";
import { adminStudents, cohorts, employers, reportMetrics } from "@/content/admin-portal";

export default function ReportsPage() {
  const avgReadiness = Math.round(adminStudents.reduce((sum, item) => sum + item.readiness, 0) / adminStudents.length);
  const avgAttendance = Math.round(adminStudents.reduce((sum, item) => sum + item.attendance, 0) / adminStudents.length);

  return (
    <AdminShell activePath="/admin/reports">
      <AdminHero
        eyebrow="REPORTING CENTER"
        title="Turn program activity into evidence of impact."
        description="Review readiness, participation, employer engagement, cohort activity, and outcome indicators across Future Ready™."
        meta="System-wide reporting"
        symbol="↗"
      />

      <section style={adminStyles.statGrid}>
        <StatCard label="Average Readiness" value={`${avgReadiness}%`} description="Across visible students" />
        <StatCard label="Attendance Rate" value={`${avgAttendance}%`} description="Average student attendance" />
        <StatCard label="Active Cohorts" value={cohorts.filter((item) => item.status === "Active").length} description="Current program delivery" />
        <StatCard label="Employer Partners" value={employers.length} description="Participating workforce partners" />
      </section>

      <section style={adminStyles.gridTwo}>
        <div style={{ ...adminStyles.card, ...adminStyles.padding }}>
          <div style={adminStyles.eyebrow}>OUTCOME METRICS</div>
          <h2 style={adminStyles.title}>Program Performance</h2>
          <div style={styles.metrics}>
            {reportMetrics.map((metric) => (
              <div key={metric.label}>
                <div style={styles.top}><span>{metric.label}</span><strong>{metric.value}%</strong></div>
                <ProgressBar value={metric.value} />
              </div>
            ))}
          </div>
        </div>

        <div style={{ ...adminStyles.card, ...adminStyles.padding }}>
          <div style={adminStyles.eyebrow}>REPORT ACTIONS</div>
          <h2 style={adminStyles.title}>Export and Share</h2>
          <div style={styles.actions}>
            <button style={adminStyles.button}>Export Executive Report</button>
            <button style={adminStyles.secondaryButton}>Export Student Outcomes</button>
            <button style={adminStyles.secondaryButton}>Export Employer Engagement</button>
            <button style={adminStyles.secondaryButton}>Export Cohort Summary</button>
          </div>
          <p style={adminStyles.description}>These front-end actions will connect to PDF, spreadsheet, and scheduled reporting in the production phase.</p>
        </div>
      </section>
    </AdminShell>
  );
}

const styles: Record<string, React.CSSProperties> = {
  metrics: { display: "grid", gap: "19px", marginTop: "24px" },
  top: { display: "flex", justifyContent: "space-between", marginBottom: "7px", color: "#596273", fontSize: "11px" },
  actions: { display: "grid", gap: "10px", marginTop: "20px" },
};
