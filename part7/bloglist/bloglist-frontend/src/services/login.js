import axios from "axios";

const login = async (username, password) => {
  const response = await axios.post("/api/login", { username, password });
  return response.data;
};

const loginService = { login }
export default loginService;
