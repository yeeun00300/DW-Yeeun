import React, { useContext, useEffect, useState } from "react";
import DiaryEditor from "../components/DiaryEditor";
import { DiaryStateContext } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import { changeTitle } from "../util/changeTitle";

function EditPage(props) {
  const { id } = useParams();
  const { diaryList } = useContext(DiaryStateContext);
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    changeTitle(`감정 일기장 - ${id}번 일기 수정`);
  }, []);

  useEffect(() => {
    if (diaryList.length > 0) {
      const targetDiary = diaryList.find((diary) => diary.id == id);
      if (targetDiary) {
        setData(targetDiary);
      } else {
        alert("없는 일기 입니다.");
        navigate("/", { replace: true });
      }
      console.log(targetDiary);
    }
  }, [id, diaryList]);

  // if (!data) {
  //   return <div>로딩 중...</div>;
  // }

  return <div>{data && <DiaryEditor initialValue={data} isEdit={true} />}</div>;
}

export default EditPage;
