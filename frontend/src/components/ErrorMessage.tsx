import React, { useState } from "react";

interface ErrorProps {
  errorMessage: string;
  onClose: () => void;
}

const ErrorMessage: React.FC<ErrorProps> = ({ errorMessage, onClose }) => {
  return (
    <>
      <div className="error-container">
        <h3 className="error-heading">{errorMessage}</h3>
        <button className="close Error" onClick={onClose}>
          Close
        </button>
      </div>
    </>
  );
};

export default ErrorMessage;
