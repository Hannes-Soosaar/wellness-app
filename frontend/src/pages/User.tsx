import React from "react";
import { Outlet } from "react-router-dom";

interface UserProfile {
  id: number;
  username: string;
}

const User: React.FC = () => {
  return (
    <>
      <div className="vertical-container">
        <h3>User</h3>
        <p>
          Stuff that is meant to remain constant withing the user path goes here
        </p>
        <br />

        <Outlet />
      </div>
    </>
  );
};

export default User;
