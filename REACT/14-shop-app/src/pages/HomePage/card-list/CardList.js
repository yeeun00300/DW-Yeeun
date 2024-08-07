import React, { useEffect } from "react";
import styles from "./CardList.module.scss";
import CardItem from "./card-item/CardItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../store/products/productsSlice";
import CardSkeleton from "../card-skeleton/CardSkeleton";

function CardList(props) {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.productsSlice);
  const category = useSelector((state) => state.categoriesSlice);

  useEffect(() => {
    const queryOptions = {
      conditions: [
        {
          field: "category",
          operator: category ? "==" : ">=",
          value: category.toLowerCase(),
        },
      ],
    };

    dispatch(fetchProducts({ collectionName: "products", queryOptions }));
  }, [category]);

  if (isLoading) return <CardSkeleton />;

  return (
    <ul className={styles.card_list}>
      {products.map((product, idx) => (
        <CardItem item={product} key={idx} />
      ))}
    </ul>
  );
}

export default CardList;
