import React from "react";
import { useSelector } from "react-redux";
import profile from "../../images/Profile.png";
// import "./account.scss";
import { FaLocationDot } from "react-icons/fa6";
import { FaBirthdayCake } from "react-icons/fa";
import { BiLinkExternal } from "react-icons/bi";
import gsIcon from "../../images/googleScholarIcon.png";
import wosIcon from "../../images/webOfScienceIcon.png";
import scopusIcon from "../../images/scopusIcon.png";
import vidwanIcon from "../../images/vidwanIcon.png";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { BarChart } from "@mui/x-charts/BarChart";
import { CirclesWithBar } from "react-loader-spinner";
import { useParams } from "react-router-dom";

import {
  getUserPublications,
  uploadPublications,
} from "../../actions/publicationsAction";
import Publication from "../publications/Publication";
import { useDispatch } from "react-redux";
import Pagination from "react-js-pagination";
import { useState } from "react";
import MetaData from "../structure/MetaData";
import NoPublicationsImage from "../../images/NotFoundImage.jpg";
import ResearchProfilesImage from "../../images/research-profiles.png";
import { utils, writeFile } from "xlsx";
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Modal from "@mui/material/Modal";
import { MdOutlineClose } from "react-icons/md";
import { RingLoader } from "react-spinners";
import { loadUserG, scrapUserPublications } from "../../actions/userActions";
import axios from "axios";
ChartJs.register(ArcElement, Tooltip, Legend);
const User = () => {
  const { name } = useParams();

  const { user, loading, success } = useSelector((state) => state.userG);
  const chartSetting = {
    yAxis: [
      {
        label: "Publications Count",
      },
    ],
    width: 570,
    height: 370,
  };
  const {
    publications,
    error,
    publicationsCount,
    resultPerPage,
    totalPublications,
    countArray,
    yearCount,
    yearCitationsCount,
  } = useSelector((state) => state.userPublications);

  const [currentPage, setCurrentPageNo] = useState(1);
  //calculating count of publications

  const data = {
    labels: ["JOURNALS", "BOOKCHAPTER", "CONFERENCE", "PATENT", "COPYRIGHT"],
    datasets: [
      {
        label: "count",
        data: countArray,
        backgroundColor: [
          "#000bdc",
          "#00f900",
          "#65318e",
          "#b00149",
          "magenta",
        ],
        borderColor: ["#000bdc", "#00f900", "#65318e", "#b00149", "magenta"],
      },
    ],
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const options = {};
  const [file, setFile] = useState();
  const upload = () => {
    dispatch(uploadPublications(file));
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserG(name));
    dispatch(getUserPublications(name, currentPage));
    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      dispatch({ type: "CLEAR_ERRORS" });
    }

    // console.log(file)
  }, [currentPage]);
  const downloadAsWorkbook = () => {
    const ws = utils.json_to_sheet(totalPublications);
    /* create workbook and append worksheet */
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "publications");
    /* export to XLSX */
    writeFile(wb, "Publications.xlsx");
  };

  return loading ? (
    <div className="loader">
      <RingLoader color="tomato" size="10vmax" />
    </div>
  ) : (
    user && (
      <div className="profile-background">
        <MetaData title={user.name} />
        <div className="profile">
          <div className="section-1">
            <div className="profile-photo">
              {user.avatar && <img src={user.avatar.url} alt="" />}
              <div className="name">{user.name}</div>
              <div className="description">{user.description}</div>
              <div className="p-details">
                <p>
                  <FaLocationDot />
                  {user.city}
                </p>
                <p>
                  <FaBirthdayCake />
                  {user.dob}
                </p>
              </div>

              <div className="research-profiles">
                <div>
                  <h1>Research Profiles</h1>
                  <div>
                    <a href={user.gsProfile} target="blank">
                      <img src={gsIcon} alt="google scholar" />
                    </a>
                    <a href={user.wosProfile} target="blank">
                      <img src={wosIcon} alt="web of science" />
                    </a>
                    <a href={user.scopusProfile} target="blank">
                      <img src={scopusIcon} alt="scopus" />
                    </a>
                    <a href={user.vidwanProfile} target="blank">
                      <img src={vidwanIcon} alt="vidwan" />
                    </a>
                  </div>
                </div>
                {/* <img src={ResearchProfilesImage} className="research-image" /> */}
              </div>
            </div>
            <div>
              <div className="donut">
                <h1>Publications:{publicationsCount}</h1>
                <Doughnut data={data} options={options}></Doughnut>
              </div>
            </div>
          </div>

          <div className="section-2">
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
            {yearCitationsCount && (
              <div className="pie-chart">
                <BarChart
                  dataset={yearCitationsCount}
                  xAxis={[{ scaleType: "band", dataKey: "year" }]}
                  series={[{ dataKey: "count", label: "citations count" }]}
                  {...chartSetting}
                />
                <p>Last 15 years Citations</p>
              </div>
            )}
          </div>
          <div className="section-3">
            <h1>Research Activities</h1>
            <div className="rProfiles">
              <div>
                <a href={user.gsProfile} target="blank">
                  Google Scholar
                  <BiLinkExternal />
                </a>
                <div>
                  <p>citations:{user.gsCitations}</p>
                  <p>h-index:{user.gsHIndex}</p>
                </div>
              </div>
              <div>
                <a href={user.wosProfile} target="blank">
                  Web Of Science
                  <BiLinkExternal />
                </a>
                <div>
                  <p>citations:{user.wosCitations}</p>
                  <p>h-index:{user.wosHIndex}</p>
                </div>
              </div>
              <div>
                <a href={user.scopusProfile} target="blank">
                  Scopus
                  <BiLinkExternal />
                </a>
                <div>
                  <p>citations:{user.scopusCitations}</p>
                  <p>h-index:{user.scopusHIndex}</p>
                </div>
              </div>
              <div>
                <a href={user.vidwanProfile} target="blank">
                  vidwan
                  <BiLinkExternal />
                </a>
                <div>
                  <p>vidwan-score:{user.vidwanScore}</p>
                </div>
              </div>
            </div>
          </div>
          <div id="timeline" className="section-4">
            <h1>Education Details</h1>
            <div className="timelineBox">
              {user.education &&
                user.education.map((item, index) => {
                  if (item.length != 0) {
                    return <TimelineItem edu={item} index={index} />;
                  }
                })}
            </div>
          </div>
          <div className="section-5">
            <h1>Publications</h1>
            <div className="pb-filter">
              <div
                className="total-publications"
                style={{ backgroundColor: "unset" }}
              >
                <b>Publications:</b>
                {`(${10 * (currentPage - 1) + 1}-${
                  currentPage * 10
                } publications from total ${publicationsCount} publications)`}
              </div>
              <div>
                <button
                  onClick={downloadAsWorkbook}
                  className="download-excel"
                  title="download all publications as excel"
                >
                  Download
                </button>
              </div>
            </div>
            <div
              className="line"
              style={{ width: "95%", marginTop: "0" }}
            ></div>
            <div>
              {publications != 0 ? (
                publications &&
                publications.map((ele, idx) => {
                  return (
                    <Publication
                      key={ele._id}
                      pub={ele}
                      index={idx}
                      className="p-publication"
                    />
                  );
                })
              ) : (
                <div className="no-results">
                  <img src={NoPublicationsImage} alt="" />
                  <p>NO PUBLICATIONS FOUND</p>
                </div>
              )}
            </div>
            {resultPerPage < publicationsCount ? (
              <div className="paginationBox">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resultPerPage}
                  totalItemsCount={publicationsCount}
                  onChange={setCurrentPageNo}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText="1st"
                  lastPageText="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                />
              </div>
            ) : null}
          </div>
        </div>
        <ToastContainer />
      </div>
    )
  );
};

const TimelineItem = ({ index, edu }) => (
  <div
    className={`timelineItem ${
      index % 2 === 0 ? "leftTimeline" : "rightTimeline"
    }`}
  >
    <div>
      <p>{edu}</p>
    </div>
  </div>
);

export default User;
