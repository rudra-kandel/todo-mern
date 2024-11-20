import { Axios } from "axios";
import tokenService from "./service-token";

//Timeout as 3 minutes
const timeout = 3 * 60 * 1000;

const httpClient = Axios.create({
  baseURL: `${import.meta.env.VITE_APP_BACKEND_API_URL}`,
  timeout,
});

httpClient.interceptors.request.use(async (config) => {
  const token = tokenService.getToken()?.access;

  if (config && config.headers) {
    if (token && config.headers["Authorization"] !== "") {
      config.headers["Authorization"] = "Bearer " + token;
    }
    if (config.headers["Authorization"] === "") {
      delete config.headers["Authorization"];
    }
  }
  return config;
});
