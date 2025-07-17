import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:5000",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add the bearer token to all api requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.error("Intercept request", token);
  }
  return config;
});

// Handle token expiration and refresh
// For each response from the backend it checks the login status
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    console.error("Interceptor response error");
    if (
      originalRequest.url.includes("/auth/refresh") ||
      error.response?.status !== 401
    ) {
      return Promise.reject(error);
    }
    console.error("Interceptor response error");

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await api.post("/auth/refresh", null, {
          withCredentials: true,
        });
        const newAccessToken = res.data.token;
        localStorage.setItem("authToken", newAccessToken);
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.log("Error refreshing access token", refreshError);
        localStorage.removeItem("authToken");
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
