import React from "react";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import {
  UserDashboard,
  ProfileData,
  ResponseData,
} from "../../../shared/types/api";
import {
  ServerToClientEvents,
  ClientToServerEvents,
} from "../../../shared/types/ws";
import api from "../lib/axios";
import { io, Socket } from "socket.io-client";
import { extractErrorMessage } from "../utils/errorUtility";
import { ErrorMessage } from "../components/ErrorMessage";
import { SuccessMessage } from "../components/SuccessMessage";
import Loader from "../components/Loader";

const User: React.FC = () => {
  const [user, setUser] = React.useState<ProfileData | null>(null);
  const [dashboard, setDashboard] = React.useState<UserDashboard | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const socket: Socket<
      ServerToClientEvents<UserDashboard>,
      ClientToServerEvents
    > = io("https://localhost:5000/", { secure: true });

    socket.on("dashboardUpdated", (data) => {
      console.log("Data updated:", data);
      setDashboard(data);
    });

    const getUserData = async () => {
      console.log("Fetching user data...");
      try {
        const [userProfileRes, userDashboardRes] = await Promise.all([
          api.get<ResponseData<ProfileData>>("/user/profile"),
          api.get<ResponseData<UserDashboard>>("/user/dashboard"),
        ]);

        const userProfile = userProfileRes.data;
        console.log("User Profile:", userProfile);
        const userDashboard = userDashboardRes.data;

        let allError: string = "";

        if (userProfile.error) {
          allError += userProfile.error + "\n";
        }

        if (userDashboard.error) {
          allError += userDashboard.error + "\n";
        }

        if (allError) {
          setErrorMessage(allError);
          return;
        }
        console.log("User Profile Data outside IF:", userProfile.data);
        if (userProfile.data) {
          console.log("User Profile Data:", userProfile.data);
          setUser(userProfile.data);
        }
        if (userDashboard.data) {
          console.log("User Dashboard Data:", userDashboard.data);
          setDashboard(userDashboard.data);
        }
      } catch (error) {
        setErrorMessage(extractErrorMessage(error).message);
        console.error("Failed to fetch user data:", error);
      }

      return () => {
        socket.disconnect();
      };
    };
    getUserData();
  }, []);

  return (
    <>
      <div className="vertical-container">
        <div>
          {user ? (
            <div>
              Welcome {user.firstName} {user.lastName}
            </div>
          ) : (
            <div> Welcome! </div>
          )}
        </div>

        <div>
          {" "}
          {dashboard ? (
            <div className="horizontal-container">
              <details>
                {" "}
                <summary>My profile</summary>
                <p>BMI: {dashboard.BMI}</p>
                <p>Body fat:{dashboard.fatPercentage} %</p>
                <p>Weight: {dashboard.currentWeight} kg</p>
              </details>
              <details>
                {" "}
                <summary>My progress</summary>
                <p>Goal Progress: {dashboard.goalProgress} %</p>
                <p>Wellness Score: {dashboard.wellnessScore}</p>
              </details>
              <details>
                {" "}
                <summary>My goal</summary>
                <p>Goal: {dashboard.goal}</p>
                <p>Current Progress : {dashboard.goalCurrentValue}</p>
                <p>Goal Start Value : {dashboard.goalStartValue}</p>
                <p>Goal Target Value : {dashboard.goalTargetValue}</p>
                <p>Goal Progress: {dashboard.goalProgress} %</p>
              </details>
            </div>
          ) : (
            <>
              <p>
                Please fill in your profile, complete your personal assessment
                and set a goal.
              </p>
              <Loader />
            </>
          )}
        </div>

        <Outlet />
      </div>
    </>
  );
};

export default User;
