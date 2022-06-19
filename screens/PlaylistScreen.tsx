import { View, Text, Button, Alert } from "react-native";
import tw from "../tailwind";
import { RootStackScreenProps } from "../types";
import { Image, FlatList } from "react-native";
import React, { useState } from "react";
import TrackCell from "../components/TrackCell";
import { isoDateToDate } from "../utils/dateTimeUtils";
import ConfirmAlert from "../components/ConfirmDialog";
import { useMutation, useQueryClient } from "react-query";
import { deletePlaylist } from "../api/PlaylistAPI";

interface IParams {
  playlist: any;
  me?: boolean;
}

export default function PlaylistScreen({
  route,
  navigation,
}: RootStackScreenProps<"Playlist">) {
  const { playlist, me } = route.params as unknown as IParams;
  const [modalVisible, setModalVisible] = useState(false);
  const queryClient = useQueryClient();

  const { mutate } = useMutation("deletePlaylist", deletePlaylist, {
    onError: () => {
      Alert.alert("Can't delete playlist now, try later.");
    },
    onSuccess: async (res) => {
      if (res.status !== 200) {
        Alert.alert("Can't delete playlist now, try later.");
      } else {
        Alert.alert("Playlist deleted");
        await queryClient.refetchQueries("myPlaylists");
        navigation.goBack();
      }
    },
  });

  const handleConfirm = () => {
    mutate(playlist._id);
    setModalVisible(false);
  };

  return (
    <View style={tw`flex-1 dark:bg-drk bg-white`}>
      <View style={tw`flex flex-row m-2`}>
        <Image
          style={tw`h-40 w-40 rounded-xl`}
          source={require("../assets/images/playlist.png")}
        />
        <View style={tw`flex m-6`}>
          <Text
            style={tw`text-lg font-bold text-black dark:text-white`}
          >{`Title:`}</Text>
          <Text
            style={tw`text-base font-bold text-gry dark:text-grn`}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {playlist.title}
          </Text>
          <Text
            style={tw`text-lg font-bold text-black dark:text-white`}
          >{`Owner:`}</Text>
          <Text
            style={tw`text-base font-bold text-gry dark:text-grn`}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {playlist.owner.username}
          </Text>
          <Text
            style={tw`text-lg font-bold text-black dark:text-white`}
            ellipsizeMode="tail"
            numberOfLines={1}
          >{`Created at:`}</Text>
          <Text style={tw`text-base font-bold text-gry dark:text-grn`}>
            {isoDateToDate(playlist.createdAt)}
          </Text>
        </View>
      </View>
      <View style={tw`flex-1 mx-2`}>
        {me && (
          <View style={tw`bg-rd rounded-full`}>
            <Button
              color="white"
              title="Delete"
              onPress={() => setModalVisible(true)}
            />
          </View>
        )}
        <Text
          style={tw`text-lg font-bold text-black dark:text-white mt-2`}
        >{`Tracks:`}</Text>
        {playlist.tracks?.length > 0 ? (
          <FlatList
            data={playlist.tracks}
            renderItem={({ item }) => (
              <TrackCell track={item} navigation={navigation} />
            )}
          />
        ) : (
          <View style={tw`flex-1 justify-center items-center`}>
            <Text style={tw`text-gry dark:text-grn`}>No tracks</Text>
          </View>
        )}
      </View>
      {me && (
        <ConfirmAlert
          onConfirm={handleConfirm}
          message="Are you sure you want to delete this playlist?"
          visible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
    </View>
  );
}
