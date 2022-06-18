import { Audio } from "expo-av";
import React, {
  createContext,
  useReducer,
  Dispatch,
  useState,
  useEffect,
} from "react";
import { ActionMap, Track, Types } from "../constants/types";
import { trackSource } from "./AxiosContext";

type PlayerType = {
  position: number;
  duration: number;
  isLoaded: boolean;
  isPlaying: boolean;
};

type ReducerPlayerType = {
  tracks: Track[];
  trackIndex?: number;
};

const initialState: ReducerPlayerType = {
  tracks: [],
  trackIndex: 0,
};

type InitialPlayerType = {
  tracks: Track[];
  trackIndex?: number;
  playerState: PlayerType;
  unload: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  hasNext: () => boolean;
  hasPrevious: () => boolean;
  onPlayPauseClick: () => void;
  setPosition: (position: number) => void;
};

type PlayerPayload = {
  [Types.PlaylistPlay]: {
    tracks: Track[];
    trackIndex: number;
  };
  [Types.ReleasePlay]: {
    tracks: Track[];
    trackIndex: number;
  };
  [Types.TrackPlay]: {
    track: Track;
  };
  [Types.RandomPlay]: {
    tracks: Track[];
  };
};

export type PlayerActions =
  ActionMap<PlayerPayload>[keyof ActionMap<PlayerPayload>];

export const playerReducer = (
  state: ReducerPlayerType,
  action: PlayerActions
) => {
  switch (action.type) {
    case Types.PlaylistPlay:
      return {
        ...action.payload,
        trackIndex: action.payload.trackIndex || 0,
      };
    case Types.ReleasePlay:
      return {
        ...action.payload,
        trackIndex: action.payload.trackIndex || 0,
      };
    case Types.TrackPlay:
      return {
        tracks: [action.payload.track],
        trackIndex: 0,
      };
    case Types.RandomPlay:
      return {
        tracks: action.payload.tracks,
      };
    default:
      return state;
  }
};

const PlayerContext = createContext<{
  state: InitialPlayerType;
  dispatch: Dispatch<PlayerActions>;
}>({
  state: {} as InitialPlayerType,
  dispatch: () => null,
});

const mainReducer = (props: ReducerPlayerType, action: PlayerActions) =>
  playerReducer(props, action);

const PlayerProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  const [playing, setPlaying] = useState<boolean>(false);
  const [position, setPosition] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [sound, setSound] = useState<Audio.Sound>();

  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(
    state.trackIndex || 0
  );

  const unload = () => false;
  const hasNext = () => state.tracks ? currentTrackIndex + 1 < state.tracks?.length : false;
  const hasPrevious = () => state.tracks ? currentTrackIndex - 1 >= 0 : false;

  const nextTrack = () => async () => {
    if (state.tracks && currentTrackIndex + 1 < state.tracks?.length && sound) {
      const newUrl = trackSource + state.tracks[currentTrackIndex + 1].fileName;
      setCurrentTrackIndex(currentTrackIndex + 1);
      await sound?.loadAsync({ uri: newUrl });
      playing && (await sound?.playAsync());
    }
  };

  const previousTrack = () => async () => {
    if (state.tracks && currentTrackIndex - 1 >= 0 && sound) {
      const newUrl = trackSource + state.tracks[currentTrackIndex - 1].fileName;
      setCurrentTrackIndex(currentTrackIndex - 1);
      await sound?.loadAsync({ uri: newUrl });
      playing && (await sound?.playAsync());
    }
  };

  const onPlayPauseClick = async () => {
    if (sound) {
      playing ? await sound?.pauseAsync() : await sound?.playAsync();
      setPlaying(!playing);
    } else setPlaying(false);
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const onTracksChange = async (newTracks: any) => {
    const newUrl =
      trackSource + newTracks[currentTrackIndex].fileName;

    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });

    const sound = new Audio.Sound();

    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded) {
        setPosition(status.positionMillis);
        setDuration(status.durationMillis || 0);
      }
    });
    await sound.loadAsync({ uri: newUrl });

    setSound(sound);
    await sound?.playAsync();
    setPlaying(true);
  };

  useEffect(() => {
    state.tracks?.length && onTracksChange(state.tracks);
  }, [state.tracks]);

  return (
    <PlayerContext.Provider
      value={{
        state: {
          tracks: state.tracks,
          trackIndex: state.trackIndex,
          playerState: {
            position,
            duration,
            isLoaded: true,
            isPlaying: playing,
          },
          unload,
          hasNext,
          hasPrevious,
          nextTrack,
          previousTrack,
          onPlayPauseClick,
          setPosition,
        },
        dispatch,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export { PlayerProvider, PlayerContext };
