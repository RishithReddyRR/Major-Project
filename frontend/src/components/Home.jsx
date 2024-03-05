import React from "react";
import MetaData from "./structure/MetaData";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { FaArrowDown } from "react-icons/fa";
import LandingImage from "../images/login-1.png";
import vnrlogo from "../images/vnr-logo.png";
import webOfScience from "../images/webOfScienceIcon.png";
import ImageGallery from "react-image-gallery";
import { useDispatch, useSelector } from "react-redux";
import "./Home.scss";
import { useEffect } from "react";
import { getPublicationsHome } from "../actions/publicationsAction";
import Publication from "./publications/Publication";
import { Link } from "react-router-dom";
import { allImages } from "../actions/imageActions";
import { getAdminPublications } from "../actions/publicationsAction";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { SkewLoader } from "react-spinners";

const Home = () => {
  let wid = 400,
    hei = 200;
  const chartSetting = {
    yAxis: [
      {
        label: "Publications Count",
      },
    ],
    width: wid,
    height: hei,
  };
  const { images } = useSelector((state) => state.imagesLoad);

  let imagesC = [];
  images.map((image) => {
    imagesC = [
      ...imagesC,
      {
        original: image.avatar.url,
      },
    ];
  });
  const { publications, error, loading } = useSelector(
    (state) => state.userPublications
  );
  const {
    publicationsCount,
    countArray,
    loadingD,
    yearCount,
    yearCountEach,
    errorD,
  } = useSelector((state) => state.publicationsAdmin);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allImages());
    dispatch(getAdminPublications());
    dispatch(getPublicationsHome());
  }, []);
  return (
    <div>
      <MetaData title={`Home`} />
      <div className="landing-parent">
        {/* <img src={LandingImage} className="landing" />
        <q>
          Publishing is the art of working on a creative idea and turning it
          into a masterpiece.
        </q>
        <a href="#carousel">
          <FaArrowDown className="scroll-down" />
        </a> */}
        {loadingD ? (
          <div id="loader">
            <SkewLoader color="#36d7b7" size={"6vmax"} />
          </div>
        ) : (
          <div className="dashboard-container home-dashboard">
            {countArray && (
              <div className="count-section" id="count-section">
                <div className="total-publications">
                  <p>Total</p>
                  {publicationsCount}
                </div>
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
            <div className="charts">
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
                        highlightScope: {
                          faded: "global",
                          highlighted: "item",
                        },
                        faded: {
                          innerRadius: 30,
                          additionalRadius: -30,
                          color: "gray",
                        },
                      },
                    ]}
                    width={wid}
                    height={hei}
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
                    xAxis={[{ scaleType: "band", dataKey: "year" }]}
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
                    xAxis={[{ scaleType: "band", dataKey: "year" }]}
                    series={[
                      { dataKey: "countJ", label: "Journals" },
                      { dataKey: "countB", label: "Book Chapters" },
                      { dataKey: "countC", label: "Conferences" },
                      { dataKey: "countP", label: "Patents" },
                      { dataKey: "countCR", label: "Copyrights" },
                    ]}
                    slotProps={{
                      legend: {
                        labelStyle: {
                          fontSize: 14,
                        },
                        itemMarkWidth: 10,
                        itemMarkHeight: 10,
                        markGap: 5,
                        itemGap: 4,
                      },
                    }}
                    {...chartSetting}
                  />
                  <p>Last 10 years publications</p>
                </div>
              )}
              {yearCount && (
                <div className="pie-chart">
                  <LineChart
                    dataset={yearCount}
                    xAxis={[{ scaleType: "band", dataKey: "year" }]}
                    series={[{ dataKey: "count", label: "publications count" }]}
                    {...chartSetting}
                  />
                  <p>Last 15 years publications</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div id="carousel">
        <ImageGallery
          items={imagesC}
          showBullets
          showFullscreenButton={false}
          infinite
          showPlayButton={false}
          autoPlay
        />
      </div>
      <div className="publications-home">
        <p>Publications</p>
        {publications &&
          publications.map((ele, idx) => {
            return (
              <Publication
                key={ele._id}
                pub={ele}
                index={idx}
                style={{ width: "70vw" }}
              />
            );
          })}
        <Link to="/publications">
          <h1>Show More</h1>
        </Link>
      </div>
    </div>
  );
};

export default Home;
