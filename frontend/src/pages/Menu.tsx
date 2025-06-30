import React from "react";
import { Link } from "react-router-dom";
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
            <Link to="/user/profile">Profile</Link>
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
            <Link to="/user/progress">Progress</Link>
          </li>
          <li>
            <Link to="/user/meal">Meal</Link>
          </li>
          <li>
            <Link to="/user/restrictions">Restrictions</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Menu;
