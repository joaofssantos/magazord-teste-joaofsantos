import { useQuery } from "@tanstack/react-query";
import * as github from "../services/github";

export const useUser = (username?: string) =>
  useQuery({
    queryKey: ["user", username],
    queryFn: () => (username ? github.fetchUser(username) : Promise.reject("no username")),
    enabled: !!username,
    staleTime: 1000 * 60 * 5,
    retry: 0,
  });

