import { notFound } from "next/navigation";
import EmployerShell from "@/components/employer/EmployerShell";
import { EmployerHero, StatCard, StatusPill, employerStyles } from "@/components/employer/Shared";
import { employerCandidates, internships } from "@/content/employer-portal";

export default async function InternshipDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const internship = internships.find((item) => item.id === id);
  if (!internship) notFound();

  const candidates = employerCandidates.slice(0, Math.max(3, internship.applicants));

  return (
    <EmployerShell activePath="/employer/internships">
      <EmployerHero
        eyebrow="INTERNSHIP PIPELINE"
        title={internship.title}
        description={internship.description}
        meta={`${internship.department} • ${internship.location} • ${internship.term}`}
        symbol="▣"
      />

      <section style={employerStyles.statGrid}>
        <StatCard label="Status" value={internship.status} description="Opportunity state" />
        <StatCard label="Applicants" value={internship.applicants} description="Students in pipeline" />
        <StatCard label="Interviews" value={internship.interviews} description="Scheduled conversations" />
        <StatCard label="Openings" value={internship.openings} description="Available placements" />
      </section>

      <section style={employerStyles.gridTwo}>
        <div style={{ ...employerStyles.card, ...employerStyles.padding }}>
          <div style={employerStyles.eyebrow}>CANDIDATE PIPELINE</div>
          <h2 style={employerStyles.title}>Students Under Consideration</h2>
          <div style={styles.list}>
            {candidates.map((candidate) => (
              <div key={candidate.id} style={styles.row}>
                <div style={styles.avatar}>{candidate.name.split(" ").map((part) => part[0]).join("").slice(0,2)}</div>
                <div style={styles.main}>
                  <div style={styles.top}><strong>{candidate.name}</strong><StatusPill value={candidate.status} /></div>
                  <div style={styles.small}>{candidate.readinessScore}% readiness • {candidate.topSkills.join(" • ")}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside style={{ ...employerStyles.card, ...employerStyles.padding }}>
          <div style={employerStyles.eyebrow}>OPPORTUNITY DETAILS</div>
          <h2 style={employerStyles.title}>Internship Information</h2>
          <div style={styles.details}>
            <Detail label="Department" value={internship.department} />
            <Detail label="Schedule" value={internship.schedule} />
            <Detail label="Term" value={internship.term} />
            <Detail label="Location" value={internship.location} />
          </div>
          <div style={styles.actions}>
            <button style={employerStyles.button}>Schedule Interviews</button>
            <button style={employerStyles.secondaryButton}>Edit Internship</button>
          </div>
        </aside>
      </section>
    </EmployerShell>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return <div style={styles.detail}><div style={styles.detailLabel}>{label}</div><strong>{value}</strong></div>;
}

const styles: Record<string, React.CSSProperties> = {
  list: { display: "grid", marginTop: "18px" },
  row: { display: "flex", gap: "12px", padding: "15px 0", borderBottom: "1px solid #EDF0F5" },
  avatar: { width: "42px", height: "42px", display: "grid", placeItems: "center", borderRadius: "999px", background: "#EAF2FF", color: "#24569B", fontSize: "11px", fontWeight: 900 },
  main: { flex: 1 },
  top: { display: "flex", justifyContent: "space-between", gap: "10px", fontSize: "12px" },
  small: { marginTop: "5px", color: "#7A8494", fontSize: "9px" },
  details: { display: "grid", gap: "0", marginTop: "18px" },
  detail: { padding: "13px 0", borderBottom: "1px solid #EDF0F5", fontSize: "12px" },
  detailLabel: { marginBottom: "4px", color: "#7A8494", fontSize: "8px", textTransform: "uppercase", letterSpacing: ".08em" },
  actions: { display: "grid", gap: "10px", marginTop: "18px" },
};
