import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import User from "./pages/User";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import "./App.css";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import LoginButton from "./components/LoginButton";
import { useEffect, useState } from "react";
import api from "./lib/axios";

const App: React.FC = () => {
  const authToken = localStorage.getItem("authToken");
  console.log("Auth token from local storage:", authToken);
  const [isLoggedIn, setIsLoggingIn] = useState<boolean>(false);

  if (!authToken) {
    console.log("No auth token found");
  }

  useEffect(() => {
    if (!authToken || authToken === "undefined") {
      console.log("No auth token found aka not logged in");
      return;
    }
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
    <div className="layout">
      <Header isLoggedIn={isLoggedIn} />
      <LoginButton isLoggedIn={isLoggedIn} setIsLoggingIn={setIsLoggingIn} />
      <main className="main-content">
        {isLoggedIn ? (
          <aside className="sidebar">{/* show only if logged in */}</aside>
        ) : null}
        <section className="page-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            {/* the clicking the /user element logs out */}
            {isLoggedIn ? <Route path="/user" element={<User />} /> : null} /
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </section>
      </main>
      <Footer />
    </div>
  );
};
export default App;
