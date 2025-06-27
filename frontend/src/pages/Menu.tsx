import React from "react";

interface MenuProps {
  userName: string;
}

let userName: string = "John Doe";

const Menu: React.FC = () => {
  return (
    <>
      <nav className="vertical-container">
        <h3>{userName}</h3>
        <ul>
          <li>
            <a href="/user/">Profile</a>
          </li>
          <li>
            <a href="/user/overview">Overview</a>
          </li>
          <li>
            <a href="/user/settings">Settings</a>
          </li>
          <li>
            <a href="/user/advice">Advice</a>
          </li>
        </ul>

        <h3>Update</h3>
        <ul>
          <li>
            <a href="/user/goals">Goals</a>
          </li>
          <li>
            <a href="/user/activity">Activity</a>
          </li>
          <li>
            <a href="/user/progress">Progress</a>
          </li>
          <li>
            <a href="/user/meal">Meal</a>
          </li>
          <li>
            <a href="/user/restrictions">Restrictions</a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Menu;
