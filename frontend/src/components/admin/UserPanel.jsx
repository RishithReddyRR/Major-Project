import SideBar from "./SideBar";
import React from "react";
import { getAllUsers, usersByDepartment } from "../../actions/userActions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./users.scss";
const UserPanel = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  const x = {
    CSEAIML: "CSE(AI ML,IOT)",
    CSECYS: "CSE(CYS,DS)",
  };
  return (
    <div className="dashboard">
      <SideBar />
      <div className="admin-users">
        <div>
          <h2>Name</h2>
          <h2>Email</h2>
          <h2>Role</h2>
          <h2>department</h2>
        </div>
        {users.map((user, idx) => (
          <div>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.role}</p>
            <p>{user.department}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPanel;
