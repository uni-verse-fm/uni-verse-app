import React, { createContext, useContext } from "react";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "./AuthContext";

const resourcesUrl = "https://minio.vagahbond.com/minio";
export const trackSource = `${resourcesUrl}/tracks/`;
export const imageSource = `${resourcesUrl}/images/`;
export const baseURL = "https://uni-verse.api.vagahbond.com";

export const authAxios = axios.create({
  baseURL,
});

export const publicAxios = axios.create({
  baseURL,
});

const AxiosContext = createContext({ authAxios, publicAxios });
const { Provider } = AxiosContext;

function AxiosProvider(props: unknown) {
  const authContext = useContext(AuthContext);

  authAxios.interceptors.request.use(
    (config) => {
      if (!config.headers?.Authorization) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${authContext.getAccessToken()}`,
        };
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  const refreshAuthLogic = async (failedRequest: unknown) => {
    const refreshToken = (await SecureStore.getItemAsync("refreshToken")) || "";

    return await axios
      .get(`${baseURL}/auth/refresh`, {
        headers: { Authorization: `${refreshToken}` },
      })
      .then(async (tokenRefreshResponse) => {
        failedRequest.response.config.headers.Authorization = `Bearer ${tokenRefreshResponse.data.accessToken}`;

        authContext.setAuthState({
          refreshToken,
          accessToken: tokenRefreshResponse.data.accessToken,
          authenticated: !!tokenRefreshResponse.data.accessToken,
        });

        await SecureStore.setItemAsync(
          "accessToken",
          tokenRefreshResponse.data.accessToken,
        );

        return Promise.resolve();
      })
      .catch(() => {
        authContext.setAuthState({
          accessToken: undefined,
          refreshToken: undefined,
          authenticated: false,
        });
      });
  };

  createAuthRefreshInterceptor(authAxios, refreshAuthLogic);

  return (
    <Provider
      value={{
        authAxios,
        publicAxios,
      }}
    >
      {props.children}
    </Provider>
  );
}

export { AxiosContext, AxiosProvider };
