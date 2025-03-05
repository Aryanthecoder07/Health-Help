import React from "react";
import { useNavigate } from "react-router-dom";

function SelectionPage() {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Select Your Learning Path</h1>
            
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <button onClick={() => navigate("/self-paced")} style={buttonStyle}>
                    Self-Paced Learning
                </button>
                <button onClick={() => navigate("/goal-based")} style={buttonStyle}>
                    Goal-Based Learning
                </button>
                <button onClick={() => navigate("/tracker")} style={buttonStyle}>
                    Fitness Tracker
                </button>
                <button onClick={() => navigate("/charts")} style={buttonStyle}>
                    Tracker Analysis
                </button>
            </div>
        </div>
    );
}

const buttonStyle = {
    margin: "10px",
    padding: "10px 20px",
    fontSize: "18px",
    cursor: "pointer",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007bff",
    color: "white",
};

export default SelectionPage;
