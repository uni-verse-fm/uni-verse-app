import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import PlaylistScreen from "../screens/PlaylistScreen";
import ReleaseScreen from "../screens/ReleaseScreen";
import UserScreen from "../screens/UserScreen";
import { RootStackParamList, RootTabParamList } from "../types";

export const screens = [
  {
    name: "Release",
    screen: ReleaseScreen,
  },
  {
    name: "Playlist",
    screen: PlaylistScreen,
  },
  {
    name: "User",
    screen: UserScreen,
  },
  {
    name: "NotFound",
    screen: NotFoundScreen,
  },
  {
    name: "Modal",
    screen: ModalScreen,
  },
];

export const Stack = createNativeStackNavigator<RootStackParamList>();
export const BottomTab = createBottomTabNavigator<RootTabParamList>();
