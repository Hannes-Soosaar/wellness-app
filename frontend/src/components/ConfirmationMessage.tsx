import React from "react";

interface ConfirmationMessageProps {
  message: string;
  onClose: () => void;
}

const ConfirmationMessage: React.FC<ConfirmationMessageProps> = ({
  message,
  onClose,
}) => {
  if (!message) return null;

  return (
    <>
      <div className="confirmation-container"></div>
      <p className="confirmation-content">{message}</p>
      <button className="confirmation-button" onClick={onClose}>
        Close{" "}
      </button>
    </>
  );
};

export default ConfirmationMessage;
