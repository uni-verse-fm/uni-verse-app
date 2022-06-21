export interface IUsersList {
  data: IFeat[];
  onClick: (item: IFeat) => void;
}

export interface ITrack {
  file: File;
  title: string;
  feats: IFeat[];
}

export interface IFeat {
  id: string;
  username: string;
  email: string;
}

export interface IFeatChange {
  handleAddFeat: (feat: IFeat) => void;
  handleDeleteFeat: (index: number) => void;
  track: ITrack;
}

export interface IResource {
  file: File;
  previewFile?: File;
  title: string;
}

export interface UniVerseError {
  statusCode?: number;
  message?: string;
}

export interface ICreateRelease {
  title: string;
  description: string;
  resources: IResource[];
  image: File;
  accessType: AccessType;
  amount?: number;
}

export enum FileType {
  Image = "image",
  Resource = "resource",
}

export enum AccessType {
  Free = "free",
  Paid = "paid",
  Donation = "donation",
}

export interface ICreateRelease {
  title: string;
  description: string;
  coverUrl: string;
  feats?: string[];
  tracks: ITrack[];
}

export interface UniVerseError {
  statusCode?: number;
  message?: string;
}

export interface ICreateResource {
  title: string;
  description: string;
  image: unknown;
  feats?: string[];
  resources: IResource[];
  accessType: AccessType;
  amount: number;
}

export interface IPlaylist {
  title: string;
}

export interface IUpdatePayload {
  id: string;
  data: {
    action: PlaylistUpdateTaskAction;
    trackId: string;
  };
}

export enum PlaylistUpdateTaskAction {
  Remove = "REMOVE",
  Add = "ADD",
}

export interface IUpdatePlaylistdata {
  title: string;
}

export interface SideMenuEntryProps {
  title: string;
  icon: unknown;
  onClick?: (event: unknown) => void;
  pageName?: Pages;
  nbNotif?: number;
}

export interface IRegister {
  username: string;
  email: string;
  password: string;
}

export interface IProfileScreen {
  user: {
    id: string;
    username: string;
    email: string;
    accountId?: string;
    image?: string;
  };
  releases: unknown[];
  isMe?: boolean;
}

export type IReaderTimeLine = {
  duration: number;
  playerTime: number;
  onSlide: (value: number) => unknown;
};

export type Track = { fileName: string; author: unknown; id?: string } & ITrack;

export const enum SourceType {
  Playlist,
  Release,
  Track,
  Preview,
  Random,
}

export enum NotificationType {
  ERROR = "error",
  SUCCESS = "success",
  PROMISE = "promise",
  DEFAULT = "default",
}

export interface IDefilingText {
  value: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginForm {
  signIn: unknown;
}

export interface IPlaylist {
  title: string;
}

export interface IUpdatePlaylistTrack {
  trackId: string;
  action: string;
}

export enum Pages {
  Home = " ",
  UploadRelease = "UploadRelease",
  UploadResourcePack = "UploadResourcePack",
  Login = "Login",
  SignUp = "SignUp",
  Profile = "Profile",
  UserPlaylist = "UserPlaylist",
  UserRelease = "UserRelease",
  Track = "Track",
  MyProfile = "MyProfile",
}

export enum Endoints {
  Auth = "/auth",
  Users = "/users",
  Releases = "/releases",
  ResourcePacks = "/resource-packs",
  Playlists = "/playlists",
  Comments = "/comments",
  Payments = "/payments",
  Tracks = "/tracks",
}

export type ActionMap<M extends { [index: string]: unknown }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum Types {
  PlaylistPlay = "PLAY_PLAYLIST",
  ReleasePlay = "PLAY_RELEASE",
  TrackPlay = "PLAY_TRACK",
  RandomPlay = "PLAY_RANDOM",
}

export type PlayerType = {
  className?: string;
  tracks: Track[];
  trackIndex?: number;
};
