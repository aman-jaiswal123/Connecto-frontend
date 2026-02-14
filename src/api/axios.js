import axios from "axios";
//   
//baseURL: "http://localhost:5000/api",
const API = axios.create({
 baseURL:"https://connecto-backend-807s.onrender.com",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
