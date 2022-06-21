/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  NavigationState,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";

import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList, RootTabParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import ReleaseScreen from "../screens/ReleaseScreen";
import PlaylistScreen from "../screens/PlaylistScreen";
import UserScreen from "../screens/UserScreen";
import { AuthContext } from "../context/AuthContext";
import AuthenticatedNavigator from "./AuthenticatedNavigator";
import GuestNavigator from "./GuestNavigator";

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
export const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
export const BottomTab = createBottomTabNavigator<RootTabParamList>();

export const screens = [
  {
    name: "Release",
    screen: ReleaseScreen,
  },
  {
    name: "Playlist",
    screen: PlaylistScreen,
  },
  {
    name: "User",
    screen: UserScreen,
  },
  {
    name: "NotFound",
    screen: NotFoundScreen,
  },
  {
    name: "Modal",
    screen: ModalScreen,
  },
];

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
