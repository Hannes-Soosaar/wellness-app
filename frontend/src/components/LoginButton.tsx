import React from "react";

interface Props {
  isLoggedIn: boolean;
  setIsLoggingIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginButton: React.FC<Props> = ({ isLoggedIn, setIsLoggingIn }) => {
  return (
    <>
      <button
        className="login-button"
        onClick={() => setIsLoggingIn((prev) => !prev)}
      >
        {isLoggedIn ? "Logout" : "Login"}
      </button>
    </>
  );
};

export default LoginButton;
