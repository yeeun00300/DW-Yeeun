import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import CourseItem from "../components/CourseItem";
import CloseButtonImg from "../assets/closeButton.svg";
import styles from "./WishListPage.module.css";
import { getData, upDateDatas } from "../api/firebase";
import Warn from "../components/Warn";
import { Link } from "react-router-dom";
import Button from "../components/Button";

function WishListPage(props) {
  const [isLoading, setIsLoading] = useState(true);
  // courseList state 가 필요
  const [wishList, setWishList] = useState([]);
  // handleLoad 함수에서 로그인 사용자의 email로 member 문서 가져오고
  // 문서 안에 있는 courseList 를 state에 set 해준다.

  const handleLoad = async () => {
    setIsLoading(true);
    const { email } = JSON.parse(localStorage.getItem("member"));

    const resultData = await getData("member", {
      field: "email",
      condition: "==",
      value: email,
    });

    const { courseList } = resultData;
    setWishList(courseList);
    setIsLoading(false);
  };

  // useEffect 안에서 handleLoad 함수 실행
  useEffect(() => {
    handleLoad();
  }, []);

  const handleDelete = async (list) => {
    const { docId } = JSON.parse(localStorage.getItem("member"));
    const result = await upDateDatas("member", docId, list, {
      type: "DELETE",
      fieldName: "courseList",
    });
    handleLoad();
  };

  return (
    <Container className={styles.container}>
      <h1 className={styles.title}>나의 위시리스트</h1>
      {wishList.length === 0 && !isLoading ? (
        <>
          <Warn
            className={styles.emptyList}
            title="담아 놓은 코스가 없어요"
            description="카탈로그에서 나에게 필요한 코스를 찾아보세요."
          />
          <div className={styles.link}>
            <Link to="/courses">
              <Button>코스 찾아보기</Button>
            </Link>
          </div>
        </>
      ) : (
        <ul className={styles.items}>
          {wishList.map((list, idx) => (
            <li key={idx} className={styles.item}>
              <CourseItem Data={list} />
              <img
                className={styles.delete}
                src={CloseButtonImg}
                alt=""
                onClick={() => handleDelete(list)}
              />
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}

export default WishListPage;
