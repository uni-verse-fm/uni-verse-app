import React, { useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import PlaylistRow from "../components/PlaylistRow";
import ReleaseRow from "../components/ReleaseRow";
import { View, Text } from "react-native";

import tw from "../tailwind";
import { RootTabScreenProps } from "../types";
import { useQuery } from "react-query";
import { me } from "../api/AuthAPI";
import { getUserReleases } from "../api/ReleaseAPI";
import { getUserPlaylists } from "../api/PlaylistAPI";
import AddPlaylistForm from "../components/AddPlaylistForm";

enum Tab {
  Releases,
  Playlists,
}

export default function LibraryScreen({
  navigation,
}: RootTabScreenProps<"Library">) {
  const [tab, setTab] = useState(Tab.Playlists);
  const [addOpen, setAddOpen] = useState(false);

  const toggleAddOpen = () => setAddOpen(!addOpen);

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

  const playlistQuery = useQuery(
    "myPlaylists",
    () => getUserPlaylists(meQuery.data.id as string),
    { enabled: meQuery.status === "success" }
  );

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
        {tab === Tab.Releases && releaseQuery.status === "success" ? (
          <FlatList
            data={releaseQuery.data}
            renderItem={({ item }) => (
              <ReleaseRow release={item} navigation={navigation} />
            )}
          />
        ) : tab === Tab.Playlists && playlistQuery.status === "success" ? (
          <View style={tw`flex-1`}>
            {addOpen ? (
              <AddPlaylistForm cancel={toggleAddOpen} />
            ) : (
              <TouchableOpacity style={tw`bg-grn m-1 rounded-lg`} onPress={toggleAddOpen}>
                <Text style={tw`text-base text-drk font-bold text-center`}>
                  Add playlist
                </Text>
              </TouchableOpacity>
            )}
            <FlatList
              data={playlistQuery.data}
              renderItem={({ item }) => (
                <PlaylistRow playlist={item} navigation={navigation} />
              )}
            />
          </View>
        ) : (
          <View style={tw`flex-1 justify-center items-center`}>
            <Text style={tw`text-gry dark:text-grn text-lg`}>No results</Text>
          </View>
        )}
      </View>
    </View>
  );
}
