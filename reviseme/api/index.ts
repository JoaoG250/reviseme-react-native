import axios from "axios";
import AsyncStorageLib from "@react-native-async-storage/async-storage";

const apiBaseURL = "http://192.168.0.100:8000/api/";

const api = axios.create({
  baseURL: apiBaseURL,
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

type ObjectData = {
  [key: string]: any;
};

export async function sendForm(endpoint: string, data: ObjectData) {
  const token = await AsyncStorageLib.getItem("@reviseme:token");

  if (!token) {
    throw new Error("No token found");
  }

  const formData = new FormData();
  for (let key in data) {
    formData.append(key, data[key]);
  }

  return fetch(apiBaseURL + endpoint, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
}

export default api;
