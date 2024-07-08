import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState("");
  // console.log("App 컴포넌트 랜더링");
  const handleClick = () => {
    setCount(count + 1);
  };
  const inputChange = (e) => {
    setValue(e.target.value);
  };
  useEffect(() => {
    console.log("나는 화면이 최초 렌더링 될때 실행되는 uef야");
  }, []); // [](디펜던시 리스트)안에는 react 가 무엇을 지켜볼 지 작성해준다.
  useEffect(() => {
    console.log("나는 count가 변경될 때 실행되는 uef야");
  }, [count]);
  useEffect(() => {
    console.log("나는 value가 변경될 때 실행되는 uef야");
  }, [value]);
  return (
    <div className="App">
      <input type="text" placeholder="Search here" onChange={inputChange} />
      <h2>입력한 값: {value}</h2>
      <h1>{count}</h1>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}

export default App;
