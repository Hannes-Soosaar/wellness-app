import React from "react";

interface ErrorProps {
  errorMessage: string;
  onClose: () => void;
}

const ErrorMessage: React.FC<ErrorProps> = ({ errorMessage, onClose }) => {
  if (!errorMessage) return null;

  return (
    <>
      <div className="error-container">
        <p className="error-content">{errorMessage}</p>
        <button className="error-button" onClick={onClose}>
          Close
        </button>
      </div>
    </>
  );
};

export default ErrorMessage;
