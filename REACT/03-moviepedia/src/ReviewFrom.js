import React from "react";
import FileInput from "./FileInput";
import RatingInput from "./RatingInput";
import "./ReviewForm.css";

function ReviewFrom(props) {
  return (
    <form className="ReviewForm">
      <FileInput />
      <input type="text" placeholder="제목을 입력해주세요." />
      <RatingInput />
      <textarea placeholder="내용을 입력해주세요." />
      <button>확인</button>
    </form>
  );
}

export default ReviewFrom;
