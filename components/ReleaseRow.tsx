import { View, Image, Text, TouchableOpacity } from "react-native";
import tw from "../tailwind";

export interface IReleaseRow {
  title: string;
  author: {
    username: string;
  };
  image: string;
}

const ReleaseRow = (props: any) => {
  return (
    <TouchableOpacity
      key={props.release.title}
      onPress={() => props.navigation.navigate("Release", {
        itemId: 86,
        otherParam: 'anything you want here',
      })}
      style={tw`flex flex-row m-1`}
    >
      <Image
        style={tw`h-10 w-10 rounded-full m-1`}
        source={require("../assets/images/playlist.png")}
      />
      <View style={tw`flex`}>
        <Text style={tw`text-lg font-bold`}>{props.release.title}</Text>
        <Text style={tw`text-gry font-bold`}>
          {props.release.author.username}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ReleaseRow;