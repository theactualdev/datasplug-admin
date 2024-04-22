import axios from "axios";
import Cookies from "js-cookie";

// import BackendUrls from "@api/urls";
// import config from "@utils/config";
import BACKEND_URLS from "./urls";
import config from "../utils/config";
import { useRefreshToken } from "./authentication";
import { redirect } from "react-router";

export const configOptions = () => {
  if (typeof window === "undefined") return {};

  if (!Cookies.get(config.key.token)) return {};

  const accessToken = Cookies.get("access_token");

  if (!!accessToken) {
    return {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
  }
  return {};
};

export const instance = axios.create({
  baseURL: BACKEND_URLS.baseURL,
});

//Request interceptors for APIs calls
instance.interceptors.request.use(
  async (config) => {
    const access_token = Cookies.get("access_token");
    config.headers = {
      Authorization: `Bearer ${access_token}`,
      // Authorization: `Bearer fake`,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

//REQUEST INTERCEPTOR FOR API CALLS

//REQUEST INTERCEPTOR FOR API CALLS
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error?.response?.status === 401 && !originalRequest._retry) {
      console.error(error);
      Cookies.remove("refresh_token");
      Cookies.remove("access_token");
      window.location.pathname = "/auth-login";
      // originalRequest._retry = true;
      //IF ACCESS TOKEN HAS EXPIRED, CALL THE REFRESH FUNCTION
      // await useRefreshToken();
      // return instance(originalRequest);
    }

    return Promise.reject(error);
  }
);
