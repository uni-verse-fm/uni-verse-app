import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  Alert,
  FlatList,
} from "react-native";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createComment,
  getResourceComments,
  ModelType,
} from "../api/CommentAPI";
import CommentRow from "../components/CommentRow";
import tw from "../tailwind";

interface ICommentsScreen {
  onCloseComments: () => void;
  visible: boolean;
  contentId: string;
}

enum LikeDislike {
  Like,
  Dislike,
}

const CommentsScreen = (props: ICommentsScreen) => {
  const [comment, setComment] = useState("");
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const queryClient = useQueryClient();

  const { mutate } = useMutation("createComment", createComment, {
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries(`comments-${props.contentId}`);

      const previousPlaylists = queryClient.getQueryData(
        `comments-${props.contentId}`
      );

      queryClient.setQueryData(`comments-${props.contentId}`, (old: any[]) => [
        ...old,
        newTodo,
      ]);

      return { previousPlaylists };
    },
    onError: (err, newComment, context) => {
      context &&
        queryClient.setQueryData(
          `comments-${props.contentId}`,
          context.previousPlaylists
        );
      Alert.alert("Sorry can't publish comment, try later.");
    },
    onSettled: () => {
      queryClient.invalidateQueries(`comments-${props.contentId}`);
    },
    onSuccess: (res) => {
      if (res.status !== 201) {
        Alert.alert("Sorry can't publish comment, try later.");
      }
    },
  });

  const commentsQuery = useQuery(`comments-${props.contentId}`, () =>
    getResourceComments({
      contentId: props.contentId,
      typeOfContent: ModelType.Track,
    }).then((res) => res.data)
  );

  const toggleLikeDislike = (likeDislike: LikeDislike) => () => {
    switch (likeDislike) {
      case LikeDislike.Like:
        setLike(true);
        setDislike(false);
        break;
      case LikeDislike.Dislike:
        setLike(false);
        setDislike(true);
        break;
      default:
        break;
    }
  };

  const handleSubmmit = () => {
    mutate({
        contentId: props.contentId,
        content: comment,
        isPositive: like,
        typeOfContent: ModelType.Track,
    })
  }

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.visible}
      onRequestClose={() => {
        props.onCloseComments();
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tw`flex-1 bg-white dark:bg-drk`}
      >
        <TouchableOpacity style={tw`mx-4 my-8`} onPress={props.onCloseComments}>
          <FontAwesome
            name="chevron-down"
            style={tw`text-grn m-2 rounded-full`}
            size={30}
            multiline={true}
          />
        </TouchableOpacity>
        <View style={tw`flex-1 flex-col-reverse p-1 bg-white dark:bg-drk`}>
          <View
            style={tw`flex flex-row items-center justify-between bg-white border-2 dark:border-0 px-1 rounded-full mb-8`}
          >
            <View style={tw`w-4/7`}>
              <TextInput
                key="title"
                style={tw`text-base h-8 px-3 `}
                placeholder="Enter your comment"
                placeholderTextColor="#616161"
                maxLength={255}
                value={comment}
                onChangeText={(value) => setComment(value)}
              />
              <Text
                style={tw`ml-4 text-xs text-grn`}
              >{`${comment.length}/255`}</Text>
            </View>

            <View style={tw`flex flex-row items-center`}>
              <View style={tw`px-1`}>
                <FontAwesome
                  name="thumbs-up"
                  size={30}
                  style={tw`text-grn ${like ? "" : "text-opacity-40"}`}
                  onPress={toggleLikeDislike(LikeDislike.Like)}
                />
              </View>
              <View style={tw`px-1`}>
                <FontAwesome
                  name="thumbs-down"
                  size={30}
                  style={tw`text-rd ${dislike ? "" : "text-opacity-40"}`}
                  onPress={toggleLikeDislike(LikeDislike.Dislike)}
                />
              </View>
              <View style={tw`bg-grn rounded-full`}>
                <Button
                  color="black"
                  title="submit"
                  disabled={!(like || dislike) || !comment.length}
                  onPress={handleSubmmit}
                />
              </View>
            </View>
          </View>
          {commentsQuery.status === "success" && (commentsQuery.data as any[]).length > 0 ? (
            <FlatList
              data={commentsQuery.data}
              renderItem={({ item }) => <CommentRow comment={item} />}
            />
          ) : (
            <View style={tw`flex-1 justify-center items-center`}>
              <Text style={tw`text-gry dark:text-grn`}>No comments</Text>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
export default CommentsScreen;
