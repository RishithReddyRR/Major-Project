import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import { getPublicationDetails } from "../../actions/publicationsAction";
import { BiLinkExternal } from "react-icons/bi";
import "./publicationDetails.css";
import { ToastContainer, toast } from "react-toastify";
import MetaData from "../structure/MetaData";
const PublicationDetails = () => {
  const { loading, publication, error } = useSelector(
    (state) => state.publicationDetails
  );
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getPublicationDetails(id));
    if (!error) {
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
  }, [error]);
  return loading && publication? (
    <div className="loaderHead"> <PuffLoader color="#009900" size="20vmax" /></div>
   
  ) : (
    <>
      <MetaData title={`${id}`} />
      <div className="pubDetails">
        <div className="details">
          <h1 style={{}}>
            <a
              href={publication.url ? publication.url : publication.doi}
              target="_blank"
            >
              {publication.title}
              <BiLinkExternal
                style={{ marginLeft: ".5vmax", color: "black" }}
                className="link-symb"
              />
            </a>
          </h1>
          <p>
            <p>Type Of Publication:</p>
            {publication.typeOfPublication}
          </p>

          <p className="abstract">
            <p>Abstract:</p>
            <div style={{marginLeft:"-1vmax"}}>{publication.abstract}</div>
          </p>
          <p style={{ display: "flex",margin:"0" }}>
            <p>Authors:</p>
            <div className="keywords">
              {publication.listOfAuthors &&
                publication.listOfAuthors.map((author) => (
                  <span className="author">{`${author}`}</span>
                ))}
            </div>
          </p>
          <p style={{ display: "flex",margin:"0"}}>
            <p>Keywords:</p>
            <div className="keywords">
              {publication.keywords &&
                publication.keywords.map((key) => (
                  <span className="key">{`${key}`}</span>
                ))}
            </div>
          </p>
          <p>
            <p>Published In:</p>
            {publication.nameOfPublicationPlatform}
          </p>
          <p>
            <p>Publication Details:</p>
            {publication.publicationDetails}
          </p>
          <p>
            <p>Published On:</p>
            {`${publication.month},${publication.year}`}
          </p>
          <p>
            <p>Indexed In:</p>
            {publication.indexing}
          </p>
          <p>
            <p>Citations:</p>
            {publication.noOfCitations}
          </p>
          <p>{publication.identificationNumber}</p>
        </div>

        <div className="comments">
          
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default PublicationDetails;
