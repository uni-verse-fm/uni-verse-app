import { Text, View } from "../components/Themed";
import tw from "../tailwind";
import { RootTabScreenProps } from "../types";
import { Image, FlatList } from "react-native";
import { tracks } from "./SearchScreen";
import React from "react";
import TrackCell from "../components/TrackCell";

interface IParams {
  itemId: string;
  otherParam: any;
}

const description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`
export default function ReleaseScreen({
  route,
  navigation,
}: RootTabScreenProps<"Home">) {
  const { itemId, otherParam } = route.params as unknown as IParams;
  return (
    <View style={tw`flex`}>
      <View style={tw`flex flex-row m-2`}>
        <Image
          style={tw`h-40 w-40 rounded-xl`}
          source={require("../assets/images/playlist.png")}
        />
        <View style={tw`flex m-6`}>
            <Text style={tw`text-lg font-bold text-gry`}>{`Title: ${itemId}`}</Text>
            <Text style={tw`text-lg font-bold text-gry`}>{`Artist: ${itemId}`}</Text>
            <Text style={tw`text-lg font-bold text-gry`}>{`Created at: ${itemId}`}</Text>
        </View>
      </View>
      <View style={tw`mx-2`}>
        <Text style={tw`text-lg font-bold text-black`}>{`Description:`}</Text>
        <Text style={tw`text-md font-bold text-gry`}>{description}</Text>
        <Text style={tw`text-lg font-bold text-black mt-4`}>{`Tracks:`}</Text>
        <FlatList
            data={tracks}
            renderItem={({ item }) => <TrackCell track={item} navigation={navigation} />}
          />
      </View>
    </View>
  );
}
