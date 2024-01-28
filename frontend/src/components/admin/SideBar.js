import React from "react";
import "./sidebar.scss";
import { Link } from "react-router-dom";
import vnrLogo from "../../images/vnr-logo.png";
import { MdDashboard } from "react-icons/md";
import { LuArrowUpDown } from "react-icons/lu";
import { FaPlus } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
const SideBar = () => {
  return (
    <div className="sidebar">
      <Link to="/">
        <img src={vnrLogo} />
      </Link>
      <div className="dashboard-route">
        <MdDashboard className="icon" />
        <Link to="/admin/dashboard">Dashboard</Link>
      </div>
      <div className="dashboard-route">
        <LuArrowUpDown className="icon" />
        <Link to="/admin/publications">Publications</Link>
      </div>
      <div className="dashboard-route">
        <FaPlus className="icon" />
        <Link to="/admin/upload">Upload New</Link>
      </div>
      <div className="dashboard-route">
        <FaUserAlt className="icon" />
        <Link to="/admin/users">Users Panel</Link>
      </div>
    </div>
  );
};

export default SideBar;
