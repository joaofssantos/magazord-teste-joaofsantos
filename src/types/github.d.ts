export type GithubUser = {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name?: string;
  bio?: string;
  company?: string;
  location?: string;
  blog?: string;
  email?: string;
  public_repos?: number;
  followers?: number;
  following?: number;
};

export type GithubOwner = {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
};

export type GithubRepo = {
  id: number;
  name: string;
  full_name: string;
  owner: GithubOwner;
  html_url: string;
  description?: string;
  fork: boolean;
  url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  stargazers_count: number;
  watchers_count: number;
  language?: string;
  forks_count: number;
  open_issues_count: number;
  archived: boolean;
  disabled: boolean;
  visibility?: string;
  private?: boolean;
};

export type GithubIssue = {
  id: number;
  number: number;
  title: string;
  user: GithubUser;
  state: "open" | "closed";
  html_url: string;
  created_at: string;
  updated_at: string;
  body?: string;
  pull_request?: {
    url: string;
    html_url: string;
  };
};

export type GithubPull = {
  id: number;
  number: number;
  title: string;
  user: GithubUser;
  state: "open" | "closed";
  html_url: string;
  created_at: string;
  updated_at: string;
  body?: string;
};