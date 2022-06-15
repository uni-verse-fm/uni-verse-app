import React, { useState } from "react";
import { FlatList, TouchableHighlight } from "react-native";
import PlaylistRow from "../components/PlaylistRow";
import ReleaseRow from "../components/ReleaseRow";
import { View, Text } from "react-native";

import tw from "../tailwind";
import { RootTabScreenProps } from "../types";

enum Tab {
  Releases,
  Playlists,
}

export const playlists = [
  {
    title: "rai",
    owner: {
      username: "96abdou96",
    },
    image: "",
  },
  {
    title: "chabi",
    owner: {
      username: "96abdou96",
    },
    image: "",
  },
  {
    title: "blues",
    owner: {
      username: "96abdou96",
    },
    image: "",
  },
];

export const releases = [
  {
    title: "not time",
    author: {
      username: "96abdou96",
    },
    image: "",
  },
  {
    title: "some space",
    author: {
      username: "96abdou96",
    },
    image: "",
  },
];

export default function LibraryScreen({
  navigation,
}: RootTabScreenProps<"Library">) {
  const [tab, setTab] = useState(Tab.Playlists);

  const onClickTab = (tab: Tab) => {
    setTab(tab);
  };

  return (
    <View style={tw`flex-1 dark:bg-drk bg-white`}>
      <View style={tw`flex flex-row items-center h-10 p-1`}>
        <TouchableHighlight
          onPress={() => onClickTab(Tab.Playlists)}
          style={tw`${
            tab === Tab.Playlists ? "bg-grn" : "bg-gry bg-opacity-15"
          } grow h-7 text-center flex items-center rounded-full mr-1`}
        >
          <Text
            style={tw`${
              tab === Tab.Playlists ? "text-white" : "text-black"
            } text-lg font-bold dark:text-white dark:text-base`}
          >
            Playlists
          </Text>
        </TouchableHighlight>

        <TouchableHighlight
          onPress={() => onClickTab(Tab.Releases)}
          style={tw`${
            tab === Tab.Releases ? "bg-grn" : "bg-gry bg-opacity-15"
          } grow h-7 text-center flex items-center rounded-full ml-1`}
        >
          <Text
            style={tw`${
              tab === Tab.Releases ? "text-white" : "text-black"
            } text-lg font-bold dark:text-white dark:text-base`}
          >
            Releases
          </Text>
        </TouchableHighlight>
      </View>
      <View style={tw`flex-1`}>
        {tab === Tab.Releases ? (
          <FlatList
            data={releases}
            renderItem={({ item }) => (
              <ReleaseRow release={item} navigation={navigation} />
            )}
          />
        ) : (
          <FlatList
            data={playlists}
            renderItem={({ item }) => (
              <PlaylistRow playlist={item} navigation={navigation} />
            )}
          />
        )}
      </View>
    </View>
  );
}
