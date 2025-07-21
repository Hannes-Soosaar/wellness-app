import React from "react";
import api from "../lib/axios";
import RequestPasswordReset from "../components/RequestPasswordReset";

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
      const response = await api.post("api/login", loginData, {
        withCredentials: true,
      });
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
    <>
      <div className="login-container">
        <h3>Login</h3>
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>
        <div className="vertical-container">
          <a className="reset-link">Reset Password</a>
          <a className="register-link">Register a new account</a>
        </div>
      </div>
      <RequestPasswordReset />
    </>
  );
};

export default Login;
