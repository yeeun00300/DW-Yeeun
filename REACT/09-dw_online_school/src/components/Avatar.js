import React from "react";
import styles from "./Avatar.module.css";

function Avatar({ photoUrl, name }) {
  return <img className={styles.avatar} src={photoUrl} title={name} alt="" />;
}

export default Avatar;
