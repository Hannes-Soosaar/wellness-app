import React from "react";

interface UserProfile {
  id: number;
  username: string;
}

const User: React.FC = () => {
  return (
    <>
      <h1>User Profile</h1>
      <div className="menu-container"></div>
      <div className="content-container"></div>
    </>
  );
};

export default User;
