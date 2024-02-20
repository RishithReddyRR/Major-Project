import React from "react";
import SideBar from "./SideBar";
import { uploadPublications } from "../../actions/publicationsAction";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { ToastContainer, toast } from "react-toastify";
import Image from "./Image";
import "./uploadPublication.scss";
import { useEffect } from "react";
import { allImages, uploadImage } from "../../actions/imageActions";
const UploadPublication = () => {
  const [file, setFile] = useState();
  const [avatarPreview, setAvatarPreview] = useState();
  const [avatar, setAvatar] = useState();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(
    (state) => state.publicationUpload
  );
  const { loadingI, errorI, successI } = useSelector((state) => state.images);
  const { images } = useSelector((state) => state.imagesLoad);
  const upload = () => {
    dispatch(uploadPublications(file));
  };
  const uploadImg = () => {
    dispatch(uploadImage({ avatar }));
  };
  useEffect(() => {
    dispatch(allImages({ avatar }));
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
    if (successI) {
      // handleClose()
      toast.success("Successfull", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setAvatarPreview("")
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
    if (errorI) {
      toast.error(errorI, {
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
  }, [success, error, successI, errorI]);
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
              <CircularProgress style={{ margin: "auto" }} />
            ) : (
              <button onClick={upload}>Upload</button>
            )}
          </div>
        </div>

        <div className="upload-images">
          <div>
            {images.map((image, idx) => (
              <Image {...image.avatar} id={idx + 1} oid={image._id} />
            ))}
          </div>
          {loadingI ? (
            <div style={{width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
              <CircularProgress  />
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                id="registerImage"
                className="image-car"
                style={{ boxShadow: "unset" }}
              >
                <img src={avatarPreview} alt="Avatar Preview" />
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  style={{ height: "unset" }}
                  onChange={(e) => {
                    const reader = new FileReader();

                    reader.onload = () => {
                      if (reader.readyState === 2) {
                        setAvatarPreview(reader.result);
                        setAvatar(reader.result);
                      }
                    };

                    reader.readAsDataURL(e.target.files[0]);
                  }}
                />
              </div>
              <button onClick={uploadImg}>Upload</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadPublication;
