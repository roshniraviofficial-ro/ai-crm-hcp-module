import { useState } from "react";
import axios from "axios";
import Groq from "groq-sdk";
import { useDispatch, useSelector } from "react-redux";
import { addInteraction } from "./store/interactionSlice.js";

function App() {
  const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

const [aiText, setAiText] = useState("");
  const dispatch = useDispatch();
  const interactions = useSelector((state) => state.interactions.interactions);

  const [form, setForm] = useState({
    hcpName: "",
    specialty: "",
    interactionType: "Visit",
    interactionDate: "",
    notes: "",
    samplesGiven: "",
    nextFollowUp: "",
  });

  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://127.0.0.1:8000/interactions", form);
      dispatch(addInteraction(form));
      alert("Interaction saved!");
    } catch (error) {
      console.log(error);
      alert("Error saving interaction");
    }
  };
    const filteredInteractions = interactions.filter((item) =>
    item.hcpName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <div>
          <h1 style={{ margin: 0 }}>AI First CRM</h1>
          <p style={{ margin: "6px 0 0", color: "#64748b" }}>
            HCP Log Interaction Module
          </p>
        </div>
        <span style={badgeStyle}>React + Redux + FastAPI</span>
      </header>

      <div style={gridStyle}>
        <section style={cardStyle}>
          <h2>Structured Interaction Form</h2>

          <form onSubmit={handleSubmit}>
            <input name="hcpName" placeholder="HCP / Doctor Name" style={inputStyle} onChange={handleChange} />
            <input name="specialty" placeholder="Specialty" style={inputStyle} onChange={handleChange} />

            <select name="interactionType" style={inputStyle} onChange={handleChange}>
              <option>Visit</option>
              <option>Call</option>
              <option>Email</option>
              <option>Meeting</option>
            </select>

            <input name="interactionDate" type="date" style={inputStyle} onChange={handleChange} />
            <textarea name="notes" placeholder="Discussion Notes" style={textareaStyle} onChange={handleChange} />
            <input name="samplesGiven" placeholder="Samples Given" style={inputStyle} onChange={handleChange} />
            <input name="nextFollowUp" type="date" style={inputStyle} onChange={handleChange} />

            <button type="submit" style={primaryButton}>
              Save Interaction
            </button>
          </form>
        </section>

        <section style={cardStyle}>
          <h2>AI Chat Assistant</h2>
          <textarea
            placeholder="Example: Met Dr Priya Sharma regarding laser treatment. Samples given skin care kit. Follow up next week..."
            style={chatStyle}
            value={aiText}
            onChange={(e) =>
              setAiText(e.target.value)
            }
          />
          <button style={secondaryButton}>Generate Form</button>

          <div style={tipBox}>
            <strong>Coming next:</strong> Groq + LangGraph will convert chat text into form fields automatically.
          </div>
        </section>
      </div>

      <section style={cardStyle}>
        <div style={tableHeader}>
          <h2>Interaction History</h2>
          <input
            placeholder="Search by doctor name..."
            style={searchStyle}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Doctor</th>
              <th style={thStyle}>Specialty</th>
              <th style={thStyle}>Type</th>
              <th style={thStyle}>Notes</th>
              <th style={thStyle}>Follow-up</th>
            </tr>
          </thead>
          <tbody>
            {filteredInteractions.map((item, index) => (
              <tr key={index}>
                <td style={tdStyle}>{item.hcpName}</td>
                <td style={tdStyle}>{item.specialty}</td>
                <td style={tdStyle}>{item.interactionType}</td>
                <td style={tdStyle}>{item.notes}</td>
                <td style={tdStyle}>{item.nextFollowUp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

const pageStyle = {
  fontFamily: "Inter, Arial, sans-serif",
  background: "#eef4ff",
  minHeight: "100vh",
  padding: "30px",
};

const headerStyle = {
  maxWidth: "1200px",
  margin: "0 auto 25px",
  background: "white",
  padding: "24px",
  borderRadius: "18px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0 10px 25px rgba(15,23,42,0.08)",
};

const badgeStyle = {
  background: "#dbeafe",
  color: "#1d4ed8",
  padding: "10px 14px",
  borderRadius: "999px",
  fontWeight: "600",
};

const gridStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "1.2fr 1fr",
  gap: "24px",
};

const cardStyle = {
  background: "white",
  padding: "24px",
  borderRadius: "18px",
  boxShadow: "0 10px 25px rgba(15,23,42,0.08)",
  marginBottom: "24px",
};

const inputStyle = {
  width: "100%",
  padding: "13px",
  marginBottom: "14px",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
  fontSize: "15px",
};

const textareaStyle = {
  ...inputStyle,
  height: "110px",
};

const chatStyle = {
  ...inputStyle,
  height: "260px",
};

const primaryButton = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "13px 20px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "600",
};

const secondaryButton = {
  ...primaryButton,
  background: "#0f172a",
};

const tipBox = {
  marginTop: "18px",
  background: "#f8fafc",
  padding: "14px",
  borderRadius: "12px",
  color: "#475569",
};

const tableHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const searchStyle = {
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
  width: "260px",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "15px",
};

const thStyle = {
  textAlign: "left",
  padding: "12px",
  background: "#f1f5f9",
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #e2e8f0",
};

export default App;