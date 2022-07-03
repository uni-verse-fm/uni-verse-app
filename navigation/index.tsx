/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */

import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  NavigationState,
} from "@react-navigation/native";
import * as React from "react";
import { ColorSchemeName } from "react-native";

import LinkingConfiguration from "./LinkingConfiguration";
import { AuthContext } from "../context/AuthContext";
import AuthenticatedNavigator from "./AuthenticatedNavigator";
import GuestNavigator from "./GuestNavigator";

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

export default function Navigation({
  colorScheme,
  onStateChange,
}: {
  colorScheme: ColorSchemeName;
  onStateChange: (state: NavigationState | undefined) => void;
}) {
  const authContext = React.useContext(AuthContext);

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      onStateChange={onStateChange}
    >
      {authContext?.authState?.authenticated ? (
        <AuthenticatedNavigator />
      ) : (
        <GuestNavigator />
      )}
    </NavigationContainer>
  );
}

export const getCurrentRoute = (
  state: NavigationState | Required<NavigationState["routes"][0]>["state"],
): string | undefined => {
  if (state.index === undefined || state.index < 0) {
    return undefined;
  }
  const nestedState = state.routes[state.index].state;
  if (nestedState !== undefined) {
    return getCurrentRoute(nestedState);
  }
  return state.routes[state.index].name;
};
