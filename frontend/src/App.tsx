import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import User from "./pages/User";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import "./App.css";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import Menu from "./pages/Menu";
import Overview from "./pages/Overview";
import Settings from "./pages/Settings";
import Advice from "./pages/Advice";
import Goals from "./pages/Goals";
import Activity from "./pages/Activity";
import Progress from "./pages/Progress";
import Meal from "./pages/Meal";

import Profile from "./pages/Profile";
import Restrictions from "./pages/Restrictions";

import LoginButton from "./components/LoginButton";
import { useEffect, useState } from "react";
import Modal from "./components/Modal";
import api from "./lib/axios";
import UserAssessment from "./pages/UserAssesment";

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
          <aside className="sidebar">
            <Menu />
          </aside>
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
            {/*Example of links routing*/}
            {isLoggedIn ? (
              <Route path="/user" element={<User />}>
                <Route index element={<User />} />
                <Route path="profile" element={<Profile />} />
                <Route path="assessment" element={<UserAssessment />} />
                <Route path="overview" element={<Overview />} />
                <Route path="settings" element={<Settings />} />
                <Route path="advice" element={<Advice />} />
                <Route path="goals" element={<Goals />} />
                <Route path="activity" element={<Activity />} />
                <Route path="progress" element={<Progress />} />
                <Route path="meal" element={<Meal />} />
                <Route path="restrictions" element={<Restrictions />} />
              </Route>
            ) : (
              <Route path="/" element={<Home />} />
            )}
          </Routes>
        </section>
      </main>
      <Footer />
    </div>
  );
};
export default App;
