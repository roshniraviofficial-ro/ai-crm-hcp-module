import axios from "axios";
import {useState } from "react";
import { addInteraction } from "./store/interactionSlice.js" ;
import { useDispatch, useSelector } from "react-redux";


function App() {
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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
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
  return (
    <div style={pageStyle}>
      <h1>AI First CRM - HCP Module</h1>
      <p>Log Interaction Screen</p>

      <div style={containerStyle}>
        <div style={cardStyle}>
          <h2>Structured Form</h2>

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

            <button style={buttonStyle}>Save Interaction</button>
          </form>
        </div>

        <div style={cardStyle}>
          <h2>AI Chat Assistant</h2>
          <textarea
            placeholder="Example: Log a visit with Dr Kumar about diabetes drug discussion..."
            style={chatStyle}
          />
          <button style={buttonStyle}>Generate Form</button>
        </div>
      </div>

      <div style={cardStyle}>
        <h2>Saved Interactions</h2>
        {interactions.map((item, index) => (
          <p key={index}>
            {item.hcpName} - {item.interactionType} - {item.notes}
          </p>
        ))}
      </div>
    </div>
  );
}

const pageStyle = {
  fontFamily: "Inter, Arial, sans-serif",
  background: "#f4f7fb",
  minHeight: "100vh",
  padding: "30px",
  textAlign: "center",
};

const containerStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "25px",
  maxWidth: "1100px",
  margin: "30px auto",
};

const cardStyle = {
  background: "white",
  padding: "25px",
  borderRadius: "14px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  textAlign: "left",
  maxWidth: "1100px",
  margin: "20px auto",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "14px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
};

const textareaStyle = {
  ...inputStyle,
  height: "100px",
};

const chatStyle = {
  ...inputStyle,
  height: "220px",
};

const buttonStyle = {
  background: "#2563eb",
  color: "white",
  padding: "12px 20px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

export default App;