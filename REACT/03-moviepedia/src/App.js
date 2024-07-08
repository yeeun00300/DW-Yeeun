import { limit } from "firebase/firestore";
import "./App.css";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import logoImg from "./assets/logo.png";
import {
  addDatas,
  deleteDatas,
  getDatas,
  getDatasByOrder,
  getDatasByOrderLimit,
  updateDatas,
} from "./firebase";
import { useEffect, useState } from "react";
import LocaleSelect from "./LocaleSelect";
import useTranslate from "./hooks/useTranslate";

const LIMIT = 5;

function AppSortButton({ children, onClick, selected }) {
  let isSelected = "";
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

  // useEffect ==> 1. 최초 랜더링시, 2. 디펜던시 리스트에 들어있는 값이 변경될때, 3. 컴포넌트가 화면에서 사라질때
  // 화면이 최초 랜더링 됐을때 실행하는 함수 , [상태] 상태가 있을때 상태가 변경되면 함수 재실행
  // [] --> 디펜던시 리스트..? 안에 있는것이 변경되면 함수 재실행 여러개 들어갔을때 하나만 변해도 재실행함
  // 그러므로 useEffect 함수는 여러개 써도됨
  // useEffect 함수 안 실행코드가 같다면 [] 안에는 여러개 써도 됨 여러번 쓸때는 [] 안의 각각의 실행코드가 다를때

  const handleMoreClick = () => {
    handleLoad({ order: order, limit: LIMIT, lq: lq });
  };

  const handleAddSuccess = (data) => {
    setItems((prevItems) => [data, ...prevItems]);
  };

  const handleUpdateSuccess = (result) => {
    // 화면처리... 기존 데이터는 items 에서 삭제, 수정된 데이터는 items의 기존 위치에 추가
    setItems((prevItems) => {
      const splitIdx = prevItems.findIndex((item) => item.id === result.id);
      return [
        ...prevItems.slice(0, splitIdx),
        result,
        ...prevItems.slice(splitIdx + 1),
      ];
    });
  };

  const handleDelete = async (docId, imgUrl) => {
    // 1. 파이어베이스에 접근해서 imgUrl 을 사용해 스토리지에 있는 사진파일 삭제

    // 2. docId 를 사용해 문서 삭제
    const result = await deleteDatas("movie", docId, imgUrl);
    // db 에서 삭제를 성공했을 때만 그 결과를 화면에 반영한다.
    if (!result) {
      alert("저장된 이미지 파일이 없습니다. \n 관리자에게 문의하세요.");
      return false;
    }

    // 3. items 에서 docId 가 같은 요소 (객체)를 찾아서 제거

    // setItems((prevItems) => {
    //   const filteredArr = prevItems.filter((item) => {
    //     return item.docId !== docId;
    //   });
    //   return filteredArr;
    // });
    setItems((prevItems) => prevItems.filter((item) => item.docId !== docId));
  };

  const t = useTranslate();

  useEffect(() => {
    handleLoad({ order: order, limit: LIMIT });
    setHasNext(true);
  }, [order]);

  return (
    <div className="App">
      <nav className="App-nav">
        <div className="App-nav-container">
          <img className="App-logo" src={logoImg} alt="" />
          <LocaleSelect />
        </div>
      </nav>
      <div className="App-container">
        <div className="App-ReviewForm">
          <ReviewForm
            onSubmit={addDatas}
            handleSubmitSuccess={handleAddSuccess}
          />
        </div>
        <div className="App-sorts">
          <AppSortButton
            selected={order === "createdAt"}
            onClick={handleNewestClick}
          >
            {t(`newest`)}
          </AppSortButton>
          <AppSortButton
            selected={order === "rating"}
            //selected 에는 true,false만 담김
            onClick={handleBestClick}
          >
            {t(`best`)}
          </AppSortButton>
        </div>
        <div className="App-ReviewList">
          <ReviewList
            items={items}
            handleDelete={handleDelete}
            onUpdate={updateDatas}
            onUpdateSuccess={handleUpdateSuccess}
          />
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
            {t("load more")}
          </button>
        </div>
      </div>
      <footer className="App-footer">
        <div className="App-footer-container">| {t("privacy policy")}</div>
      </footer>
    </div>
  );
}

export default App;
