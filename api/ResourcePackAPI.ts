import { Endoints } from "../constants/types";
import { publicAxios } from "../context/AxiosContext";

const resourcePackEndpoint = Endoints.ResourcePacks;

const getResourcePacks = () => publicAxios.get(resourcePackEndpoint);

const getResourcePackByTitle = (title: string) =>
  publicAxios.get(`${resourcePackEndpoint}`, { params: { title } });

const getResourcePackById = (id: string) =>
  publicAxios.get(`${resourcePackEndpoint}/${id}`);

const updateResourcePack = (id: string, data: unknown) =>
  publicAxios.put(`${resourcePackEndpoint}/${id}`, JSON.stringify(data));

const deleteResourcePack = (id: string) =>
  publicAxios.delete(`${resourcePackEndpoint}/${id}`);

export {
  getResourcePacks,
  getResourcePackByTitle,
  getResourcePackById,
  updateResourcePack,
  deleteResourcePack,
};
