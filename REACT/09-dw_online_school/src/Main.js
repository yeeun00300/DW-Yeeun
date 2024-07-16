import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./components/App";
import HomePage from "./pages/HomePage";
function Main(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
