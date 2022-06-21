import React from "react";
import { Stack, screens } from ".";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import tw from "../tailwind";
import { RootStackParamList } from "../types";
import BottomGuestTabNavigator from "./BottomGuestNavigator";

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
export default GuestNavigator;
