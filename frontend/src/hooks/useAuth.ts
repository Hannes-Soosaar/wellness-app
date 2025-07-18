import { useEffect, useState } from "react";
import api from "../lib/axios";

export function useAuth() {
  const [authToken, setAuthToken] = useState<string | null>(
    localStorage.getItem("authToken")
  );

  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (!authToken) {
        console.log("Handle a 401 in intercept and try to refresh");
        return;
      }
      try {
        const res = await api.get("/api/user", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        console.log("User authenticated:", res.data);
        setIsLoggedIn(true);
      } catch (err) {
        console.log("Access token invalid, clearing...");
        localStorage.removeItem("authToken");
        setAuthToken(null);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [authToken]);

  return { authToken, setAuthToken, isLoggedIn, setIsLoggedIn, loading };
}
