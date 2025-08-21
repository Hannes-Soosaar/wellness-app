import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../lib/axios";
import { ResponseData } from "../../../shared/types/api";

interface RequestData {
  token: string;
  password: string;
}

const PasswordReset: React.FC = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

  if (!token) {
    setErrorMessage("Invalid password reset link, please request a new link");
  }

  let requestData: RequestData = {
    token: token as string,
    password: "",
  };

  const handleUpdatePassword = async () => {
    if (!password) {
      setErrorMessage("Please select a password!");
      return;
    }

    if (!passwordAgain) {
      setErrorMessage("Please enter the password again for confirmation");
      return;
    }

    if (password !== passwordAgain) {
      setErrorMessage(
        "Passwords do not match, please check the password and try again"
      );
      setPassword("");
      setPasswordAgain("");
      return;
    }

    requestData.password = password;

    try {
      const response = await api.post("auth/verify/update", requestData, {
        withCredentials: true,
      });
      if (response.status === 200) {
        const responseData: ResponseData<null> = {
          success: response.data.success,
          message: response.data.message,
          error: response.data.error,
        };
        setMessage(responseData.message);
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

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <>
      <div className="login-container">
        <div className="vertical-container">
          {errorMessage ? (
            <div>{errorMessage}</div>
          ) : (
            <div> Please select a new password</div>
          )}
          {message ? <div>{message}</div> : <div></div>}
          <label htmlFor=""> Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <label htmlFor="">Password again</label>
          <input
            type="password"
            id="password-again"
            name="password-again"
            value={passwordAgain}
            onChange={(event) => setPasswordAgain(event.target.value)}
          />
          <button type="button" onClick={handleUpdatePassword}>
            update password
          </button>
        </div>
      </div>
    </>
  );
};

export default PasswordReset;
