import axios from "axios";
import { Endoints, ILogin, IRegister } from "../constants/types";
import { authAxios, baseURL } from "../context/AxiosContext";
import axiosClient from "./apiClient";

const authEndpoint = Endoints.Auth;

interface IGoogleAuth {
  username: string;
  email: string;
}

const register = (data: IRegister) =>
  axios.post(`${baseURL}${authEndpoint}/register`, data);
const googleAuth = (data: IGoogleAuth) =>
  axiosClient.post(`${authEndpoint}/google`, data);
const login = (data: ILogin) => axiosClient.post(`${authEndpoint}/login`, data);
const logout = () => authAxios.post(`${authEndpoint}/logout`);
const me = () => authAxios.get(`${authEndpoint}/me`);
const refreshToken = () => axios.get(`${authEndpoint}/refresh`);

export { register, login, logout, me, googleAuth, refreshToken };
