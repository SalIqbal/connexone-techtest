import { useState, useEffect, useCallback } from "react";
import { BeatLoader } from "react-spinners";
import { updateTimerRefreshRate } from "../utils/constants";
const TimeInfo = ({ serverTime, loading }) => {
  const [formattedTime, setFormattedTime] = useState(null);

  const calcTimeDiff = useCallback(() => {
    let ft = !serverTime ? "00:00:00" : "";
    if (serverTime) {
      const currentSeconds = Math.round(Date.now() / 1000);
      const difference = currentSeconds - serverTime;

      const seconds = difference % 60;
      const minutes = Math.floor(difference / 60) % 60;
      const hours = Math.floor(difference / 3600) % 24;

      const hh = hours < 10 ? `0${hours}` : `${hours}`;
      const mm = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const ss = seconds < 10 ? `0${seconds}` : `${seconds}`;

      ft = `${hh}:${mm}:${ss}`;
    }
    setFormattedTime(ft);
  }, [serverTime]);

  useEffect(() => {
    const timerId = setInterval(() => {
      calcTimeDiff();
    }, updateTimerRefreshRate);

    return () => {
      clearInterval(timerId);
    };
  }, [calcTimeDiff]);

  return (
    <div className="displayTime">
      <div>Server Time: {serverTime}</div>
      <div>Time Difference: {formattedTime}</div>
      <div>{loading && <BeatLoader />}</div>
    </div>
  );
};
export default TimeInfo;
