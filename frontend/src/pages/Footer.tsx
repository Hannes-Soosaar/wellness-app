import React from "react";
import Modal from "../components/Modal";
// import api from "../lib/axios";

type ModalContent = "terms" | "privacy" | null;

const Footer: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState<ModalContent>(null);
  const openModal = (content: ModalContent) => {
    setIsModalOpen(content);
  };
  const closeModal = () => {
    setIsModalOpen(null);
  };

  return (
    <footer className="footer-container">
      <p>&copy; 2025 Wellness App </p>
      {/* <a href="/terms">Terms and Conditions</a>
      <a href="/terms">Privacy Policy</a> */}
      <button className="link-button" onClick={() => openModal("terms")}>
        Terms and Conditions
      </button>

      <button className="link-button" onClick={() => openModal("privacy")}>
        Privacy Policy
      </button>

      <Modal modalIsOpen={!!isModalOpen} closeModal={closeModal}>
        {isModalOpen === "terms" && (
          <>
            <h2>Terms and Conditions</h2>
            <p>...</p>
          </>
        )}
        {isModalOpen === "privacy" && (
          <>
            <h2>Privacy Policy</h2>
            <p>...</p>
          </>
        )}
      </Modal>
    </footer>
  );
};

export default Footer;
