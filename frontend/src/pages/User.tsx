import React from "react";

interface UserProfile {
  id: number;
  username: string;
}

const User: React.FC = () => {
  return (
    <>
      <h1>User Profile</h1>
      <div className="content-container">
        {" "}
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum vero
        voluptatem eum, quis, aliquid a laudantium deserunt recusandae omnis,
        labore fugit soluta aut! Porro error vel laboriosam quidem, beatae illo.
      </div>
    </>
  );
};

export default User;
