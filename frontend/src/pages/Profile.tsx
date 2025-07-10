import React, { useState } from "react";
import { UserAssessmentData, UserData } from "../types/user";
// interface UserData {
//   id: string;
//   userName: string;
//   firstName: string;
//   lastName: string;
//   // gender needs to be a number
//   gender: string;
//   age: number;
//   weight: number;
//   height: number;
//   BMI: number;
//   fatPercentage: number;
//   wellnessScore: number;
// }

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<UserData>({
    id: "aa21231",
    userName: "hannes@gmail.com",
    firstName: "Hannes",
    lastName: "Soosaar",
    sex: "male",
    age: 41,
    weight: 131,
    height: 185,
    BMI: 28,
    fatPercentage: 21,
    wellnessScore: 100,
    neckCircumference: "50",
    waistCircumference: "118",
  });

  const [formData, setFormData] = useState<UserData>(user);

  const handleEditClick = () => {
    setFormData(user);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    setUser(formData);
    setIsEditing(false);
    //   send via API to be update at the BE
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    //TODO add more values here -
  };

  const isValidNumber = (stringValue: string) => {
    const normalized = stringValue.replace(",", ".");
    return /^-?\d+(\.\d+)?$/.test(normalized.trim());
  };

  return (
    <>
      <h3>Wellness Score: {user.wellnessScore}</h3>
      {!isEditing ? (
        <>
          <p>
            <strong>Name: </strong>
            {user.firstName} {user.lastName}
          </p>
          <p>
            <strong>Email: </strong>
            {user.userName}
          </p>
          <p>
            <strong>Sex: </strong>
            {user.sex}
          </p>
          <p>
            <strong>Weight: </strong>
            {user.weight}
          </p>
          <p>
            <strong>Body fat: </strong>
            {user.fatPercentage}
          </p>
          <p>
            <strong>Age: </strong>
            {user.age}
          </p>
          <p>
            <strong>Height: </strong>
            {user.height}
          </p>
          <button onClick={handleEditClick}>Edit Profile</button>
        </>
      ) : (
        <>
          <label className="stacked">
            First Name:
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            ></input>
          </label>
          <label className="stacked">
            Last Name :
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            ></input>
          </label>
          <label className="stacked">
            Neck Circumference: (cm):
            <input
              name="neckCircumference"
              value={formData.neckCircumference}
              onChange={handleChange}
            ></input>
          </label>
          <br />
          <label className="stacked">
            Waist Circumference: (cm) :
            <input
              name="waistCircumference"
              value={formData.waistCircumference}
              onChange={handleChange}
            ></input>
          </label>
          <label className="stacked">
            Weight (kg):
            <input
              name="weight"
              value={formData.weight}
              onChange={handleChange}
            ></input>
          </label>
          <label className="stacked">
            Height (cm):
            <input
              name="height"
              value={formData.height}
              onChange={handleChange}
            ></input>
          </label>
          <label className="stacked">
            Sex:
            <input
              name="sex"
              value={formData.sex}
              onChange={handleChange}
            ></input>
          </label>

          <br />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      )}
    </>
  );
};

export default Profile;
