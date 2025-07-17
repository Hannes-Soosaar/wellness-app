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
        console.log("No access token, trying refresh...");
        try {
          const res = await api.post("/auth/refresh", null, {
            withCredentials: true, // include cookies
          });

          const newToken = res.data.accessToken;
          if (newToken) {
            localStorage.setItem("authToken", newToken);
            setAuthToken(newToken);
            setIsLoggedIn(true);
            console.log("Refreshed token successfully");
          } else {
            throw new Error("No access token in refresh response");
          }
        } catch (err) {
          console.error("Refresh failed:", err);
          localStorage.removeItem("authToken");
          setIsLoggedIn(false);
        } finally {
          setLoading(false);
        }
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
