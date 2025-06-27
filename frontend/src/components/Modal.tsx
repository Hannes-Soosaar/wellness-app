import React, { useEffect } from "react";

interface ModalProps {
  modalIsOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

function Modal({ modalIsOpen, closeModal, children }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
      document.addEventListener("keydown", handleKeyDown);

      return () => document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal]);

  if (!modalIsOpen) {
    return null;
  }

  return (
    <>
      <div className="modal-overlay" onClick={closeModal}>
        <div
          className="modal-content"
          onClick={(event: React.MouseEvent<HTMLDivElement>) =>
            event.stopPropagation()
          }
        >
          <span className="modal-close-btn" onClick={closeModal}></span>
          {children}
        </div>
      </div>
    </>
  );
}

export default Modal;
