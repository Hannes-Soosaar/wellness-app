import { FaGoogle } from "react-icons/fa";

const GoogleRegisterButton = () => {
  const handleGoogleRegister = async () => {
    console.log("Google Register button clicked");
    window.location.href = "http://localhost:5000/auth/google/register"; //TODO: set this in the env file
  };

  return (
    <button onClick={handleGoogleRegister} className="google-register-button">
      <FaGoogle />
      Register with Google
    </button>
  );
};

export default GoogleRegisterButton;
