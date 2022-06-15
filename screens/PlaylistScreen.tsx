import { View, Text } from "react-native";
import tw from "../tailwind";
import { RootStackScreenProps } from "../types";
import { Image, FlatList } from "react-native";
import React from "react";
import TrackCell from "../components/TrackCell";
import { isoDateToDate } from "../utils/dateUtils";

interface IParams {
  playlist: any;
}

const description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`;
export default function PlaylistScreen({
  route,
  navigation,
}: RootStackScreenProps<"Playlist">) {
  const { playlist } = route.params as unknown as IParams;
  return (
    <View style={tw`flex-1 dark:bg-drk bg-white`}>
      <View style={tw`flex flex-row m-2`}>
        <Image
          style={tw`h-40 w-40 rounded-xl`}
          source={require("../assets/images/playlist.png")}
        />
        <View style={tw`flex m-6`}>
          <Text
            style={tw`text-lg font-bold text-black dark:text-white`}
          >{`Title:`}</Text>
          <Text
            style={tw`text-base font-bold text-white dark:text-grn`}
          >{playlist.title}</Text>
          <Text
            style={tw`text-lg font-bold text-black dark:text-white`}
          >{`Owner:`}</Text>
          <Text
            style={tw`text-base font-bold text-gry dark:text-grn`}
          >{playlist.owner.username}</Text>
          <Text
            style={tw`text-lg font-bold text-black dark:text-white`}
          >{`Created at:`}</Text>
          <Text
            style={tw`text-base font-bold text-gry dark:text-grn`}
          >{isoDateToDate(playlist.createdAt)}</Text>
        </View>
      </View>
      <View style={tw`flex-1 mx-2`}>
        <Text
          style={tw`text-lg font-bold text-black dark:text-white mt-4`}
        >{`Tracks:`}</Text>
        <FlatList
          data={playlist.tracks}
          renderItem={({ item }) => (
            <TrackCell track={item} navigation={navigation} />
          )}
        />
      </View>
    </View>
  );
}
