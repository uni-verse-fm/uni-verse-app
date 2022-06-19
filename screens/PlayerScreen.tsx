import { FontAwesome } from "@expo/vector-icons";
import { Slider } from "@miblanchard/react-native-slider";
import React, { useContext } from "react";
import { View, Text, Image, Modal, TouchableOpacity } from "react-native";
import { PlayerContext } from "../context/PlayerContext";
import tw from "../tailwind";
import { secondsToHMS } from "../utils/dateTimeUtils";

interface IPlayerScrenn {
  onClosePlayer: () => void;
  visible: boolean;
}

const PlayerScreen = (props: IPlayerScrenn) => {
  const { state } = useContext(PlayerContext);

  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={props.visible}
      onRequestClose={() => {
        props.onClosePlayer();
      }}
    >
      <View style={tw`flex-1 p-4 bg-white dark:bg-drk`}>
        <TouchableOpacity style={tw`my-4`} onPress={props.onClosePlayer}>
          <FontAwesome
            name="chevron-down"
            style={tw`text-grn m-2 rounded-full`}
            size={30}
          />
        </TouchableOpacity>
        <View style={tw`flex-1 items-center justify-around text-center p-4`}>
          <View style={tw``}>
            <Image
              source={require("../assets/images/playlist.png")}
              style={tw`w-72 h-72 rounded-2xl`}
            />
            <View style={tw`flex items-center m-4`}>
              <Text style={tw`text-2xl text-black dark:text-white`}>
                {state.trackInfo?.title}
              </Text>
              <Text style={tw`text-xl text-black dark:text-white`}>
                {state.trackInfo?.author}
              </Text>
            </View>
          </View>

          <View style={tw`flex items-center text-center`}>
            <View style={tw`flex flex-row items-center h-6`}>
              <Text style={tw`text-black dark:text-white`}>
                {secondsToHMS(state.playerState?.position)}
              </Text>
              <View style={tw`grow mx-1`}>
                <Slider
                  value={state.playerState?.position || 0}
                  minimumValue={0}
                  maximumValue={state.playerState?.duration || 0}
                  step={1}
                  trackClickable={true}
                  onSlidingComplete={(value) =>
                    state.onSlide((value as number[])[0] as number)
                  }
                />
              </View>
              <Text style={tw`text-black dark:text-white`}>
                {secondsToHMS(state.playerState?.duration)}
              </Text>
            </View>
            <View style={tw`flex flex-row justify-between m-4`}>
              <TouchableOpacity
                style={tw`bg-grn p-3 rounded-full w-18 h-18`}
                onPress={state.previousTrack}
              >
                <FontAwesome
                  name="chevron-left"
                  size={35}
                  style={tw`${
                    state.hasPrevious() ? "text-drk m-2" : "text-gry m-2"
                  }`}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={tw`bg-grn p-3 rounded-full mx-8 w-18 h-18`}
                onPress={state.onPlayPauseClick}
              >
                {state.playerState?.isPlaying &&
                secondsToHMS(state.playerState?.position) !==
                  secondsToHMS(state.playerState?.duration) ? (
                  <FontAwesome
                    name="pause"
                    size={35}
                    style={tw`text-drk m-2`}
                  />
                ) : (
                  <FontAwesome
                    name="play"
                    size={35}
                    style={tw`${
                      state.playerState?.duration ? "text-drk" : "text-gry"
                    } my-2 ml-3.5`}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`bg-grn p-3 rounded-full w-18 h-18`}
                onPress={state.nextTrack}
              >
                <FontAwesome
                  name="chevron-right"
                  size={35}
                  style={tw`${
                    state.hasNext()
                      ? "text-drk ml-3.5 mt-2"
                      : "text-gry ml-3.5 mt-2"
                  }`}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default PlayerScreen;
