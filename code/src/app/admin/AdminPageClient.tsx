"use client";
import { useState, useEffect } from "react";

const ADMIN_KEY = "paradise-admin-2026";

export default function AdminPageClient() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [tab, setTab] = useState("bookings");
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const login = () => {
    if (pw === ADMIN_KEY) { setAuthed(true); }
    else { alert("Wrong password"); }
  };

  useEffect(() => {
    if (authed && tab === "bookings") { fetchBookings(); }
  }, [authed, tab]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const r = await fetch("/api/admin/bookings", { headers: { "x-admin-key": ADMIN_KEY } });
      const d = await r.json();
      setBookings(d.bookings || []);
    } catch (e) {}
    setLoading(false);
  };

  const updateStatus = async (id: number, status: string) => {
    await fetch("/api/admin/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-admin-key": ADMIN_KEY },
      body: JSON.stringify({ id, status }),
    });
    fetchBookings();
  };

  if (!authed) return (
    <div style={{ minHeight: "100vh", background: "#111", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#222", padding: "2rem", borderRadius: "1rem", width: "20rem" }}>
        <h1 style={{ color: "#fbbf24", textAlign: "center", marginBottom: "0.5rem" }}>Paradise City</h1>
        <p style={{ color: "#9ca3af", textAlign: "center", fontSize: "0.875rem", marginBottom: "1.5rem" }}>International Admin</p>
        <input
          type="password"
          value={pw}
          onChange={e => setPw(e.target.value)}
          onKeyDown={e => e.key === "Enter" && login()}
          placeholder="Admin Password"
          style={{ width: "100%", background: "#374151", color: "white", padding: "0.5rem 1rem", borderRadius: "0.5rem", marginBottom: "1rem", border: "none", outline: "none", boxSizing: "border-box" }}
        />
        <button onClick={login} style={{ width: "100%", background: "#f59e0b", color: "black", fontWeight: "bold", padding: "0.5rem", borderRadius: "0.5rem", border: "none", cursor: "pointer" }}>Login</button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#111827", color: "white", padding: "2rem" }}>
      <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <h1 style={{ color: "#fbbf24", fontSize: "1.5rem", fontWeight: "bold" }}>Paradise City International Admin</h1>
          <button onClick={() => setAuthed(false)} style={{ color: "#9ca3af", background: "none", border: "none", cursor: "pointer" }}>Logout</button>
        </div>
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
          <button
            onClick={() => setTab("bookings")}
            style={{ padding: "0.5rem 1rem", borderRadius: "0.5rem", border: "none", cursor: "pointer", background: tab === "bookings" ? "#f59e0b" : "#374151", color: tab === "bookings" ? "black" : "white", fontWeight: 600 }}
          >Bookings</button>
          <button
            onClick={() => setTab("contact")}
            style={{ padding: "0.5rem 1rem", borderRadius: "0.5rem", border: "none", cursor: "pointer", background: tab === "contact" ? "#f59e0b" : "#374151", color: tab === "contact" ? "black" : "white", fontWeight: 600 }}
          >Contact Info</button>
        </div>

        {tab === "bookings" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
              <h2 style={{ fontSize: "1.125rem", fontWeight: 600 }}>Booking List ({bookings.length})</h2>
              <button onClick={fetchBookings} style={{ background: "#374151", color: "white", padding: "0.25rem 0.75rem", borderRadius: "0.375rem", border: "none", cursor: "pointer", fontSize: "0.875rem" }}>Refresh</button>
            </div>
            {loading ? (
              <p style={{ color: "#9ca3af" }}>Loading...</p>
            ) : bookings.length === 0 ? (
              <p style={{ color: "#9ca3af" }}>No bookings yet.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {bookings.map((b: any) => (
                  <div key={b.id} style={{ background: "#1f2937", borderRadius: "0.75rem", padding: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <p style={{ fontWeight: 500 }}>{b.name} <span style={{ color: "#9ca3af", fontSize: "0.875rem" }}>{b.phone || b.email}</span></p>
                      <p style={{ color: "#9ca3af", fontSize: "0.875rem" }}>{b.service} · {b.date} · {b.people} pax</p>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <span style={{ padding: "0.25rem 0.5rem", borderRadius: "0.25rem", fontSize: "0.75rem", background: b.status === "confirmed" ? "#065f46" : b.status === "cancelled" ? "#7f1d1d" : "#374151" }}>{b.status || "pending"}</span>
                      <button onClick={() => updateStatus(b.id, "confirmed")} style={{ background: "#059669", color: "white", fontSize: "0.75rem", padding: "0.25rem 0.5rem", borderRadius: "0.25rem", border: "none", cursor: "pointer" }}>Confirm</button>
                      <button onClick={() => updateStatus(b.id, "cancelled")} style={{ background: "#dc2626", color: "white", fontSize: "0.75rem", padding: "0.25rem 0.5rem", borderRadius: "0.25rem", border: "none", cursor: "pointer" }}>Cancel</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === "contact" && (
          <div style={{ background: "#1f2937", borderRadius: "0.75rem", padding: "1.5rem" }}>
            <h2 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: "1rem" }}>Contact Information</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div style={{ background: "#374151", borderRadius: "0.5rem", padding: "1rem" }}>
                <p style={{ color: "#fbbf24", marginBottom: "0.5rem", fontWeight: 600 }}>Mr. Zhu</p>
                <p style={{ fontSize: "0.875rem", color: "#d1d5db", marginBottom: "0.25rem" }}>WhatsApp: +94 778 511 581</p>
                <p style={{ fontSize: "0.875rem", color: "#d1d5db", marginBottom: "0.25rem" }}>WeChat: +86 139 1071 3491</p>
                <p style={{ fontSize: "0.875rem", color: "#d1d5db", marginBottom: "0.25rem" }}>Tel: +86 13292199929</p>
                <p style={{ fontSize: "0.875rem", color: "#d1d5db" }}>Email: Hongwei@zxmy.info</p>
              </div>
              <div style={{ background: "#374151", borderRadius: "0.5rem", padding: "1rem" }}>
                <p style={{ color: "#fbbf24", marginBottom: "0.5rem", fontWeight: 600 }}>Ms. Liu</p>
                <p style={{ fontSize: "0.875rem", color: "#d1d5db", marginBottom: "0.25rem" }}>WhatsApp: +49 1514 287 3952</p>
                <p style={{ fontSize: "0.875rem", color: "#d1d5db", marginBottom: "0.25rem" }}>WeChat: +86 186 1011 5947</p>
                <p style={{ fontSize: "0.875rem", color: "#d1d5db", marginBottom: "0.25rem" }}>Tel: +86 186 1011 5947</p>
                <p style={{ fontSize: "0.875rem", color: "#d1d5db" }}>Email: Yilan@zxmy.info</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
