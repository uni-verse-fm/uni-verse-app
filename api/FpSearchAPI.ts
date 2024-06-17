import { uploadFiles } from "react-native-fs";
import { Endoints } from "../constants/types";
import { publicAxios } from "../context/AxiosContext";

const endpoint = Endoints.FpSearch;

const createFpSearch = (filename: string) => {
  const formData = new FormData();

  return uploadFiles({
    toUrl: `https://uni-verse.api.vagahbond.com/fp-searches`,
    files: [
      {
        name: "file",
        filename: "extract.m4a",
        filepath: filename,
        filetype: "audio/aac",
      },
    ],
    method: "POST",
  });

  /*  formData.append("file", {
      uri: filename,
      type: "audio/aac",
      name: "extract.m4a",
    });
  
    return publicAxios
      .post(
        `${endpoint}`,
        {
          formData,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      )
      .then((res) => res);*/
};

const getFpSearch = (id: string) => {
  return publicAxios.get(`${endpoint}/${id}`);
};

export { createFpSearch, getFpSearch };
