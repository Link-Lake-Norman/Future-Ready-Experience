"use client";

import { useMemo, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { AdminHero, StatusPill, adminStyles } from "@/components/admin/Shared";
import { employers } from "@/content/admin-portal";

export default function Page() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => employers.filter((item) => JSON.stringify(item).toLowerCase().includes(query.toLowerCase())), [query]);

  return (
    <AdminShell activePath="/admin/employers">
      <AdminHero
        eyebrow="EMPLOYER MANAGEMENT"
        title="Manage workforce partners, internship opportunities, and placement activity."
        description="Search, review, and manage records across the Future Ready™ platform."
        meta={`${filtered.length} records shown`}
        symbol="◆"
      />

      <section style={{ ...adminStyles.card, marginTop: "22px" }}>
        <div style={adminStyles.padding}>
          <div style={adminStyles.eyebrow}>EMPLOYERS DIRECTORY</div>
          <h2 style={adminStyles.title}>Employers</h2>
        </div>

        <div style={adminStyles.toolbar}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search employers"
            style={{ ...adminStyles.input, flex: "1 1 320px" }}
          />
          <button style={adminStyles.button}>Add Employer</button>
        </div>

        <div style={styles.grid}>
          {filtered.map((item: any) => (
            <article key={item.id} style={styles.card}>
              <div style={styles.top}>
                <strong>{item.name}</strong>
                <StatusPill value={item.status} />
              </div>
              <div style={styles.rows}>
                {Object.entries(item).filter(([key]) => !["id","name","status"].includes(key)).slice(0,6).map(([key,value]) => (
                  <div key={key} style={styles.row}>
                    <span>{key.replace(/([A-Z])/g, " $1")}</span>
                    <strong>{String(value)}</strong>
                  </div>
                ))}
              </div>
              <div style={styles.actions}>
                <button style={adminStyles.secondaryButton}>View</button>
                <button style={adminStyles.secondaryButton}>Edit</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </AdminShell>
  );
}

const styles: Record<string, React.CSSProperties> = {
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "16px", padding: "22px" },
  card: { padding: "20px", border: "1px solid #E3E8F0", borderRadius: "18px" },
  top: { display: "flex", justifyContent: "space-between", gap: "12px", alignItems: "center", fontSize: "13px" },
  rows: { display: "grid", marginTop: "15px" },
  row: { display: "flex", justifyContent: "space-between", gap: "12px", padding: "9px 0", borderBottom: "1px solid #EDF0F5", color: "#596273", fontSize: "10px", textTransform: "capitalize" },
  actions: { display: "flex", gap: "8px", marginTop: "16px" },
};
