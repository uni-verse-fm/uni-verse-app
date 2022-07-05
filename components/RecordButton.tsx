import { FontAwesome } from "@expo/vector-icons";
import { useNetInfo } from "@react-native-community/netinfo";
import React, { useContext, useState } from "react";
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
import FileSystem, { UploadResult } from "react-native-fs";
import { useMutation } from "react-query";
import { createFpSearch, getFpSearch } from "../api/FpSearchAPI";
import { AxiosError } from "axios";
import { PlayerContext } from "../context/PlayerContext";
import { Types } from "../constants/types";

enum Status {
  IDLE,
  RECORDING,
  SEARCHING,
}
const RecordButton = () => {
  const [status, setStatus] = useState<Status>(Status.IDLE);

  const nbMaxTries = 5;

  const netInfo = useNetInfo();

  const { dispatch } = useContext(PlayerContext);

  const audioRecorderPlayer = new AudioRecorderPlayer();

  const path = FileSystem.DocumentDirectoryPath + "uni-verse-recording.m4a";
  //   audioRecorderPlayer.setSubscriptionDuration(0.09); // optional. Default is 0.1

  function fetchAnswer(id: string, nbtries = 0) {
    if (nbtries < nbMaxTries) {
      getFpSearch(id)
        .then((res) => {
          if (res.data.foundTrack) {
            setStatus(Status.IDLE);
            dispatch({
              type: Types.TrackPlay,
              payload: {
                track: res.data.foundTrack,
              },
            });
          } else {
            setTimeout(() => fetchAnswer(id, nbtries + 1), 3000);
          }
        })
        .catch((err) => {
          setStatus(Status.IDLE);
          console.warn(err.message);
          Alert.alert("An error occured ! Please try later.");
        });
    } else {
      setStatus(Status.IDLE);
      Alert.alert("Searched track was not found !");
    }
  }

  const { mutate } = useMutation(`fp-search-query`, createFpSearch, {
    onError: (err: AxiosError) => {
      console.warn(JSON.stringify(err));
      console.warn(err.message);
      Alert.alert("Can't post extract to analyze.");
    },
    onSuccess: (query: { jobId: number; promise: Promise<UploadResult> }) => {
      query.promise.then((res) => {
        fetchAnswer(JSON.parse(res.body).id);
      });
      Alert.alert("extract posted, awaiting results...");
    },
  });

  function fpSearch() {
    mutate(path);
  }

  const stopRecording = async () => {
    setStatus(Status.SEARCHING);
    console.log("stopping the recording ");
    audioRecorderPlayer
      .stopRecorder()
      .then((result) => {
        if (result) {
          audioRecorderPlayer.removeRecordBackListener();
          fpSearch();
        } else {
          Alert.alert(
            " Cannot stop recording",
            "An error occured and recording failed to stop.",
          );
          console.warn("Could not start recording");
        }
      })
      .catch((err) => {
        console.warn(err);
        Alert.alert(
          " Cannot stop recording",
          "An error occured and recording failed to stop.",
        );
      });
  };

  const initializeRecorder = async () => {
    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };

    console.log("audioSet", audioSet);

    audioRecorderPlayer.startRecorder(path, audioSet).then((uri) => {
      if (!uri) {
        Alert.alert(" Cannot record", "An error occured and recording failed.");
        console.warn("Could not start recording");
      }
    });
  };

  const startRecording = async () => {
    setStatus(Status.RECORDING);

    if (Platform.OS === "android") {
      try {
        PermissionsAndroid.requestMultiple(
          [
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          ],
          // {
          //   title: "Microphone authorization needed.",
          //   message:Error: recording.m4a: open faError: recording.m4a: open failed: EROFS (Read-only file system)iled: EROFS (Read-only file system)
          //     "To allow Uni-verse to search via audio you need to enable it to use your microphone for recording.",
          //   buttonPositive: "OK",
          //   buttonNegative: "Cancel",
          // },
        ).then((permissions) => {
          if (
            permissions["android.permission.WRITE_EXTERNAL_STORAGE"] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            permissions["android.permission.READ_EXTERNAL_STORAGE"] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            permissions["android.permission.RECORD_AUDIO"] ===
              PermissionsAndroid.RESULTS.GRANTED
          ) {
            initializeRecorder();
            ToastAndroid.show(
              "Listening to your microphone!",
              ToastAndroid.SHORT,
            );

            setTimeout(stopRecording, 10000);
          } else {
            Alert.alert(
              " Cannot fingerprint",
              "Uni-verse cannot identify your audio if it does not have audio recording permission.",
            );
            console.warn("Mic permission denied");
          }
        });
      } catch (err) {
        console.warn(err);
        Alert.alert(" Cannot record", "Recording failed to start.");
        return;
      }
    }
  };

  const icon = () => {
    switch (status) {
      case Status.IDLE:
        return (
          <FontAwesome size={25} style={tw`ml-3.8 mt-3`} name="microphone" />
        );
      case Status.RECORDING:
        return (
          <FontAwesome size={25} style={tw`ml-3.8 mt-3`} name="ellipsis-h" />
        );
      case Status.SEARCHING:
        return (
          <FontAwesome size={25} style={tw`ml-3.8 mt-3`} name="cloud-upload" />
        );
    }
  };

  return (
    <View
      onTouchStart={() => startRecording()}
      style={tw`absolute ${
        netInfo.isConnected ? "bottom-34" : "bottom-38"
      } right-0  mr-1 rounded-full bg-grn w-11.5 h-11.5 border-0 `}
    >
      {icon()}
    </View>
  );
};

export default RecordButton;
