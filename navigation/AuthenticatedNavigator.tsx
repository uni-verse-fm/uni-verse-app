import React from "react";
import { Stack, screens } from ".";
import MyProfileScreen from "../screens/MyProfileScreen";
import { RootStackParamList } from "../types";
import BottomAuthenticatedTabNavigator from "./BottomAuthenticatedTabNavigator";
import tw from "../tailwind";

const AuthenticatedNavigator = () => {
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
};

export default AuthenticatedNavigator;
