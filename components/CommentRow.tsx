import React from "react";
import { View, Text, Image } from "react-native";
import tw from "../tailwind";
import { isoDateToDate } from "../utils/dateTimeUtils";

const CommentRow = ({ comment }) => {
  return (
    <View
      style={tw`flex flex-row m-1 border-2 rounded-2xl ${
        comment.isPositive ? "border-grn" : "border-rd"
      }`}
    >
      <View style={tw`flex justify-between items-center p-2`}>
        <Image
          style={tw`h-10 w-10 rounded-full mt-4`}
          source={require("../assets/images/profile.jpg")}
        />
        <Text style={tw`text-xs font-bold text-gry dark:text-gry`}>
          {isoDateToDate(comment.createdAt)}
        </Text>
      </View>

      <View style={tw`flex m-1 w-7/10`}>
        <Text style={tw`text-base font-bold dark:text-grn`}>
          {comment.owner?.username}
        </Text>
        <Text style={tw`text-lg text-black font-bold dark:text-white`}>
          {comment.content}
        </Text>
      </View>
    </View>
  );
};
export default CommentRow;
