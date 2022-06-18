import React, { createContext, useContext } from "react";
import axios from "axios";
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
  const authContext = useContext<any>(AuthContext);

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
    const data = {
      refreshToken: await SecureStore.getItemAsync("refreshToken") || "",
    };

    const options = {
      method: "GET",
      data,
      url: `${baseURL}/auth/refresh`,
    };

    return axios(options)
      .then(async (tokenRefreshResponse) => {
        failedRequest.response.config.headers.Authorization =
          "Bearer " + tokenRefreshResponse.data.accessToken;

        authContext.setAuthState({
          ...authContext.authState,
          accessToken: tokenRefreshResponse.data.accessToken,
        });

        await SecureStore.setItemAsync(
          "accessToken",
          tokenRefreshResponse.data.accessToken
        );
        await SecureStore.setItemAsync(
          "refreshToken",
          authContext.authState.refreshToken
        );

        return Promise.resolve();
      })
      .catch((e) => {
        authContext.setAuthState({
          accessToken: undefined,
          refreshToken: undefined,
        });
      });
  };

  createAuthRefreshInterceptor(authAxios, refreshAuthLogic, {});

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
