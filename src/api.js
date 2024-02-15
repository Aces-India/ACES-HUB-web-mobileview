// api.js
import axios from "axios";

const Api = axios.create({
  baseURL: "https://s-hub-backend.onrender.com/api/",
  // You can add other configurations here if needed
});

export default Api;
