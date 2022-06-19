import React, { createContext, Dispatch, useRef, useState } from "react";
import * as SecureStore from "expo-secure-store";

type AuthStateType = {
  accessToken: string | undefined;
  refreshToken: string | undefined;
  authenticated: boolean | undefined;
};
type InitialStateType = {
  authState?: AuthStateType;
  getAccessToken: () => string | undefined;
  logout: () => void;
  setAuthState: Dispatch<React.SetStateAction<AuthStateType | undefined>>;
};

const AuthContext = createContext<InitialStateType>({} as InitialStateType);

const AuthProvider = (props: any) => {
  const [authState, setAuthState] = useState<AuthStateType>();
  const isCancelled = useRef(false);

  const logout = async () => {
    await SecureStore.deleteItemAsync("refreshToken");
    await SecureStore.deleteItemAsync("accessToken");

    setAuthState({
      accessToken: undefined,
      refreshToken: undefined,
      authenticated: false,
    });
  };

  React.useEffect(() => {
    return () => {
      isCancelled.current = true;
    };
  }, []);

  const getAccessToken = () => {
    return authState?.accessToken;
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        getAccessToken,
        logout,
        setAuthState,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
