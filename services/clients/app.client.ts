import axios from "axios";
import { toast } from "react-toastify";
import { appMock } from "./app.mock";
import { dispatchLogout } from "@/context/authentication";
import endpoint from "../config/endpoints.config";

export const appApiClient = axios.create({
  baseURL: endpoint,
});

if (process.env.USE_MOCK) {
  console.info(
    "⚠ info: using mock for requests, they may be out of sync with current backend development",
  );
  appMock();
}

/**
 * @todo handle unauthorized and other useful status codes
 */
appApiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      dispatchLogout();
    }

    const message =
      error.response?.data?.detail ||
      error.response?.data?.message ||
      error?.message ||
      "Something went wrong";

    if (Array.isArray(message)) {
      toast.error(message[0].msg);
    } else {
      toast.error(message);
    }

    return await Promise.reject(error);
  },
);

// Set header from storage on each request using interceptors
appApiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  async (error) => {
    return await Promise.reject(error);
  },
);
