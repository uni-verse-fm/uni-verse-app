import React from "react";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import tw from "../tailwind";
import { RootTabScreenProps } from "../types";
import TabBarIcon from "./TabBarIcon";
import { Pressable, Image } from "react-native";
import { BottomTab } from "./shared";

export default function BottomGuestTabNavigator() {
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
