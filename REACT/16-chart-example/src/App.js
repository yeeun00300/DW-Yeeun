import "./App.css";
import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { BarChart, PieChart } from "@mui/x-charts";

function App() {
  const uData = [40, 30, 20, 27, 18, 23, 34];
  const pData = [24, 13, 30, 39, 48, 38, 43];
  const xLabels = ["8/1", "8/2", "8/3", "8/4", "8/5", "8/6", "8/7"];
  return (
    <div className="App">
      <LineChart
        width={500}
        height={300}
        series={[
          { data: pData, label: "온도" },
          { data: uData, label: "습도" },
        ]}
        xAxis={[{ scaleType: "point", data: xLabels }]}
      />
      <BarChart
        xAxis={[{ scaleType: "band", data: ["1농장", "2농장", "3농장"] }]}
        series={[
          { data: [4, 3, 5], label: "암컷" },
          { data: [1, 6, 3], label: "수컷" },
          { data: [2, 5, 6], label: "새끼" },
        ]}
        width={500}
        height={300}
      />
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 10, label: "암컷" },
              { id: 1, value: 15, label: "수컷" },
              { id: 2, value: 20, label: "새끼" },
            ],
          },
        ]}
        width={400}
        height={200}
      />
    </div>
  );
}

export default App;
