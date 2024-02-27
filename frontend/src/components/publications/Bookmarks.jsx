import React from "react";
import Publication from "./Publication";
import NoPublicationsImage from "../../images/NotFoundImage.jpg";
import "./Bookmarks.scss";
import { useNavigate } from "react-router-dom";
import MetaData from "../structure/MetaData";
import { ToastContainer, toast } from "react-toastify";

const Bookmarks = () => {
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
  const navigate = useNavigate();
  return bookmarks.length == 0 ? (
    <div className="no-bookmarks">
      <MetaData title={`Bookmarks`} />

      <img src={NoPublicationsImage} alt="" />
      <h2>No Bookmarks</h2>
    </div>
  ) : (
    <div className="bookmarks">
      <MetaData title={`Bookmarks`} />

      <div>
        <h1>Bookmarks</h1>
        {bookmarks.map((bookmark, idx) => (
          <Publication key={bookmark._id} pub={bookmark} index={idx} />
        ))}
        <button
          onClick={() => {
            localStorage.clear();
            navigate("/bookmarks");
          }}
        >
          Clear Bookmarks
        </button>
      </div>
    </div>
  );
};

export default Bookmarks;
