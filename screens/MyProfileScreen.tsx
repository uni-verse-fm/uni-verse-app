import { View, Text, Alert } from "react-native";
import tw from "../tailwind";
import { RootStackScreenProps } from "../types";
import { Image, FlatList } from "react-native";
import React, { useState } from "react";
import ReleaseCell from "../components/ReleaseCell";
import { me } from "../api/AuthAPI";
import { useQuery } from "react-query";
import { getUserReleases } from "../api/ReleaseAPI";

export default function MyProfileScreen({
  navigation,
}: RootStackScreenProps<"MyProfile">) {
  const meQuery = useQuery("me", () => me().then((res) => res.data), {
    onSuccess: (res) => {
      if (res.status === 401) {
        Alert.alert(JSON.stringify(res));
      }
    },
  });

  const releaseQuery = useQuery(
    "myReleases",
    () => getUserReleases(meQuery.data.id as string),
    { enabled: meQuery.status === "success" }
  );

  return (
    <View style={tw`flex-1 dark:bg-drk bg-white`}>
      <View style={tw`flex flex-row m-2`}>
        <Image
          style={tw`h-40 w-40 rounded-full`}
          source={require("../assets/images/profile.jpg")}
        />
        <View style={tw`flex mx-6 my-10`}>
          <Text
            style={tw`text-lg font-bold text-black dark:text-white`}
          >{`Usename:`}</Text>
          <Text style={tw`text-base font-bold text-gry dark:text-grn`}>{`${
            meQuery.status === "success" ? meQuery.data.username : ""
          }`}</Text>
          <Text
            style={tw`text-lg font-bold text-black dark:text-white`}
          >{`Email:`}</Text>
          <Text style={tw`text-base font-bold text-gry dark:text-grn`}>{`${
            meQuery.status === "success" ? meQuery.data.email : ""
          }`}</Text>
        </View>
      </View>
      <View style={tw`mx-2`}>
        <Text
          style={tw`text-lg font-bold text-black mt-4 dark:text-white`}
        >{`Releases:`}</Text>
        {releaseQuery.status === "success" && (
          <FlatList
            data={releaseQuery.data}
            renderItem={({ item }) => (
              <ReleaseCell release={{ ...item, author: { username: meQuery.data.username }}} navigation={navigation} />
            )}
            style={tw`grow`}
          />
        )}
      </View>
    </View>
  );
}
