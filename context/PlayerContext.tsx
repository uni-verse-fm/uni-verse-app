import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";
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

type TrackInfo = {
  title: string;
  author: string;
};

type InitialPlayerType = {
  tracks: Track[];
  trackIndex?: number;
  playerState: PlayerType;
  trackInfo: TrackInfo;
  unload: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  hasNext: () => boolean;
  hasPrevious: () => boolean;
  onPlayPauseClick: () => void;
  onSlide: (position: number) => void;
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
  const hasNext = () =>
    state.tracks ? currentTrackIndex + 1 < state.tracks?.length : false;
  const hasPrevious = () => (state.tracks ? currentTrackIndex - 1 >= 0 : false);

  const nextTrack = async (loop: boolean = false) => {
    if (currentTrackIndex + 1 < state.tracks?.length && sound) {
      const newUrl = trackSource + state.tracks[currentTrackIndex + 1].fileName;
      setCurrentTrackIndex(currentTrackIndex + 1);
      await sound
        ?.unloadAsync()
        .then(
          async () =>
            await sound
              .loadAsync({ uri: newUrl })
              .then(
                async () =>
                  playing &&
                  (await sound
                    .playAsync()
                    .then(() => setPlaying(true))
                    .catch(() => setPlaying(false)))
              )
              .catch(() => setPlaying(false))
        )
        .catch(() => setPlaying(false));
    } else if (loop && sound) {
      const newUrl = trackSource + state.tracks[0].fileName;
      setCurrentTrackIndex(0);
      await sound
        ?.unloadAsync()
        .then(
          async () =>
            await sound
              .loadAsync({ uri: newUrl })
              .then(
                async () =>
                  await sound
                    .playAsync()
                    .then(() => setPlaying(true))
                    .catch(() => setPlaying(false))
              )
              .catch(() => setPlaying(false))
        )
        .catch(() => setPlaying(false));
    } else {
      setPlaying(false);
    }
  };

  const previousTrack = async () => {
    if (currentTrackIndex - 1 >= 0 && sound) {
      const newUrl = trackSource + state.tracks[currentTrackIndex - 1].fileName;
      setCurrentTrackIndex(currentTrackIndex - 1);

      await sound?.unloadAsync();
      await sound?.loadAsync({ uri: newUrl });
      playing &&
        (await sound
          ?.playAsync()
          .then(() => setPlaying(true))
          .catch(() => setPlaying(false)));
    }
  };

  const onPlayPauseClick = async () => {
    sound &&
      (await sound
        .getStatusAsync()
        .then(async (status) => {
          if (status.isLoaded && status.isPlaying) {
            await sound?.pauseAsync().then(() => setPlaying(false));
          } else if (
            status.isLoaded &&
            Math.floor((status.durationMillis || 0) / 100) ===
            Math.floor(status.positionMillis / 100) &&
            !hasNext()
          ) {
            await nextTrack(true);
          } else if (
            status.isLoaded &&
            Math.floor((status.durationMillis || 0) / 100) ===
            Math.floor(status.positionMillis / 100) &&
            hasNext()
          ) {
            await nextTrack();
          } else {
            await sound?.playAsync().then(() => setPlaying(true));
          }
        })
        .catch(() => setPlaying(false)));
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const onTracksChange = async (newTracks: any) => {
    const newUrl = trackSource + newTracks[currentTrackIndex].fileName;

    await Audio.setAudioModeAsync({ 
        staysActiveInBackground: true,
        interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
        playThroughEarpieceAndroid: true,
        interruptionModeIOS: InterruptionModeIOS.DoNotMix,
    });

    const sound = new Audio.Sound();

    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded) {
        setPosition(status.positionMillis);
        setDuration(status.durationMillis || 0);
      }
    });
    await sound.loadAsync({ uri: newUrl });

    setSound(sound);
    await sound
      ?.playAsync()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  };

  const onSlide = async (value: number) => {
    await sound
      ?.setPositionAsync(value)
      .then(() => setPosition(value))
      .catch(() => setPosition(0));
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
          trackInfo: {
            title: state.tracks?.[currentTrackIndex]?.title,
            author: state.tracks?.[currentTrackIndex]?.author.username,
          },
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
          onSlide,
        },
        dispatch,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export { PlayerProvider, PlayerContext };
