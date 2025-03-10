import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../../../App.css";

const Profile = () => {
  return (
    <div className="profile-container">
      <nav className="profile-nav">
        <NavLink to="fans">我的粉丝</NavLink>
        <NavLink to="follow">我的关注</NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default Profile;
