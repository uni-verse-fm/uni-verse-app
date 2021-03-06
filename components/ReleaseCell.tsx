import React from "react";

import { FontAwesome } from "@expo/vector-icons";
import { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useQuery } from "react-query";
import { getReleaseById } from "../api/ReleaseAPI";
import { Types } from "../constants/types";
import { PlayerContext } from "../context/PlayerContext";
import tw from "../tailwind";

function ReleaseCell(props: {
  release: {
    _id: string;
    author: { username: string };
    title: string;
    tracks: [];
  };
  navigation: { navigate: (string, unknown) => void };
}) {
  const { dispatch } = useContext(PlayerContext);

  const getRelease = useQuery(
    "release",
    () => getReleaseById(props.release._id).then((res) => res.data),
    { enabled: Boolean(props.release._id) },
  );

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
      key={`release-${props.release._id}`}
      onPress={() =>
        getRelease.status === "success" &&
        props.navigation.navigate("Release", {
          release: getRelease.data,
        })
      }
      style={tw`flex flex-row justify-between border-t border-grn border-opacity-20 items-center`}
    >
      <View>
        <Text style={tw`text-base font-bold dark:text-white`}>
          {props.release?.title}
        </Text>
        <Text style={tw`font-bold text-grn`}>
          {`artist: ${props.release.author.username}`}
        </Text>
      </View>
      <View style={tw`flex flex-row items-center `}>
        <FontAwesome
          size={25}
          name="play"
          style={tw`text-grn m-2`}
          onPress={onClickRelease(props.release)}
        />
      </View>
    </TouchableOpacity>
  );
}

export default ReleaseCell;
