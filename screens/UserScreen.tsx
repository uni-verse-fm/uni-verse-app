import { Text, View } from "../components/Themed";
import tw from "../tailwind";
import { RootTabScreenProps } from "../types";
import { Image, FlatList } from "react-native";
import React from "react";
import ReleaseCell from "../components/ReleaseCell";
import { releases } from "./SearchScreen";

interface IParams {
  itemId: string;
  otherParam: any;
}

const description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`;
export default function UserScreen({
  route,
  navigation,
}: RootTabScreenProps<"Home">) {
  const { itemId, otherParam } = route.params as unknown as IParams;
  return (
    <View style={tw`flex`}>
      <View style={tw`flex flex-row m-2`}>
        <Image
          style={tw`h-40 w-40 rounded-full`}
          source={require("../assets/images/playlist.png")}
        />
        <View style={tw`flex mx-6 my-10`}>
          <Text
            style={tw`text-lg font-bold text-gry`}
          >{`Usename: ${itemId}`}</Text>
          <Text
            style={tw`text-lg font-bold text-gry`}
          >{`Email: ${itemId}`}</Text>
        </View>
      </View>
      <View style={tw`mx-2`}>
        <Text style={tw`text-lg font-bold text-black mt-4`}>{`Releases:`}</Text>
        <FlatList
          data={releases}
          renderItem={({ item }) => (
            <ReleaseCell release={item} navigation={navigation} />
          )}
        />
      </View>
    </View>
  );
}
