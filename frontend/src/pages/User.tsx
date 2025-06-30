import React from "react";
import { Outlet } from "react-router-dom";

interface UserProfile {
  id: number;
  username: string;
}

let user: UserProfile = {
  id: 1,
  username: "hannes@gmail.com",
};

const User: React.FC = () => {
  return (
    <>
      <div className="vertical-container">
        <p>Welcome {user.username}</p>
        <Outlet />
      </div>
    </>
  );
};

export default User;
