import { useNetInfo } from "@react-native-community/netinfo";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import tw from "../tailwind";
import OfflineHeader from "./OfflineHeader";
import Player from "./Player";
import RecordButton from "./RecordButton";

export default function FloatingMenu({ onPlayerClicked }) {
  const netInfo = useNetInfo();

  return (
    <>
      <RecordButton />
      <TouchableOpacity
        onPress={onPlayerClicked}
        style={tw`absolute w-full ${
          netInfo.isConnected ? "bottom-20" : "bottom-24"
        } right-0 p-1`}
      >
        <Player />
      </TouchableOpacity>
      <View style={tw`absolute w-full bottom-17 right-0 p-1`}>
        <OfflineHeader />
      </View>
    </>
  );
}
