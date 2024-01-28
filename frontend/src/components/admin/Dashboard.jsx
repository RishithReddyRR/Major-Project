import React, { useEffect } from "react";
import SideBar from "./SideBar";
import "./dashboard.scss";
import { getAdminPublications } from "../../actions/publicationsAction";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../structure/MetaData";
import { HashLoader } from "react-spinners";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from '@mui/x-charts/LineChart';
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const chartSetting = {
    yAxis: [
      {
        label: "Publications Count",
      },
    ],
    width: 600,
    height: 400,
  };
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { publications, publicationsCount, countArray, loading, yearCount,yearCountEach,error } =
    useSelector((state) => state.publicationsAdmin);
  useEffect(() => {
    dispatch(getAdminPublications());
    if(error){
      dispatch({type:"CLEAR_ERRORS"})
      navigate("/")
    }
  }, [error]);
  return (
    <div className="dashboard">
      <MetaData title={"admin--Dashboard"} />
      <SideBar />
      {loading ? (
        <div className="loader">
          <HashLoader color="tomato" size={"20vmax"} />
        </div>
      ) : (
        <div className="dashboard-container">
          <h1>Dashboard</h1>
          <p>
            Total Publications
            <p>{publicationsCount}</p>
          </p>
          {countArray && (
            <div className="count-section">
              <div className="journal-sec">
                <p>Journals</p>
                {countArray[0]}
              </div>
              <div className="book-chapter-sec">
                <p>Book Chapters</p>
                {countArray[1]}
              </div>
              <div className="conference-sec">
                <p>Conferences</p>
                {countArray[2]}
              </div>
              <div className="patent-sec">
                <p>Patents</p>
                {countArray[3]}
              </div>
              <div className="copyright-sec">
                <p>Copyrights</p>
                {countArray[4]}
              </div>
              
            </div>
          )}
          {countArray && (
            <div className="pie-chart">
              <PieChart
                series={[
                  {
                    data: [
                      {
                        id: 0,
                        value: countArray[0],
                        label: "Journals",
                        color: "tomato",
                      },
                      {
                        id: 1,
                        value: countArray[1],
                        label: "Book Chapters",
                        color: "crimson",
                      },
                      {
                        id: 2,
                        value: countArray[2],
                        label: "Conferences",
                        color: "blue",
                      },
                      {
                        id: 3,
                        value: countArray[3],
                        label: "Patents",
                        color: "black",
                      },
                      {
                        id: 4,
                        value: countArray[4],
                        label: "Copyrights",
                        color: "green",
                      },
                    ],
                    innerRadius: 50,
                    highlightScope: { faded: "global", highlighted: "item" },
                    faded: {
                      innerRadius: 30,
                      additionalRadius: -30,
                      color: "gray",
                    },
                  },
                ]}
                width={600}
                height={400}
                slotProps={{
                  legend: {
                    direction: "column",
                    position: { vertical: "middle", horizontal: "right" },
                    padding: 0,
                  },
                }}
              ></PieChart>
              <p>Publications</p>
            </div>
          )}
          {yearCount && (
            <div className="pie-chart">
              <BarChart
                dataset={yearCount}
                xAxis={[{ scaleType: "band", dataKey: "year"}]}
                series={[{ dataKey: "count", label: "publications count" }]}
                {...chartSetting}
              />
              <p>Last 15 years publications</p>
            </div>
          )}
          {yearCountEach && (
            <div className="pie-chart">
              <BarChart
                dataset={yearCountEach}
                xAxis={[{ scaleType: "band", dataKey: "year"}]}
                series={[
                  { dataKey: "countJ", label: "Journals" },
                  { dataKey: "countB", label: "Book Chapters" },
                  { dataKey: "countC", label: "Conferences" },
                  { dataKey: "countP", label: "Patents" },
                  { dataKey: "countCR", label: "Copyrights" },
                ]}
                {...chartSetting}
                />
              <p>Last 10 years publications</p>
            </div>
          )}
          {yearCount && (
            <div className="pie-chart">
              <LineChart
                dataset={yearCount}
                xAxis={[{ scaleType: "band", dataKey: "year"}]}
                series={[{ dataKey: "count", label: "publications count" }]}
                {...chartSetting}
              />
              <p>Last 15 years publications</p>
            </div>
          )}
        </div>
      )}
      
    </div>
  );
};

export default Dashboard;
