import React from "react";
import api from "../lib/axios";

interface LoginData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log("Login button clicked", email, password);
    event.preventDefault();

    const loginData: LoginData = {
      email,
      password,
    };
    try {
      const response = await api.post("api/login", loginData);
      console.log(response.data);
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("authToken", token);
        window.location.href = "/";
      } else {
        console.error("Login failed:", response.data);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
