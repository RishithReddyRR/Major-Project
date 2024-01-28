import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { MdDeleteForever } from "react-icons/md";
import updateImage from "../../images/update-4.png";
import MetaData from "../structure/MetaData";

import {
  getPublicationDetails,
  updatePublications,
} from "../../actions/publicationsAction";
import { SpinnerInfinity } from "spinners-react";
import { useState } from "react";
import "./updatePublication.scss";
import vnrLogo from "../../images/vnr-logo.png";

const UpdatePublication = () => {
  const { loading, publication, error, isUpdated } = useSelector(
    (state) => state.publicationDetails
  );
  const dispatch = useDispatch();
  const { id } = useParams();
  let [noa, setNoa] = useState("");
  let [loa, setLoa] = useState([]);
  let [title, setTitle] = useState("");
  let [top, setTop] = useState("");
  let [pop, setPop] = useState("");
  let [pDetails, setPDetails] = useState("");
  let [py, setPY] = useState("");
  let [pm, setPM] = useState("");
  let [academicYear, setAcademicYear] = useState("");
  let [url, setUrl] = useState("");
  let [abstract, setAbstract] = useState("");
  let [noc, setNoc] = useState("");
  let [inum, setInum] = useState("");
  let [kw, setKw] = useState([]);
  let [dec, setDec] = useState(false);
  useEffect(() => {
    if (publication && publication._id != id) {
      dispatch(getPublicationDetails(id));
    } else {
      setNoa(publication.nameOfAuthor);
      setLoa(publication.listOfAuthors);
      setTitle(publication.title);
      setTop(publication.typeOfPublication);
      setPop(publication.nameOfPublicationPlatform);
      setPDetails(publication.publicationDetails);
      setPY(publication.year);
      setPM(publication.month);
      setAcademicYear(publication.academicYear);
      setUrl(publication.url);
      setAbstract(publication.abstract);
      setNoc(publication.noOfCitations);
      setInum(publication.identificationNumber);
      setKw(publication.keywords);
    }
    if (dec && isUpdated) {
      toast.success("Updated Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setDec(false);
      dispatch({ type: "CLEAR_ERRORS" });
    }
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
  }, [error, publication, isUpdated]);
  // console.log(publication);
  const addAuthor = (event) => {
    event.preventDefault();
    dispatch({ type: "PUBLICATION_DETAILS_LOA" });
  };
  const addKeyword = (event) => {
    event.preventDefault();
    dispatch({ type: "PUBLICATION_DETAILS_KEY" });
  };
  const update = (event) => {
    event.preventDefault();
    setDec(true);
    // dec=true
    dispatch(
      updatePublications(id, {
        nameOfAuthor: noa,
        listOfAuthors: loa,
        title: title,
        typeOfPublication: top,
        nameOfPublicationPlatform: pop,
        publicationDetails: pDetails,
        year: py,
        month: pm,
        academicYear,
        url,
        abstract,
        noOfCitations: noc,
        identificationNumber: inum,
        keywords: kw,
      })
    );
  };
  return loading ? (
    <div className="loader">
      <SpinnerInfinity size="10vmax" thickness={"200"} color="tomato" />
    </div>
  ) : (
    <div className="publication-update">
      <MetaData title={`Update publication --admin`} />

      <img src={updateImage} alt="" />
      <form>
        <div className="form-element">
          <label for="noa">Name Of The Author:</label>
          <input
            type="text"
            value={noa}
            onChange={(x) => setNoa(x.target.value)}
            id="noa"
          />
        </div>
        <div className="form-element">
          <label>List Of Authors:</label>
          {loa?.map((ele, id) => {
            return (
              <div key={id}>
                <input
                  type="text"
                  value={ele}
                  onChange={(x) => {
                    let temp = [...loa];
                    temp[id] = x.target.value;
                    return setLoa(temp);
                  }}
                />
                <MdDeleteForever
                  className="delete"
                  onClick={() => {
                    const arr = [...loa];
                    arr.splice(id, 1);
                    setLoa(arr);
                  }}
                />
              </div>
            );
          })}
          <button onClick={addAuthor}>Add Author</button>
        </div>
        <div className="form-element">
          <label for="title">Title:</label>
          <input
            type="text"
            value={title}
            id="title"
            onChange={(x) => setTitle(x.target.value)}
          />
        </div>
        <div className="form-element">
          <label for="top">
            Type Of Publication(journal/book
            chapter/conference/patent/copyright):
          </label>
          <input
            type="text"
            value={top}
            id="top"
            onChange={(x) => setTop(x.target.value)}
          />
        </div>
        <div className="form-element">
          <label for="pop">Platform Where Got Published:</label>
          <input
            type="text"
            value={pop}
            id="pop"
            onChange={(x) => setPop(x.target.value)}
          />
        </div>
        <div className="form-element">
          <label for="pDetails">Publication Details:</label>
          <input
            type="text"
            value={pDetails}
            id="pDetails"
            onChange={(x) => setPDetails(x.target.value)}
          />
        </div>
        <div className="form-element">
          <label for="py">Published Year:</label>
          <input
            type="text"
            value={py}
            id="py"
            onChange={(x) => setPY(x.target.value)}
          />
        </div>
        <div className="form-element">
          <label for="pm">Published Month:</label>
          <input
            type="text"
            value={pm}
            id="pm"
            onChange={(x) => setPM(x.target.value)}
          />
        </div>
        <div className="form-element">
          <label for="ay">Academic Year:</label>
          <input
            type="text"
            value={academicYear}
            id="ay"
            onChange={(x) => setAcademicYear(x.target.value)}
          />
        </div>
        <div className="form-element">
          <label for="url">Url:</label>
          <input
            type="text"
            value={url}
            id="url"
            onChange={(x) => setUrl(x.target.value)}
          />
        </div>
        <div className="form-element">
          <label for="abstract">Abstract:</label>
          <input
            type="text"
            value={abstract}
            id="abstract"
            onChange={(x) => setAbstract(x.target.value)}
          />
        </div>
        <div className="form-element">
          <label for="noc">No Of Citations:</label>
          <input
            type="text"
            value={noc}
            id="noc"
            onChange={(x) => setNoc(x.target.value)}
          />
        </div>
        <div className="form-element">
          <label for="in">Identification Number:</label>
          <input
            type="text"
            value={inum}
            id="in"
            onChange={(x) => setInum(x.target.value)}
          />
        </div>
        <div className="form-element">
          <label for="kw">Keywords:</label>
          {kw?.map((ele, id) => {
            return (
              <div>
                <input
                  type="text"
                  value={ele}
                  onChange={(x) => {
                    let temp = [publication.keywords];
                    temp[id] = x.target.value;
                    return setKw(temp);
                  }}
                />
                <MdDeleteForever
                  className="delete"
                  onClick={() => {
                    const arr = [...kw];
                    arr.splice(id, 1);
                    setKw(arr);
                  }}
                />
              </div>
            );
          })}
          <button onClick={addKeyword}>Add keyword</button>
        </div>
        <button onClick={update}>Update</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UpdatePublication;
