import React from "react";
import styles from "./CartItem.module.scss";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { incrementProduct } from "../../../../store/cart/cartSlice";

function CartItem({ image, title, price, category, quantity, total, id }) {
  const dispatch = useDispatch();

  const incrementCount = () => {
    dispatch(incrementProduct(id));
  };

  return (
    <div className={styles.cart_item}>
      <Link>
        <img src={image} />
      </Link>
      <div className={styles.cart_description}>
        <h3>{category}</h3>
        <h2>{title}</h2>
        <span>
          {price} x {quantity} = $ {total.toFixed(2)}
        </span>
      </div>
      <div className={styles.cart_count}>
        <div>
          <button>-</button>
          <span>{quantity}</span>
          <button onClick={incrementCount}>+</button>
        </div>
      </div>
      <button className={styles.cart_delete}>
        <AiOutlineDelete />
      </button>
    </div>
  );
}

export default CartItem;