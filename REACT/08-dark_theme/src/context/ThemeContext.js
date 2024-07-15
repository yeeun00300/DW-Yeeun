import { createContext, useContext, useEffect, useState } from "react";
import { darkTheme, lightTheme } from "../theme/Theme";
import { ThemeProvider as StyledProvider } from "styled-components";
import { getSunsetRiseData } from "../API/getLocationData";
import { getTimes } from "../utils/getDateData";

const ThemeContext = createContext();

function ThemeChangeProvider({ children }) {
  // 일몰시간 불러오는 API
  // 결과값을 가지고 조건문으로 light or dark

  const localTheme = localStorage.getItem("theme") || "light";
  const [locationData, setLocationData] = useState({});
  const [themeMode, setThemeMode] = useState(localTheme);
  const themeObject = themeMode === "light" ? lightTheme : darkTheme;
  console.log(locationData);

  const handleLoad = async () => {
    const data = await getSunsetRiseData();
    const { sunrise, sunset } = data;
    const currentTime = getTimes();
    if (
      //light 테마 적용
      currentTime > Number(sunrise.trim()) &&
      currentTime < Number(sunset.trim())
    ) {
      setThemeMode("light");
    } else {
      //나머지시간 dark 테마 적용
      setThemeMode("dark");
    }
    setLocationData(data);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
      <StyledProvider theme={themeObject}>{children}</StyledProvider>
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  const { themeMode, setThemeMode } = context;

  const toggleTheme = () => {
    if (themeMode === "light") {
      setThemeMode("dark");
    } else {
      setThemeMode("light");
    }
  };

  return [themeMode, toggleTheme];
}

export { ThemeChangeProvider, useTheme };
