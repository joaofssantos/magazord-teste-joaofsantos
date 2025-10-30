import { useQuery } from "@tanstack/react-query";
import * as github from "../services/github";

export const useRepos = (username: string) =>
  useQuery({
    queryKey: ["repos", username],
    queryFn: () => github.fetchUserRepos(username),
    staleTime: 1000 * 60 * 2, // 2 min
    retry: 1,
  });

export const useStarred = (username: string) =>
  useQuery({
    queryKey: ["starred", username],
    queryFn: () => github.fetchUserStarred(username),
    staleTime: 1000 * 60 * 2,
    retry: 1,
  });

export const useRepoDetails = (owner?: string, repo?: string) =>
  useQuery({
    queryKey: ["repo", owner, repo],
    queryFn: () => (owner && repo ? github.fetchRepoDetails(owner, repo) : Promise.reject("no repo")),
    enabled: !!owner && !!repo,
    staleTime: 1000 * 60 * 5,
  });

export const useSearch = (query: string | null) =>
  useQuery({
    queryKey: ["search", query],
    queryFn: () => (query ? github.searchRepos(query) : Promise.resolve(null)),
    enabled: !!query,
  });

export const useUser = (username?: string) =>
  useQuery({
    queryKey: ["user", username],
    queryFn: () => (username ? github.fetchUser(username) : Promise.reject("no username")),
    enabled: !!username,
    staleTime: 1000 * 60 * 5,
    retry: 0,
  });



export const useRepoIssues = (
  owner?: string,
  repo?: string,
  enabled = false,
  opts: { per_page?: number; page?: number; state?: "open" | "closed" | "all" } = {}
) =>
  useQuery({
    queryKey: ["repo", owner, repo, "issues", opts.page ?? 1, opts.per_page ?? 10, opts.state ?? "open"],
    queryFn: () =>
      owner && repo
        ? github.listRepoIssues(owner, repo, opts.page ?? 1, opts.per_page ?? 10, opts.state ?? "open")
        : Promise.resolve([]),
    enabled: !!owner && !!repo && enabled,
    staleTime: 1000 * 60 * 2,
    retry: 1,
  });

