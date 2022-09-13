import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useParams,
} from "react-router-dom";
import "./MovieDetailsPage.scss";
const MovieDetailsPage = (props) => {
  var url_string = window.location.href;
  var url = new URL(url_string);
  var urlId = url.searchParams.get("id");
  console.log("showMetaData", props.showMetaData);

  return (
    <div>
      {(props?.showImageClick || props?.showRankImageClick) && urlId && (
        <div className="detailMainContainer">
          <div>
            <img className="showImage" src={props?.showImageUrl} alt="imageUrl" />
          </div>
          <div className="displaySection">
            <h1>{props?.showMetaData?.genres}</h1>
            <span>
              <h4>Released on : {props?.showMetaData?.releaseDate}</h4>
            </span>
            <span>
              <h4>{props?.showMetaData?.synopsis}</h4>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;
