import React from "react";
import FileInput from "./FileInput";
import "./FileInput.css";
import "./ReviewForm.css";

function ReviewForm(props) {
  return (
    <form className="ReviewForm">
      <div>
        <FileInput />
      </div>
      <div className="Form-container">
        <input type="text" placeholder="제목을 입력해주세요." />
        <textarea placeholder="내용을 입력해주세요." />
        <button>확인</button>
      </div>
    </form>
  );
}

export default ReviewForm;
