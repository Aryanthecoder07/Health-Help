import React from "react";
import { useNavigate } from "react-router-dom";

function Logout({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">
      Logout
    </button>
  );
}

export default Logout;