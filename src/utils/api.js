import axios from "axios";

const api = axios.create({
  baseURL: "https://resetpassword-backend-0am7.onrender.com/api", // 👈 FORCE IT
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
