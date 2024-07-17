import React from "react";
import Card from "./Card";
import CourseIcon from "./CourseIcon";
import { Link } from "react-router-dom";
import styles from "./CourseItem.module.css";
import getCourseColor from "../utils/getCourseColor";

const DIFFICULTY = ["입문", "초급", "중급", "상급"];

function CourseItem({ Data }) {
  const { title, summary, language, difficulty, code } = Data;

  const courseColor = getCourseColor(code);
  const thumbStyle = {
    borderColor: courseColor,
  };
  return (
    <Card className={styles.courseItem}>
      <div className={styles.thumb} style={thumbStyle}>
        <CourseIcon photoUrl={Data.photoUrl} />
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>
          <Link>{title}</Link>
        </h2>
        <p className={styles.description}>{summary}</p>
        <div>
          <ul className={styles.tags}>
            <li>{language}</li>
            <li>{DIFFICULTY[difficulty]}</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

export default CourseItem;
