import axios from "axios";
import AsyncStorageLib from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "http://192.168.0.100:8000/api/",
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorageLib.getItem("@reviseme:token");

  if (token) {
    if (config.headers === undefined) {
      config.headers = {};
    }

    config.headers.Authorization = `Token ${token}`;
  }

  return config;
});

type HttpMethod = "get" | "post" | "put" | "delete" | "patch";
type ObjectData = {
  [key: string]: any;
};

export async function sendForm(
  method: HttpMethod,
  endpoint: string,
  data: ObjectData
) {
  const formData = new FormData();
  for (let key in data) {
    formData.append(key, data[key]);
  }
  return api[method](endpoint, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export default api;
