import { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";
const MetricsInfo = ({ serverMetrics, loading }) => {
  const [metricsDataFormatted, setMetricsDataFormatted] = useState("");
  return (
    <div className="displayMetrics">
      <pre>
        <code>{serverMetrics}</code>
      </pre>
      <div>{loading && <BeatLoader />}</div>
    </div>
  );
};
export default MetricsInfo;
