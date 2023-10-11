import axios from "exios";

const instance = axios.create({});

instance.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("accessToken"));
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
