import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPublications } from "../../actions/publicationsAction";
import { ToastContainer, toast } from "react-toastify";
import { RingLoader } from "react-spinners";
import Publication from "./Publication";
import Pagination from "react-js-pagination";
import { useState } from "react";
import MetaData from "../structure/MetaData";
import NoPublicationsImage from "../../images/NotFoundImage.jpg";
import "./Publications.scss";
import { BiSolidCategory } from "react-icons/bi";
import Slider from "@mui/material-next/Slider";
import { RiDoubleQuotesR } from "react-icons/ri";
import { BsCalendarMonth } from "react-icons/bs";
import { MdCalendarMonth } from "react-icons/md";
import { utils, writeFile } from "xlsx";
import { BsFilterLeft } from "react-icons/bs";
import { FaWindowClose } from "react-icons/fa";
const categories = [
  "All",
  "Journal",
  "Book Chapter",
  "Conference",
  "Patent",
  "Copyright",
];
const Publications = () => {
  const { keyword } = useParams();
  const dispatch = useDispatch();
  const [value, setValue] = useState([0, 1000]);
  const [ppp, setPpp] = useState(10);
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
    error,
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
  const [foc, setFoc] = useState(false);
  console.log(fYear);
  console.log(ppp);
  useEffect(() => {
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
    ppp,
    fYear,
    fMonth,
    tYear,
  ]);
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
    <div className="publicationsD">
      <MetaData title={`Publications`} />

      {/* <div className="publications-display"> */}
      <div className="main-display">
        <div className= {`filterBox ${foc?"f-b-open":"f-b-close"}`}>
        <FaWindowClose className="close" onClick={()=>setFoc(!foc)}/>
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
                <div className="fty" style={{textAlign:"center"}}>
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
              </div>
            </div>
          </div>
        </div>
        <div className="publications">
          <p>Publications</p>
          <div className="b-filter">
            <div className="total-publications">
            <BsFilterLeft  className="filter-side" onClick={()=>setFoc(!foc)}/>
              <b>{`${category == "All" ? "Publications" : category}:`}</b>
              {`(${ppp * (currentPage - 1) + 1}-${
                currentPage * ppp
              } publications from total ${filteredPublicationsCount} publications)`}
            </div>
            <div style={{ marginRight: "1vmax" }}>
              <div className="ppp">
                <select
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
                </select>
              </div>
              <div className="down">
                <button onClick={downloadAsWorkbook} className="download-excel">
                  Download
                </button>
                <span>Download all publications as a excel sheet</span>
              </div>
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
      </div>
      {/* </div> */}

      <ToastContainer />
    </div>
  );
};

export default Publications;
