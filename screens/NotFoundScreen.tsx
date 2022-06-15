import { TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import tw from "../tailwind";
import { RootStackScreenProps } from "../types";

export default function NotFoundScreen({
  navigation,
}: RootStackScreenProps<"NotFound">) {
  return (
    <View style={tw`flex-1 justify-center items-center p-2 dark:bg-drk bg-white`}>
      <Text style={tw`text-2xl font-bold`}>This screen doesn't exist.</Text>
      <TouchableOpacity
        onPress={() => navigation.replace("Root")}
        style={tw`px-2 mt-2`}
      >
        <Text style={tw`text-xl text-rd`}>Go to home screen!</Text>
      </TouchableOpacity>
    </View>
  );
}
