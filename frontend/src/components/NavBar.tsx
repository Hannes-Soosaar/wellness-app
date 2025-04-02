'user client'
import React from "react";

const NavBar: React.FC = () => {

  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="container mx-auto text-center flex flex-col items-center">
        <p>&copy; 2023 Your Company. All rights reserved.</p>
        <p>
          <a href="/privacy-policy" className="text-gray-400 hover:text-white">
            Privacy Policy
          </a>
          {" | "}
          <a href="/terms-of-service" className="text-gray-400 hover:text-white">
            Terms of Service
          </a>
      </div>
    </footer>
  );
};