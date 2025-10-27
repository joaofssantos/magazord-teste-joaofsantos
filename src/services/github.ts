import axios from "axios";

const GITHUB_BASE = "https://api.github.com";

const token = process.env.VITE_GITHUB_TOKEN;

const api = axios.create({
  baseURL: GITHUB_BASE,
  headers: token ? { Authorization: `token ${token}` } : undefined,
});


export const fetchUser = async (username: string) => {
  const { data } = await api.get(`/users/${username}`);
  return data;
};
