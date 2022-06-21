import { FontAwesome } from "@expo/vector-icons";
import { Slider } from "@miblanchard/react-native-slider";
import React, { useContext } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { PlayerContext } from "../context/PlayerContext";
import tw from "../tailwind";
import { secondsToHMS } from "../utils/dateTimeUtils";

function Player() {
  const { state } = useContext(PlayerContext);

  return (
    <View
      style={tw`flex flex-row justify-between w-full h-11.5 items-center rounded-full bg-grn p-1`}
    >
      <Image
        style={tw`h-9.5 w-9.5 rounded-full`}
        source={require("../assets/images/playlist.png")}
      />
      <View style={tw`grow flex`}>
        <Text style={tw`text-sm`} ellipsizeMode="tail" numberOfLines={1}>
          {`${state.trackInfo?.title} - ${state.trackInfo?.author} .feat`}
        </Text>
        <View style={tw`flex flex-row items-center h-6`}>
          <View style={tw`grow mx-1`}>
            <Slider
              value={state.playerState?.position || 0}
              minimumValue={0}
              maximumValue={state.playerState?.duration || 0}
              step={1}
              disabled
              trackClickable={false}
            />
          </View>
        </View>
      </View>
      <View style={tw`flex flex-row`}>
        <TouchableOpacity
          style={tw`rounded-full bg-black bg-opacity-10 h-9.5 w-9.5`}
          onPress={state.previousTrack}
        >
          <FontAwesome
            size={20}
            style={tw`${
              state.hasPrevious()
                ? "m-auto text-drk mt-2.5 mr-3.5"
                : "text-gry m-auto mt-2.5 mr-3.5"
            }`}
            name="chevron-left"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`rounded-full bg-black bg-opacity-10 mx-1 h-9.5 w-9.5`}
          onPress={state.onPlayPauseClick}
        >
          {state.playerState?.isLoaded &&
          secondsToHMS(state.playerState?.position) !==
            secondsToHMS(state.playerState?.duration) ? (
            <FontAwesome
              size={20}
              name={state.playerState?.isPlaying ? "pause" : "play"}
              style={tw`text-drk ${
                state.playerState?.isPlaying ? "mt-2 mx-auto" : "mt-2 ml-3"
              }`}
            />
          ) : (
            <FontAwesome
              size={20}
              style={tw`text-gry mt-2 ml-3.5`}
              name="play"
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`rounded-full bg-black bg-opacity-10 h-9.5 w-9.5`}
          onPress={state.nextTrack}
        >
          <FontAwesome
            size={20}
            style={tw`${
              state.hasNext()
                ? "text-drk mt-2.5 ml-3.5"
                : "text-gry mt-2.5 ml-3.5"
            }`}
            name="chevron-right"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Player;
