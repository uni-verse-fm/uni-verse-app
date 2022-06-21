import { View, Text, Button, Alert, Image, FlatList } from "react-native";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import tw from "../tailwind";
import { RootStackScreenProps } from "../types";
import TrackCell from "../components/TrackCell";
import { isoDateToDate } from "../utils/dateTimeUtils";
import ConfirmAlert from "../components/ConfirmDialog";
import { deletePlaylist, getPlaylistById } from "../api/PlaylistAPI";

interface IParams {
  playlist: {
    _id: string;
    title: string;
  };
  me?: boolean;
}

export default function PlaylistScreen({
  route,
  navigation,
}: RootStackScreenProps<"Playlist">) {
  const { playlist, me } = route.params as unknown as IParams;
  const [playlistModalVisible, setPlaylistModalVisible] = useState(false);

  const queryClient = useQueryClient();

  const playlistMutation = useMutation("deletePlaylist", deletePlaylist, {
    onError: () => {
      Alert.alert("Can't remove track now, try later.");
    },
    onSuccess: async (res) => {
      if (res.status !== 200) {
        Alert.alert("Can't remove track now, try later.");
      } else {
        Alert.alert("Track removed");
        await queryClient.refetchQueries("myPlaylists");
        navigation.goBack();
      }
    },
  });

  const { data } = useQuery(
    `plylist-${playlist._id}`,
    () => getPlaylistById(playlist._id),
    {
      initialData: playlist,
      enabled: me,
    },
  );

  const handleConfirmPlaylist = () => {
    playlistMutation.mutate(playlist._id);
    setPlaylistModalVisible(false);
  };

  return (
    <View style={tw`flex-1 dark:bg-drk bg-white`}>
      <View style={tw`flex flex-row m-2`}>
        <Image
          style={tw`h-40 w-40 rounded-xl`}
          source={require("../assets/images/playlist.png")}
        />
        <View style={tw`flex m-6`}>
          <Text style={tw`text-lg font-bold text-black dark:text-white`}>
            Title:
          </Text>
          <Text
            style={tw`text-base font-bold text-gry dark:text-grn`}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {data.title}
          </Text>
          <Text style={tw`text-lg font-bold text-black dark:text-white`}>
            Owner:
          </Text>
          <Text
            style={tw`text-base font-bold text-gry dark:text-grn`}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {data.owner.username}
          </Text>
          <Text
            style={tw`text-lg font-bold text-black dark:text-white`}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            Created at:
          </Text>
          <Text style={tw`text-base font-bold text-gry dark:text-grn`}>
            {isoDateToDate(data.createdAt)}
          </Text>
        </View>
      </View>
      <View style={tw`flex-1 mx-2`}>
        {me && (
          <View style={tw`bg-rd rounded-full`}>
            <Button
              color="white"
              title="Delete"
              onPress={() => setPlaylistModalVisible(true)}
            />
          </View>
        )}
        <Text style={tw`text-lg font-bold text-black dark:text-white mt-2`}>
          Tracks:
        </Text>
        {data.tracks?.length > 0 ? (
          <FlatList
            data={data.tracks}
            renderItem={({ item }) => (
              <TrackCell
                track={item}
                navigation={navigation}
                me={me}
                playlistId={playlist._id}
              />
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
          onConfirm={handleConfirmPlaylist}
          message="Are you sure you want to delete this playlist?"
          visible={playlistModalVisible}
          setModalVisible={setPlaylistModalVisible}
        />
      )}
    </View>
  );
}
