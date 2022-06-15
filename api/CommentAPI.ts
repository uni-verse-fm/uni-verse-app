import { Endoints } from "../constants/types";
import { publicAxios } from "../context/AxiosContext";

const commentEndpoint = Endoints.Comments;

const createComment = (data: any) =>
  publicAxios.post(`${commentEndpoint}`, JSON.stringify(data));

const getComments = () => publicAxios.get(commentEndpoint);

const getCommentByTitle = (title: string) =>
  publicAxios.get(`${commentEndpoint}`, { params: { title } });

const getCommentById = (id: string) =>
  publicAxios.get(`${commentEndpoint}/${id}`);

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
};
