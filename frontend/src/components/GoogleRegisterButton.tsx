import { FaGoogle } from "react-icons/fa";


//TODO: Need to add the prop if T and C is Accepted

const GoogleRegisterButton = () => {
  const handleGoogleRegister = async () => {
    console.log("Google Register button clicked");
    window.location.href = "https://localhost:5000/auth/google/register"; 
  };

  return (
    <button onClick={handleGoogleRegister} className="google-register-button">
      <FaGoogle />
      Register with Google
    </button>
  );
};

export default GoogleRegisterButton;
