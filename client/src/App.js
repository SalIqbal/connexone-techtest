import React, { useState, useEffect } from "react";
import MetricsInfo from "./components/MetricsInfo";
import TimeInfo from "./components/TimeInfo";
import { updateDataRefreshRate } from "./utils/constants";
import { getMetrics, getServerTime } from "./services";

function App() {
  const [timeData, setTimeData] = useState(null);
  const [metricsData, setMetricsData] = useState(null);
  const [fetchingTime, setFetchingTime] = useState(true);
  const [fetchingMetrics, setFetchingMetrics] = useState(true);

  const getTimeData = async () => {
    const data = await getServerTime();
    setTimeData(data);
    setFetchingTime(false);
  };

  const getMetricsData = async () => {
    const data = await getMetrics();
    setMetricsData(data);
    setFetchingMetrics(false);
  };

  //hooking
  useEffect(() => {
    getTimeData();
    getMetricsData();
    const timerId = setInterval(() => {
      setFetchingTime(true);
      setFetchingMetrics(true);
      getTimeData();
      getMetricsData();
    }, updateDataRefreshRate);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <div className="MainContainer">
      <TimeInfo serverTime={timeData} loading={fetchingTime} />
      <MetricsInfo serverMetrics={metricsData} loading={fetchingMetrics} />
    </div>
  );
}

export default App;
