import axios from "axios";

export const gptAPI = axios.create({
  baseURL: "https://api.openai.com/v1",
  // withCredentials: true,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    "Content-Type": "application/json",
  },
});
