import "./App.css";
import { createChart } from "lightweight-charts";
import { CANDLE_DATA } from "./candle_data";
import { useEffect, useRef } from "react";

function App() {
  const chartRef = useRef();

  useEffect(() => {
    // Candle Series
    const chart = createChart(chartRef.current, { width: 1200, height: 600 });
    const candleSeries = chart.addCandlestickSeries();
    candleSeries.setData(CANDLE_DATA);
   
    // Line Series for SMA Indicator
    const smaData = calculateSMA(CANDLE_DATA, 10);
    const smaLine = chart.addLineSeries({
      color: "rgb(170, 50, 181)",
      lineWidth: 2,
    });
    smaLine.setData(smaData);

    chart.timeScale().fitContent();
    
    return () => {
      chart.remove();
    };
  }, []);

  function calculateSMA(data, count) {
    var avg = function (data) {
      var sum = 0;
      for (var i = 0; i < data.length; i++) {
        sum += data[i].close;
      }
      return sum / data.length;
    };
    var result = [];
    for (var i = count - 1, len = data.length; i < len; i++) {
      var val = avg(data.slice(i - count + 1, i));
      result.push({ time: data[i].time, value: val });
    }
    return result;
  }

  return <div className="App" ref={chartRef}></div>;
}

export default App;
