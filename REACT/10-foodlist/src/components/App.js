import "./App.css";
import backgroundImg from "../assets/background.png";
import logoImg from "../assets/logo.png";
import logoTextImg from "../assets/logo-text.png";
import FoodForm from "./FoodForm";
import searchImg from "../assets/ic-search.png";
import FoodList from "./FoodList";
import { useEffect, useState } from "react";
import {
  addDatas,
  deleteDatas,
  getDatas,
  getDatasOrderByLimit,
  getSearchDatas,
  updateDatas,
} from "../api/firebase";
import LocaleSelect from "./LocaleSelect";
import useTranslate from "./../hooks/useTranslate";
import useAsync from "../hooks/useAsync";

const LIMIT = 5;
let listItems;

function AppSortButton({ children, selected, onClick }) {
  return (
    <button
      className={`AppSortButton ${selected ? "selected" : ""}`}
      onClick={onClick}
      disabled={selected}
    >
      {children}
    </button>
  );
}

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [lq, setLq] = useState();
  const [hasNext, setHasNext] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const [isLoading, loadingError, getDatasAsync] =
    useAsync(getDatasOrderByLimit);

  const handleLoad = async (options) => {
    // setIsLoading(true);
    // const { resultData, lastQuery } = await getDatasOrderByLimit(
    //   "foodlist",
    //   options
    // );
    // setIsLoading(false);
    const { resultData, lastQuery } = await getDatasAsync("foodlist", options);
    listItems = resultData;
    if (!options.lq) {
      setItems(resultData);
    } else {
      setItems((prevItems) => [...prevItems, ...resultData]);
    }
    if (!lastQuery) {
      setHasNext(false);
    }
    setLq(lastQuery);
  };

  const handleMoreClick = () => {
    // handleLoad({ order: order, limit: LIMIT, lq: lq });
    if (isSearching) {
      const newItems = searchResults.slice(items.length, items.length + LIMIT);
      setItems((prevItems) => [...prevItems, ...newItems]);
      setHasNext(searchResults.length > items.length + LIMIT);
    } else {
      handleLoad({ order: order, limit: LIMIT, lq: lq });
    }
  };

  // foodform 확인 후처리
  const handleAddSuccess = (resultData) => {
    setItems((prevItems) => [resultData, ...prevItems]);
  };

  // foodlist 수정 후처리
  const handleUpdateSuccess = (resultData) => {
    console.log("확인용");
    setItems((prevItems) => {
      // 수정된 item index 찾기
      const splitIdx = prevItems.findIndex((item) => item.id === resultData.id);
      return [
        ...prevItems.slice(0, splitIdx), // 첫번째꺼부터 splitIdx 전까지
        resultData,
        ...prevItems.slice(splitIdx + 1), // 파라미터 1개만 쓰면 splitIdx 이후로 끝까지
      ];
    });
  };

  const handleNewestClick = () => {
    setOrder("createdAt");
  };
  const handleMostCalorieClick = () => {
    setOrder("calorie");
  };

  const handleDelete = async (docId, imgUrl) => {
    //items 에서 docId 를 받아온다.
    //db에서 데이터 삭제( 1. 스토리지에 있는 사진파일 삭제, 2. database 에 있는 데이터 삭제)
    const { result, message } = await deleteDatas("foodlist", docId, imgUrl);
    if (!result) {
      alert(message);
      return;
    }
    //삭제 성공시 화면에 그 결과를 반영한다.
    setItems((prevItems) =>
      prevItems.filter(function (item) {
        return item.docId !== docId;
      })
    );
  };

  // 검색 함수
  const handleKeyWordChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleFindSubmit = async (e) => {
    e.preventDefault();

    if (inputValue === "") {
      setIsSearching(false);
      handleLoad({ order: order, limit: LIMIT, lq: undefined });
    } else {
      const searchResult = await getSearchDatas("foodlist", {
        limits: LIMIT,
        search: inputValue,
      });
      console.log(searchResult);
      setSearchResults(searchResult);
      setItems(searchResult.slice(0, LIMIT));
      setIsSearching(true);
      setHasNext(searchResult.length > LIMIT);
      setLq(undefined);
    }
  };

  const t = useTranslate();

  useEffect(() => {
    handleLoad({ order: order, limit: LIMIT, lq: undefined });
    setHasNext(true);
  }, [order]);

  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImg})` }}>
      <div className="App-nav">
        <img src={logoImg} />
      </div>
      <div className="App-container">
        <div className="App-FoodForm">
          <FoodForm
            onSubmit={addDatas}
            handleSubmitSuccess={handleAddSuccess}
          />
        </div>
        <div className="App-filter">
          <form className="App-search" onSubmit={handleFindSubmit}>
            <input
              className="App-search-input"
              onChange={handleKeyWordChange}
            />
            <button className="App-search-button">
              <img src={searchImg} />
            </button>
          </form>
          <div className="App-orders">
            <AppSortButton
              selected={order === "createdAt"}
              onClick={handleNewestClick}
            >
              {t(`newest`)}
            </AppSortButton>
            <AppSortButton
              selected={order === "calorie"}
              onClick={handleMostCalorieClick}
            >
              {t(`calorie`)}
            </AppSortButton>
          </div>
        </div>
        <FoodList
          items={items}
          onDelete={handleDelete}
          onUpdate={updateDatas}
          onUpdateSuccess={handleUpdateSuccess}
        />
        {hasNext && (
          <button
            className="App-load-more-button"
            onClick={handleMoreClick}
            disabled={isLoading}
          >
            {t("load more")}
          </button>
        )}
      </div>
      <div className="App-footer">
        <div className="App-footer-container">
          <img src={logoTextImg} />
          {/* <select>
            <option>한국어</option>
            <option>English</option>
          </select> */}
          <LocaleSelect />
          <div className="App-footer-menu">
            {t(`terms of service`)} | {t(`privacy policy`)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
