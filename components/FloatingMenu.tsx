import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import tw from "../tailwind";
import OfflineHeader from "./OfflineHeader";
import Player from "./Player";

export default function FloatingMenu({ onPlayerClicked }) {
  return (
    <>
      <View
        style={tw`absolute bottom-34 right-0 w-11.5 h-11.5 mr-1 rounded-full bg-grn`}
      >
        <FontAwesome size={25} style={tw`ml-3.8 mt-3`} name="microphone" />
      </View>
      <TouchableOpacity
        onPress={onPlayerClicked}
        style={tw`absolute w-full bottom-20 right-0 p-1`}
      >
        <Player />
      </TouchableOpacity>
      <OfflineHeader />
    </>
  );
}
