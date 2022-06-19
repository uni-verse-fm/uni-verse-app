import { View, Text, Alert, Button, ScrollView } from "react-native";
import tw from "../tailwind";
import { RootStackScreenProps } from "../types";
import { Image, FlatList } from "react-native";
import React, { useContext, useState } from "react";
import ReleaseCell from "../components/ReleaseCell";
import { me } from "../api/AuthAPI";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getUserReleases } from "../api/ReleaseAPI";
import { getUserPlaylists } from "../api/PlaylistAPI";
import ConfirmAlert from "../components/ConfirmDialog";
import { deleteUser } from "../api/UserAPI";
import { AuthContext } from "../context/AuthContext";

export default function MyProfileScreen({
  navigation,
}: RootStackScreenProps<"MyProfile">) {
  const [modalVisible, setModalVisible] = useState(false);
  const queryClient = useQueryClient();
  const authContext = useContext(AuthContext);

  const meQuery = useQuery("me", () => me().then((res) => res.data), {
    onSuccess: (res) => {
      if (res.status === 401) {
        Alert.alert(JSON.stringify(res));
      }
    },
    onError: (res) => {
      Alert.alert(JSON.stringify(res));
    },
  });

  const { mutate } = useMutation("deleteMyAccount", deleteUser, {
    onError: () => {
      Alert.alert("Can't delete account now, try later.");
    },
    onSuccess: async (res) => {
      if (res.status !== 200) {
        Alert.alert("Can't delete account now, try later.");
      } else {
        Alert.alert("AcCount deleted");
        authContext.logout();
      }
    },
  });

  const handleConfirm = () => {
    meQuery.data?._id && mutate(meQuery.data?._id);
    setModalVisible(false);
  };

  const releaseQuery = useQuery(
    "myReleases",
    () => getUserReleases(meQuery.data.id as string),
    { enabled: meQuery.status === "success" }
  );

  const playlistQuery = useQuery(
    "myPlaylists",
    () => getUserPlaylists(meQuery.data.id as string),
    { enabled: meQuery.status === "success" }
  );

  return (
    <ScrollView style={tw`flex-1 dark:bg-drk bg-white`}>
      <View style={tw`flex flex-row m-2`}>
        <Image
          style={tw`h-40 w-40 rounded-full m-2`}
          source={require("../assets/images/profile.jpg")}
        />
        <View style={tw`flex my-5 p-2 w-1/2`}>
          <Text
            style={tw`text-lg font-bold text-black dark:text-white`}
          >{`Usename:`}</Text>
          <Text
            style={tw`text-base font-bold text-gry dark:text-grn`}
            ellipsizeMode="tail"
            numberOfLines={1}
          >{`${
            meQuery.status === "success" ? meQuery.data.username : ""
          }`}</Text>
          <Text
            style={tw`text-lg font-bold text-black dark:text-white`}
          >{`Email:`}</Text>
          <Text
            style={tw`text-base font-bold text-gry dark:text-grn`}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {meQuery.status === "success" ? meQuery.data.email : ""}
          </Text>
        </View>
      </View>
      <View style={tw`mx-2`}>
        <View style={tw`bg-rd rounded-full`}>
          <Button
            color="white"
            title="Delete"
            onPress={() => setModalVisible(true)}
          />
        </View>
        <Text
          style={tw`text-lg font-bold text-black mt-4 dark:text-white`}
        >{`Releases:`}</Text>
        {releaseQuery.status === "success" &&
          releaseQuery.data.map((item) => (
            <ReleaseCell
              release={{
                ...item,
                author: { username: meQuery.data.username },
              }}
              navigation={navigation}
            />
          ))}
      </View>
      <View style={tw`mx-2`}>
        <Text
          style={tw`text-lg font-bold text-black mt-4 dark:text-white`}
        >{`Playlists:`}</Text>
        {playlistQuery.status === "success" &&
          playlistQuery.data.map((item) => (
            <ReleaseCell
              release={{
                ...item,
                author: { username: meQuery.data.username },
              }}
              navigation={navigation}
            />
          ))}
      </View>
      <ConfirmAlert
        onConfirm={handleConfirm}
        visible={modalVisible}
        setModalVisible={setModalVisible}
        message="Are you sure you want to delete your account?"
      />
    </ScrollView>
  );
}
