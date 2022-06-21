import { FontAwesome } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import {
  FlatList,
  TextInput,
  TouchableHighlight,
  View,
  Text,
} from "react-native";

import { useQuery } from "react-query";
import PlaylistRow from "../components/PlaylistRow";
import ReleaseRow from "../components/ReleaseRow";
import TrackRow from "../components/TrackRow";
import UserRow from "../components/UserRow";
import tw from "../tailwind";
import { RootTabScreenProps } from "../types";
import { searchTrack } from "../api/TrackAPI";
import { searchRelease } from "../api/ReleaseAPI";
import { searchPlaylist } from "../api/PlaylistAPI";
import { searchUsers } from "../api/UserAPI";
import { AuthContext } from "../context/AuthContext";

enum Tab {
  Releases,
  Playlists,
  Tracks,
  Users,
}

export default function SearchScreen({
  navigation,
}: RootTabScreenProps<"Home">) {
  const [query, setQuery] = useState("");
  const { authState } = useContext(AuthContext);

  const [tab, setTab] = useState(Tab.Playlists);

  const onClickTab = (clickedTab: Tab) => {
    setTab(clickedTab);
  };

  const taskQuery = useQuery(
    ["searchTrack", query],
    ({ signal }) => searchTrack(query, { signal }),
    {
      enabled: Boolean(query),
    },
  );

  const releaseQuery = useQuery(
    ["searchReleases", query],
    ({ signal }) => searchRelease(query, { signal }),
    {
      enabled: Boolean(query),
    },
  );

  const playlistQuery = useQuery(
    ["searchPlaylists", query],
    ({ signal }) => searchPlaylist(query, { signal }),
    {
      enabled: Boolean(query),
    },
  );

  const userQuery = useQuery(
    ["searchUsers", query],
    ({ signal }) => searchUsers(query, { signal }),
    {
      enabled: Boolean(query),
    },
  );

  return (
    <View style={tw`flex-1 dark:bg-drk bg-white`}>
      <View
        style={tw`flex flex-row h-10 p-2 rounded-full border-2 border-gry mx-1 mt-1`}
      >
        <FontAwesome
          name="search"
          style={tw`mx-1 my-auto text-grn`}
          size={14}
        />
        <TextInput
          style={tw`grow dark:text-white`}
          placeholder="Search..."
          onChangeText={(newText) => setQuery(newText)}
          defaultValue={query}
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
            } text-lg font-bold dark:text-white dark:text-base`}
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
            } text-lg font-bold dark:text-white dark:text-base`}
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
            } text-lg font-bold dark:text-white dark:text-base`}
          >
            Releases
          </Text>
        </TouchableHighlight>

        {authState?.authenticated && (
          <TouchableHighlight
            onPress={() => onClickTab(Tab.Users)}
            style={tw`${
              tab === Tab.Users ? "bg-grn" : "bg-gry bg-opacity-15"
            } w-1/4 h-7 text-center flex items-center rounded-full ml-1`}
          >
            <Text
              style={tw`${
                tab === Tab.Users ? "text-white" : "text-black"
              } text-lg font-bold dark:text-white dark:text-base`}
            >
              Users
            </Text>
          </TouchableHighlight>
        )}
      </View>
      <View style={tw`flex-1`}>
        {tab === Tab.Playlists && playlistQuery.status === "success" ? (
          <FlatList
            data={playlistQuery.data}
            renderItem={({ item }) => (
              <PlaylistRow playlist={item} navigation={navigation} />
            )}
          />
        ) : tab === Tab.Tracks && taskQuery.status === "success" ? (
          <FlatList
            data={taskQuery.data}
            renderItem={({ item }) => (
              <TrackRow track={item} navigation={navigation} />
            )}
          />
        ) : tab === Tab.Releases && releaseQuery.status === "success" ? (
          <FlatList
            data={releaseQuery.data}
            renderItem={({ item }) => (
              <ReleaseRow release={item} navigation={navigation} />
            )}
          />
        ) : tab === Tab.Users &&
          userQuery.status === "success" &&
          authState?.authenticated ? (
          <FlatList
            data={userQuery.data}
            renderItem={({ item }) => (
              <UserRow user={item} navigation={navigation} />
            )}
          />
        ) : (
          <View style={tw`flex-1 justify-center items-center`}>
            <Text style={tw`text-gry dark:text-grn text-lg`}>No results</Text>
          </View>
        )}
      </View>
    </View>
  );
}
