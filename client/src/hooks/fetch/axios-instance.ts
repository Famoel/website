import axios from "axios";

const controller = new AbortController();

export const AXIOS_INSTANCE = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  signal: controller.signal,
});
