import React from "react";
import { ErrorMessage } from "../components/ErrorMessage";
import { SuccessMessage } from "../components/SuccessMessage";

const Advice: React.FC = () => {
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");

  return (
    <>
      <div className="vertical-container">
        <h1>Advice</h1>
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
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        <button className="advice-button">Today</button>
        <button className="advice-button">Week</button>
        <button className="advice-button">Month</button>
      </div>
    </>
  );
};

export default Advice;
