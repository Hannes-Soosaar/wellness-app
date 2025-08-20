import { FaDiscord } from "react-icons/fa";

//TODO: Need to add the prop if T and C is Accepted

const DiscordRegisterButton = () => {
  const handleDiscordRegister = async () => {
    console.log("Discord Register button clicked");
    window.location.href = "https://localhost:5000/auth/discord/register";
  };

  return (
    <button onClick={handleDiscordRegister} className="discord-register-button">
      <FaDiscord />
      Register with Discord
    </button>
  );
};

export default DiscordRegisterButton;
