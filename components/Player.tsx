import { FontAwesome } from "@expo/vector-icons";
import { Slider } from "@miblanchard/react-native-slider";
import React, { useContext, useEffect, useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { trackSource } from "../context/AxiosContext";
import { PlayerContext } from "../context/PlayerContext";
import tw from "../tailwind";
import { Audio } from "expo-av";

const Player = () => {
  const { state } = useContext(PlayerContext);
  const [sound, setSound] = useState<Audio.Sound>();

  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(
    state.player.trackIndex || 0
  );

  const [playing, setPlaying] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [tracks, setTracks] = useState(state.player.tracks);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const onTracksChange = async (newTracks: any) => {
    setTracks(newTracks);
    const newUrl =
      trackSource + newTracks[state.player.trackIndex || 0].fileName;

    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });

    const sound = new Audio.Sound();

    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded) {
        setTime(status.positionMillis);
        setDuration(status.durationMillis || 0);
      }
    });
    await sound.loadAsync({ uri: newUrl });

    setSound(sound);
    await sound?.playAsync();
    setPlaying(true);
  };

  useEffect(() => {
    state.player.tracks?.length && onTracksChange(state.player.tracks);
  }, [state.player.tracks]);

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const onPlayPauseClick = async () => {
    if (sound) {
      playing ? await sound?.pauseAsync() : await sound?.playAsync();
      setPlaying(!playing);
    } else setPlaying(false);
  };

  const next = async () => {
    if (currentTrackIndex + 1 < tracks.length && sound) {
      const newUrl = trackSource + tracks[currentTrackIndex + 1].fileName;
      setCurrentTrackIndex(currentTrackIndex + 1);
      await sound?.loadAsync({ uri: newUrl });
      playing && (await sound?.playAsync());
    }
  };

  const previous = async () => {
    if (currentTrackIndex - 1 >= 0 && sound) {
      const newUrl = trackSource + tracks[currentTrackIndex - 1].fileName;
      setCurrentTrackIndex(currentTrackIndex - 1);
      await sound?.loadAsync({ uri: newUrl });
      playing && (await sound?.playAsync());
    }
  };

  return (
    <View
      style={tw`flex flex-row justify-between w-full h-11.5 items-center rounded-full bg-grn p-1`}
    >
      <Image
        style={tw`h-9.5 w-9.5 rounded-full`}
        source={require("../assets/images/playlist.png")}
      />
      <View style={tw`grow flex w-1/2`}>
        <Text
          style={tw`text-sm`}
          ellipsizeMode="tail"
          numberOfLines={1}
        >{`${tracks[currentTrackIndex]?.title} - ${tracks[currentTrackIndex]?.author.username} .feat`}</Text>
        <View style={tw`flex flex-row items-center h-6`}>
          <View style={tw`grow mx-1`}>
            <Slider
              value={time}
              minimumValue={0}
              maximumValue={duration}
              step={1}
              trackClickable={false}
            />
          </View>
        </View>
      </View>
      <View style={tw`flex flex-row`}>
        <TouchableOpacity
          style={tw`rounded-full bg-black bg-opacity-10 h-9.5 w-9.5`}
          onPress={previous}
        >
          {currentTrackIndex > 0 ? (
            <FontAwesome
              size={20}
              name="chevron-left"
              style={tw`m-auto text-drk mt-2.5 mr-3.5`}
            />
          ) : (
            <FontAwesome
              size={20}
              style={tw`text-gry m-auto mt-2.5 mr-3.5`}
              name="chevron-left"
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`rounded-full bg-black bg-opacity-10 mx-2 h-9.5 w-9.5`}
          onPress={onPlayPauseClick}
        >
          {tracks.length !== 0 ? (
            <FontAwesome
              size={20}
              name={playing ? "pause" : "play"}
              style={tw`text-drk ${playing ? "mt-2 mx-auto" : "mt-2 ml-3"}`}
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
          onPress={next}
        >
          {tracks.length > 1 ? (
            <FontAwesome
              size={20}
              style={tw`text-drk mt-2.5 ml-3.5`}
              name="chevron-right"
            />
          ) : (
            <FontAwesome
              size={20}
              style={tw`text-gry mt-2.5 ml-3.5`}
              name="chevron-right"
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Player;
