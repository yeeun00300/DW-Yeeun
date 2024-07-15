import React from "react";
import Container from "./Container";
import { Link } from "react-router-dom";
import styles from "./Nav.module.css";
import { useTheme } from "../context/ThemeContext";
import cn from "classnames";

function Nav({ className }) {
  const [themeMode] = useTheme();
  const menuClass = `${styles.menu} ${themeMode === "dark" ? styles.dark : ""}`;
  return (
    <div className={cn(styles.nav, menuClass)}>
      <Container className={styles.container}>
        <Link to="/">
          <div className={styles.logo}>
            <span>DW</span>
            OS
          </div>
        </Link>
        <ul className={menuClass}>
          <li>
            <Link to="about">ABOUT</Link>
          </li>
        </ul>
      </Container>
    </div>
  );
}

export default Nav;
