import Link from "next/link";
import EmployerShell from "@/components/employer/EmployerShell";
import { EmployerHero, StatCard, StatusPill, employerStyles } from "@/components/employer/Shared";
import { internships } from "@/content/employer-portal";

export default function InternshipsPage() {
  return (
    <EmployerShell activePath="/employer/internships">
      <EmployerHero
        eyebrow="INTERNSHIP MANAGEMENT"
        title="Create meaningful pathways into your organization."
        description="Manage internship opportunities, student pipelines, interview activity, and placement progress."
        meta={`${internships.length} internship opportunities`}
        symbol="▣"
      />

      <section style={employerStyles.statGrid}>
        <StatCard label="Open Roles" value={internships.filter((item) => item.status === "Open").length} description="Accepting candidates" />
        <StatCard label="Interviewing" value={internships.filter((item) => item.status === "Interviewing").length} description="Active selection process" />
        <StatCard label="Applicants" value={internships.reduce((sum, item) => sum + item.applicants, 0)} description="Across all opportunities" />
        <StatCard label="Openings" value={internships.reduce((sum, item) => sum + item.openings, 0)} description="Total available seats" />
      </section>

      <section style={{ ...employerStyles.card, ...employerStyles.padding, marginTop: "22px" }}>
        <div style={styles.heading}>
          <div>
            <div style={employerStyles.eyebrow}>OPPORTUNITY PIPELINE</div>
            <h2 style={employerStyles.title}>Internship Listings</h2>
          </div>
          <button style={employerStyles.button}>Create Internship</button>
        </div>

        <div style={styles.grid}>
          {internships.map((internship) => (
            <article key={internship.id} style={styles.card}>
              <div style={styles.top}><strong>{internship.title}</strong><StatusPill value={internship.status} /></div>
              <div style={styles.small}>{internship.department} • {internship.location}</div>
              <p style={styles.description}>{internship.description}</p>
              <div style={styles.details}>
                <Detail label="Term" value={internship.term} />
                <Detail label="Schedule" value={internship.schedule} />
                <Detail label="Applicants" value={String(internship.applicants)} />
                <Detail label="Openings" value={String(internship.openings)} />
              </div>
              <div style={styles.tags}>{internship.requiredSkills.map((skill) => <span key={skill} style={styles.tag}>{skill}</span>)}</div>
              <Link href={`/employer/internships/${internship.id}`} style={styles.link}>Manage Opportunity →</Link>
            </article>
          ))}
        </div>
      </section>
    </EmployerShell>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return <div><div style={styles.detailLabel}>{label}</div><strong>{value}</strong></div>;
}

const styles: Record<string, React.CSSProperties> = {
  heading: { display: "flex", justifyContent: "space-between", gap: "16px", flexWrap: "wrap", alignItems: "center" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: "16px", marginTop: "22px" },
  card: { padding: "20px", border: "1px solid #E3E8F0", borderRadius: "18px" },
  top: { display: "flex", justifyContent: "space-between", gap: "12px", alignItems: "center", fontSize: "13px" },
  small: { marginTop: "6px", color: "#7A8494", fontSize: "9px" },
  description: { minHeight: "60px", color: "#596273", fontSize: "11px", lineHeight: 1.6 },
  details: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", padding: "14px", background: "#F8FAFC", borderRadius: "12px", fontSize: "11px" },
  detailLabel: { marginBottom: "4px", color: "#7A8494", fontSize: "8px", textTransform: "uppercase", letterSpacing: ".08em" },
  tags: { display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "14px" },
  tag: { padding: "5px 8px", background: "#FFF7D6", color: "#725500", borderRadius: "999px", fontSize: "9px", fontWeight: 800 },
  link: { display: "inline-block", marginTop: "17px", color: "#0D1B3D", textDecoration: "none", fontSize: "11px", fontWeight: 850 },
};
