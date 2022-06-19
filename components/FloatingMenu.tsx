import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import tw from "../tailwind";
import OfflineHeader from "./OfflineHeader";
import Player from "./Player";

export default function FloatingMenu({ onPlayerClicked }) {
  return (
    <View style={tw`absolute w-full bottom-16 right-0`} pointerEvents="none">
      <View style={tw`flex justify-between p-2 items-end`} pointerEvents="none">
        <View style={tw`w-11.5 h-11.5 mb-2 rounded-full bg-grn`}>
          <FontAwesome size={25} style={tw`ml-3.8 mt-3`} name="microphone" />
        </View>
        <TouchableOpacity onPress={onPlayerClicked}>
          <Player />
        </TouchableOpacity>
        <OfflineHeader />
      </View>
    </View>
  );
}
