import React from "react";
import api from "../lib/axios";

interface RegistrationForm {
  username: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
}

let isFilled: boolean = false;

const Register: React.FC = () => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [confirmEmail, setConfirmEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log("Register button clicked", email, password);
    event.preventDefault();
    console.log("Register button clicked", username, email, password);

    const registerData: RegistrationForm = {
      username,
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
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="username"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
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
          <label htmlFor="confirm-password">Password</label>
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
    </div>
  );
};

export default Register;
