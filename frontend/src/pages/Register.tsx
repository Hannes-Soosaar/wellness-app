import React from "react";
import api from "../lib/axios";
import Modal from "../components/Modal";
import Terms from "./TermsAndConditions";
import Privacy from "./Privacy";
import { useState } from "react";

import { ErrorMessage } from "../components/ErrorMessage";
import { SuccessMessage } from "../components/SuccessMessage";
interface RegistrationForm {
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
}

type ModalContent = "terms" | "privacy" | null;

let isFilled: boolean = false;

const Register: React.FC = () => {
  // const [username, setUsername] = React.useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [isModalOpen, setIsModalOpen] = React.useState<ModalContent>(null);

  const openModal = (content: ModalContent) => {
    setIsModalOpen(content);
  };
  const closeModal = () => {
    setIsModalOpen(null);
  };

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (agreed) {
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
          setSuccessMessage(
            "Registration Successful! Before attempting to login, please verify your e-mail address."
          );
        } else {
          setErrorMessage(
            "Registration Failed: " + response.data.message ||
              "An error occurred"
          );
        }
      } catch (error) {
        setErrorMessage("Registration Failed.");
      }
    } else {
      setErrorMessage(
        "You must agree to the Terms and Conditions and Privacy Policy"
      );
      return;
    }
  };

  return (
    <div className="register-container">
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
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
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
            type="password"
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
        I agree to the Terms and Conditions and understand the Privacy Policy{" "}
      </label>
      <button className="link-button" onClick={() => openModal("terms")}>
        Terms and Conditions
      </button>
      <button className="link-button" onClick={() => openModal("privacy")}>
        Privacy Policy
      </button>
      <Modal modalIsOpen={!!isModalOpen} closeModal={closeModal}>
        {isModalOpen === "terms" && (
          <>
            <Terms />
          </>
        )}
        {isModalOpen === "privacy" && (
          <>
            <Privacy />
          </>
        )}
      </Modal>
    </div>
  );
};

export default Register;
