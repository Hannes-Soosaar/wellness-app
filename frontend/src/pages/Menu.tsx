import React from "react";
import { Link } from "react-router-dom";

const Menu: React.FC = () => {
  return (
    <>
      <nav className="vertical-container">
        <h3>Main Menu </h3>
        <ul>
          <li>
            <Link to="/user/profile">Profile</Link>
          </li>
          <li>
            <Link to="/user/Assessment">Assessment</Link>
          </li>
          <li>
            <Link to="/user/overview">Overview</Link>
          </li>
          <li>
            <Link to="/user/settings">Settings</Link>
          </li>
          <li>
            <Link to="/user/advice">Advice</Link>
          </li>
        </ul>

        <h3>Update</h3>
        <ul>
          <li>
            <Link to="/user/goals">Goals</Link>
          </li>
          <li>
            <Link to="/user/activity">Activity</Link>
          </li>
          <li>
            <Link to="/user/progress">Physical Progress</Link>
          </li>
          <li>
            <Link to="/user/pushupswalk">Performance Progress</Link>
          </li>
          {/*
          Commented out until v2 of the app
          <li>
            <Link to="/user/meal">Meal</Link>
          </li> */}
          <li>
            <Link to="/user/restrictions">Restrictions</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Menu;
