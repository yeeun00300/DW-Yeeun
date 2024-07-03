import React from "react";

const RATINGS = [1, 2, 3, 4, 5];
function Star() {
  return <span>★</span>;
}

function Rating(props) {
  return (
    <div>
      {RATINGS.map((arrNum) => (
        <Star key={arrNum} />
        // 반복문에서는 항상 key prop 넣어줘야함
      ))}
    </div>
  );
}

export default Rating;
