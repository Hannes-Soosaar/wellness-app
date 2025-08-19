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
      <p>Are you sure you want to logout?</p>
      <button onClick={handleLogout}>Confirm Logout</button>
      <button onClick={() => (window.location.href = "/user/profile")}>
        Cancel
      </button>
    </div>
  );
};

export default Logout;
