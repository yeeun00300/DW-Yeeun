import React from "react";
import placeholderImg from "../assets/preview-placeholder.png";
import resetImg from "../assets/ic-reset.png";
import "./FileInput.css";

function FileInput(props) {
  return (
    <div className="FileInput">
      <img className="FileInput-preview" src={placeholderImg} alt="" />
      <input className="FileInput-hidden-overlay" type="file" />
      <button className="FileInput-clear-button">
        <img src={resetImg} alt="" />
      </button>
    </div>
  );
}

export default FileInput;
