import React, { useState } from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import "./Header.scss";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Backdrop } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import profile from "../../images/Profile.png";
import { logout } from "../../actions/userActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDashboard } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa6";

const UserOptions = ({ user }) => {
  // console.log(user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const account = () => {
    navigate("/account");
  };
  const logoutUser = () => {
    dispatch(logout());
    toast.success("Logout Successfully");
  };
  const adminPanel = () => {
    navigate("/admin/dashboard");
  };
  const bookmarks = () => {
    navigate("/bookmarks");
  };

  let options = [
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <FaRegBookmark />, name: "Bookmarks", func: bookmarks },

    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];
  // eslint-disable-next-line
  if(user&&user.role=="admin"){
    options=[{ icon:<MdDashboard />, name: "Admin Dashboard", func: adminPanel },...options]
  }
  return (
    <>
      <Backdrop open={open} style={{ zIndex: 10 }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        icon={
          <img
            className="speedDialIcon"
            src={user && user.avatar.url ? user.avatar.url : profile}
            alt="Profile"
          />
        }
        className="speedDial"
        style={{ zIndex: 11 }}
      >
        {options.map((option) => (
          <SpeedDialAction
            icon={option.icon}
            tooltipTitle={option.name}
            onClick={option.func}
            key={option.name}
            tooltipOpen={window.innerWidth <= 600}
          />
        ))}
      </SpeedDial>
      <ToastContainer />
    </>
  );
};

export default UserOptions;
