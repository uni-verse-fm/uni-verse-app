import { FontAwesome } from "@expo/vector-icons";
import { useNetInfo } from "@react-native-community/netinfo";
import React, { useState } from "react";
import {
  Alert,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
  View,
} from "react-native";
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

  const stopRecording = async () => {
    setTouched(false);
    console.log("stopping the recording ");
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setRecordSecs(0);
    console.log(result);
  };

  const initializeRecorder = async () => {
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

  const startRecording = async () => {
    setTouched(true);

    if (Platform.OS === "android") {
      try {
        const grants = await PermissionsAndroid.requestMultiple(
          [
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          ],
          // {
          //   title: "Microphone authorization needed.",
          //   message:
          //     "To allow Uni-verse to search via audio you need to enable it to use your microphone for recording.",
          //   buttonPositive: "OK",
          //   buttonNegative: "Cancel",
          // },
        );

        console.log("write external stroage", grants);

        if (
          grants["android.permission.WRITE_EXTERNAL_STORAGE"] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants["android.permission.READ_EXTERNAL_STORAGE"] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants["android.permission.RECORD_AUDIO"] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          initializeRecorder();
        } else {
          Alert.alert(
            " Cannot fingerprint",
            "Uni-verse cannot identify your audio if it does not have audio recording permission.",
          );
          console.log("Mic permission denied");
        }

        ToastAndroid.show("Listening to your microphone!", ToastAndroid.SHORT);

        return;
        setTimeout(stopRecording, 5000);
      } catch (err) {
        console.warn(err);
        return;
      }
    }
  };

  return (
    <View
      onTouchStart={(e) => startRecording()}
      style={tw`absolute ${
        netInfo.isConnected ? "bottom-34" : "bottom-38"
      } right-0  mr-1 rounded-full bg-grn w-11.5 h-11.5 border-0 ${
        touched ? " animate-ping " : ""
      }`}
    >
      <FontAwesome size={25} style={tw`ml-3.8 mt-3`} name="microphone" />
    </View>
  );
};

export default RecordButton;
