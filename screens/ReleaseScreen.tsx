import { View, Text } from "react-native";

import tw from "../tailwind";
import { RootStackScreenProps } from "../types";
import { Image, FlatList } from "react-native";
import React from "react";
import TrackCell from "../components/TrackCell";
import { isoDateToDate } from "../utils/dateUtils";
import { imageSource } from "../context/AxiosContext";

interface IParams {
  release: any;
}

export default function ReleaseScreen({
  route,
  navigation,
}: RootStackScreenProps<"Release">) {
  const { release } = route.params as unknown as IParams;
  return (
    <View style={tw`flex-1 dark:bg-drk bg-white`}>
      <View style={tw`flex flex-row m-2`}>
        <Image
          style={tw`h-40 w-40 rounded-xl`}
          source={release.coverName ? { uri: imageSource + release.coverName } : require("../assets/images/playlist.png")}
        />
        <View style={tw`flex m-6`}>
          <Text
            style={tw`text-lg font-bold text-black  dark:text-white`}
          >{`Title:`}</Text>
          <Text
            style={tw`text-base font-bold text-gry  dark:text-grn`}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {release.title}
          </Text>
          <Text
            style={tw`text-lg font-bold text-black  dark:text-white`}
          >{`Artist:`}</Text>
          <Text
            style={tw`text-base font-bold text-gry  dark:text-grn`}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {release.author.username}
          </Text>
          <Text
            style={tw`text-lg font-bold text-black dark:text-white`}
          >{`Created at:`}</Text>
          <Text style={tw`text-base font-bold text-gry dark:text-grn`}>
            {isoDateToDate(release.createdAt)}
          </Text>
        </View>
      </View>
      <View style={tw`flex-1 mx-2`}>
        <Text
          style={tw`text-lg font-bold text-black dark:text-white`}
        >{`Description:`}</Text>
        <Text style={tw`font-bold text-gry dark:text-grn`}>
          {release.description}
        </Text>
        <Text
          style={tw`text-lg font-bold text-black mt-4 dark:text-white`}
        >{`Tracks:`}</Text>
        {release.tracks?.length > 0 ? (
          <FlatList
            data={release.tracks}
            renderItem={({ item }) => (
              <TrackCell track={item} navigation={navigation} />
            )}
          />
        ) : (
          <View style={tw`flex-1 justify-center items-center`}>
            <Text style={tw`text-gry dark:text-grn`}>No tracks</Text>
          </View>
        )}
      </View>
    </View>
  );
}
