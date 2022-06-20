import { FontAwesome } from "@expo/vector-icons";
import { useNetInfo } from "@react-native-community/netinfo";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import tw from "../tailwind";
import OfflineHeader from "./OfflineHeader";
import Player from "./Player";

export default function FloatingMenu({ onPlayerClicked }) {
    const netInfo = useNetInfo();

  return (
    <>
      <View
        style={tw`absolute ${netInfo.isConnected ? 'bottom-34' : 'bottom-38'} right-0 w-11.5 h-11.5 mr-1 rounded-full bg-grn`}
      >
        <FontAwesome size={25} style={tw`ml-3.8 mt-3`} name="microphone" />
      </View>
      <TouchableOpacity
        onPress={onPlayerClicked}
        style={tw`absolute w-full ${netInfo.isConnected ? 'bottom-20' : 'bottom-24'} right-0 p-1`}
      >
        <Player />
      </TouchableOpacity>
      <View style={tw`absolute w-full bottom-17 right-0 p-1`}>
        <OfflineHeader />
      </View>
    </>
  );
}
