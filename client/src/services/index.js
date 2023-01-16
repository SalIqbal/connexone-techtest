import axios from "axios";
import { backEndUrl, KEY } from "../utils/constants";
const ax = axios.create({
  baseURL: backEndUrl,
  headers: { authorization: KEY },
});

export const getServerTime = async () => {
  const res = await ax.get("/time");
  return res.data.epoch;
};

export const getMetrics = async () => {
  const res = await ax.get("/metrics");
  return res.data;
};
