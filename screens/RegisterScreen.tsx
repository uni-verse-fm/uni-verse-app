import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  Alert,
} from "react-native";
import React from "react";
import tw from "../tailwind";
import { RootStackScreenProps } from "../types";
import { Formik } from "formik";
import * as Yup from "yup";
import { Messages } from "../constants/values";
import { register } from "../api/AuthAPI";
import { useMutation } from "react-query";

const ReleaseScreen = ({ navigation }: RootStackScreenProps<"Register">) => {
  const { mutate } = useMutation("register", register, {
    onSuccess: (res) => {
      if (res.status === 201) {
        navigation.navigate("Login");
      } else {
        Alert.alert("Sign up Failed");
      }
    },
  });

  return (
    <SafeAreaView
      style={tw`flex-1 justify-center items-center text-black bg-white dark:bg-drk dark:text-white`}
    >
      <Text style={tw`text-2xl text-grn dark:text-white font-bold m-2`}>
        Register
      </Text>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          passwordConfirmation: "",
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string()
            .max(15, Messages.USERNAME)
            .min(5, Messages.USERNAME)
            .required(Messages.REQUIRED),
          email: Yup.string()
            .email(Messages.INVALID_EMAIL)
            .required(Messages.REQUIRED),
          password: Yup.string()
            .required(Messages.REQUIRED)
            .min(8, Messages.SHORT_PASWORD),
          passwordConfirmation: Yup.string().oneOf(
            [Yup.ref("password"), null],
            Messages.PASSWORD_MISMATCH
          ),
        })}
        onSubmit={(value) => {
          mutate(value);
        }}
      >
        {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
          <View
            style={tw`flex justify-center rounded-lg bg-drk dark:bg-white w-auto h-auto w-4/5 m-2`}
          >
            <View style={tw`m-2 text-sm`}>
              <Text style={tw`text-base font-bold text-grn dark:text-black`}>
                Username:
              </Text>
              <TextInput
                style={tw`text-lg bg-white text-black dark:text-grn dark:bg-drk p-1 rounded-lg `}
                placeholder="Enter your username"
                placeholderTextColor="#616161"
                autoCapitalize="none"
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
              />
              {errors.username ? (
                <Text style={tw`text-rd text-sm`}>{errors.username}</Text>
              ) : null}
            </View>

            <View style={tw`m-2 text-sm`}>
              <Text style={tw`text-base font-bold text-grn dark:text-black`}>
                Email:
              </Text>
              <TextInput
                key="email"
                style={tw`text-lg bg-white dark:text-grn dark:bg-drk p-1 rounded-lg `}
                placeholder="Enter your email"
                placeholderTextColor="#616161"
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
                key="password"
                style={tw`text-lg bg-white dark:text-grn dark:bg-drk p-1 rounded-lg `}
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

            <View style={tw`m-2 text-sm`}>
              <Text style={tw`text-base font-bold text-grn dark:text-black`}>
                Confirm your password:
              </Text>
              <TextInput
                key="passwordConfirmation"
                style={tw`text-lg bg-white dark:text-grn dark:bg-drk p-1 rounded-lg `}
                placeholder="Reenter your password"
                placeholderTextColor="#616161"
                secureTextEntry
                onChangeText={handleChange("passwordConfirmation")}
                onBlur={handleBlur("passwordConfirmation")}
                value={values.passwordConfirmation}
              />
              {errors.passwordConfirmation ? (
                <Text style={tw`text-rd text-sm`}>
                  {errors.passwordConfirmation}
                </Text>
              ) : null}
            </View>

            <View style={tw`rounded bg-grn font-normal text-white px-1 m-2`}>
              <Button
                color="white"
                title="Submit"
                onPress={() => handleSubmit()}
              />
            </View>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default ReleaseScreen;
