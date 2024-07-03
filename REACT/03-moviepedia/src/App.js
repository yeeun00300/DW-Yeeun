import "./App.css";
import ReviewFrom from "./ReviewFrom";
import logoImg from "./assets/logo.png";

function App() {
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
        <div className="App-sorts"></div>
        <div className="App-ReviewList"></div>
      </div>
      <footer className="App-footer">
        <div className="App-footer-container">| 개인정보 처리방침</div>
      </footer>
    </div>
  );
}

export default App;
