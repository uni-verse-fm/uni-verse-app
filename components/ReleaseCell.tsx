import { FontAwesome } from "@expo/vector-icons";
import { View, Text, TouchableOpacity } from "react-native";
import { useQuery } from "react-query";
import { getReleaseById } from "../api/ReleaseAPI";
import tw from "../tailwind";

const ReleaseCell = (props: any) => {
  const getRelease = useQuery(
    "release",
    () => getReleaseById(props.release._id).then((res) => res.data),
    { enabled: Boolean(props.release._id) }
  );

  return (
    <TouchableOpacity
      key={`release-${props.release._id}`}
      onPress={() =>
        getRelease.status === "success" &&
        props.navigation.navigate("Release", {
          release: getRelease.data,
        })
      }
      style={tw`flex flex-row justify-between border-t border-grn items-center`}
    >
      <View>
        <Text style={tw`text-base font-bold dark:text-white`}>
          {props.release?.title}
        </Text>
        <Text
          style={tw`font-bold text-grn`}
        >{`artist: ${props.release.author.username}`}</Text>
      </View>
      <View style={tw`flex flex-row items-center `}>
        <FontAwesome name="play" style={tw`text-grn m-2`} />
      </View>
    </TouchableOpacity>
  );
};

export default ReleaseCell;
