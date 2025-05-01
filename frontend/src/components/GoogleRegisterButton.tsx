import { FaGoogle } from "react-icons/fa";
import api from "../lib/axios";

const GoogleRegisterButton = () => {
  const handleGoogleRegister = async () => {
    console.log("Google Register button clicked");
    window.location.href = "http://localhost:5000/auth/google/register"; //TODO: set this in the env file
  };

  return (
    <button onClick={handleGoogleRegister} className="google-register-button">
      <FaGoogle className="mr-2" />
      Register with Google
    </button>
  );
};

export default GoogleRegisterButton;
