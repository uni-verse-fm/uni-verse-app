import { FontAwesome } from "@expo/vector-icons";
import { View, Text } from "react-native";
import tw from "../tailwind";

const TrackCell = (props: any) => {
  return (
    <View style={tw`flex flex-row justify-between border-t border-grn  items-center`}>
      <View>
        <Text style={tw`text-base font-bold dark:text-white`}>{props.track.title}</Text>
        <Text
          style={tw`font-bold text-gry dark:text-grn`}
        >{`artist: ${props.track.author?.username}`}</Text>
      </View>
      <View style={tw`flex flex-row items-center dark:text-white`}>
        <FontAwesome name="play" style={tw`text-grn m-2`} />
      </View>
    </View>
  );
};

export default TrackCell;
