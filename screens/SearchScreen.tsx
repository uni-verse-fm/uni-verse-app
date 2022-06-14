import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, TextInput, TouchableHighlight } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import PlaylistRow from "../components/PlaylistRow";
import ReleaseRow from "../components/ReleaseRow";
import { Text, View } from "../components/Themed";
import TrackRow from "../components/TrackRow";
import UserRow from "../components/UserRow";
import tw from "../tailwind";
import { RootTabScreenProps } from "../types";

enum Tab {
  Releases,
  Playlists,
  Tracks,
  Users,
}

export const playlists = [
  {
    title: "smooth",
    owner: {
      username: "Jimmy",
    },
    image: "",
  },
  {
    title: "motivation",
    owner: {
      username: "Julie",
    },
    image: "",
  },
  {
    title: "workout",
    owner: {
      username: "Joel",
    },
    image: "",
  },
  {
    title: "trap",
    owner: {
      username: "James",
    },
    image: "",
  },
  {
    title: "rock",
    owner: {
      username: "Devin",
    },
    image: "",
  },
];

export const releases = [
  {
    title: "bro",
    author: {
      username: "Devin",
    },
    image: "",
  },
  {
    title: "god is good",
    author: {
      username: "James",
    },
    image: "",
  },
  {
    title: "just as hell",
    author: {
      username: "Joel",
    },
    image: "",
  },
  {
    title: "dark",
    author: {
      username: "Jimmy",
    },
    image: "",
  },
  {
    title: "nahnah",
    author: {
      username: "Julie",
    },
    image: "",
  },
];

export const tracks = [
  {
    title: "slowly",
    author: {
      username: "Devin",
    },
    release: {
      title: "bro",
      image: "",
    },
  },
  {
    title: "123",
    author: {
      username: "Dan",
    },
    release: {
      title: "dark",
      image: "",
    },
  },
  {
    title: "nice",
    author: {
      username: "Dominic",
    },
    release: {
      title: "dark",
      image: "",
    },
  },
  {
    title: "clearly",
    author: {
      username: "Jackson",
    },
    release: {
      title: "nahnah",
      image: "",
    },
  },
  {
    title: "blur",
    author: {
      username: "James",
    },
    release: {
      title: "bro",
      image: "",
    },
  },
  {
    title: "mindly",
    author: {
      username: "Joel",
    },
    release: {
      title: "nahnah",
      image: "",
    },
  },
];

export const users = [
  {
    username: "Jimmy",
    email: "jimmy@gmail.com",
    image: "",
  },
  {
    username: "Dominic",
    email: "Dominic@gmail.com",
    image: "",
  },
  {
    username: "Jackson",
    email: "Jackson@gmail.com",
    image: "",
  },
  {
    username: "James",
    email: "James@gmail.com",
    image: "",
  },
  {
    username: "Joel",
    email: "Joel@gmail.com",
    image: "",
  },
  {
    username: "John",
    email: "John@gmail.com",
    image: "",
  },
];

export default function SearchScreen({
  navigation,
}: RootTabScreenProps<"Home">) {
  const [text, setText] = useState("");

  const [tab, setTab] = useState(Tab.Playlists);

  const onClickTab = (tab: Tab) => {
    setTab(tab);
  };

  return (
    <View style={tw``}>
      <View
        style={tw`flex flex-row w-full h-10 p-2 rounded-full border-2 border-gry mx-1`}
      >
        <FontAwesome
          name="search"
          style={tw`mx-1 my-auto text-grn`}
          size={14}
        />
        <TextInput
          style={tw``}
          placeholder="Search..."
          onChangeText={(newText) => setText(newText)}
          defaultValue={text}
        />
      </View>

      <View style={tw`flex flex-row items-center justify-evenly h-10 p-1`}>
        <TouchableHighlight
          onPress={() => onClickTab(Tab.Playlists)}
          style={tw`${
            tab === Tab.Playlists ? "bg-grn" : "bg-gry bg-opacity-15"
          } h-7 text-center flex items-center rounded-full flex-auto`}
        >
          <Text
            style={tw`${
              tab === Tab.Playlists ? "text-white" : "text-black"
            } text-lg font-bold`}
          >
            Playlists
          </Text>
        </TouchableHighlight>

        <TouchableHighlight
          onPress={() => onClickTab(Tab.Tracks)}
          style={tw`${
            tab === Tab.Tracks ? "bg-grn" : "bg-gry bg-opacity-15"
          }  h-7 text-center flex items-center rounded-full ml-1 flex-auto`}
        >
          <Text
            style={tw`${
              tab === Tab.Tracks ? "text-white" : "text-black"
            } text-lg font-bold`}
          >
            Tracks
          </Text>
        </TouchableHighlight>

        <TouchableHighlight
          onPress={() => onClickTab(Tab.Releases)}
          style={tw`${
            tab === Tab.Releases ? "bg-grn" : "bg-gry bg-opacity-15"
          } h-7 text-center flex items-center rounded-full ml-1 flex-auto`}
        >
          <Text
            style={tw`${
              tab === Tab.Releases ? "text-white" : "text-black"
            } text-lg font-bold`}
          >
            Releases
          </Text>
        </TouchableHighlight>

        <TouchableHighlight
          onPress={() => onClickTab(Tab.Users)}
          style={tw`${
            tab === Tab.Users ? "bg-grn" : "bg-gry bg-opacity-15"
          } w-1/4 h-7 text-center flex items-center rounded-full ml-1`}
        >
          <Text
            style={tw`${
              tab === Tab.Users ? "text-white" : "text-black"
            } text-lg font-bold`}
          >
            Users
          </Text>
        </TouchableHighlight>
      </View>
      <View style={tw`flex`}>
        {tab === Tab.Playlists ? (
          <FlatList
            data={playlists}
            renderItem={({ item }) => <PlaylistRow playlist={item} navigation={navigation}/>}
          />
        ) : tab === Tab.Tracks ? (
          <FlatList
            data={tracks}
            renderItem={({ item }) => <TrackRow track={item} navigation={navigation}/>}

          />
        ) : tab === Tab.Releases ? (
          <FlatList
            data={releases}
            renderItem={({ item }) => <ReleaseRow release={item} navigation={navigation}/>}
          />
        ) : (
          <FlatList
            data={users}
            renderItem={({ item }) => <UserRow user={item} navigation={navigation}/>}
          />
        )}
      </View>
    </View>
  );
}
