import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./components/App";
import HelloStyled from "./components/01/HelloStyled";
import Nesting from "./components/02/Nesting";
import { Practice as Practice1 } from "./components/03/Practice";
import { Practice as Practice2 } from "./components/04/Practice";
import DynamicStyling from "./components/05/DynamicStyling";
import Practice from "./components/06/Practice";
import Inheritance from "./components/07/Inheritance";
import Reuse from "./components/08/Reuse";
import { Practice as Practice4 } from "./components/09/Practice";
import Login from "./components/10/Login";

function Main(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="01" element={<HelloStyled />} />
          <Route path="02" element={<Nesting />} />
          <Route path="03" element={<Practice1 />} />
          <Route path="04" element={<Practice2 />} />
          <Route path="05" element={<DynamicStyling />} />
          <Route path="06" element={<Practice />} />
          <Route path="07" element={<Inheritance />} />
          <Route path="08" element={<Reuse />} />
          <Route path="09" element={<Practice4 />} />
          <Route path="10" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
