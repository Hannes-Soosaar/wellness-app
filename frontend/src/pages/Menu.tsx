import React from "react";

const Menu: React.FC = () => {
  return (
    <>
      <nav className="vertical-menu">
        <ul>
          <h2>Profile</h2>
          <li>
            <a href="/user">Overview</a>
          </li>
          <li>
            <a href="/user/settings">Settings</a>
          </li>
        </ul>

        <h2>Update</h2>
        <ul>
          <li>
            <a href="/user/activity">Activity</a>
          </li>
          <li>
            <a href="/user/progress">Progress</a>
          </li>
          <li>
            <a href="/user/meal">Meal</a>
          </li>
        </ul>
        <h2></h2>
        <ul>
          <li>
            <a href="/user">User</a>
          </li>
          <li>
            <a href="/user/goals">Goals</a>
          </li>
          <li>
            <a href="/user/advice">Advice</a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Menu;
