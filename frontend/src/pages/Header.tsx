import React, { useEffect } from "react";
import api from "../lib/axios";

interface Props {
  isLoggedIn: boolean;
}

const Header: React.FC<Props> = ({ isLoggedIn }) => {
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
    <nav className="header-menu">
      <a href="/">Home</a>
      {isLoggedIn ? null : <a href="/about">About</a>}
      {isLoggedIn ? null : <a href="/login">Login</a>}
      {isLoggedIn ? null : <a href="/register">Register</a>}
      {isLoggedIn ? <a href="/logout">Logout</a> : null}
    </nav>
  );
};

export default Header;
