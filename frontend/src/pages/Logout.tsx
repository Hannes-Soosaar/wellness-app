import React from "react";
import api from "../lib/axios";

const Logout: React.FC = () => {
  const handleLogout = async () => {
    try {
      const response = await api.post("auth/logout");
      console.log(response.data);
      if (response.status === 200) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
      } else {
        console.error("Logout failed:", response.data);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="logout-container">
      <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
