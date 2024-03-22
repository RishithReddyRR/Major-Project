import React from "react";
import SideBar from "./SideBar";
import "./users.scss";
import { useParams } from "react-router-dom";
import { usersByDepartment } from "../../actions/userActions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
const UserPanel = () => {
  // const { department } = useParams();
  const department = [
    "CSE AND CSBS",
    "IT",
    "ECE",
    "Civil Engineering",
    "CSE(AI ML,IOT)",
    "CSE(CYS,DS)",
    "EIE",
    "Automobile Engineering",
    "Mechanical",
    "EEE",
  ];
  console.log(department);
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  console.log(users);
  useEffect(() => {
    dispatch(usersByDepartment(department));
  }, []);
  const x = {
    CSEAIML: "CSE(AI ML,IOT)",
    CSECYS: "CSE(CYS,DS)",
  };
  return (
    <div className="dashboard">
      <SideBar />
      <div className="users">
        <div className="head" style={{ marginTop: ".3vmax" }}>
          <h2>Name</h2>
          <h2>Designation</h2>
          <h2>Branch</h2>
        </div>
        {users.map((user, idx) => (
          <Link className="user_link" to={`/user/${user.name}`} target="_blank">
            <div className={`${idx % 2 == 0 ? "even" : "odd"}`}>
              <p>{user.name}</p>
              <p>{user.description}</p>
              <p>
                {user.department == "CSEAIML" || user.department == "CSECYS"
                  ? x[user.department]
                  : user.department}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserPanel;
