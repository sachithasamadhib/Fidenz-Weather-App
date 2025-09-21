import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useMemo } from "react";
import { CONFIG } from "../config";

export const useWeatherApi = () => {
  const { getAccessTokenSilently } = useAuth0();

  const api = useMemo(() => {
    const instance = axios.create({
      baseURL: CONFIG.API_BASE_URL,
    });

    instance.interceptors.request.use(async (config) => {

      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: CONFIG.AUTH0_AUDIENCE,
          scope: CONFIG.AUTH0_SCOPE,
        },
      });
      config.headers = config.headers ?? {};
      (config.headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
      return config;
    });

    instance.interceptors.response.use(
      (res) => res,
      (error) => {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          console.warn("Unauthorized. Ensure you are logged in and have read:weather scope.");
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }, [getAccessTokenSilently]);

  return api;
};
