import { FontAwesome } from "@expo/vector-icons";
import { Slider } from "@miblanchard/react-native-slider";
import React from "react";
import { View, Image, Text } from "react-native";
import Colors from "../constants/Colors";
import tw from "../tailwind";

export default function FloatingMenu() {
  return (
    <View style={tw`absolute w-full bottom-16 right-0`}>
      <View style={tw`flex justify-between p-2 items-end`}>
        <View style={tw`w-11.5 h-11.5 mb-2 rounded-full bg-grn justify-self-end`}>
          <FontAwesome
            size={15}
            style={tw`ml-4 mt-4`}
            name="search"
            color={Colors.light.constantText}
          />
        </View>
        <View style={tw`flex flex-row w-full h-11.5 rounded-full bg-grn`}>
          <Image
            style={tw`h-9.5 w-9.5 rounded-full m-1`}
            source={require("../assets/images/playlist.png")}
          />
          <View style={tw`grow flex`}>
            <Text style={tw`font-bold`}>Bro, melo feat coco</Text>
            <View style={tw`flex flex-row items-center h-6`}>
            <Text style={tw`text-xs text-gry font-bold`}>00:00</Text>
              <View style={tw`grow mx-1`}>
                <Slider
                  value={3}
                  minimumValue={1}
                  maximumValue={5}
                  step={1}
                  trackClickable={true}
                />
              </View>
              <Text style={tw`text-xs text-gry font-bold`}>00:00</Text>
            </View>
          </View>
          <View style={tw`flex flex-row mr-1`}>
            <FontAwesome
              size={15}
              style={tw`ml-3 mt-4`}
              name="chevron-left"
              color={Colors.light.constantText}
            />
            <FontAwesome
              size={15}
              style={tw`mx-6 mt-4`}
              name="pause"
              color={Colors.light.constantText}
            />
            <FontAwesome
              size={15}
              style={tw`mt-4 mr-2`}
              name="chevron-right"
              color={Colors.light.constantText}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
