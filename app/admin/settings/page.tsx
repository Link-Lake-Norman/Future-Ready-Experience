import AdminShell from "@/components/admin/AdminShell";
import { AdminHero, adminStyles } from "@/components/admin/Shared";

export default function SettingsPage() {
  return (
    <AdminShell activePath="/admin/settings">
      <AdminHero
        eyebrow="SYSTEM SETTINGS"
        title="Configure the Future Ready™ platform."
        description="Manage program defaults, permissions, branding, notifications, integrations, and system behavior."
        meta="Administrator controls"
        symbol="⚙"
      />

      <section style={adminStyles.gridTwo}>
        <div style={{ ...adminStyles.card, ...adminStyles.padding }}>
          <div style={adminStyles.eyebrow}>PLATFORM CONFIGURATION</div>
          <h2 style={adminStyles.title}>General Settings</h2>
          <div style={styles.form}>
            <Field label="Platform Name" value="Future Ready™" />
            <Field label="Brand Promise" value="Discover Purpose. Build Skills. Launch Your Future." />
            <Field label="Default Program Length" value="36 weeks" />
            <Field label="Default Time Zone" value="Eastern Time" />
          </div>
          <button style={{ ...adminStyles.button, marginTop: "18px" }}>Save Settings</button>
        </div>

        <div style={{ ...adminStyles.card, ...adminStyles.padding }}>
          <div style={adminStyles.eyebrow}>PRODUCTION ROADMAP</div>
          <h2 style={adminStyles.title}>Next System Connections</h2>
          <div style={styles.list}>
            <Item title="Authentication" text="Role-based access for students, facilitators, employers, and administrators." />
            <Item title="Database" text="Persistent records for users, cohorts, lessons, evidence, and reporting." />
            <Item title="Notifications" text="Email and in-platform alerts for reviews, assignments, and milestones." />
            <Item title="Integrations" text="Calendar, file storage, AI coaching, reporting, and employer messaging." />
          </div>
        </div>
      </section>
    </AdminShell>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return <label style={styles.field}><span>{label}</span><input defaultValue={value} style={adminStyles.input} /></label>;
}

function Item({ title, text }: { title: string; text: string }) {
  return <div style={styles.item}><strong>{title}</strong><p>{text}</p></div>;
}

const styles: Record<string, React.CSSProperties> = {
  form: { display: "grid", gap: "14px", marginTop: "20px" },
  field: { display: "grid", gap: "7px", color: "#596273", fontSize: "10px", fontWeight: 800 },
  list: { display: "grid", gap: "14px", marginTop: "20px" },
  item: { paddingBottom: "14px", borderBottom: "1px solid #EDF0F5", fontSize: "12px" },
};
