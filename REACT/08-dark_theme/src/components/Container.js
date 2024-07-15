import React from "react";
import styles from "./Container.module.css";
import cn from "classnames";

function Container({ children, className }) {
  return <div className={cn(styles.container, className)}>{children}</div>;
}

export default Container;
