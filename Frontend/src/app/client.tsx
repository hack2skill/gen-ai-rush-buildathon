import { Axios, InternalAxiosRequestConfig } from "axios";
import { SESSION_TOKEN_KEY } from "./constants";

export const client = new Axios({
  baseURL: "http://10.182.0.180:8000/",
});

client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const sessionToken = localStorage.getItem(SESSION_TOKEN_KEY);
  if (sessionToken) {
    config.headers["X-Authorization"] = `BEARER ${sessionToken}`;
  }
  return config;
});
