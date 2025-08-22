import React from "react";
import api from "../lib/axios";
import RequestPasswordReset from "../components/RequestPasswordReset";
import Modal from "../components/Modal";
import { Link } from "react-router-dom";
import { ErrorMessage } from "../components/ErrorMessage";
import { SuccessMessage } from "../components/SuccessMessage";
import { QRCodeSVG } from "qrcode.react";
import { extractErrorMessage } from "../utils/errorUtility";
import GoogleRegisterButton from "../components/GoogleRegisterButton";
import DiscordRegisterButton from "../components/DiscordRegisterButton";

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
  const [tempToken, setTempToken] = React.useState<string | null>(null);
  const [mfaUri, setMfaUri] = React.useState<string | null>(null);
  const [mfaCode, setMfaCode] = React.useState("");

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const loginData: LoginData = {
      email,
      password,
    };

    try {
      const response = await api.post("api/login", loginData, {
        withCredentials: true,
      });
      if (response.status === 401) {
        setErrorMessage("login failed please try again");
        return;
      }
      if (response.data.tempToken && response.data.mfaUri) {
        setTempToken(response.data.tempToken);
        setMfaUri(response.data.mfaUri);
        setSuccessMessage(
          "MFA required. Enter the code from your authenticator."
        );
        // do I not need to set the TempToken to local storage
      } else if (response.data.token) {
        setSuccessMessage("Welcome back!");
        localStorage.setItem("authToken", response.data.token);
        window.location.href = "/";
      }
    } catch (error) {
      setErrorMessage("Login failed: " + extractErrorMessage(error).message);
    }
  };

  const handleVerifyMfa = async () => {
    if (!tempToken) return;

    try {
      const response = await api.post(
        "api/login/mfa",
        { mfaToken: mfaCode },
        { headers: { Authorization: `Bearer ${tempToken}` } }
      );
      localStorage.setItem("authToken", response.data.token);
      setTempToken(null);
      setMfaUri(null);
      setSuccessMessage("MFA verified! Login complete.");
      window.location.href = "/";
    } catch (error: any) {
      console.error("MFA verification failed:", error);
      setErrorMessage(error.response?.data?.message || "Invalid MFA code");
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
        {!tempToken ? (
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
        ) : (
          <div>
            {mfaUri && (
              <div>
                <p>Scan this QR code in your authenticator app:</p>
                <QRCodeSVG value={mfaUri} />
              </div>
            )}
            <label htmlFor="mfa">Enter 6-digit code:</label>
            <input
              type="text"
              id="mfa"
              maxLength={6}
              value={mfaCode}
              onChange={(e) => setMfaCode(e.target.value)}
            />
            <button onClick={handleVerifyMfa}>Verify MFA</button>
          </div>
        )}
        <GoogleRegisterButton />
        <DiscordRegisterButton />
        <div className="vertical-container">
          <button onClick={handleUpdatePassword}>Forgot Password </button>
          <Link to="/register">Not a user Register an Account</Link>
        </div>
        )
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
