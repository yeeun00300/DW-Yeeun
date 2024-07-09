import React from "react";
import "./Movie.css";
import img from "./assets/11.jpg";

function Movie(props) {
  return (
    <div className="movie">
      <img className="movie-img" src={img} alt="" />
      <div>
        <h2 className="movie-title">
          <span>제목</span>
        </h2>
        <h3 className="movie-year">2024</h3>
        <p>summary...</p>
        <ul className="movie-genres">
          <li>코미디</li>
          <li>액션</li>
          <li>호러</li>
        </ul>
      </div>
    </div>
  );
}

export default Movie;
