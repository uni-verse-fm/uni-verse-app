import { FontAwesome } from "@expo/vector-icons";
import { Slider } from "@miblanchard/react-native-slider";
import React from "react";
import { View, Image, Text } from "react-native";
import tw from "../tailwind";
import Player from "./Player";

export default function FloatingMenu() {
  return (
    <View style={tw`absolute w-full bottom-16 right-0`}>
      <View style={tw`flex justify-between p-2 items-end`}>
        <View style={tw`w-11.5 h-11.5 mb-2 rounded-full bg-grn`}>
          <FontAwesome
            size={25}
            style={tw`ml-3.8 mt-3`}
            name="microphone"
          />
        </View>
        <Player />
      </View>
    </View>
  );
}
