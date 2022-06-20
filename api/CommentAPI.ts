import { Endoints } from "../constants/types";
import { authAxios, publicAxios } from "../context/AxiosContext";

const commentEndpoint = Endoints.Comments;

export enum ModelType {
  Track = "Track",
  Resource = "Resource",
}
export interface IComment {
  contentId: string;
  isPositive: boolean;
  content: string;
  typeOfContent: ModelType;
}

export interface IResourceInfo {
  contentId: string;
  typeOfContent: ModelType;
}

const createComment = (data: IComment) =>
  authAxios.post(`${commentEndpoint}`, data);

const getComments = () => publicAxios.get(commentEndpoint);

const getCommentByTitle = (title: string) =>
  publicAxios.get(`${commentEndpoint}`, { params: { title } });

const getCommentById = (id: string) =>
  publicAxios.get(`${commentEndpoint}/${id}`);

const getResourceComments = (resourceInfo: IResourceInfo) =>
  authAxios.get(
    `${commentEndpoint}/${resourceInfo.typeOfContent}/${resourceInfo.contentId}`
  );

const updateComment = (id: string, data: any) =>
  publicAxios.put(`${commentEndpoint}/${id}`, JSON.stringify(data));

const deleteComment = (id: string) =>
  publicAxios.delete(`${commentEndpoint}/${id}`);

export {
  createComment,
  getComments,
  getCommentByTitle,
  getCommentById,
  updateComment,
  deleteComment,
  getResourceComments,
};
