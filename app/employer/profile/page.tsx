import EmployerShell from "@/components/employer/EmployerShell";
import { EmployerHero, StatCard, employerStyles } from "@/components/employer/Shared";
import { employerProfile } from "@/content/employer-portal";

export default function EmployerProfilePage() {
  return (
    <EmployerShell activePath="/employer/profile">
      <EmployerHero
        eyebrow="EMPLOYER PROFILE"
        title={employerProfile.companyName}
        description="Your employer profile helps students and educators understand your industry, workplace, opportunities, and commitment to emerging talent."
        meta={`${employerProfile.industry} • ${employerProfile.location}`}
        symbol="◉"
      />

      <section style={employerStyles.statGrid}>
        <StatCard label="Active Internships" value={employerProfile.activeInternships} description="Current opportunities" />
        <StatCard label="Pipeline Students" value={employerProfile.studentsInPipeline} description="Active relationships" />
        <StatCard label="Interviews" value={employerProfile.interviewsScheduled} description="Scheduled conversations" />
        <StatCard label="Placements" value={employerProfile.placements} description="Completed placements" />
      </section>

      <section style={employerStyles.gridTwo}>
        <div style={{ ...employerStyles.card, ...employerStyles.padding }}>
          <div style={styles.identity}>
            <div style={styles.logo}>FR</div>
            <div>
              <div style={employerStyles.eyebrow}>COMPANY PROFILE</div>
              <h2 style={styles.name}>{employerProfile.companyName}</h2>
              <div style={styles.small}>{employerProfile.industry} • {employerProfile.location}</div>
            </div>
          </div>

          <div style={styles.sections}>
            <Section title="About the Organization" text="A regional employer committed to building stronger talent pipelines, creating meaningful work-based learning opportunities, and developing future-ready employees." />
            <Section title="Student Engagement" text="Career conversations, workplace tours, mock interviews, project-based experiences, internships, and mentorship." />
            <Section title="Priority Skills" text="Communication, professionalism, teamwork, problem-solving, adaptability, and leadership." />
          </div>
        </div>

        <aside style={{ ...employerStyles.card, ...employerStyles.padding }}>
          <div style={employerStyles.eyebrow}>PRIMARY CONTACT</div>
          <h2 style={employerStyles.title}>{employerProfile.contactName}</h2>
          <div style={styles.details}>
            <Detail label="Role" value={employerProfile.role} />
            <Detail label="Company" value={employerProfile.companyName} />
            <Detail label="Industry" value={employerProfile.industry} />
            <Detail label="Location" value={employerProfile.location} />
          </div>
          <button style={{ ...employerStyles.button, marginTop: "18px", width: "100%" }}>Edit Employer Profile</button>
        </aside>
      </section>
    </EmployerShell>
  );
}

function Section({ title, text }: { title: string; text: string }) {
  return <div><h3 style={styles.sectionTitle}>{title}</h3><p style={styles.sectionText}>{text}</p></div>;
}

function Detail({ label, value }: { label: string; value: string }) {
  return <div style={styles.detail}><div style={styles.label}>{label}</div><strong>{value}</strong></div>;
}

const styles: Record<string, React.CSSProperties> = {
  identity: { display: "flex", gap: "18px", alignItems: "center" },
  logo: { width: "78px", height: "78px", display: "grid", placeItems: "center", borderRadius: "18px", background: "#0D1B3D", color: "#F2B705", fontSize: "22px", fontWeight: 950 },
  name: { margin: "7px 0 0", fontSize: "28px" },
  small: { marginTop: "5px", color: "#7A8494", fontSize: "10px" },
  sections: { display: "grid", gap: "22px", marginTop: "28px" },
  sectionTitle: { margin: 0, fontSize: "14px" },
  sectionText: { margin: "8px 0 0", color: "#596273", fontSize: "11px", lineHeight: 1.7 },
  details: { display: "grid", marginTop: "18px" },
  detail: { padding: "13px 0", borderBottom: "1px solid #EDF0F5", fontSize: "12px" },
  label: { marginBottom: "4px", color: "#7A8494", fontSize: "8px", textTransform: "uppercase", letterSpacing: ".08em" },
};
