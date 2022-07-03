import { FontAwesome } from "@expo/vector-icons";
import { useNetInfo } from "@react-native-community/netinfo";
import React, { useState } from "react";
import { View } from "react-native";
import AudioRecorderPlayer, {
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
} from "react-native-audio-recorder-player";
import tw from "../tailwind";

const RecordButton = () => {
  const [touched, setTouched] = useState(false);
  const [recordSecs, setRecordSecs] = useState(0);
  const [recordTime, setRecordTime] = useState("00:00:00");

  const netInfo = useNetInfo();

  const audioRecorderPlayer = new AudioRecorderPlayer();
  //   audioRecorderPlayer.setSubscriptionDuration(0.09); // optional. Default is 0.1

  const startRecording = async () => {
    setTouched(true);
    console.log("starting to record ");

    const path = "recording.m4a";
    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };
    console.log("audioSet", audioSet);
    const uri = await audioRecorderPlayer.startRecorder(path, audioSet);
    audioRecorderPlayer.addRecordBackListener((e) => {
      setRecordSecs(e.currentPosition);
      setRecordTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
    });
    console.log(`uri: ${uri}`);
  };

  const stopRecording = () => {
    setTouched(false);
    console.log("stopping to record ");
  };

  return (
    <View
      onTouchStart={(e) => startRecording()}
      onTouchEnd={(e) => stopRecording()}
      style={tw`absolute ${
        netInfo.isConnected ? "bottom-34" : "bottom-38"
      } right-0  mr-1 rounded-full bg-grn w-11.5 h-11.5 ${
        touched ? " border-2 border-white " : "border-0"
      }`}
    >
      <FontAwesome size={25} style={tw`ml-3.8 mt-3`} name="microphone" />
    </View>
  );
};

export default RecordButton;
