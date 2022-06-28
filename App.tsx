import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useAppColorScheme, useDeviceContext } from "twrnc";
import React, { useCallback, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { QueryClient, QueryClientProvider } from "react-query";
import { NavigationState } from "@react-navigation/native";
import Navigation, { getCurrentRoute } from "./navigation";
import FloatingMenu from "./components/FloatingMenu";
import tw from "./tailwind";
import { AuthContext } from "./context/AuthContext";
import Spinner from "./components/Spinner";
import { PlayerProvider } from "./context/PlayerContext";
import PlayerScreen from "./screens/PlayerScreen";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

export default function App() {
  useDeviceContext(tw);
  const [colorScheme] = useAppColorScheme(tw);
  const authContext = useContext(AuthContext);
  const [status, setStatus] = useState("loading");
  const [showFAB, setShowFAB] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);

  const onPlayerClicked = () => {
    setShowPlayer(true);
    setShowFAB(false);
  };

  const onClosePlayer = () => {
    setShowPlayer(false);
    setShowFAB(true);
  };

  const loadJWT = useCallback(async () => {
    try {
      const refreshToken = await SecureStore.getItemAsync("refreshToken");
      const accessToken = await SecureStore.getItemAsync("accessToken");
      authContext.setAuthState({
        accessToken: accessToken || undefined,
        refreshToken: refreshToken || undefined,
        authenticated: !!accessToken,
      });
      setStatus("success");
    } catch (error) {
      setStatus("error");
      authContext.setAuthState({
        accessToken: undefined,
        refreshToken: undefined,
        authenticated: false,
      });
    }
  }, [authContext]);

  useEffect(() => {
    loadJWT();
  }, [loadJWT]);

  const onNavigationStateChanged = (state: NavigationState | undefined) => {
    if (state === undefined) {
      setShowFAB(false);
    } else {
      const route = getCurrentRoute(state);
      ["Login", "Register", "Modal"].includes(route as string)
        ? setShowFAB(false)
        : setShowFAB(true);
    }
  };

  if (status === "loading") {
    return <Spinner />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <PlayerProvider>
          <Navigation
            colorScheme={colorScheme}
            onStateChange={onNavigationStateChanged}
          />
          <PlayerScreen visible={showPlayer} onClosePlayer={onClosePlayer} />
          {showFAB && <FloatingMenu onPlayerClicked={onPlayerClicked} />}
        </PlayerProvider>
        <StatusBar />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
