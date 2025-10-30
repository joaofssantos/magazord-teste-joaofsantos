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



export const listRepoIssues = async (
  owner: string,
  repo: string,
  page = 1,
  per_page = 10,
  state: "open" | "closed" | "all" = "open"
) => {
  try {
    const { data } = await api.get(`/repos/${owner}/${repo}/issues`, {
      params: { page, per_page, state },
      headers: { Accept: "application/vnd.github+json" },
    });
    return data;
  } catch (err: any) {
    const status = err?.response?.status;
    // Gracefully handle repos with issues disabled (410) or not found (404)
    if (status === 410 || status === 404) {
      return [] as any[];
    }
    throw err;
  }
};

export const searchRepos = async (query: string, page = 1, per_page = 30) => {
  const { data } = await api.get(`/search/repositories`, {
    params: { q: query, page, per_page },
  });
  return data; // contains items, total_count
};
