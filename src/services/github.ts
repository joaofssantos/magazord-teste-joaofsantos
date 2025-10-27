import axios from "axios";

const GITHUB_BASE = "https://api.github.com";

const token = import.meta.env.VITE_GITHUB_TOKEN;

const api = axios.create({
  baseURL: GITHUB_BASE,
  headers: token ? { Authorization: `token ${token}` } : undefined,
});

export const fetchUserRepos = async (username: string, page = 1, per_page = 30) => {
  const { data } = await api.get(`/users/${username}/repos`, {
    params: { page, per_page, sort: "updated" },
  });
  return data;
};

export const fetchUser = async (username: string) => {
  const { data } = await api.get(`/users/${username}`);
  return data;
};

export const fetchUserStarred = async (username: string, page = 1, per_page = 30) => {
  const { data } = await api.get(`/users/${username}/starred`, {
    params: { page, per_page },
  });
  return data;
};

export const fetchRepoDetails = async (owner: string, repo: string) => {
  const { data } = await api.get(`/repos/${owner}/${repo}`);
  return data;
};

export const searchRepos = async (query: string, page = 1, per_page = 30) => {
  const { data } = await api.get(`/search/repositories`, {
    params: { q: query, page, per_page },
  });
  return data; // contains items, total_count
};
