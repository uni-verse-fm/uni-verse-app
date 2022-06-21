import { useNetInfo } from "@react-native-community/netinfo";
import React from "react";
import { View, Text } from "react-native";
import tw from "../tailwind";

function OfflineHeader() {
  const netInfo = useNetInfo();

  return netInfo.isConnected ? (
    <></>
  ) : (
    <View style={tw`bg-rd w-full rounded-full my-1`}>
      <Text style={tw`text-white font-bold text-center`}>
        No internet connection
      </Text>
    </View>
  );
}

export default OfflineHeader;
