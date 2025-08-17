import React, { useEffect, useState } from "react";
import api from "../lib/axios";
// import { UserAssessmentData, UserData } from "../types/user";
import {
  ProfilePost,
  UserDashboard,
  UserProfile,
  ResponseData,
} from "../../../shared/types/api";
import { ErrorMessage } from "../components/ErrorMessage";
import { SuccessMessage } from "../components/SuccessMessage";
import { extractErrorMessage } from "../utils/errorUtility";

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [sex, setSex] = useState("");
  const [age, setAge] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [neckCircumference, setNeckCircumference] = useState<number>(0);
  const [waistCircumference, setWaistCircumference] = useState<number>(0);
  const [hipCircumference, setHipCircumference] = useState<number>(0);
  const [fatPercentage, setFatPercentage] = useState<number>(0);
  const [BMI, setBMI] = useState<number>(0);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = async () => {
    setIsEditing(false);
    const updatedProfile: ProfilePost = {
      firstName: firstName,
      lastName: lastName,
      sex: sex,
      age: age,
      height: height,
      weight: weight,
      neckCircumference: neckCircumference,
      waistCircumference: waistCircumference,
      hipCircumference: hipCircumference,
    };
    setIsEditing(false);

    try {
      const response = await api.post<ResponseData<null>>(
        "/user/profile",
        updatedProfile
      );
      if (response.data.success) {
        setMessage("Profile updated successfully");
      } else {
        setErrorMessage(response.data.error || "Failed to update profile");
      }
    } catch (error) {
      setErrorMessage(extractErrorMessage(error).message);
      console.error("Error updating profile:", error);
    }
  };

  const isValidNumber = (stringValue: string) => {
    const normalized = stringValue.replace(",", ".");
    return /^-?\d+(\.\d+)?$/.test(normalized.trim());
  };

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const response = await api.get<ResponseData<UserProfile>>(
          "/user/profile/",
          {
            timeout: 15000,
          }
        );
        if (!response.data) {
          console.log(response.data);
          setErrorMessage("Failed to fetch user profile");
          return;
        }
        setFirstName(response.data.data?.firstName || "");
        setLastName(response.data.data?.lastName || "");
        setSex(response.data.data?.sex || "");
        setAge(response.data.data?.age || 0);
        setHeight(response.data.data?.height || 0);
        setWeight(response.data.data?.weight || 0);
        setNeckCircumference(response.data.data?.neckCircumference || 0);
        setWaistCircumference(response.data.data?.waistCircumference || 0);
        setHipCircumference(response.data.data?.hipCircumference || 0);
        setFatPercentage(response.data.data?.fatPercentage || 0);
        setMessage(response.data.message || "");
        setBMI(response.data.data?.BMI || 0);
      } catch (error) {
        setErrorMessage(extractErrorMessage(error).message);
        console.error("Error fetching user profile:", error);
      }
    };
    getUserProfile();
  }, []);

  return (
    <>
      <h3>User Profile</h3>

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
      {!isEditing ? (
        <>
          <p>
            <strong>Name: </strong>
            {firstName} {lastName}
          </p>
          <p>
            <strong>Sex: </strong>
            {sex}
          </p>
          <p>
            <strong>Weight: </strong>
            {weight}
          </p>
          <p>
            <strong>Body fat: </strong>
            {fatPercentage}
          </p>
          <p>
            <strong>Age: </strong>
            {age}
          </p>
          <p>
            <strong>Height: </strong>
            {height}
          </p>
          <button onClick={handleEditClick}>Edit Profile</button>
        </>
      ) : (
        <>
          <label className="stacked">
            First Name (optional)
            <input
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></input>
          </label>
          <label className="stacked">
            Last Name (optional)
            <input
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></input>
          </label>
          <label className="stacked">
            Age (years):
            <input
              name="weight"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              type="number"
              min="0"
            ></input>
          </label>
          <label className="stacked">
            Weight (kg):
            <input
              name="weight"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              type="number"
              min="0"
            ></input>
          </label>
          <label className="stacked">
            Height (cm):
            <input
              name="height"
              type="number"
              min="0"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
            ></input>
          </label>
          <label className="stacked">
            Neck Circumference: (cm):
            <input
              name="neckCircumference"
              type="number"
              min="0"
              value={neckCircumference}
              onChange={(e) => setNeckCircumference(Number(e.target.value))}
            ></input>
          </label>
          <br />
          <label className="stacked">
            Waist Circumference: (cm) :
            <input
              name="waistCircumference"
              type="number"
              min="0"
              value={waistCircumference}
              onChange={(e) => setWaistCircumference(Number(e.target.value))}
            ></input>
          </label>

          <label className="stacked">
            Sex:
            <select
              name="sex"
              value={sex}
              onChange={(e) => setSex(e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
          {sex === "female" ? (
            <label className="stacked">
              Hip Circumference: (cm) :
              <input
                name="waistCircumference"
                type="number"
                min="0"
                value={hipCircumference}
                onChange={(e) => setHipCircumference(Number(e.target.value))}
              ></input>
            </label>
          ) : null}

          <br />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      )}
    </>
  );
};

export default Profile;
