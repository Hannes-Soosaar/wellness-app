import React, { useState } from "react";
import { FaPray } from "react-icons/fa";

interface UserData {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  // gender needs to be a number
  gender: string;
  age: number;
  weight: number;
  height: number;
  BMI: number;
  fatPercentage: number;
  wellnessScore: number;
}

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<UserData>({
    id: "aa21231",
    userName: "hannes@gmail.com",
    firstName: "Hannes",
    lastName: "Soosaar",
    gender: "male",
    age: 41,
    weight: 131,
    height: 185,
    BMI: 28,
    fatPercentage: 21,
    wellnessScore: 100,
  });

  const [formData, setFromData] = useState<UserData>(user);

  const handleEditClick = () => {
    setFromData(user);
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
    setFromData({ ...formData, [event.target.name]: event.target.value });
    //TODO add more values here -
  };

  return (
    <>
      <h1>User Profile</h1>
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
            <strong>Gender: </strong>
            {user.gender}
          </p>
          <p>
            <strong>Weight: </strong>
            {user.weight}
          </p>
          <p>
            <strong>Age: </strong>
            {user.age}
          </p>
          <p>
            <strong>Height: </strong>
            {user.height}
          </p>
          {/* <button onClick={handleEditClick}>Update profile</button> */}
        </>
      ) : (
        <>
          <label>
            First name:
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            ></input>
          </label>
          <br />
          <label>
            Last name:
            <input
              name="lastName"
              value={formData.lastName}
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
