import React, { createContext, useContext } from "react";
import axios, { AxiosError } from "axios";
import { AuthContext } from "./AuthContext";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import * as SecureStore from "expo-secure-store";

export const trackSource = "http://192.168.0.29:9000/tracks/";
export const imageSource = "http://192.168.0.29:9000/images/";
export const baseURL = "http://192.168.0.29:3000";

export const authAxios = axios.create({
  baseURL,
});

export const publicAxios = axios.create({
  baseURL,
});

const AxiosContext = createContext({ authAxios, publicAxios });
const { Provider } = AxiosContext;

const AxiosProvider = (props: any) => {
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
    (error) => {
      return Promise.reject(error);
    }
  );

  const refreshAuthLogic = async (failedRequest: any) => {
    const refreshToken = (await SecureStore.getItemAsync("refreshToken")) || "";

    return await axios
      .get(`${baseURL}/auth/refresh`, {
        headers: { Authorization: `${refreshToken}` },
      })
      .then(async (tokenRefreshResponse) => {
        failedRequest.response.config.headers.Authorization =
          "Bearer " + tokenRefreshResponse.data.accessToken;

        authContext.setAuthState({
          refreshToken,
          accessToken: tokenRefreshResponse.data.accessToken as string,
          authenticated: !!tokenRefreshResponse.data.accessToken,
        });

        await SecureStore.setItemAsync(
          "accessToken",
          tokenRefreshResponse.data.accessToken
        );
        
        return Promise.resolve();
      })
      .catch((e: AxiosError) => {
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
};

export { AxiosContext, AxiosProvider };
