import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add the bearere token to all api requests
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
    console.error("Interceptor response error");
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        console.error("No refresh token found");
        localStorage.removeItem("authToken");
        // window.location.href = "/login"; // this will cause an infinite loop
        return Promise.reject(error);
      }

      try {
        const res = await api.post("/auth/refresh", { token: refreshToken });
        {
          const newToken = res.data.token;
          localStorage.setItem("authToken", newToken);
          api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return api(originalRequest);
        }
      } catch (error) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        console.error("Error refreshing authToken:", error);
        return Promise.reject(error);
      }
    }
    console.error("Checking if error ");
    return Promise.reject(error);
  }
);

export default api;
