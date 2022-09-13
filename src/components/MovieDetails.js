import React, { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./MovieDetails.scss";
import Logo from "../Assets/images.jfif";
import MovieDetailsPage from "./MovieDetailsPage";
import searchBar from "../Assets/search.png";
import Search from "./Search";

const MovieDetails = (props) => {
  const { data } = props;
  const [showSearchClick, setSearch] = useState(false);
  const [showMetaData, setMetaData] = useState({});
  const [showImageClick, setImageClick] = useState(0);
  const [showImageUrl, setImageUrl] = useState("");
  const [showRankImageClick, setRankImageId] = useState(0);
  const [showRankImageUrl, setRankImageUrl] = useState("");

  const numDescending = data.components.sort(
    (a, b) => b.releaseDate - a.releaseDate
  );

  const numRank = data.components.sort((a, b) => a.rank - b.rank);

  const imageClick = (item) => {
    setImageClick(item.id);
    setImageUrl(item.imageUrl);
    setMetaData(item);
    console.log("showImageClick", showImageClick);
  };

  const rankOrdeIimageClick = (item) => {
    setRankImageId(item.id);
    setRankImageUrl(item.imageUrl);
    setMetaData(item);
  };

  const handleHome = () => {
    setImageClick(0);
    setImageUrl(0);
    setRankImageId(0);
    setRankImageUrl(0);
    setSearch(false);
  };

  const handleSearch = () => {
    setSearch(true);
  };

  return (
    <>
      <div className="mainContainer">
        <Router>
          <Link to={"/"} onClick={handleHome}>
            <img src={Logo} className="logo" />
          </Link>
          <Link to={"/search"} onClick={handleSearch}>
            <img src={searchBar} className="searchBar" />
          </Link>
        </Router>
      </div>

      {showSearchClick ? (
        data.components.map((element) => {
          return element.items.map((item, i) => {
            return <Search element={item} dataComponent={element} />;
          });
        })
      ) : (
        <div>
          <div>
            {/* {(showImageClick || showRankImageClick) && ( */}
            <MovieDetailsPage
              showMetaData={showMetaData}
              showImageClick={showImageClick || showRankImageClick}
              showImageUrl={showImageUrl || showRankImageUrl}
            />
            {/* )} */}
          </div>
          <div>
            {showImageClick === 0 && showRankImageClick === 0 ? (
              <h2>Movies Based On Release Date</h2>
            ) : (
              ""
            )}
            {data.components.map((element) => {
              return (
                <div
                  //   className={
                  //     showImageClick || showRankImageClick
                  //       ? "displayAllImage"
                  //       : "orderByReleaseDateContainer"
                  //   }
                  style={
                    showImageClick || showRankImageClick
                      ? { display: "none" }
                      : {
                          display: "flex",
                          flex: 1,
                          "justify-content": "space-between",
                          //"margin-bottom": "20px",
                        }
                  }
                >
                  {element.items
                    .sort((a, b) => b.releaseDate - a.releaseDate)
                    .map((item, i) => {
                      return (
                        <div key={item}>
                          <div>
                            <Router>
                              {item.type === "poster" && (
                                <Link to={`/` + "?id=" + item.id}>
                                  <img
                                    className="releaseDateimage"
                                    alt="imageUrl"
                                    src={item.imageUrl}
                                    value={item.imageUrl}
                                    onClick={() => imageClick(item)}
                                  />
                                </Link>
                              )}
                            </Router>
                          </div>
                        </div>
                      );
                    })}
                </div>
              );
            })}
            {showImageClick === 0 && showRankImageClick === 0 ? (
              <h2>Movies Based On Rank</h2>
            ) : (
              ""
            )}
            {data.components.map((element) => {
              return (
                <div
                  style={
                    showImageClick || showRankImageClick
                      ? { display: "none" }
                      : {
                          display: "flex",
                          flex: 1,
                          "justify-content": "space-between",
                        }
                  }
                >
                  {element.items
                    .sort((a, b) => a.rank - b.rank)
                    .map((item, i) => {
                      return (
                        <div key={item}>
                          <div>
                            <Router>
                              {item.type === "poster" && (
                                <Link to={`/` + "?id=" + item.id}>
                                  <img
                                    className="rankImage"
                                    alt="imageUrl"
                                    src={item.imageUrl}
                                    value={item.imageUrl}
                                    onClick={() => rankOrdeIimageClick(item)}
                                  />
                                </Link>
                              )}
                            </Router>
                          </div>
                        </div>
                      );
                    })}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetails;
