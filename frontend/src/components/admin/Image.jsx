import React, { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import "./image.scss";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { deleteImage } from "../../actions/imageActions";

const Image = ({ url, public_id, id, oid }) => {
  const dispatch = useDispatch();
  const deleteI = () => {
    if (window.confirm(`are you sure of deleting carousel-image${id}`)) {
      dispatch(deleteImage(public_id, oid));
    }
  };
  // useEffect(()=>{
  //     if(successI){
  //       toast.success("Successfully Deleted", {
  //         position: "top-right",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "colored",
  //       });
  //       dispatch({ type: "CLEAR_ERRORS" });
  //     }
  //     if (errorI) {
  //       toast.error(errorI, {
  //         position: "top-right",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "colored",
  //       });
  //       dispatch({ type: "CLEAR_ERRORS" });
  //     }
  // },[successI,errorI])
  return (
    <div id="registerImage" className="image-car">
      <img src={url} alt="" />
      <p>carousel-image{id}</p>
      <MdDelete onClick={deleteI} style={{ cursor: "pointer" }} />
    </div>
  );
};

export default Image;
