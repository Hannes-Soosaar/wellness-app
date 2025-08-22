import { FaGoogle } from "react-icons/fa";

const GoogleRegisterButton = () => {
  const handleGoogleRegister = async () => {
    console.log("Google Register button clicked");
    window.location.href = "https://localhost:5000/auth/google/register";
  };

  return (
    <button onClick={handleGoogleRegister} className="google-register-button">
      <FaGoogle /> Login with Google
    </button>
  );
};

export default GoogleRegisterButton;
