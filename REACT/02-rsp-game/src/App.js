import "./App.css";
import reset from "./assets/ic-reset.svg";
function App() {
  return (
    <div className="App">
      <div className="header">
        <h3 className="title">가위바위보</h3>
        <img src={reset} alt="" className="reset" />
      </div>
      <div className="scoreBoard">
        <div className="score me">
          <div className="number">0</div>
          <div className="text">나</div>
        </div>
        <div>:</div>
        <div className="score you">
          <div className="number">0</div>
          <div className="text">상대</div>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default App;
