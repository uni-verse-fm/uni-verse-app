import { FontAwesome } from "@expo/vector-icons";
import React, { useContext } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Types } from "../constants/types";
import { PlayerContext } from "../context/PlayerContext";
import tw from "../tailwind";

function PlaylistRow(props: {
  playlist: { title: string; owner: { username: string }; tracks: [] };
  navigation: { navigate: (string, unknown) => void };
}) {
  const { dispatch } = useContext(PlayerContext);

  const onClickPlaylist = (playlist: { tracks: [] }) => () => {
    dispatch({
      type: Types.PlaylistPlay,
      payload: {
        tracks: playlist.tracks || [],
        trackIndex: 0,
      },
    });
  };

  return (
    <TouchableOpacity
      key={props.playlist.title}
      onPress={() =>
        props.navigation.navigate("Playlist", {
          playlist: props.playlist,
          me: true,
        })
      }
      style={tw`flex justify-between flex-row m-1`}
    >
      <View style={tw`flex flex-row m-1`}>
        <Image
          style={tw`h-10 w-10 rounded-full m-1`}
          source={require("../assets/images/playlist.png")}
        />
        <View style={tw`flex`}>
          <Text style={tw`text-lg font-bold dark:text-white`}>
            {props.playlist?.title}
          </Text>
          <Text style={tw`text-gry font-bold dark:text-grn`}>
            {props.playlist?.owner?.username}
          </Text>
        </View>
      </View>
      <FontAwesome
        size={25}
        name="play"
        style={tw`text-grn m-2`}
        onPress={onClickPlaylist(props.playlist)}
      />
    </TouchableOpacity>
  );
}

export default PlaylistRow;
