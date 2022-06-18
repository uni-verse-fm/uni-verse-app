/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  NavigationState,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable, Image } from "react-native";

import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import HomeScreen from "../screens/HomeScreen";
import LibraryScreen from "../screens/LibraryScreen";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import SearchScreen from "../screens/SearchScreen";
import ReleaseScreen from "../screens/ReleaseScreen";
import PlaylistScreen from "../screens/PlaylistScreen";
import UserScreen from "../screens/UserScreen";
import tw from "../tailwind";
import MyProfileScreen from "../screens/MyProfileScreen";
import { AuthContext } from "../context/AuthContext";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

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

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function GuestNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        key="Guest-root"
        name="Root"
        component={BottomGuestTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        key="Login"
        name="Login"
        component={LoginScreen}
        options={{
          headerStyle: tw`bg-white dark:bg-drk`,
          headerTitleStyle: tw`text-black dark:text-white`,
        }}
      />
      <Stack.Screen
        key="Register"
        name="Register"
        component={RegisterScreen}
        options={{
          headerStyle: tw`bg-white dark:bg-drk`,
          headerTitleStyle: tw`text-black dark:text-white`,
        }}
      />
      {screens.map((item, index) => (
        <Stack.Screen
          key={index}
          name={item.name as keyof RootStackParamList}
          component={item.screen}
          options={{
            headerStyle: tw`bg-white dark:bg-drk`,
            headerTitleStyle: tw`text-black dark:text-white`,
          }}
        />
      ))}
    </Stack.Navigator>
  );
}

function AuthenticatedNavigator() {
  return (
    <Stack.Navigator key="auth-nav">
      <Stack.Screen
        key="Auth-root"
        name="Root"
        component={BottomAuthenticatedTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        key="MyProfile"
        name="MyProfile"
        component={MyProfileScreen}
        options={{
          headerStyle: tw`bg-white dark:bg-drk`,
          headerTitleStyle: tw`text-black dark:text-white`,
        }}
      />
      {screens.map((item) => (
        <Stack.Screen
          key={item.name}
          name={item.name as keyof RootStackParamList}
          component={item.screen}
          options={{
            headerStyle: tw`bg-white dark:bg-drk`,
            headerTitleStyle: tw`text-black dark:text-white`,
          }}
        />
      ))}
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomAuthenticatedTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "#1BC47D",
        tabBarStyle: tw`bg-white dark:bg-drk`,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<"Home">) => ({
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerStyle: tw`bg-white dark:bg-drk`,
          headerTitleStyle: tw`text-black dark:text-white`,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Modal")}
              style={({ pressed }) =>
                tw`${pressed ? "bg-opacity-50" : ""} mr-2`
              }
            >
              <Image
                style={tw`w-10 h-10 rounded-full dark:border-2 dark:border-grn`}
                source={require("../assets/images/profile.jpg")}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
          headerStyle: tw`bg-white dark:bg-drk`,
          headerTitleStyle: tw`text-black dark:text-white`,
        }}
      />
      <BottomTab.Screen
        name="Library"
        component={LibraryScreen}
        options={({ navigation }: RootTabScreenProps<"Library">) => ({
          tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
          headerStyle: tw`bg-white dark:bg-drk`,
          headerTitleStyle: tw`text-black dark:text-white`,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Modal")}
              style={({ pressed }) =>
                tw`${pressed ? "bg-opacity-50" : ""} mr-2`
              }
            >
              <Image
                style={tw`w-10 h-10 rounded-full dark:border-2 dark:border-grn`}
                source={require("../assets/images/profile.jpg")}
              />
            </Pressable>
          ),
        })}
      />
    </BottomTab.Navigator>
  );
}

function BottomGuestTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "#1BC47D",
        tabBarStyle: tw`bg-white dark:bg-drk`,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<"Home">) => ({
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerStyle: tw`bg-white dark:bg-drk`,
          headerTitleStyle: tw`text-black dark:text-white`,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Modal")}
              style={({ pressed }) =>
                tw`${pressed ? "bg-opacity-50" : ""} mr-2`
              }
            >
              <Image
                style={tw`w-10 h-10 rounded-full dark:border-2 dark:border-grn`}
                source={require("../assets/images/profile.jpg")}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
          headerStyle: tw`bg-white dark:bg-drk`,
          headerTitleStyle: tw`text-black dark:text-white`,
        }}
      />
    </BottomTab.Navigator>
  );
}

export const getCurrentRoute = (
  state: NavigationState | Required<NavigationState["routes"][0]>["state"]
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

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

const screens = [
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