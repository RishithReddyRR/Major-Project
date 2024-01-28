import React from "react";
import MetaData from "./structure/MetaData";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { FaArrowDown } from "react-icons/fa";
import LandingImage from "../images/login-1.png";
import vnrlogo from "../images/vnr-logo.png";
import webOfScience from "../images/webOfScienceIcon.png";
import ImageGallery from "react-image-gallery";
import { useDispatch, useSelector  } from "react-redux";
import "./Home.scss";
import { useEffect } from "react";
import { getPublicationsHome } from "../actions/publicationsAction";
import Publication from "./publications/Publication";
import { Link } from "react-router-dom";

const Home = () => {
  const images = [
    {
      original: LandingImage,
    },
    {
      original: vnrlogo,
    },
    {
      original: webOfScience,
    },
  ];
  const { publications, error, loading } = useSelector(
    (state) => state.userPublications
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPublicationsHome());
  }, []);
  return (
    <div>
      <MetaData title={`Home`} />
      <div className="landing-parent">
        <img src={LandingImage} className="landing" />
        <q>Publishing is the art of working on a creative idea and turning it into a masterpiece.</q>
        <a href="#carousel">
          <FaArrowDown className="scroll-down" />
        </a>
      </div>
      <div id="carousel">
        <ImageGallery
          items={images}
          showBullets
          showFullscreenButton={false}
          infinite
          showPlayButton={false}
          autoPlay
        />
      </div>
      <div className="publications-home">
        <p>Publications</p>
        {publications &&
          publications.map((ele, idx) => {
            return <Publication key={ele._id} pub={ele} index={idx} style={{width:"70vw"}} />;
          })}
          <Link to="/publications">
          <h1>Show More</h1>
          </Link>
      </div>
    </div>
  );
};

export default Home;
