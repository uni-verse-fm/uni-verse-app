import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import * as SecureStore from "expo-secure-store";
import { AxiosContext } from "../context/AxiosContext";
import tw from "../tailwind";
import { RootStackScreenProps } from "../types";

const LoginScreen = ({
    navigation,
  }: RootStackScreenProps<"Login">) => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const authContext = useContext(AuthContext);
  const { publicAxios } = useContext(AxiosContext);

  const onLogin = async () => {
    try {
      const response = await publicAxios.post("/auth/login", {
        email,
        password,
      });

      const { accessToken, refreshToken } = response.data;
      authContext.setAuthState({
        accessToken,
        refreshToken,
        authenticated: true,
      });

      await SecureStore.setItemAsync("accessToken", accessToken);
      await SecureStore.setItemAsync("refreshToken", refreshToken);
    } catch (error: any) {
      Alert.alert("Login Failed", JSON.stringify(error));
    }
  };

  return (
    <SafeAreaView
      style={tw`flex-1 justify-center items-center text-black bg-white dark:bg-drk dark:text-white`}
    >
      <Text style={tw`text-2xl text-grn dark:text-white font-bold m-2`}>
        Login
      </Text>
      <View
        style={tw`flex justify-center rounded-lg bg-drk dark:bg-white w-auto h-auto w-4/5 m-2`}
      >
        <View style={tw`m-2 text-sm`}>
          <Text style={tw`text-base font-bold text-grn dark:text-black`}>
            Email:
          </Text>
          <TextInput
            style={tw`text-lg bg-white dark:bg-drk dark:text-grn px-1 pb-1 rounded-lg `}
            placeholder="Enter your email"
            placeholderTextColor="#616161"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
        </View>

        <View style={tw`m-2 text-sm`}>
          <Text style={tw`text-base font-bold text-grn dark:text-black`}>
            Password:
          </Text>
          <TextInput
            style={tw`text-lg bg-white dark:bg-drk dark:text-grn px-1 pb-1 rounded-lg `}
            placeholder="Enter your password"
            placeholderTextColor="#616161"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
        </View>

        <View
          style={tw`rounded bg-grn font-normal text-white px-1 m-2`}
        >
          <Button color="white" title="Login" onPress={() => onLogin()} />
        </View>
      </View>
      <Text style={tw`text-base font-bold text-grn`} onPress={() => navigation.navigate("Register")} >Don't have an acount ?</Text>
    </SafeAreaView>
  );
};

export default LoginScreen;
