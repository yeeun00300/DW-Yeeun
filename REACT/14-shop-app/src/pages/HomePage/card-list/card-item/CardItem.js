import React from "react";
import { Link } from "react-router-dom";
import styles from "./CardItem.module.scss";

function CardItem({ item }) {
  const { title, price, description, category, image } = item;
  return (
    <li className={styles.card_item}>
      <Link>
        <img src={image} alt="" />
      </Link>
      <h5>{title}</h5>
      <div>
        <button>장바구니에 담기</button>
        <p>$ {price}</p>
      </div>
    </li>
  );
}

export default CardItem;
