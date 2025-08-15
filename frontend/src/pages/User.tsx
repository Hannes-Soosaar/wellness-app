import React from "react";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { UserDashboard, ProfileData } from "../../../shared/types/api";
import {
  ServerToClientEvents,
  ClientToServerEvents,
} from "../../../shared/types/ws";
import api from "../lib/axios";
import { io, Socket } from "socket.io-client";

const User: React.FC = () => {
  const [user, setUser] = React.useState<ProfileData | null>(null);
  const [dashboard, setDashboard] = React.useState<UserDashboard | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {

    const socket: Socket<
      ServerToClientEvents<UserDashboard>,
      ClientToServerEvents
    > = io("https://your-server-url", { secure: true });

    socket.on("dataUpdated", (data) => {
      console.log("Data updated:", data);
      setDashboard(data);
    });

    const getUserData = async () => {

    };

    getUserData();
    return () => socket.disconnect();
  , [])
};

  return (
    <>
      <div className="vertical-container">
        <p>Welcome {user.username}</p>
        <p></p>
      </div>
    </>
  );
};

export default User;
