import React, { useEffect, useState } from "react";
import { ResponseData, UserSettings } from "../../../shared/types/api"; // Adjust the import path as necessary
import api from "../lib/axios";
import { extractErrorMessage } from "../utils/errorUtility";
import RequestPasswordReset from "../components/RequestPasswordReset";
import Modal from "../components/Modal";

const Settings: React.FC = () => {
  // User data states
  const [userSetting, setUserSetting] = useState<UserSettings>({});
  const [mfaEnabled, setMfaEnabled] = useState<boolean>(false);
  const [emailNotifications, setEmailNotifications] = useState<boolean>(false);
  const [notificationActive, setNotificationActive] = useState<boolean>(false);
  const [privacyAccepted, setPrivacyAccepted] = useState<boolean>(false);
  const [cookieAllowed, setCookieAllowed] = useState<boolean>(false);
  const [aiEnabled, setAiEnabled] = useState<boolean>(false);
  // Loading and status states
  const [errorMessage, setError] = useState<string>();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // const [formData, setFormData] = useState<UserSettings>(userSetting);

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, checked } = event.target;
  //   setFormData({
  //     ...formData,
  //     [name]: checked,
  //   });
  // };

  const handleSave = async () => {
    setLoading(true);
    const userSettingPost: UserSettings = {
      mfa_enabled: mfaEnabled,
      email_notifications: emailNotifications,
      notification_active: notificationActive,
      privacy_accepted: privacyAccepted,
      cookies_allowed: cookieAllowed,
      ai_enabled: aiEnabled,
    };

    try {
      const response = await api.post<ResponseData<UserSettings>>(
        "/user/settings",
        userSettingPost
      );
      if (response.data.success) {
        console.log("User settings updated successfully", response.data);
        setMfaEnabled(response.data.data?.mfa_enabled ?? false);
        setEmailNotifications(response.data.data?.email_notifications ?? false);
        setNotificationActive(response.data.data?.notification_active ?? false);
        setPrivacyAccepted(response.data.data?.privacy_accepted ?? false);
        setCookieAllowed(response.data.data?.cookies_allowed ?? false);
        setAiEnabled(response.data.data?.ai_enabled ?? false);
      } else {
        setMessage("No data returned from server");
      }
    } catch (error) {
      console.log("failed to save userSettings", error);
      alert("Updating user settings failed " + error);
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    const getUserSettings = async () => {
      try {
        setLoading(true);
        const response = await api.get<ResponseData<UserSettings>>(
          "/user/settings"
        );

        if (response.data.data) {
          console.log("User settings loaded successfully", response.data);
          setMfaEnabled(response.data.data.mfa_enabled ?? false);
          setEmailNotifications(
            response.data.data.email_notifications ?? false
          );
          setNotificationActive(
            response.data.data.notification_active ?? false
          );
          setPrivacyAccepted(response.data.data.privacy_accepted ?? false);
          setCookieAllowed(response.data.data.cookies_allowed ?? false);
          setAiEnabled(response.data.data.ai_enabled ?? false);
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch user settings", error);
        setError(extractErrorMessage(error).message);
      }
    };
    getUserSettings();
  }, []);

  // Check if you can use the (prev) => (!prev) syntax

  const handleUpdatePassword = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {loading ? (
        <p>Loading user settings...</p>
      ) : (
        <>
          <h3>User Settings</h3>
          <p>General settings</p>
          <div className="settings-container">
            <label>
              <input
                type="checkbox"
                name="emailNotifications"
                checked={emailNotifications}
                onChange={() => setEmailNotifications((prev) => !prev)}
              ></input>
              <strong> Enable Email notifications </strong>
            </label>
          </div>

          <div className="settings-container">
            <label>
              <input
                type="checkbox"
                name="acceptedPrivacy"
                checked={privacyAccepted}
                onChange={() => setPrivacyAccepted((prev) => !prev)}
              ></input>
              <strong>Allow data sharing with third parties </strong>
            </label>
          </div>

          <div className="settings-container">
            <label>
              <input
                type="checkbox"
                name="twoFactorAuthentication"
                checked={mfaEnabled}
                onChange={() => setMfaEnabled((prev) => !prev)}
              ></input>
              <strong>Two factor authentication</strong>
            </label>
          </div>

          <div className="settings-container">
            <label>
              <input
                type="checkbox"
                name="enableAI"
                checked={aiEnabled}
                onChange={() => setAiEnabled((prev) => !prev)}
              ></input>
              <strong>Enable AI </strong>
            </label>
          </div>

          <br />
          <div>
            <button onClick={handleSave}>Save</button>
          </div>
        </>
      )}
      <button onClick={handleUpdatePassword}>Update Password </button>
      <Modal
        modalIsOpen={isModalOpen}
        closeModal={closeModal}
        children={<RequestPasswordReset />}
      ></Modal>
    </>
  );
};
export default Settings;
