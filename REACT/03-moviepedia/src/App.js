import "./App.css";
import ReviewFrom from "./ReviewFrom";
import ReviewList from "./ReviewList";
import logoImg from "./assets/logo.png";
import { getDatas } from "./firebase";
import mockItems from "./mock.json";
import { useEffect, useState } from "react";

function AppSortButton({ children }) {
  return <button className="AppSortButton selected">{children}</button>;
  // children 은 텍스트만을 전달하는것은 아님 컴포넌트도 가능
}

function App() {
  const [items, setItems] = useState([]);

  const handleLoad = async () => {
    const resultData = await getDatas("movie");
    console.log(resultData);
    setItems(resultData);
  };

  // 화면이 최초 랜더링 됐을때만 실행하는 함수([]에 아무것도 없을때) , [상태] 상태가 변경되면 함수 재실행
  // [] --> 디펜던시 리스트..? 안에 있는것이 변경되면 함수 재실행 여러개 들어갔을때 하나만 변해도 재실행함
  // 그러므로 useEffect 함수는 여러개 써도됨
  // useEffect 함수 안 실행코드가 같다면 [] 안에는 여러개 써도 됨 여러번 쓸때는 [] 안의 각각의 실행코드가 다를때

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <div className="App">
      <nav className="App-nav">
        <div className="App-nav-container">
          <img className="App-logo" src={logoImg} alt="" />
          <select>
            <option>한국어</option>
            <option>English</option>
          </select>
        </div>
      </nav>
      <div className="App-container">
        <div className="App-ReviewForm">
          <ReviewFrom />
        </div>
        <div className="App-sorts">
          <AppSortButton>최신순</AppSortButton>
          <AppSortButton>베스트순</AppSortButton>
        </div>
        <div className="App-ReviewList">
          <ReviewList items={items} />
          <button className="App-load-more-button">더보기</button>
        </div>
      </div>
      <footer className="App-footer">
        <div className="App-footer-container">| 개인정보 처리방침</div>
      </footer>
    </div>
  );
}

export default App;
