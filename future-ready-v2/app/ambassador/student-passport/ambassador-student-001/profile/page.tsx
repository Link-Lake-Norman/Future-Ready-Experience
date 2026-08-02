import StudentShell from "@/components/student/StudentShell";
import { StudentHero, studentStyles } from "@/components/student/Shared";
import { studentProfile } from "@/content/student-portal";

export default function ProfilePage() {
  return (
    <StudentShell activePath="/ambassador/student-passport/ambassador-student-001/profile">
      <StudentHero
        eyebrow="MY PROFILE"
        title="Know who you are before deciding where you are going."
        description="Your profile captures the strengths, values, interests, and experiences shaping your next chapter."
        meta={`${studentProfile.school} • ${studentProfile.cohort}`}
        symbol="◉"
      />

      <section style={studentStyles.gridTwo}>
        <div style={{ ...studentStyles.card, ...studentStyles.padding }}>
          <div style={styles.identity}>
            <div style={styles.avatar}>{studentProfile.initials}</div>
            <div>
              <div style={studentStyles.eyebrow}>STUDENT IDENTITY</div>
              <h2 style={styles.name}>{studentProfile.name}</h2>
              <p style={studentStyles.sectionDescription}>{studentProfile.headline}</p>
            </div>
          </div>

          <div style={styles.sections}>
            <ProfileSection title="My Strengths" values={studentProfile.strengths} />
            <ProfileSection title="My Values" values={studentProfile.values} />
            <ProfileSection title="My Career Interests" values={studentProfile.careerInterests} />
          </div>
        </div>

        <aside style={{ ...studentStyles.card, ...studentStyles.padding }}>
          <div style={studentStyles.eyebrow}>PROFILE DETAILS</div>
          <h2 style={studentStyles.sectionTitle}>Student Information</h2>
          <div style={styles.details}>
            <Detail label="School" value={studentProfile.school} />
            <Detail label="Cohort" value={studentProfile.cohort} />
            <Detail label="Grade" value={studentProfile.grade} />
            <Detail label="Current Phase" value={studentProfile.currentPhase} />
            <Detail label="Current Week" value={`Week ${studentProfile.currentWeek}`} />
            <Detail label="Email" value={studentProfile.email} />
          </div>
        </aside>
      </section>
    </StudentShell>
  );
}

function ProfileSection({ title, values }: { title: string; values: string[] }) {
  return (
    <div>
      <h3 style={styles.sectionTitle}>{title}</h3>
      <div style={styles.tags}>{values.map((value) => <span key={value} style={styles.tag}>{value}</span>)}</div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return <div style={styles.detail}><div style={styles.label}>{label}</div><strong>{value}</strong></div>;
}

const styles: Record<string, React.CSSProperties> = {
  identity: { display: "flex", gap: "18px", alignItems: "center" },
  avatar: { width: "78px", height: "78px", display: "grid", placeItems: "center", borderRadius: "999px", background: "#EAF2FF", color: "#24569B", fontWeight: 950, fontSize: "22px" },
  name: { margin: "6px 0 0", fontSize: "30px" },
  sections: { display: "grid", gap: "24px", marginTop: "30px" },
  sectionTitle: { margin: 0, fontSize: "14px", color: "#0D1B3D" },
  tags: { display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "10px" },
  tag: { padding: "7px 10px", borderRadius: "999px", background: "#FFF7D6", color: "#725500", fontSize: "10px", fontWeight: 800 },
  details: { display: "grid", gap: "0", marginTop: "20px" },
  detail: { padding: "14px 0", borderBottom: "1px solid #EDF0F5", fontSize: "12px" },
  label: { marginBottom: "5px", color: "#7A8494", fontSize: "9px", fontWeight: 850, textTransform: "uppercase", letterSpacing: ".08em" },
};
