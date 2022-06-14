import { FontAwesome } from "@expo/vector-icons";
import { View, Image, Text, TouchableOpacity } from "react-native";
import tw from "../tailwind";

const TrackCell = (props: any) => {
  return (
    <View style={tw`flex flex-row justify-between border-t border-grn  items-center`}>
      <View>
        <Text style={tw`text-base font-bold`}>{props.track.title}</Text>
        <Text
          style={tw`font-bold text-gry`}
        >{`artist: ${props.track.author.username}`}</Text>
      </View>
      <View style={tw`flex flex-row  items-center`}>
        <Text style={tw`text-base font-bold m-2`}>05:23</Text>
        <FontAwesome name="play" style={tw`text-grn m-2`} />
      </View>
    </View>
  );
};

export default TrackCell;
