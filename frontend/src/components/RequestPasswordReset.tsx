import React, { useEffect, useState } from "react";
import api from "../lib/axios";

interface RequestData {
  email: string;
}

interface ResponseData {
  successMessage: string;
}

const RequestPasswordReset: React.FC = () => {
  const [email, setEmail] = useState("");
  const [emailAgain, setEmailAgain] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRequestPasswordResetLink = async () => {
    if (!email) {
      setErrorMessage("Please enter the email used to register the account ");
    }

    if (!emailAgain) {
      setErrorMessage(
        "Please enter the email again to verify the email matches"
      );
      return;
    }

    if (email === emailAgain) {
      requestPasswordResetLink();
    } else {
      setErrorMessage("The emails do not match");
      return;
    }
  };

  const requestPasswordResetLink = async () => {
    const requestData: RequestData = {
      email,
    };

    try {
      const response = await api.post("auth/refresh/verify", requestData, {
        withCredentials: true,
      });
      if (response.status === 200) {
        const responseData: ResponseData = {
          successMessage: "success",
        };
        console.log(responseData);
        console.log(response.data);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
        setErrorMessage("Error: " + error.message);
      } else {
        console.error("Unknown error", error);
        setErrorMessage("Something went wrong please, try again later!");
      }
    }
  };
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);
  return (
    <>
      <div className="login-container">
        {errorMessage ? (
          <div className="error-text"> {errorMessage}</div>
        ) : (
          <p>A-ok</p>
        )}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="email-again">Email</label>
        <input
          type="email"
          id="email-again"
          name="email"
          value={emailAgain}
          onChange={(e) => setEmailAgain(e.target.value)}
        />
        <button type="button" onClick={handleRequestPasswordResetLink}>
          Request link
        </button>
        {/* <div>{responseData.successMessage}</div> */}
      </div>
    </>
  );
};

export default RequestPasswordReset;
