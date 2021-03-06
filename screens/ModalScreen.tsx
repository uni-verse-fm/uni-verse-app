import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";
import { Platform, Image, TouchableOpacity, View, Text } from "react-native";
import { useQuery } from "react-query";
import { me } from "../api/AuthAPI";

import { AuthContext } from "../context/AuthContext";
import { imageSource } from "../context/AxiosContext";

import tw from "../tailwind";
import { RootStackScreenProps } from "../types";

export default function ModalScreen({
  navigation,
}: RootStackScreenProps<"Modal">) {
  const authContext = useContext(AuthContext);

  const { status, data } = useQuery("me", () => me().then((res) => res.data), {
    enabled: !!authContext.authState?.authenticated,
  });

  return (
    <View style={tw`flex-1`}>
      {authContext?.authState?.authenticated ? (
        <View
          style={tw`flex-1 justify-center items-center dark:bg-drk bg-white`}
        >
          <Image
            style={tw`h-40 w-40 rounded-full m-2`}
            source={
              status === "success" && data.profilePicture
                ? {
                    uri: imageSource + data.profilePicture,
                  }
                : require("../assets/images/profile.jpg")
            }
            defaultSource={require("../assets/images/profile.jpg")}
          />
          <Text style={tw`text-2xl font-bold text-black dark:text-white`}>
            {status === "success" && data.username}
          </Text>
          <View style={tw`flex flex-row`}>
            <View style={tw`bg-rd px-3 py-1 rounded-full m-1`}>
              <TouchableOpacity onPress={() => authContext.logout()}>
                <Text style={tw`text-lg font-bold text-white`}>Logout</Text>
              </TouchableOpacity>
            </View>
            <View style={tw`bg-gry px-3 py-1 rounded-full m-1`}>
              <Text style={tw`text-lg font-bold text-white`}>Settings</Text>
            </View>
            <View style={tw`bg-gry px-3 py-1 rounded-full m-1`}>
              <TouchableOpacity
                onPress={() => {
                  navigation.popToTop();
                  navigation.navigate("MyProfile");
                }}
              >
                <Text style={tw`text-lg font-bold text-white`}>My profile</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Use a light status bar on iOS to account for the black space above the modal */}
          <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
        </View>
      ) : (
        <View
          style={tw`flex-1 justify-center items-center dark:bg-drk bg-white`}
        >
          <View>
            <View style={tw`bg-grn px-3 py-1 rounded-full m-1`}>
              <TouchableOpacity
                onPress={() => {
                  navigation.popToTop();
                  navigation.navigate("Login");
                }}
              >
                <Text style={tw`text-xl font-bold text-white text-center`}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
            <View style={tw`bg-gry px-3 py-1 rounded-full m-1`}>
              <TouchableOpacity
                onPress={() => {
                  navigation.popToTop();
                  navigation.navigate("Register");
                }}
              >
                <Text style={tw`text-xl font-bold text-white text-center`}>
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Use a light status bar on iOS to account for the black space above the modal */}
          <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
        </View>
      )}
    </View>
  );
}
