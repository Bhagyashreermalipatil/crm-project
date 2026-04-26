import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://crm-backend-le4t.onrender.com";

function App() {
  const [leads, setLeads] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [search, setSearch] = useState("");

  const fetchLeads = async () => {
    try {
      const res = await axios.get(`${API}/leads`);
      setLeads(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const addLead = async () => {
    if (!name || !email) return;

    await axios.post(`${API}/leads`, { name, email });
    setName("");
    setEmail("");
    fetchLeads();
  };

  const deleteLead = async (index) => {
    await axios.delete(`${API}/leads/${index}`);
    fetchLeads();
  };

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.app}>
      <aside style={styles.sidebar}>
        <h2>CRM Panel</h2>
        <p>Total Leads: {leads.length}</p>
      </aside>

      <main style={styles.main}>
        <h1 style={styles.title}>Lead Management Dashboard</h1>

        <div style={styles.form}>
          <input
            style={styles.input}
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button style={styles.addBtn} onClick={addLead}>
            Add Lead
          </button>
        </div>

        <input
          style={styles.search}
          placeholder="Search leads..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div style={styles.cards}>
          {filteredLeads.map((lead, index) => (
            <div key={index} style={styles.card}>
              <div>
                <h3>{lead.name}</h3>
                <p>{lead.email}</p>
              </div>

              <button
                style={styles.deleteBtn}
                onClick={() => deleteLead(index)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

const styles = {
  app: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
    background: "#f4f7fb",
  },

  sidebar: {
    width: "220px",
    background: "#1f2937",
    color: "white",
    padding: "30px 20px",
  },

  main: {
    flex: 1,
    padding: "30px",
  },

  title: {
    marginBottom: "20px",
  },

  form: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "20px",
  },

  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    flex: "1",
    minWidth: "180px",
  },

  addBtn: {
    padding: "10px 20px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },

  search: {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },

  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  deleteBtn: {
    background: "#dc2626",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default App;