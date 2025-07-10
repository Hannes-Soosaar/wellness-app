import React, { useState } from "react";

interface UserSettings {
  id: string;
  userName: string;
  emailNotifications?: boolean;
  acceptedPrivacy?: boolean;
  twoFactorAuthentication?: boolean;
  enableAI?: boolean;
}

const Settings: React.FC = () => {
  const [userSetting, setUserSetting] = useState<UserSettings>({
    id: "aa21231",
    userName: "hannes@gmail.com",
    emailNotifications: false,
    acceptedPrivacy: false,
    twoFactorAuthentication: false,
    enableAI: false,
  });

  const [formData, setFormData] = useState<UserSettings>(userSetting);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleSave = () => {
    setUserSetting(formData);
    try {
      const serializedFromData = JSON.stringify(formData);
      localStorage.setItem("userSettings", serializedFromData);
      alert("Updated user settings successfully!");
    } catch (error) {
      console.log("failed to save userSettings", error);
      alert("Updating user settings failed " + error);
    }
    //Update BE via API
  };

  const handleUpdatePassword = () => {};

  return (
    <>
      <h3>User Settings</h3>
      <p>General settings</p>
      <div className="settings-container">
        <label>
          <input
            type="checkbox"
            name="emailNotifications"
            checked={formData.emailNotifications}
            onChange={handleChange}
          ></input>
          <strong> Enable Email notifications </strong>
        </label>
      </div>

      <div className="settings-container">
        <label>
          <input
            type="checkbox"
            name="acceptedPrivacy"
            checked={formData.acceptedPrivacy}
            onChange={handleChange}
          ></input>
          <strong>Allow data sharing with third parties </strong>
        </label>
      </div>

      <div className="settings-container">
        <label>
          <input
            type="checkbox"
            name="twoFactorAuthentication"
            checked={formData.twoFactorAuthentication}
            onChange={handleChange}
          ></input>
          <strong>Two factor authentication</strong>
        </label>
      </div>

      <div className="settings-container">
        <label>
          <input
            type="checkbox"
            name="enableAI"
            checked={formData.enableAI}
            onChange={handleChange}
          ></input>
          <strong>Enable AI </strong>
        </label>
      </div>

      <br />
      <div>
        <button onClick={handleSave}>Save</button>
        <button onClick={handleUpdatePassword}>Update Password </button>
      </div>
    </>
  );
};
export default Settings;
