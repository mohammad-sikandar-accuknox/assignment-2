import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.instantwebtools.net/v1/",
});

export default axiosInstance;
