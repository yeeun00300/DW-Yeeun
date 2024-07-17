import React from "react";
import styles from "./CourseIcon.module.css";
import cn from "classnames";

import algorithm from "../assets/icon--algorithm.svg";
import automation from "../assets/icon--automation.svg";
import computerArchitecture from "../assets/icon--computer-architecture.svg";
import dataScience from "../assets/icon--data-science.svg";
import deepLearning from "../assets/icon--deep-learning.svg";
import defaultImg from "../assets/icon--default.svg";
import django from "../assets/icon--django.svg";
import ds from "../assets/icon--ds.svg";
import fourthRevolution from "../assets/icon--fourth-revolution.svg";
import git from "../assets/icon--git.svg";
import introToComputer from "../assets/icon--intro-to-computer.svg";
import java from "../assets/icon--java.svg";
import jquery from "../assets/icon--jquery.svg";
import js from "../assets/icon--js.svg";
import machineLearning from "../assets/icon--machine-learning.svg";
import nodeJs from "../assets/icon--node-js.svg";
import oop from "../assets/icon--oop.svg";
import python from "../assets/icon--python.svg";
import react from "../assets/icon--react.svg";
import sql from "../assets/icon--sql.svg";
import unix from "../assets/icon--unix.svg";
import webPublishing from "../assets/icon--web-publishing.svg";

const imageDict = {
  algorithm,
  automation,
  "computer-architecture": computerArchitecture,
  "data-science": dataScience,
  "deep-learning": deepLearning,
  defaultImg,
  django,
  ds,
  "fourth-revolution": fourthRevolution,
  git,
  "intro-to-computer": introToComputer,
  java,
  jquery,
  js,
  "machine-learning": machineLearning,
  "node-js": nodeJs,
  oop,
  python,
  react,
  sql,
  unix,
  "web-publishing": webPublishing,
};

function CourseIcon({ className, photoUrl }) {
  return (
    <img
      className={cn(styles.courseIcon, className)}
      src={imageDict[photoUrl]}
      alt=""
    />
  );
}

export default CourseIcon;
