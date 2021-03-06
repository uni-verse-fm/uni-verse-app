import { Formik } from "formik";
import React from "react";
import {
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Alert,
  Button,
} from "react-native";
import { useMutation, useQueryClient } from "react-query";
import * as Yup from "yup";
import { createPlaylist } from "../api/PlaylistAPI";
import { Messages } from "../constants/values";
import tw from "../tailwind";

function AddPlaylistForm({ cancel }) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation("createPlaylist", createPlaylist, {
    onMutate: async (newComment) => {
      await queryClient.cancelQueries("myPlaylists");

      const previousPlaylists = queryClient.getQueryData("myPlaylists");

      queryClient.setQueryData("myPlaylists", (old: unknown[]) => [
        ...old,
        newComment,
      ]);

      return { previousPlaylists };
    },
    onError: (err, newPlaylist, context) => {
      context &&
        queryClient.setQueryData("myPlaylists", context.previousPlaylists);
      Alert.alert("Sorry can't create playlist, try later.");
    },
    onSettled: () => {
      queryClient.invalidateQueries("myPlaylists");
    },
    onSuccess: (res) => {
      if (res.status !== 201) {
        Alert.alert("Sorry can't create playlist, try later.");
      } else {
        Alert.alert("Playlist created.");
      }
    },
  });

  return (
    <Formik
      initialValues={{
        title: "",
      }}
      validationSchema={Yup.object().shape({
        title: Yup.string()
          .max(15, Messages.TITLE)
          .min(1, Messages.TITLE)
          .required(Messages.REQUIRED),
      })}
      onSubmit={(value) => {
        mutate(value);
      }}
    >
      {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
        <View style={tw`bg-grn m-2 rounded-3xl`}>
          <View style={tw`bg-white m-2 rounded-full px-2 `}>
            <TextInput
              key="title"
              style={tw`text-base h-10`}
              placeholder="Enter playlist name"
              placeholderTextColor="#616161"
              onChangeText={handleChange("title")}
              onBlur={handleBlur("title")}
              value={values.title}
            />
          </View>
          {errors.title ? (
            <Text style={tw`text-rd text-sm mx-2`}>{errors.title}</Text>
          ) : null}
          <View style={tw`flex flex-row px-2 w-full`}>
            <TouchableOpacity style={tw`mr-1 mb-2 grow rounded-full bg-drk `}>
              <Button
                color="white"
                title="Create"
                onPress={() => handleSubmit()}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`ml-1 mb-2 grow rounded-full bg-rd `}
              onPress={cancel}
            >
              <Button color="white" title="Cancel" onPress={cancel} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
}

export default AddPlaylistForm;
