import React, { createContext, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";

export const baseURL = "http://192.168.0.29:3000";
// : 'http://localhost/';

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

  const refreshAuthLogic = (failedRequest: any) => {
    const data = {
      refreshToken: authContext.authState?.refreshToken || "",
    };

    const options = {
      method: "GET",
      data,
      url: `${baseURL}/auth/refresh/`,
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

        return Promise.reject(e);
      });
  };

  useEffect(() => {
    createAuthRefreshInterceptor(authAxios, refreshAuthLogic, {});
    return () => {
      authContext.setAuthState({
        accessToken: undefined,
        refreshToken: undefined,
      });
    };
  }, []);

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
