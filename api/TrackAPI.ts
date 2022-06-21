import { Endoints } from "../constants/types";
import { publicAxios } from "../context/AxiosContext";

const trackEndpoint = Endoints.Tracks;
const getTrackById = (id: string) => publicAxios.get(`${trackEndpoint}/${id}`);

const searchTrack = (text: string, { signal }: { signal: unknown }) =>
  publicAxios
    .get(`${trackEndpoint}/search?search=${text}`, {
      signal,
    })
    .then((res) => res.data);

export { getTrackById, searchTrack };
