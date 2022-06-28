import { View, Text, Image, FlatList } from "react-native";
import React from "react";
import { useQuery } from "react-query";
import tw from "../tailwind";
import { RootStackScreenProps } from "../types";
import ReleaseCell from "../components/ReleaseCell";
import { getUserReleases } from "../api/ReleaseAPI";

interface IParams {
  user: {
    id: string;
    username: string;
    email: string;
  };
}

export default function UserScreen({
  route,
  navigation,
}: RootStackScreenProps<"User">) {
  const { user } = route.params as unknown as IParams;

  const releaseQuery = useQuery(
    `user-releases-${user.id}`,
    () => getUserReleases(user.id as string),
    { enabled: Boolean(user.id) },
  );

  return (
    <View style={tw`flex-1 dark:bg-drk bg-white`}>
      <View style={tw`flex flex-row m-2`}>
        <Image
          style={tw`h-40 w-40 rounded-full`}
          source={require("../assets/images/profile.jpg")}
        />
        <View style={tw`flex mx-6 my-10`}>
          <Text style={tw`text-lg font-bold text-black dark:text-white`}>
            Usename:
          </Text>
          <Text style={tw`text-base font-bold text-gry dark:text-grn`}>
            {user.username}
          </Text>
          <Text style={tw`text-lg font-bold text-black dark:text-white`}>
            Email:
          </Text>
          <Text style={tw`text-base font-bold text-gry dark:text-grn`}>
            {user.email}
          </Text>
        </View>
      </View>
      <View style={tw`mx-2`}>
        <Text style={tw`text-lg font-bold text-black mt-4 dark:text-white`}>
          Releases:
        </Text>
        {releaseQuery.status === "success" && releaseQuery.data.length > 0 && (
          <FlatList
            data={releaseQuery.data}
            renderItem={({ item }) => (
              <ReleaseCell release={item} navigation={navigation} />
            )}
            style={tw`grow`}
          />
        )}
      </View>
    </View>
  );
}
