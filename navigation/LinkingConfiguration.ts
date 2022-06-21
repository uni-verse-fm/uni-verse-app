/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootStackParamList } from "../types";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: "home",
            },
          },
          Search: {
            screens: {
              SearchScreen: "search",
            },
          },
          Library: {
            screens: {
              LibraryScreen: "library",
            },
          },
        },
      },
      Release: "release",
      Playlist: "playlist",
      User: "user",
      Modal: "modal",
      MyProfile: "my-profile",
      NotFound: "*",
    },
  },
};

export default linking;
