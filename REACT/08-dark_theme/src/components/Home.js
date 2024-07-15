import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import styles from "./Home.module.css";
import ThemToggle from "./ThemToggle";
import { useTheme } from "../context/ThemeContext";

function Home(props) {
  const [themMode, toggleTheme] = useTheme();

  return (
    <div>
      <Nav className={styles.nav} />
      <div className={styles.body}>
        <Outlet />
      </div>
      <ThemToggle mode={themMode} toggleTheme={toggleTheme} />
    </div>
  );
}

export default Home;
