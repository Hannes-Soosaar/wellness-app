import { FaGoogle } from "react-icons/fa";

const GoogleRegisterButton = () => {
  const handleGoogleRegister = () => {
    window.location.href = "/google/register";
  };

  return (
    <button onClick={handleGoogleRegister} className="google-register-button">
      <FaGoogle className="mr-2" />
      Register with Google
    </button>
  );
};

export default GoogleRegisterButton;
