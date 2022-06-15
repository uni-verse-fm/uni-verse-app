import axios from "axios";

const headers = {
  "Access-Control-Allow-Credentials": true,
  "Access-Control-Allow-Origin": "http://localhost:3005",
  "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
  "Access-Control-Allow-Headers":
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Set-Cookie",
};

const BASE_API = "http://localhost:3000";
const axiosClient = axios.create({
  baseURL: BASE_API,
  headers: { ...headers },
  withCredentials: true,
});

export default axiosClient;
