import React, { useState } from "react";
import { GiToken } from "react-icons/gi";
import { useParams } from "react-router-dom";

const PasswordReset: React.FC = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  return (
    <>
      <div> Reset password page</div>
      <p>{token}</p>
    </>
  );
};

// on 200 logout.
export default PasswordReset;
