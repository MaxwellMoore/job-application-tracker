import axios from "axios";
const baseURL = "/auth";

export const signin = async (payload) => {
  try {
    let response = await axios.post(
      "http://localhost:3000/auth/signin",
      payload
    );
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const register = async (payload) => {
  try {
    let response = await axios.post(`${baseURL}/register`, payload);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
