import React from "react";
import me from "./assets/dice-blue-1.svg";
import you from "./assets/dice-red-1.svg";
import Dice from "./Dice";

function Board({ name, color, gameHistory }) {
  const sum = gameHistory.reduce((acc, cur) => acc + cur, 0);
  // console.log(props);
  // const name = props.name;
  // const { name } = props;
  return (
    <div className="App-board">
      <h2>{name}</h2>
      <Dice color={color} num={gameHistory[gameHistory.length - 1]} />
      <h2>총점</h2>
      <p>{sum}</p>
      <h2>기록</h2>
      <p>{gameHistory.join(", ")}</p>
    </div>
  );
}

export default Board;
