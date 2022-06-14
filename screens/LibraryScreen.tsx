import React, { useState } from "react";
import { FlatList, TouchableHighlight } from "react-native";
import PlaylistRow from "../components/PlaylistRow";
import ReleaseRow from "../components/ReleaseRow";
import { Text, View } from "../components/Themed";
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

export default function LibraryScreen({ navigation }: RootTabScreenProps<'Home'>) {
  const [tab, setTab] = useState(Tab.Playlists);

  const onClickTab = (tab: Tab) => {
    setTab(tab);
  };

  return (
    <View>
      <View style={tw`flex flex-row items-center h-10 p-1`}>
        <TouchableHighlight
          onPress={() => onClickTab(Tab.Playlists)}
          style={tw`${
            tab === Tab.Playlists ? "bg-grn" : "bg-gry bg-opacity-15"
          } w-1/2 h-7 text-center flex items-center rounded-full mr-1`}
        >
          <Text
            style={tw`${
              tab === Tab.Playlists ? "text-white" : "text-black"
            } text-lg font-bold`}
          >
            Playlists
          </Text>
        </TouchableHighlight>

        {/* <View style={tw`border-2 border-grn rounded-full h-5`} /> */}
        <TouchableHighlight
          onPress={() => onClickTab(Tab.Releases)}
          style={tw`${
            tab === Tab.Releases ? "bg-grn" : "bg-gry bg-opacity-15"
          } w-1/2 h-7 text-center flex items-center rounded-full ml-1`}
        >
          <Text
            style={tw`${
              tab === Tab.Releases ? "text-white" : "text-black"
            } text-lg font-bold`}
          >
            Releases
          </Text>
        </TouchableHighlight>
      </View>
      <View style={tw`flex`}>
        {tab === Tab.Releases ? (
          <FlatList
            data={releases}
            renderItem={({ item }) => <ReleaseRow release={item} navigation={navigation}/>}
          />
        ) : (
          <FlatList
            data={playlists}
            renderItem={({ item }) => <PlaylistRow playlist={item} navigation={navigation} />}
          />
        )}
      </View>
    </View>
  );
}
