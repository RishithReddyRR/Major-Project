import React, { useState } from "react";
import { LuSearch } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import "./search.css";
import MetaData from "../structure/MetaData";
const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/publications/${keyword}`);
    } else {
      navigate("/publications");
    }
  };
  return (
    <div>
        <MetaData title={`Search`} />
      <form className="search" onSubmit={submitHandler}>
        <div>
          <div className="keyword">
            <input
              type="text"
              placeholder="Search Publications"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <div className="submit">
            <button>
              <LuSearch style={{ fontSize: "2.5vmax", color: "white" }} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Search;
