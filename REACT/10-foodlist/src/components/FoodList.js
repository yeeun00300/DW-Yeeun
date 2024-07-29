import React, { useState } from "react";
import "./FoodList.css";
import FoodForm from "./FoodForm";
import useTranslate from "../hooks/useTranslate";

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}.`;
}

function FoodListItem({ item, onDelete, onEdit }) {
  const { title, calorie, content, createdAt, imgUrl, docId, id } = item;
  const t = useTranslate();
  const handleDeleteClick = () => {
    onDelete(docId, imgUrl);
  };
  const handleEditClick = () => {
    onEdit(id);
  };
  return (
    <div className="FoodListItem">
      <img className="FoodListItem-preview" src={imgUrl} alt="" />
      <div className="FoodListItem-rows">
        <div className="FoodListItem-title-calorie">
          <h1 className="FoodListItem-title">{title}</h1>
          <span className="FoodListItem-calorie">{calorie}kcal</span>
        </div>
        <p className="FoodListItem-content">{content}</p>
        <div className="FoodListItem-date-buttons">
          <p className="FoodListItem-date">{formatDate(createdAt)}</p>
          <div className="FoodListItem-buttons">
            <button
              className="FoodListItem-edit-button"
              onClick={handleEditClick}
            >
              {t(`edit button`)}
            </button>
            <button
              className="FoodListItem-delete-button"
              onClick={handleDeleteClick}
            >
              {t(`delete button`)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FoodList({ items, onDelete, onUpdate, onUpdateSuccess }) {
  const [editingId, setEditingId] = useState(null);
  return (
    <ul className="FoodList">
      {items.map((item) => {
        if (item.id === editingId) {
          const { title, calorie, content, imgUrl, docId } = item;
          const initialValues = { title, calorie, content, imgUrl: null };
          const handleSubmit = (collectionName, dataObj) => {
            const result = onUpdate(collectionName, dataObj, docId);
            return result;
          };
          const handleEditSuccess = (resultData) => {
            onUpdateSuccess(resultData);
            setEditingId(null);
          };
          return (
            <li key={item.docId}>
              <FoodForm
                initialValues={initialValues}
                initialPreview={imgUrl} //imgUrl이 이미 문자열이기 때문에 initalPreview로 프로퍼티 전달해서 그냥씀
                onCancel={setEditingId}
                onSubmit={handleSubmit}
                handleSubmitSuccess={handleEditSuccess}
              />
            </li>
          );
        }
        return (
          <li key={item.docId}>
            <FoodListItem
              item={item}
              onDelete={onDelete}
              onEdit={setEditingId}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default FoodList;