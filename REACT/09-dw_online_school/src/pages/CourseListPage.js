import React, { useEffect, useState } from "react";
import ListPage from "../components/ListPage";
import searchImg from "../assets/search.svg";
import styles from "./CourseListPage.module.css";
import CourseItem from "../components/CourseItem";
import { getDatas } from "../api/firebase";

let listItems;

function CourseListPage(props) {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");

  //input 이벤트
  const handleKeyWordChange = (e) => {
    setInputValue(e.target.value);
    // console.log(inputValue);
    // 사용자가 입력한 키워드를 state에 저장한다.
  };

  //submit 이벤트
  const handleSubmit = (e) => {
    e.preventDefault();
    // 전체 데이터를 갖고있는 listItems 를 활용해
    // 사용자가 입력한 키워드를 title에 포함하고 있는 객체를 원소로 가지는 배열을 만든다.
    // const result = listItems.filter((item) => item.title.match(inputValue)); //includes 도 가능
    // 만든 배열을 items state 에 set 해준다.
    // setItems(result);

    setItems(listItems.filter(({ title }) => title.includes(inputValue)));
  };

  const handleLoad = async () => {
    // 파이어베이스의 courses 컬렉션의 데이터를 가져온다.
    const data = await getDatas("courses");
    // 전체데이터 변수에 저장
    listItems = data;
    // 가져온 데이터 콘솔로 확인.
    // console.log(data);
    // items state 에 set 해준다.
    setItems(data);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <ListPage variant="catalog">
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          placeholder="검색으로 코스 찾기"
          onChange={handleKeyWordChange}
        />
        <button>
          <img src={searchImg} alt="" />
        </button>
      </form>
      <p className={styles.count}>총 {items.length}개 코스</p>
      <div className={styles.courseList}>
        {items.map((item, idx) => {
          return <CourseItem key={idx} Data={item} />;
        })}
      </div>
    </ListPage>
  );
}

export default CourseListPage;
