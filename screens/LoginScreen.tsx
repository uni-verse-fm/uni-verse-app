import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  Alert,
} from "react-native";
import React, { useContext } from "react";
import * as SecureStore from "expo-secure-store";
import { Formik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../context/AuthContext";
import { AxiosContext } from "../context/AxiosContext";
import tw from "../tailwind";
import { RootStackScreenProps } from "../types";
import { Messages } from "../constants/values";
import { ILogin } from "../constants/types";

function LoginScreen({ navigation }: RootStackScreenProps<"Login">) {
  const authContext = useContext(AuthContext);
  const { publicAxios } = useContext(AxiosContext);

  const onLogin = async (value: ILogin) => {
    try {
      const response = await publicAxios.post("/auth/login", {
        email: value.email,
        password: value.password,
      });

      const { accessToken, refreshToken } = response.data;
      authContext.setAuthState({
        accessToken,
        refreshToken,
        authenticated: true,
      });

      await SecureStore.setItemAsync("accessToken", accessToken);
      await SecureStore.setItemAsync("refreshToken", refreshToken);
    } catch (error: unknown) {
      Alert.alert("Login Failed");
    }
  };

  return (
    <SafeAreaView
      style={tw`flex-1 justify-center items-center text-black bg-white dark:bg-drk dark:text-white`}
    >
      <Text style={tw`text-2xl text-grn dark:text-white font-bold m-2`}>
        Login
      </Text>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email(Messages.INVALID_EMAIL)
            .required(Messages.REQUIRED),
          password: Yup.string()
            .required(Messages.REQUIRED)
            .min(8, Messages.SHORT_PASWORD),
        })}
        onSubmit={(value: ILogin) => {
          onLogin(value);
        }}
      >
        {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
          <View
            style={tw`flex justify-center rounded-lg bg-drk dark:bg-white w-auto h-auto w-4/5 m-2`}
          >
            <View style={tw`m-2 text-sm`}>
              <Text style={tw`text-base font-bold text-grn dark:text-black`}>
                Email:
              </Text>
              <TextInput
                key="email"
                style={tw`text-lg bg-white dark:bg-drk dark:text-grn px-1 pb-1 rounded-lg `}
                placeholder="Enter your email"
                placeholderTextColor="#616161"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              {errors.email ? (
                <Text style={tw`text-rd text-sm`}>{errors.email}</Text>
              ) : null}
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
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              {errors.password ? (
                <Text style={tw`text-rd text-sm`}>{errors.password}</Text>
              ) : null}
            </View>

            <View style={tw`rounded bg-grn font-normal text-white px-1 m-2`}>
              <Button
                color="white"
                title="Login"
                onPress={() => handleSubmit()}
              />
            </View>
          </View>
        )}
      </Formik>
      <Text
        style={tw`text-base font-bold text-grn`}
        onPress={() => navigation.navigate("Register")}
      >
        Don&apos;t have an acount ?
      </Text>
    </SafeAreaView>
  );
}

export default LoginScreen;
