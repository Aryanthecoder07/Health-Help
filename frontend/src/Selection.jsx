import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SelfPaced from "./SelfPaced";
import GoalBased from "./GoalBased";
import Home from "./Home";
import Login from "./Login";
import SelectionPage from "./PageSelection"; 
import Tracker from "./Tracker";
import TrackCharts from "./charts";

function Selection() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log("Checking Token:", token);
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />
        <Route path="/select" element={isAuthenticated ? <SelectionPage /> : <Navigate to="/login" />} />
        <Route path="/self-paced" element={isAuthenticated ? <SelfPaced /> : <Navigate to="/login" />} />
        <Route path="/goal-based" element={isAuthenticated ? <GoalBased /> : <Navigate to="/login" />} />
        <Route path="/tracker" element={isAuthenticated ? <Tracker /> : <Navigate to="/login" />} />
        <Route path="/charts" element={isAuthenticated ? <TrackCharts /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default Selection;
