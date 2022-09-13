import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./Search.scss";
import data from "../topMovies.json";
import MovieDetailsPage from "./MovieDetailsPage";

export const Search = (props) => {
  const { element } = props;

  const [term, setTerm] = useState("");
  const [filteredTerms, setFilteredTerms] = useState([]);
  const [showMetaData, setMetaData] = useState({});
  const [showImageClick, setImageClick] = useState(0);
  const [showImageUrl, setImageUrl] = useState("");

  const label = element.label;

  const valueToFilterData =
    label === "Genres"
      ? element.valueToFilter
      : element?.valueToFilter?.map(String);

  function setTermImage(event) {
    setTerm(event.target.value);
    setImageClick(0);
  }

  const imageClick = (item) => {
    setImageClick(item.id);
    setImageUrl(item.imageUrl);

    setMetaData(item);
  };

  useEffect(() => {
    const filteredItems =
      valueToFilterData &&
      valueToFilterData.filter((item) => {
        return item.includes(term);
      });
    setFilteredTerms(filteredItems);
  }, [term]);

  return (
    <>
      <div>
        {filteredTerms && (
          <div className="searchBox">
            <input
              className="searchBoxInput"
              placeholder={
                label === "Genres"
                  ? "Search by Genres"
                  : "Search by Release Date"
              }
              value={term}
              onChange={(e) => setTermImage(e)}
            />
          </div>
        )}
        <div className="ImageContainer">
          {term &&
            filteredTerms &&
            filteredTerms?.map((item, i) => {
              return data?.components?.map((value) => {
                return value?.items?.map((imageDetails, j) => {
                  return (
                    <>
                      <div key={j}>
                        {(item === imageDetails?.genres ||
                          item == imageDetails?.releaseDate) &&
                        !showImageClick ? (
                          <div className="displayImage">
                            <Router>
                              <Link to={`/` + "?id=" + imageDetails?.id}>
                                <img
                                  className="image"
                                  src={
                                    imageDetails?.imageUrl &&
                                    imageDetails?.imageUrl
                                  }
                                  onClick={() => imageClick(imageDetails)}
                                  alt="imageUrl"
                                  value={imageDetails?.imageUrl}
                                />
                              </Link>
                            </Router>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </>
                  );
                });
              });
            })}
        </div>
      </div>
      <div>
        {/* {showImageClick && ( */}
        <MovieDetailsPage
          showMetaData={showMetaData}
          showImageClick={showImageClick}
          showImageUrl={showImageUrl}
        />
        {/* )} */}
      </div>
    </>
  );
};

export default Search;
