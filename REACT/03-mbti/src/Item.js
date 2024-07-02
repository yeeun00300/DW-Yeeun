import React from "react";
import { getDatas } from "./utils";

function Item(props) {
  return (
    <li class="item">
      <div class="item-id">{idx}</div>
      <div class="item-mbti">${info.mbti}</div>
      <div class="item-arrow">
        <img class="item-arrow-icon" src="resources/img/arrow.svg" />
      </div>
      <div class="item-color-chip" style="background-color: ${info.code}"></div>
      <div class="item-color-code">${info.code.toUpperCase()}</div>
    </li>
  );
}

export default Item;
