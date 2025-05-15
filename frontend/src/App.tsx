import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import User from "./pages/User";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect, useState } from "react";
import api from "./lib/axios";

const App: React.FC = () => {
  const authToken = localStorage.getItem("authToken");
  console.log("Auth token:", authToken);

  useEffect(() => {
    if (!authToken || authToken === "undefined") {
      console.log("No auth token found aka not logged in");
      return;
    }
    const fetchData = async () => {
      try {
        // This endpoint is not implemented
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
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/user" element={<User />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
