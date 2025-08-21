import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../lib/axios";

interface LoginData {
  token: string;
}

export const OauthLogin = () => {
  const { token } = useParams<{ token: string }>();

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      console.error("No tempToken found in URL");
      navigate("/login");
      return;
    }
    const loginData: LoginData = {
      token: token,
    };

    const loginOauth = async () => {
      try {
        const response = await api.post("auth/oauth/finalize", loginData, {
          withCredentials: true,
        });
        if (response.status === 401) {
          console.error("Login failed, please try again");
          navigate("/login");
          return;
        }

        // if (response.data.tempToken && response.data.mfaUri) {
        //   setTempToken(response.data.tempToken);
        //   setMfaUri(response.data.mfaUri);
        //   setSuccessMessage(
        //     "MFA required. Enter the code from your authenticator."
        //   );
        // } else

        if (response.data.token) {
          console.log("Token got successfully");
          localStorage.setItem("authToken", response.data.token);
          window.location.href = "/user/profile";
        }
      } catch (error) {
        console.error("Error finalizing OAuth login:", error);
        navigate("/login");
        return;
      }
    };

    loginOauth();
  }, [navigate]);

  return <div>Finishing login...</div>;
};
