import { FaDiscord } from "react-icons/fa";

//TODO: Need to add the prop if T and C is Accepted

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
