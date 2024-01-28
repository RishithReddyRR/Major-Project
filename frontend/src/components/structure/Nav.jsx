import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {LuSearch} from "react-icons/lu"
// import Cookies from 'js-cookie'
import './Nav.css'
import UserOptions from "./UserOptions";
const Nav = () => {
  const {user,isAuthenticated}=useSelector(state=>state.user)
  return (
    <div id="nav">
        <Link to="/">Home</Link>
        <Link to="/publications">Publications</Link>
        <Link to="/search" id="search"><LuSearch style={{fontSize:"1.75vmax"}}/> Search</Link>
        <Link to="/login">Login</Link>
        {/* <Link to="/Register">Register</Link> */}
        {isAuthenticated&&<UserOptions user={user}/>}
    </div>
  );
};

export default Nav;
