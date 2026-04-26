
import React, { useEffect, useState } from "react";
import axios from "axios";

// Live backend URL
const API = "https://crm-backend-le4t.onrender.com";

function App() {
  const [leads, setLeads] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Fetch leads from backend
  const fetchLeads = async () => {
    try {
      const res = await axios.get(`${API}/leads`);
      setLeads(res.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Add new lead
  const addLead = async () => {
    if (!name || !email) return;

    try {
      await axios.post(`${API}/leads`, { name, email });
      fetchLeads();
      setName("");
      setEmail("");
    } catch (error) {
      console.error("Error adding lead:", error);
    }
  };

  // Delete lead
  const deleteLead = async (index) => {
    try {
      await axios.delete(`${API}/leads/${index}`);
      fetchLeads();
    } catch (error) {
      console.error("Error deleting lead:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>CRM Dashboard</h2>

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

      <ul style={styles.list}>
        {leads.map((lead, index) => (
          <li key={index} style={styles.card}>
            <div>
              <strong>{lead.name}</strong>
              <br />
              <span>{lead.email}</span>
            </div>

            <button
              style={styles.deleteBtn}
              onClick={() => deleteLead(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Styling
const styles = {
  container: {
    maxWidth: "500px",
    margin: "40px auto",
    padding: "20px",
    borderRadius: "10px",
    background: "#f4f6f8",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    fontFamily: "Arial",
  },

  title: {
    textAlign: "center",
    marginBottom: "20px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },

  addBtn: {
    padding: "10px",
    background: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },

  list: {
    marginTop: "20px",
    listStyle: "none",
    padding: 0,
  },

  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "white",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "10px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },

  deleteBtn: {
    background: "red",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default App;