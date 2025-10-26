import axios from "axios";

const api = axios.create({
  baseURL: "https://mern-todo-2j02.onrender.com/api", // your backend URL
});

export default api;
