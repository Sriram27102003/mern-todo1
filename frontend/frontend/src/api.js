import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000/api", // this matches backend port
});
