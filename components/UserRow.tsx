import { View, Image, Text, TouchableOpacity } from "react-native";
import tw from "../tailwind";

const UserRow = (props: any) => {
  return (
    <TouchableOpacity
      key={props.user.username}
      onPress={() =>
        props.navigation.navigate("User", {
          user: props.user,
        })
      }
      style={tw`flex flex-row m-1`}
    >
      <Image
        style={tw`h-10 w-10 rounded-full m-1`}
        source={require("../assets/images/profile.jpg")}
      />
      <View style={tw`flex`}>
        <Text style={tw`text-lg font-bold dark:text-white`}>{props.user.username}</Text>
        <Text style={tw`text-gry font-bold dark:text-grn`}>{props.user.email}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default UserRow;
