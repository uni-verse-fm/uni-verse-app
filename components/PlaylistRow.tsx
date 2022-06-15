import { View, Image, Text, TouchableOpacity } from "react-native";
import tw from "../tailwind";

const PlaylistRow = (props: any) => {
  return (
    <TouchableOpacity
      key={props.playlist.title}
      onPress={() =>
        props.navigation.navigate("Playlist", {
          playlist: props.playlist,
        })
      }
      style={tw`flex flex-row m-1`}
    >
      <Image
        style={tw`h-10 w-10 rounded-full m-1`}
        source={require("../assets/images/playlist.png")}
      />
      <View style={tw`flex`}>
        <Text style={tw`text-lg font-bold dark:text-white`}>{props.playlist.title}</Text>
        <Text style={tw`text-gry font-bold dark:text-grn`}>
          {props.playlist.owner.username}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PlaylistRow;
