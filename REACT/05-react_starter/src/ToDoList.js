import React, { useState } from "react";

function ToDoList(props) {
  const [inputValue, setInputValue] = useState("");
  const [ToDoList, setToDoList] = useState([]);

  console.log(inputValue);
  const inputChange = (e) => {
    setInputValue(e.target.value);
  };
  const makeTodoList = (e) => {
    e.preventDefault(); // 기본 submit 막는거
    if (inputValue === "") return false;
    setToDoList((prevItems) => [inputValue, ...prevItems]);
    setInputValue("");
  };
  return (
    <div>
      <h1>My To Do ({ToDoList.length})</h1>
      <form onSubmit={makeTodoList}>
        <input type="text" onChange={inputChange} value={inputValue} />
        <button>Add To Do</button>
      </form>
      <hr />
      <ul>
        {ToDoList.map((list, idx) => {
          return <li key={idx}>{list}</li>;
        })}
      </ul>
    </div>
  );
}

export default ToDoList;
