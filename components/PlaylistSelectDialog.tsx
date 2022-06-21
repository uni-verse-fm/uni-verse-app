import React from "react";
import {
  Modal,
  View,
  Button,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useQuery } from "react-query";
import { getUserPlaylists } from "../api/PlaylistAPI";
import tw from "../tailwind";

function PlaylistSelectDialog({ onConfirm, visible, setModalVisible, meId }) {
  const handleConfirm = (playlistId: string) => {
    setModalVisible(false);
    onConfirm(playlistId);
  };
  const playlistQuery = useQuery("myPlaylists", () => getUserPlaylists(meId), {
    enabled: Boolean(meId),
  });

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={() => {
        setModalVisible(!visible);
      }}
    >
      <View style={tw`flex-1 items-center justify-center`}>
        <View style={tw`p-4 bg-white rounded-xl border-2 w-3/4`}>
          <Text style={tw`text-xl text-center m-2`}>
            Choose one of your playlists
          </Text>
          {playlistQuery.status === "success" &&
          (playlistQuery.data as []).length !== 0 ? (
            <FlatList
              data={playlistQuery.data}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleConfirm(item._id)}
                  style={tw` m-1 bg-grn bg-opacity-50 rounded-full`}
                >
                  <Text style={tw`text-xl font-bold text-black text-center`}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              )}
            />
          ) : (
            <View style={tw`flex-1 justify-center items-center`}>
              <Text style={tw`text-gry dark:text-grn text-lg`}>
                No playlists
              </Text>
            </View>
          )}
          <View style={tw`flex flex-row`}>
            <View style={tw`bg-drk grow rounded-full mx-1 mt-3`}>
              <Button
                color="white"
                title="Cancel"
                onPress={() => setModalVisible(false)}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default PlaylistSelectDialog;
