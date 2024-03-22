import React from "react";
import { analyticsP } from "../../actions/publicationsAction";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsFilterLeft } from "react-icons/bs";
import { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { FadeLoader } from "react-spinners";
import Table from "./Table";
import "./Analytics.scss";
const Analytics = () => {
  const dispatch = useDispatch();
  const { analytics, loading } = useSelector((state) => state.analytics);
  const [foc, setFoc] = useState(false);
  const [span, setSpan] = useState(5);
  const departments = ["IT", "CSE", "ECE", "EEE", "EIE"];
  const [selectedDepartments, setSelectedDepartments] = useState(departments);
  const handleCheckboxChangeDep = (department) => {
    setSelectedDepartments((prevSelected) => {
      // Toggling the department's presence in the array
      const newSelected = prevSelected.includes(department)
        ? prevSelected.filter((dept) => dept !== department)
        : [...prevSelected, department];
      return newSelected;
    });
  };
  useEffect(() => {
    setFoc(false)
    dispatch(analyticsP(span,departments));
  }, []);
  return loading ? (
    <div className="loader">
      <FadeLoader color="tomato" size="10vmax" />
    </div>
  ) : (
    <div className="analytics">
     
      <BsFilterLeft className="filter-analytics" onClick={() => setFoc(!foc)} />
      <div
        className={`filterBox  filter-an ${
          foc ? "f-b-a-open" : "f-b-a-close"
        } `}
        style={{ width: "30vw !important" }}
      >
        <FaWindowClose className="close-a" onClick={() => setFoc(!foc)} />
        <select
          className="span"
          onChange={(event) => setSpan(event.target.value)}
        >
          <option value="5">Years Span</option>
          <option value="10">last 10years</option>
          <option value="20">last 20years</option>
          <option value="30">last 30years</option>
          <option value="40">last 40years</option>
          <option value="50">last 50years</option>
        </select>
        <div className="line"></div>

        <div>
          <div className="categories">
            <BiSolidCategory />
            Departments
          </div>
          {departments.map((department) => (
            <div key={department} className="category">
              <input
                type="checkbox"
                checked={selectedDepartments.includes(department)}
                onChange={() => handleCheckboxChangeDep(department)}
              />
              {department}
            </div>
          ))}
        </div>
        <div className="line"></div>
        <button
          onClick={() => {
            dispatch(analyticsP(span, selectedDepartments));
          }}
          className="apply"
        >
          Apply
        </button>
      </div>
      {analytics.map((ele) => (
        <div className="analytics-display">
          <p>{`${ele.department}-Department`}</p>
          <Table data={ele.data} />
        </div>
      ))}
    </div>
  );
};

export default Analytics;
