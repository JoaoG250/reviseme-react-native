import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.100:8000/api/",
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
