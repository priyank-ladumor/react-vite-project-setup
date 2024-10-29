import axios from "axios";
import { trimEnd, toString, trimStart } from "lodash";

// Create an Axios instance
const globalAxios = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL || "",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
globalAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor
globalAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default globalAxios;

// Make it available while not in production for developers
if (typeof window !== "undefined") {
  window._globalAxios = globalAxios;
}

// Abstract API class
export class Api {
  constructor(baseUrl, axiosInstance = globalAxios) {
    this.baseUrl = baseUrl;
    this.http = axiosInstance;
  }

  route(subpath) {
    const path = trimEnd(trimStart(toString(subpath), "/"), "/");
    return path
      ? `${trimEnd(this.baseUrl, "/")}/${path}`
      : `${trimEnd(this.baseUrl, "/")}`;
  }

  async _get(id) {
    return await this.http.get(this.route(id));
  }

  async _all() {
    return await this.http.get(this.route(""));
  }

  async _create(data) {
    return await this.http.post(this.route(""), data);
  }

  async _post(path, data) {
    return await this.http.post(this.route(path), data);
  }

  async _update(id, data) {
    return await this.http.put(this.route(id), data);
  }

  async _delete(id) {
    return await this.http.delete(this.route(id));
  }

  async _patch(id, data) {
    return await this.http.patch(this.route(id), data);
  }
}

// Set Authorization token for all requests
export const setAxiosAuthToken = (token) => {
  if (token) {
    globalAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete globalAxios.defaults.headers.common.Authorization;
  }
};
