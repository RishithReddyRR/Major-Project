import React from "react";
import { Link } from "react-router-dom";
const Publication = ({ pub, index }) => {
  let date=new Date(pub.dateOfPublication)
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
            <p>{`${date.getDate()}-${date.getDay()}-${date.getFullYear()}`}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Publication;
