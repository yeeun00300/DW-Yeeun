import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import CourseIcon from "../components/CourseIcon";
import Button from "../components/Button";
import Card from "../components/Card";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import getCourseColor from "../utils/getCourseColor";
import { getData } from "../api/firebase";
import styles from "./CoursePage.module.css";

function CoursePage() {
  const { courseSlug } = useParams();
  const props = useLocation();
  const { pathname } = props;
  const navigate = useNavigate();

  const [course, setCourse] = useState();
  const courseColor = getCourseColor(course?.code);

  const handleLoad = async () => {
    const resultData = await getData("courses", {
      field: "slug",
      condition: "==",
      value: courseSlug,
    });
    setCourse(resultData);
  };

  const handleAddWishListClick = () => {
    const member = JSON.parse(localStorage.getItem("member"));
    if (member) {
    } else {
      alert("로그인을 해주세요");
      navigate("/login", { state: pathname }); // ==> localHost:3000/login
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  //   const courseTopic = { ...topics[0].title, summary: topics[0].summary };
  //   console.log(courseTopic);

  return (
    <>
      <div className={styles.header} style={{ borderColor: courseColor }}>
        <Container className={styles.content}>
          <CourseIcon photoUrl={course?.photoUrl} />
          <h1 className={styles.title}>{course?.title}</h1>
          <Button variant="round" onClick={handleAddWishListClick}>
            + 코스 담기
          </Button>
          <p className={styles.summary}>{course?.summary}</p>
        </Container>
      </div>
      <Container className={styles.topics}>
        {course?.topics.map(({ topic }) => {
          return (
            <Card key={topic.slug} className={styles.topic}>
              <h3 className={styles.title}>{topic.title}</h3>
              <p className={styles.summary}>{topic.summary}</p>
            </Card>
          );
        })}
      </Container>
    </>
  );
}

export default CoursePage;
