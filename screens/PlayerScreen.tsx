import { FontAwesome } from "@expo/vector-icons";
import { Slider } from "@miblanchard/react-native-slider";
import React from "react";
import { View, Text, Image, Modal, TouchableOpacity } from "react-native";
import tw from "../tailwind";

interface IPlayerScrenn {
  onClosePlayer: () => void;
}

const PlayerScreen = (props: IPlayerScrenn) => {
  return (
    <Modal animationType={"slide"}>
      <View style={tw`flex-1 p-4`}>
        <TouchableOpacity style={tw`my-4`} onPress={props.onClosePlayer}>
          <FontAwesome
            name="chevron-down"
            style={tw`text-grn m-2 rounded-full`}
            size={30}
          />
        </TouchableOpacity>
        <View style={tw`flex-1 items-center justify-around text-center p-4`}>
          <View style={tw``}>
            <Image
              source={require("../assets/images/playlist.png")}
              style={tw`w-72 h-72 rounded-2xl`}
            />
            <View style={tw`flex items-center m-4`}>
              <Text style={tw`text-2xl`}>Tile</Text>
              <Text style={tw`text-xl`}>Artist</Text>
            </View>
          </View>

          <View style={tw`flex items-center text-center`}>
            <View style={tw`flex flex-row items-center h-6`}>
              <Text>00:00</Text>
              <View style={tw`grow mx-1`}>
                <Slider
                  value={3}
                  minimumValue={1}
                  maximumValue={5}
                  step={1}
                  trackClickable={true}
                />
              </View>
              <Text>00:00</Text>
            </View>
            <View style={tw`flex flex-row justify-between m-4`}>
              <View style={tw`bg-grn p-3 rounded-full w-18 h-18`}>
                <FontAwesome name="chevron-left" size={35} style={tw`m-2`} />
              </View>
              <View style={tw`bg-grn p-3 rounded-full mx-8 w-18 h-18`}>
                <FontAwesome name="pause" size={35} style={tw`m-2`} />
              </View>
              <View style={tw`bg-grn p-3 rounded-full w-18 h-18`}>
                <FontAwesome
                  name="chevron-right"
                  size={35}
                  style={tw`ml-3.5 mt-2`}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default PlayerScreen;
