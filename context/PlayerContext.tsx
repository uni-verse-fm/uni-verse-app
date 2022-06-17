import React, { createContext, useReducer, Dispatch } from "react";
import { ActionMap, Track, Types } from "../constants/types";

type PlayerType = {
  className?: string;
  tracks: Track[];
  trackIndex?: number;
};

type InitialStateType = {
  player: PlayerType;
};

const initialState = {
  player: {
    className: "mt-auto",
    tracks: [],
    trackIndex: 0,
  },
};

type PlayerPayload = {
  [Types.PlaylistPlay]: {
    className?: string;
    tracks: Track[];
    trackIndex: number;
  };
  [Types.ReleasePlay]: {
    className?: string;
    tracks: Track[];
    trackIndex: number;
  };
  [Types.TrackPlay]: {
    className?: string;
    track: Track;
  };
  [Types.RandomPlay]: {
    className?: string;
    tracks: Track[];
  };
};

export type PlayerActions =
  ActionMap<PlayerPayload>[keyof ActionMap<PlayerPayload>];

export const playerReducer = (state: PlayerType, action: PlayerActions) => {
  switch (action.type) {
    case Types.PlaylistPlay:
      return {
        ...action.payload,
        className: action.payload.className || "mt-auto",
        trackIndex: action.payload.trackIndex || 0,
      };
    case Types.ReleasePlay:
      return {
        ...action.payload,
        className: action.payload.className || "mt-auto",
        trackIndex: action.payload.trackIndex || 0,
      };
    case Types.TrackPlay:
      return {
        className: action.payload.className || "mt-auto",
        tracks: [action.payload.track],
        trackIndex: 0,
      };
    case Types.RandomPlay:
      return {
        className: action.payload.className || "mt-auto",
        tracks: action.payload.tracks,
      };
    default:
      return state;
  }
};

const PlayerContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<PlayerActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = ({ player }: InitialStateType, action: PlayerActions) => ({
  player: playerReducer(player, action),
});

const PlayerProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <PlayerContext.Provider value={{ state, dispatch }}>
      {children}
    </PlayerContext.Provider>
  );
};

export { PlayerProvider, PlayerContext };
