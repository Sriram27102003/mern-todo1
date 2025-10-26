import axios from "axios";

export default axios.create({
  baseURL: "https://mern-todo-2j02.onrender.com", // this matches backend port
});
