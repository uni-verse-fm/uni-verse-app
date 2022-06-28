import { Endoints } from "../constants/types";
import { authAxios, publicAxios } from "../context/AxiosContext";

const userEndpoint = Endoints.Users;

const getUsers = () => publicAxios.get(userEndpoint);

const getUserByUsername = (username: string) =>
  publicAxios.get(`${userEndpoint}`, { params: { username } });

const getUserById = (id: string) => publicAxios.get(`${userEndpoint}/${id}`);

const updateUser = (id: string, data: unknown) =>
  publicAxios.put(`${userEndpoint}/${id}`, JSON.stringify(data));

const deleteUser = () => authAxios.delete(`${userEndpoint}`);

const onboardUser = () => publicAxios.post(`${userEndpoint}/onboard`);

const searchUsers = (
  text: string,
  { signal }: { signal: AbortSignal | undefined },
) =>
  authAxios
    .get(`${userEndpoint}/search?search=${text}`, {
      signal,
    })
    .then((res) => res.data);

export {
  getUsers,
  getUserByUsername,
  getUserById,
  updateUser,
  deleteUser,
  searchUsers,
  onboardUser,
};
