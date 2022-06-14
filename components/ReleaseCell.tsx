import { FontAwesome } from "@expo/vector-icons";
import { View, Image, Text, TouchableOpacity } from "react-native";
import tw from "../tailwind";

const ReleaseCell = (props: any) => {
  return (
    <TouchableOpacity
    //   key={props.release?.title}
      onPress={() =>
        props.navigation.navigate("Release", {
          itemId: 86,
          otherParam: "anything you want here",
        })
      }
      style={tw`flex flex-row justify-between border-t border-grn  items-center`}
    >
      <View>
        <Text style={tw`text-base font-bold`}>{props.release?.title}</Text>
        <Text
          style={tw`font-bold text-gry`}
        >{`artist: ${props.release.author.username}`}</Text>
      </View>
      <View style={tw`flex flex-row  items-center`}>
        <FontAwesome name="play" style={tw`text-grn m-2`} />
      </View>
    </TouchableOpacity>
  )
};

export default ReleaseCell;
