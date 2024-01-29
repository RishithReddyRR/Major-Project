import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAllPublications,
  getPublications,
} from "../../actions/publicationsAction";
import { ToastContainer, toast } from "react-toastify";
import { RingLoader } from "react-spinners";
import { Publication, handleClose } from "./Publication";
import Pagination from "react-js-pagination";
import { useState } from "react";
import MetaData from "../structure/MetaData";
import NoPublicationsImage from "../../images/NotFoundImage.jpg";
import "./Publications.scss";
import SideBar from "./SideBar";
import { utils, writeFile } from "xlsx";
import { FaWindowClose } from "react-icons/fa";
import Slider from "@mui/material-next/Slider";
import { BiSolidCategory } from "react-icons/bi";
import { RiDoubleQuotesR } from "react-icons/ri";
import { BsCalendarMonth } from "react-icons/bs";
import { MdCalendarMonth } from "react-icons/md";
import { BsFilterLeft } from "react-icons/bs";
const categories = [
  "All",
  "Journal",
  "Book Chapter",
  "Conference",
  "Patent",
  "Copyright",
];
const AdminPublications = () => {
  const { deleted, success, error } = useSelector(
    (state) => state.publicationsDelete
  );
  const { keyword } = useParams();
  const dispatch = useDispatch();
  const [value, setValue] = useState([0, 1000]);
  const [ppp, setPpp] = useState(10);
  const [Pppp, setPPpp] = useState(10);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  let years = [];
  for (let i = 0; i < 50; i++) {
    years.push(currentYear - i);
  }
  const months = [
    "January",
    "Febrauary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const {
    publications,
    loading,
    publicationsCount,
    resultPerPage,
    filteredPublicationsCount,
    totalPublications,
  } = useSelector((state) => state.userPublications);
  const [currentPage, setCurrentPageNo] = useState(1);
  const [category, setCategory] = useState("All");
  const [fYear, setFYear] = useState("1900");
  const [tYear, setTYear] = useState("");
  const [fMonth, setFMonth] = useState("");
  const [eMonth, setEMonth] = useState("s");
  const [foc, setFoc] = useState(false);
  // console.log(fYear);
  // console.log(ppp);
  useEffect(() => {
    if (success) {
      // handleClose()
      toast.success("Successfully Deleted", {
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
    dispatch(
      getPublications(
        keyword,
        currentPage,
        category,
        value,
        setValue,
        ppp,
        fYear,
        tYear,
        fMonth,
        eMonth,
        currentYear
      )
    );
  }, [
    dispatch,
    error,
    currentPage,
    keyword,
    category,
    value,
    Pppp,
    fYear,
    fMonth,
    eMonth,
    tYear,
    success,
    deleted,
  ]);
  const downloadAsWorkbook = () => {
    const ws = utils.json_to_sheet(totalPublications);
    /* create workbook and append worksheet */
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "publications");
    /* export to XLSX */
    writeFile(wb, "Publications.xlsx");
  };
  return (
    <div className="publicationsD">
      <MetaData title={`Publications`} />
      {/* <div className="publications-display"> */}
      <div className="main-display admin-m-d dashboard">
        <SideBar />
        {loading ? (
          <div className="loader publications p-a">
            <RingLoader color="tomato" size="10vmax" />
          </div>
        ) : (
          <div className="publications p-a ">
            <BsFilterLeft className="filter-o-c" onClick={() => setFoc(!foc)} />
            <div
              className={`filterBox  filter-a ${
                foc ? "f-b-a-open" : "f-b-a-close"
              }`}
            >
              <FaWindowClose className="close-a" onClick={() => setFoc(!foc)} />
              <div className="categoryBox">
                <div className="categories">
                  {" "}
                  <BiSolidCategory />
                  Categories
                </div>
                {categories.map((ele) => (
                  <div
                    className="category"
                    onClick={() => {
                      setCategory(ele);
                    }}
                  >
                    {ele}
                  </div>
                ))}
              </div>
              <div className="line"></div>
              <div className="cRange">
                <p>
                  <RiDoubleQuotesR />
                  Citations
                </p>
                <Slider
                  value={value}
                  min={0}
                  max={1000}
                  valueLabelDisplay="on"
                  onChange={handleChange}
                />
                <div className="line"></div>
                <div className="year">
                  <div className=" year-filter" style={{ marginTop: "1vmax" }}>
                    {" "}
                    <div className="categories">
                      {" "}
                      <MdCalendarMonth /> Year
                    </div>
                    <div className="fty" style={{ textAlign: "center" }}>
                      <select
                        className="date-filter from"
                        onChange={(event) => setFYear(event.target.value)}
                        value={fYear}
                      >
                        <option value={""}>From</option>
                        {years.map((year) => (
                          <option value={year.toString()}>{year}</option>
                        ))}
                      </select>
                      -
                      <select
                        className="date-filter to"
                        onChange={(event) => setTYear(event.target.value)}
                        value={tYear}
                      >
                        <option value={""} disabled>
                          To
                        </option>
                        {years.map((year) => (
                          <option value={year.toString()}>{year}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="line"></div>
                  <div className="month-filter">
                    <div className="categories">
                      <BsCalendarMonth />
                      Month
                    </div>
                    <div>
                      <select
                        className="date-filter"
                        onChange={(event) => setFMonth(event.target.value)}
                        value={fMonth}
                      >
                        <option value={""}>Month</option>
                        {months.map((month) => (
                          <option value={month.toString()}>{month}</option>
                        ))}
                      </select>
                      -
                      <select
                        className="date-filter"
                        onChange={(event) => setEMonth(event.target.value)}
                        value={eMonth}
                      >
                        <option value={""}>Month</option>
                        {months.map((month) => (
                          <option value={month.toString()}>{month}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p>Publications</p>
            <div className="b-filter">
              <div className="total-publications">
                <b>{`${category == "All" ? "Publications" : category}:`}</b>
                {`(${Pppp * (currentPage - 1) + 1}-${
                  currentPage * Pppp
                } publications from total ${filteredPublicationsCount} publications)`}
              </div>
              <div style={{ marginRight: "1vmax" }}>
                <form className="ppp">
                  {/* <select
                    id="publications-per-page"
                    value={ppp}
                    onChange={(event) => setPpp(event.target.value)}
                  >
                    <option value={10}>Publications per page</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                    <option value={40}>40</option>
                    <option value={50}>50</option>
                  </select> */}
                  <label htmlFor="">Publications per page</label>
                  <input
                    type="text"
                    value={ppp}
                    onChange={(event) => setPpp(event.target.value)}
                    id="publications-per-page"
                    placeholder="publications per page"
                    title="type number and click on enter "
                  />
                  <button
                    onClick={() => {
                      setCurrentPageNo(1)
                      setPPpp(ppp)}}
                    style={{ display: "none" }}
                  ></button>
                </form>
                <div className="down">
                  <button
                    onClick={downloadAsWorkbook}
                    className="download-excel"
                  >
                    Download
                  </button>
                  <span>Download all publications as a excel sheet</span>
                </div>
                <button
                  className="delete-all-pubs"
                  style={{ backgroundColor: "red", marginLeft: ".5vmax" }}
                  onClick={() => {
                    let res=window.confirm("are you sure,do you want to delete all publications?")
                    if(res)
                    dispatch(deleteAllPublications());
                  }}
                >
                  Delete All Publications
                </button>
              </div>
            </div>
            <div className="line" style={{ width: "74vw" }}></div>
            {publications && filteredPublicationsCount != 0 ? (
              publications.map((ele, idx) => {
                return <Publication key={ele._id} pub={ele} index={idx} />;
              })
            ) : (
              <div className="no-results">
                <img src={NoPublicationsImage} alt="" />
                <p>NO PUBLICATIONS FOUND</p>
              </div>
            )}
            {resultPerPage < filteredPublicationsCount ? (
              <div className="paginationBox">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resultPerPage}
                  totalItemsCount={filteredPublicationsCount}
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
        )}
      </div>
      {/* </div> */}

      <ToastContainer />
    </div>
  );
};

export default AdminPublications;
