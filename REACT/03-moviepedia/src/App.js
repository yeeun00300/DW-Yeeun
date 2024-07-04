import { limit } from "firebase/firestore";
import "./App.css";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import logoImg from "./assets/logo.png";
import { getDatas, getDatasByOrder, getDatasByOrderLimit } from "./firebase";
import { useEffect, useState } from "react";

const LIMIT = 5;

function AppSortButton({ children, onClick, selected }) {
  let isSelected;
  if (selected) {
    isSelected = "selected";
  }
  return (
    <button className={`AppSortButton ${isSelected}`} onClick={onClick}>
      {children}
    </button>
  );
  // children 은 텍스트만을 전달하는것은 아님 컴포넌트도 가능
}

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [lq, setLq] = useState();
  const [hasNext, setHasNext] = useState(true);

  const handleLoad = async (options) => {
    const { resultData, lastQuery } = await getDatasByOrderLimit(
      "movie",
      options
    );
    console.log(resultData);
    if (!options.lq) {
      setItems(resultData);
    } else {
      setItems((prevItems) => [...prevItems, ...resultData]);
      //prevItems setItems 변하기 이전값..?
    }
    if (!lastQuery) {
      setHasNext(false);
    }
    setLq(lastQuery);
  };

  const handleNewestClick = () => {
    setOrder("createdAt");
  };

  const handleBestClick = () => {
    setOrder("rating");
  };

  // 화면이 최초 랜더링 됐을때만 실행하는 함수([]에 아무것도 없을때) , [상태] 상태가 변경되면 함수 재실행
  // [] --> 디펜던시 리스트..? 안에 있는것이 변경되면 함수 재실행 여러개 들어갔을때 하나만 변해도 재실행함
  // 그러므로 useEffect 함수는 여러개 써도됨
  // useEffect 함수 안 실행코드가 같다면 [] 안에는 여러개 써도 됨 여러번 쓸때는 [] 안의 각각의 실행코드가 다를때

  const handleMoreClick = () => {
    handleLoad({ order: order, limit: LIMIT, lq: lq });
  };

  useEffect(() => {
    handleLoad({ order: order, limit: LIMIT });
    setHasNext(true);
  }, [order]);

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
          <ReviewForm />
        </div>
        <div className="App-sorts">
          <AppSortButton
            selected={order === "createdAt"}
            onClick={handleNewestClick}
          >
            최신순
          </AppSortButton>
          <AppSortButton
            selected={order === "rating"}
            //selected 에는 true,false만 담김
            onClick={handleBestClick}
          >
            베스트순
          </AppSortButton>
        </div>
        <div className="App-ReviewList">
          <ReviewList items={items} />
          {/* {hasNext && (
            <button className="App-load-more-button" onClick={handleMoreClick}>
              더보기
            </button>
          )} */}
          <button
            className="App-load-more-button"
            onClick={handleMoreClick}
            disabled={!hasNext}
          >
            더보기
          </button>
        </div>
      </div>
      <footer className="App-footer">
        <div className="App-footer-container">| 개인정보 처리방침</div>
      </footer>
    </div>
  );
}

export default App;
