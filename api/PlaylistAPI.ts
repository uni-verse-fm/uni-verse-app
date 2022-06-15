import { Endoints, IUpdatePayload } from "../constants/types";
import { publicAxios } from "../context/AxiosContext";

const playlistEndpoint = Endoints.Playlists;

const getPlaylists = () => publicAxios.get(playlistEndpoint);

const getUserPlaylists = (id: string) =>
  publicAxios.get(`${playlistEndpoint}/user/${id}`).then((res) => res.data);

const createPlaylist = (data: any) =>
  publicAxios.post(`${playlistEndpoint}`, data);

const getPlaylistByTitle = (title: string) =>
  publicAxios.get(`${playlistEndpoint}`, { params: { title } });

const getPlaylistById = (id: string) =>
  publicAxios.get(`${playlistEndpoint}/${id}`);

const updatePlaylist = (param: IUpdatePayload) =>
  publicAxios.patch(`${playlistEndpoint}/${param.id}`, param.data);

const deletePlaylist = (id: String) =>
  publicAxios.delete(`${playlistEndpoint}/${id}`);

const searchPlaylist = (text: string, { signal }: any) =>
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
