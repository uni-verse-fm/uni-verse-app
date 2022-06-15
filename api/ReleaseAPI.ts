import { Endoints } from "../constants/types";
import { authAxios, publicAxios } from "../context/AxiosContext";

const releaseEndpoint = Endoints.Releases;

const getReleases = () => publicAxios.get(releaseEndpoint);

const getReleaseByTitle = (title: string) =>
  publicAxios.get(`${releaseEndpoint}`, { params: { title } });

const getReleaseById = (id: string) =>
  authAxios.get(`${releaseEndpoint}/${id}`);

const updateRelease = (id: string, data: any) =>
  publicAxios.put(`${releaseEndpoint}/${id}`, JSON.stringify(data));

const deleteRelease = (id: String) =>
  publicAxios.delete(`${releaseEndpoint}/${id}`);

const getUserReleases = (id: string) =>
  publicAxios.get(`${releaseEndpoint}/user/${id}`).then((res) => res.data);

const searchRelease = (text: string, { signal }: any) =>
  publicAxios
    .get(`${releaseEndpoint}/search?search=${text}`, {
      signal,
    })
    .then((res) => res.data);

export {
  getReleases,
  getReleaseByTitle,
  getReleaseById,
  updateRelease,
  deleteRelease,
  getUserReleases,
  searchRelease,
};
