import { FontAwesome } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import { View, Image, Text, Alert } from "react-native";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { me } from "../api/AuthAPI";
import { updatePlaylist } from "../api/PlaylistAPI";
import { PlaylistUpdateTaskAction, Track, Types } from "../constants/types";
import { AuthContext } from "../context/AuthContext";
import { PlayerContext } from "../context/PlayerContext";
import CommentsScreen from "../screens/CommentsScreen";
import tw from "../tailwind";
import PlaylistSelectDialog from "./PlaylistSelectDialog";

function TrackRow(props: {
  track: {
    author: { username: string };
    fileName: string;
    release: { title: string };
    _id: string;
    title: string;
    file: File;
    feats: [];
  };
}) {
  const { dispatch } = useContext(PlayerContext);
  const [showComments, setShowComments] = useState(false);
  const authContext = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const queryClient = useQueryClient();

  const onCloseComments = () => {
    setShowComments(false);
  };

  const onClickTrack = (track: Track) => () => {
    dispatch({
      type: Types.TrackPlay,
      payload: {
        track,
      },
    });
  };

  const meQuery = useQuery("me", () => me().then((res) => res.data));

  const { mutate } = useMutation(
    `add-track-${props.track._id}-playlist`,
    updatePlaylist,
    {
      onError: () => {
        Alert.alert("Can't add track now, try later.");
      },
      onSuccess: async (res: { status: number }) => {
        if (res.status !== 200) {
          Alert.alert("Can't add track now, try later.");
        } else {
          Alert.alert("Track was added");
          await queryClient.refetchQueries("myPlaylists");
        }
      },
    },
  );

  const handleConfirm = (playlistId: string) => {
    meQuery.data?._id &&
      mutate({
        id: playlistId,
        data: {
          trackId: props.track._id,
          action: PlaylistUpdateTaskAction.Add,
        },
      });
    setModalVisible(false);
  };

  return (
    <View style={tw`flex flex-row justify-between m-1`}>
      <View style={tw`flex flex-row`}>
        <Image
          style={tw`h-10 w-10 rounded-full m-1`}
          source={require("../assets/images/playlist.png")}
        />
        <View style={tw`flex`}>
          <Text style={tw`text-lg font-bold dark:text-white`}>
            {props.track.title}
          </Text>
          <Text style={tw`text-gry font-bold dark:text-grn`}>
            {props.track.author.username}
          </Text>
          <Text style={tw`text-gry font-bold dark:text-grn`}>
            {`Release: ${props.track.release.title}`}
          </Text>
        </View>
      </View>
      <View style={tw`flex flex-row`}>
        <View style={tw`flex flex-row items-center dark:text-white`}>
          {meQuery.data?._id && (
            <FontAwesome
              size={25}
              name="plus"
              style={tw`text-grn m-2`}
              onPress={() => setModalVisible(true)}
            />
          )}
          <FontAwesome
            size={25}
            name="comment"
            style={tw`text-grn m-2`}
            onPress={() => setShowComments(true)}
          />
          <FontAwesome
            size={25}
            name="play"
            style={tw`text-grn m-2`}
            onPress={onClickTrack(props.track)}
          />
        </View>
      </View>
      {authContext.authState?.authenticated && (
        <CommentsScreen
          visible={showComments}
          onCloseComments={onCloseComments}
          contentId={props.track._id}
        />
      )}
      {meQuery.data?._id && (
        <PlaylistSelectDialog
          onConfirm={handleConfirm}
          visible={modalVisible}
          setModalVisible={setModalVisible}
          meId={meQuery.data?._id}
        />
      )}
    </View>
  );
}

export default TrackRow;
