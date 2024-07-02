import "./App.css";
import Item from "./Item";
import arrow from "./assets/arrow.svg";
import repeat from "./assets/repeat.svg";
import x from "./assets/x.svg";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <div className="header">
            <h1>
              MBTI 별<br />
              <span className="accent">좋아하는 컬러</span>
            </h1>
            <div>
              <span className="filter">
                <span>INTJ</span>
                <img className="remove-icon" src={x} alt="" />
              </span>
            </div>
          </div>
        </div>
        <div className="content">
          <a className="add-item" href="newColor.html">
            + 새 컬러 등록하기
          </a>
          <ul className="items" id="items">
            <Item />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
