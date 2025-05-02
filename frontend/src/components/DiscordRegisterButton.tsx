import { FaDiscord } from "react-icons/fa";

const DiscordRegisterButton = () => {
  const handleDiscordRegister = async () => {
    console.log("Discord Register button clicked");
    window.location.href = "http://localhost:5000/auth/discord/test";
  };

  return (
    <button onClick={handleDiscordRegister} className="discord-register-button">
      <FaDiscord />
      Register with Discord
    </button>
  );
};

export default DiscordRegisterButton;
