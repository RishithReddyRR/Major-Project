import React from "react";
import "./publication.scss";
import { Link } from "react-router-dom";
const Publication = ({ pub, index }) => {
  return (
    <>
      <Link to={`/publication/${pub._id}`} className="link" target={"blank"}>
        <div className="publication">
          <div className="title">
            <a href={pub.url} target="blank">
              {`${index + 1})${pub.title.toUpperCase()}`}
            </a>
            {pub.search && (
              <div>
                <b>Match Score:</b>
                {pub.score}
              </div>
            )}
          </div>
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
        </div>
      </Link>
    </>
  );
};

export default Publication;
