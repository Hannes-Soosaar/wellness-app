import React from "react";
import api from "../lib/axios";
import RequestPasswordReset from "../components/RequestPasswordReset";
import Modal from "../components/Modal";
import { Link } from "react-router-dom";
import { ErrorMessage } from "../components/ErrorMessage";
import { SuccessMessage } from "../components/SuccessMessage";
interface LoginData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");

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

  const handleUpdatePassword = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="login-container">
        <h3>Login</h3>
        <ErrorMessage
          message={errorMessage}
          duration={5000}
          onDismiss={() => setErrorMessage("")}
        />
        <SuccessMessage
          message={successMessage}
          duration={3000}
          onDismiss={() => setSuccessMessage("")}
        />
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
          <button onClick={handleUpdatePassword}>Forgot Password </button>
          <Link to="/register">Not a user Register an Account</Link>
        </div>
      </div>
      <Modal
        modalIsOpen={isModalOpen}
        closeModal={closeModal}
        children={<RequestPasswordReset />}
      ></Modal>
    </>
  );
};

export default Login;
