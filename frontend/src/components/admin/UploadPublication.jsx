import React from "react";
import SideBar from "./SideBar";
import { uploadPublications } from "../../actions/publicationsAction";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { ToastContainer, toast } from "react-toastify";

import "./uploadPublication.scss";
import { useEffect } from "react";
const UploadPublication = () => {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(
    (state) => state.publicationUpload
  );
  const upload = () => {
    dispatch(uploadPublications(file));
  };
  useEffect(() => {
    if (success) {
      // handleClose()
      toast.success("Successfully Uploaded", {
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
  }, [success, error]);
  return (
    <div className="dashboard">
      <SideBar />
      <div className="upload-container">
        <div className="upload-modal">
          <div className="dcsv">
            <p>
              <b>Note:</b>
              download the template csv file then fill and upload the filled csv
              file
            </p>
            <a href="/publication-model.csv" download="publication-model.csv">
              <button className="dcsv">Download The Model Csv</button>
            </a>
          </div>
          <div>
            <input
              type="file"
              name="Upload"
              onChange={(event) => setFile(event.target.files[0])}
            />
            {loading ? (
              <CircularProgress style={{margin:"auto"}}/>
            ) : (
              <button onClick={upload}>Upload</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPublication;
