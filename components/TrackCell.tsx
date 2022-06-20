import { FontAwesome } from "@expo/vector-icons";
import React, { useState, useContext } from "react";
import { View, Text, Alert } from "react-native";
import { useMutation, useQueryClient } from "react-query";
import { updatePlaylist } from "../api/PlaylistAPI";
import { PlaylistUpdateTaskAction, Track, Types } from "../constants/types";
import { PlayerContext } from "../context/PlayerContext";
import CommentsScreen from "../screens/CommentsScreen";
import tw from "../tailwind";
import ConfirmAlert from "./ConfirmDialog";

const TrackCell = (props: any) => {
  const [showComments, setShowComments] = useState(false);
  const [trackModalVisible, setTrackModalVisible] = useState(false);
  const queryClient = useQueryClient();
  const { dispatch } = useContext(PlayerContext);

  const onCloseComments = () => {
    setShowComments(false);
  };

  const onClickTrack = (track: Track) => () => {
    dispatch({
      type: Types.TrackPlay,
      payload: {
        track: track,
      },
    });
  };

  const trackMutation = useMutation(
    `delete-track-${props.track._id}-playlist`,
    updatePlaylist,
    {
      onError: () => {
        Alert.alert("Can't remove track now, try later.");
      },
      onSuccess: async (res) => {
        if (res.status !== 200) {
          Alert.alert("Can't remove track now, try later.");
        } else {
          Alert.alert("Track was removes");
          await queryClient.refetchQueries("myPlaylists");
          await queryClient.refetchQueries(`plylist-${props.playlistId}`);
        }
      },
    }
  );

  const handleConfirmTrack = () => {
    trackMutation.mutate({
      id: props.playlistId,
      data: {
        trackId: props.track._id,
        action: PlaylistUpdateTaskAction.Remove,
      },
    });
    setTrackModalVisible(false);
  };

  return (
    <View
      style={tw`flex flex-row justify-between border-t border-grn  items-center`}
    >
      <View>
        <Text style={tw`text-base font-bold dark:text-white`}>
          {props.track.title}
        </Text>
        <Text
          style={tw`font-bold text-gry dark:text-grn`}
        >{`artist: ${props.track.author?.username}`}</Text>
      </View>
      <View style={tw`flex flex-row items-center dark:text-white`}>
        {props.me && props.playlistId && (
          <FontAwesome
            size={25}
            name="close"
            style={tw`text-rd m-2`}
            onPress={() => setTrackModalVisible(true)}
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
      <CommentsScreen
        visible={showComments}
        onCloseComments={onCloseComments}
        contentId={props.track._id}
      />
      {props.me && props.playlistId && (
        <ConfirmAlert
          onConfirm={handleConfirmTrack}
          message="Are you sure you want to remove this track?"
          visible={trackModalVisible}
          setModalVisible={setTrackModalVisible}
        />
      )}
    </View>
  );
};

export default TrackCell;
