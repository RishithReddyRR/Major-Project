import React from "react";
import { useSelector } from "react-redux";
import profile from "../../images/Profile.png";
import "./account.scss";
import { FaLocationDot } from "react-icons/fa6";
import { FaBirthdayCake } from "react-icons/fa";
import { BiLinkExternal } from "react-icons/bi";
import gsIcon from "../../images/googleScholarIcon.png";
import wosIcon from "../../images/webOfScienceIcon.png";
import scopusIcon from "../../images/scopusIcon.png";
import vidwanIcon from "../../images/vidwanIcon.png";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
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

ChartJs.register(ArcElement, Tooltip, Legend);
const Account = () => {
  const { user,loading } = useSelector((state) => state.user);
  const {
    publications,
    error,
    publicationsCount,
    resultPerPage,
    totalPublications,
    countArray,
  } = useSelector((state) => state.userPublications);
  let ob = useSelector((state) => {
    return state.publicationUpload;
  });
  ob = ob ? ob : {};
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
    dispatch(getUserPublications(user.name, currentPage));
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
    if (ob && ob.error) {
      toast.error(ob.error, {
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
    if (ob && ob.success) {
      toast.success("uploaded successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      handleClose();
      dispatch({ type: "CLEAR_ERRORS" });
    }
    // console.log(file)
  }, [error, currentPage, ob.error, ob.success,loading]);
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
              <img src={ResearchProfilesImage} className="research-image" />
            </div>
          </div>
          <div className="section-2">
            <div>
              <h1>Publications:{publicationsCount}</h1>
              <Doughnut data={data} options={options}></Doughnut>
            </div>
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
              {user.education&&user.education.map((item, index) => (
                <TimelineItem
                  period={item.period}
                  degree={item.degree}
                  index={index}
                  institute={item.institute}
                />
              ))}
            </div>
          </div>
          <div className="section-5">
            <h1>Publications</h1>
            <div className="pb-filter">
              <div className="total-publications">
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
                <button
                  className="upload-pub"
                  onClick={handleOpen}
                  title="upload publications"
                >
                  Upload
                </button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  className="upload-o-modal"
                >
                  <div className="upload-modal">
                    <MdOutlineClose
                      className="close-modal"
                      onClick={handleClose}
                    />
                    <div className="dcsv">
                      <p>
                        <b>Note:</b>
                        download the template csv file then fill and upload the
                        filled csv file
                      </p>
                      <a
                        href="/publication-model.csv"
                        download="publication-model.csv"
                      >
                        <button className="dcsv">Download The Model Csv</button>
                      </a>
                    </div>
                    <div>
                      <input
                        type="file"
                        name="Upload"
                        onChange={(event) => setFile(event.target.files[0])}
                      />
                      <button onClick={upload}>Upload</button>
                    </div>
                  </div>
                </Modal>
              </div>
            </div>
            <div
              className="line"
              style={{ width: "95%", marginTop: "0" }}
            ></div>
            <div>
              {publications != 0 ? (
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

const TimelineItem = ({ index, period, degree, institute }) => (
  <div
    className={`timelineItem ${
      index % 2 === 0 ? "leftTimeline" : "rightTimeline"
    }`}
  >
    <div>
      <h2>{period}</h2>
      <p>{degree}</p>
      <p>{institute}</p>
    </div>
  </div>
);

export default Account;
