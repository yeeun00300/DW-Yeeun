import React from "react";
import Container from "./Container";
import styles from "./ListPage.module.css";
import cn from "classnames";
import catalogImg from "../assets/catalog.svg";
import communityImg from "../assets/community.svg";

function ListPage({ mode }) {
  return (
    <>
      <div className={cn(styles.bg, styles.mode)}>
        <img className={styles.icon} src={catalogImg} alt="" />
        <div className={styles.texts}>
          <h1 className={styles.heading}>모든 코스</h1>
          <p className={styles.description}>
            자체 제작된 코스들로 기초를 쌓으세요
          </p>
        </div>
      </div>
      <Container className={styles.container}></Container>
    </>
  );
}

export default ListPage;
