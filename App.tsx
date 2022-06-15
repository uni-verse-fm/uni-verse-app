import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Navigation, { getCurrentRoute } from "./navigation";
import FloatingMenu from "./components/FloatingMenu";
import tw from "./tailwind";
import { useAppColorScheme, useDeviceContext } from "twrnc";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import * as SecureStore from "expo-secure-store";
import Spinner from "./components/Spinner";
import { QueryClient, QueryClientProvider } from "react-query";
import { NavigationState } from "@react-navigation/native";

interface IError {
  message: string;
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

export default function App() {
  useDeviceContext(tw);
  const [colorScheme] = useAppColorScheme(tw);
  const authContext = useContext(AuthContext);
  const [status, setStatus] = useState("loading");
  const [showFAB, setShowFAB] = useState(false);

  const loadJWT = useCallback(async () => {
    try {
      const refreshToken = await SecureStore.getItemAsync("refreshToken");
      const accessToken = await SecureStore.getItemAsync("accessToken");
      authContext.setAuthState({
        accessToken: accessToken || undefined,
        refreshToken: refreshToken || undefined,
        authenticated: accessToken !== undefined,
      });
      setStatus("success");
    } catch (error) {
      setStatus("error");
      console.log(`Keychain Error: ${(error as IError).message}`);
      authContext.setAuthState({
        accessToken: undefined,
        refreshToken: undefined,
        authenticated: false,
      });
    }
  }, []);

  useEffect(() => {
    loadJWT();
  }, [loadJWT]);

  const onNavigationStateChanged = (state: NavigationState | undefined) => {
    if (state === undefined) {
      setShowFAB(false);
    } else {
        const route = getCurrentRoute(state);
        ['Login', 'Register'].includes(route as string) ? setShowFAB(false) : setShowFAB(true);
    }
  };

  if (status === "loading") {
    return <Spinner />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} onStateChange={onNavigationStateChanged} />
        {showFAB && <FloatingMenu />}
        <StatusBar />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

