import React, { useEffect } from "react";
import api from "../lib/axios";
// import "./Header.css";

const Header: React.FC = () => {
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/user", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [authToken]);

  return (
    <header>
      <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/user">User</a>
        <a href="/login">Login</a>
        <a href="/register">Register</a>
        <a href="/logout">Logout</a>
      </nav>
    </header>
  );
};

export default Header;
