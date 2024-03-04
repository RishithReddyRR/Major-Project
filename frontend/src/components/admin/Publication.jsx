import React, { useEffect } from "react";
import "./publication.scss";
import CloseIcon from "@mui/icons-material/Close";
import { MdModeEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { deletePublications } from "../../actions/publicationsAction";

const Publication = ({ pub, index }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { loading, success, error } = useSelector(
    (state) => state.publicationsDelete
  );
  const dispatch = useDispatch();
  const deleteHandler = () => {
    dispatch(deletePublications(pub._id));
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (success) {
      handleClose();
    }
  }, [success]);
  return (
    <>
      <div className="link">
        <div className="publication pubA">
          <Link to={`/publication/${pub._id}`} target={"blank"}>
            <div className="title" style={{ fontWeight: "bold" }}>
              {`${index + 1})${pub.title.toUpperCase()}`}
            </div>
          </Link>

          <div>
            <p>author:</p>
            <p>{pub.nameOfAuthor}</p>
          </div>
          <div>
            <p>Type Of Publication:</p>
            <p>{pub.typeOfPublication}</p>
          </div>
          <div>
            <p>No Of Citations:</p>
            <p>{pub.noOfCitations}</p>
          </div>
          <div>
            <p>Published On:</p>
            <p>{pub.date}</p>
          </div>
          <div className="eddel">
            <Link to={`/admin/update/${pub._id}`} target="blank">
              <MdModeEdit className="edit" />
            </Link>
            <MdDeleteForever className="delete" onClick={handleOpen} />
          </div>
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
        {loading ? (
          <CircularProgress />
        ) : (
          <div className="delete-modal">
            <p>Do you want to delete?</p>
            <div className="buttons">
              <button onClick={handleClose}>Cancel</button>
              <button onClick={deleteHandler}>Delete</button>
            </div>
            <CloseIcon className="close-del" onClick={handleClose} />
          </div>
        )}
      </Modal>
      <ToastContainer />
    </>
  );
};

export { Publication };
