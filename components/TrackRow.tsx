import { View, Image, Text } from "react-native";
import tw from "../tailwind";

const TrackRow = (props: any) => {
  return (
    <View style={tw`flex flex-row m-1`}>
      <Image
        style={tw`h-10 w-10 rounded-full m-1`}
        source={require("../assets/images/playlist.png")}
      />
      <View style={tw`flex`}>
        <Text style={tw`text-lg font-bold dark:text-white`}>{props.track.title}</Text>
        <Text style={tw`text-gry font-bold dark:text-grn`}>{props.track.author.username}</Text>
        <Text style={tw`text-gry font-bold dark:text-grn`}>{`Release: ${props.track.release.title}`}</Text>
      </View>
    </View>
  );
};

export default TrackRow;
