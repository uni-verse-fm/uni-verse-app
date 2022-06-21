import { Endoints, IUpdatePayload } from "../constants/types";
import { authAxios, publicAxios } from "../context/AxiosContext";

const playlistEndpoint = Endoints.Playlists;

const getPlaylists = () => publicAxios.get(playlistEndpoint);

const getUserPlaylists = (id: string) =>
  authAxios.get(`${playlistEndpoint}/user/${id}`).then((res) => res.data);

// const getUserPlaylistsAuth = (id: string) =>
//   authAxios.get(`${playlistEndpoint}/user/${id}`).then((res) => res.data);

const createPlaylist = (data: unknown) =>
  authAxios.post(`${playlistEndpoint}`, data);

const getPlaylistByTitle = (title: string) =>
  publicAxios.get(`${playlistEndpoint}`, { params: { title } });

const getPlaylistById = (id: string) =>
  authAxios.get(`${playlistEndpoint}/${id}`).then((res) => res.data);

const updatePlaylist = (param: IUpdatePayload) =>
  authAxios.patch(`${playlistEndpoint}/${param.id}`, param.data);

const deletePlaylist = (id: string) =>
  authAxios.delete(`${playlistEndpoint}/${id}`);

const searchPlaylist = (text: string, { signal }: { signal }) =>
  publicAxios
    .get(`${playlistEndpoint}/search?search=${text}`, {
      signal,
    })
    .then((res) => res.data);

export {
  createPlaylist,
  getPlaylists,
  getPlaylistByTitle,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
  searchPlaylist,
  getUserPlaylists,
};
