import { FontAwesome } from "@expo/vector-icons";
import React, { useContext } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Types } from "../constants/types";
import { imageSource } from "../context/AxiosContext";
import { PlayerContext } from "../context/PlayerContext";
import tw from "../tailwind";

export interface IReleaseRow {
  title: string;
  author: {
    username: string;
  };
  image: string;
}

function ReleaseRow(props: {
  release: {
    _id: string;
    author: { username: string };
    title: string;
    tracks: [];
    coverName: string;
  };
  navigation: { navigate: (string, unknown) => void };
}) {
  const { dispatch } = useContext(PlayerContext);

  const onClickRelease = (release: { tracks: [] }) => () => {
    dispatch({
      type: Types.ReleasePlay,
      payload: {
        tracks: release.tracks || [],
        trackIndex: 0,
      },
    });
  };

  return (
    <TouchableOpacity
      key={props.release.title}
      onPress={() =>
        props.navigation.navigate("Release", {
          release: props.release,
        })
      }
      style={tw`flex flex-row justify-between m-1`}
    >
      <View style={tw`flex flex-row m-1`}>
        <Image
          style={tw`h-10 w-10 rounded-full m-1`}
          source={
            props.release.coverName
              ? { uri: imageSource + props.release.coverName }
              : require("../assets/images/playlist.png")
          }
        />
        <View style={tw`flex`}>
          <Text style={tw`text-lg font-bold dark:text-white`}>
            {props.release.title}
          </Text>
          <Text style={tw`text-gry font-bold  dark:text-grn`}>
            {props.release.author.username}
          </Text>
        </View>
      </View>
      <FontAwesome
        size={25}
        name="play"
        style={tw`text-grn m-2`}
        onPress={onClickRelease(props.release)}
      />
    </TouchableOpacity>
  );
}

export default ReleaseRow;
