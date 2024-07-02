import "./App.css";
import reset from "./assets/ic-reset.svg";
import HandIcon from "./handIcon";
import "./handIcon.css";
import HandButton from "./HandButton";
import { useState } from "react";
import { generateRandomHand } from "./utils";

function App() {
  const [hand, setHand] = useState("rock");
  const [otherHand, setOtherHand] = useState("rock");
  const handleButtonClick = (value) => {
    // 사용자가 클릭한 주먹가위보 가져오기
    setHand(value);
    // 상대의 주먹가위보 랜덤으로 추출
    const nextOtherHand = generateRandomHand();
    setOtherHand(nextOtherHand);
    // 승패 결정 ==> 배점을 곱해서 점수 추출
  };
  return (
    <div className="App">
      <h1 className="App-heading">가위바위보</h1>
      <img src={reset} alt="" className="App-reset" />
      <div className="App-scores">
        <div className="Score">
          <div className="Score-num">0</div>
          <div className="Score-name">나</div>
        </div>
        <div className="App-versus">:</div>
        <div className="Score">
          <div className="Score-num">0</div>
          <div className="Score-name">상대</div>
        </div>
      </div>
      <div className="Box App-box">
        {/* 가위바위보 내는곳 */}
        <div className="App-hands">
          <div className="Hand">
            <HandIcon value={hand} className="Hand-icon" />
          </div>
          <div className="App-versus">VS</div>
          <div className="Hand">
            <HandIcon value={otherHand} className="Hand-icon" />
          </div>
        </div>
        {/* 배점 */}
        <div className="App-bet">
          <span>배점</span>
          <input type="number" min={1} max={9} />
          <span>배</span>
        </div>
        {/* 기록 */}
        <div className="App-history">
          <h2>승부기록</h2>
          <p>승리, 패배, 무승부</p>
        </div>
      </div>
      <div>
        <HandButton value="rock" onClick={handleButtonClick} />
        <HandButton value="scissor" onClick={handleButtonClick} />
        <HandButton value="paper" onClick={handleButtonClick} />
      </div>
    </div>
  );
}

export default App;
