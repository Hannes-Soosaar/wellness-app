import React from "react";
import api from "../lib/axios";
import GoogleRegisterButton from "../components/GoogleRegisterButton";
import DiscordRegisterButton from "../components/DiscordRegisterButton";
interface RegistrationForm {
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
}

let isFilled: boolean = false;

const Register: React.FC = () => {
  // const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [confirmEmail, setConfirmEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [agreed, setAgreed] = React.useState(false);

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    if (agreed) {
      console.log("Register button clicked", email, password);
      event.preventDefault();
      console.log("Register button clicked", email, password);

      const registerData: RegistrationForm = {
        email,
        confirmEmail,
        password,
        confirmPassword,
      };

      try {
        const response = await api.post("api/register", registerData);
        console.log(response.data);
        if (response.status === 200) {
          window.location.href = "/login";
        } else {
          console.error("Registration failed:", response.data);
        }
      } catch (error) {
        console.error("Registration failed:", error);
        alert("Registartion Failed: " + error || "An error occurred");
      }
    } else {
      alert("Please agree to the Terms and Conditions and Privacy Policy.");
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        {/* <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="username"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div> */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-email">Confirm Email</label>
          <input
            type="confirm-email"
            id="confirm-email"
            name="confirm-email"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="confirm-password"
            id="confirm-password"
            name="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <label style={{ display: "block", marginTop: "1rem" }}>
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          required
        />{" "}
        I agree to the{" "}
        <a href="/terms" target="_blank" rel="noopener noreferrer">
          Terms and Conditions
        </a>{" "}
        and{" "}
        <a href="/privacy" target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </a>
        .
      </label>
    </div>
  );
};

export default Register;
