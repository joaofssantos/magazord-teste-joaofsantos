import { useMemo } from "react";
import { useRepos, useStarred } from "../hooks/useGithubApi";
import { useGithubStore } from "../store/useGithubStore";
import type { GithubRepo } from "../types/github";

import { RepoList } from "./RepoList";
import { RepoHeader } from "./RepoHeader";

type Props = {
  username: string;
};

export const RepoPanel = ({ username }: Props) => {
  const { activeTab, searchQuery } = useGithubStore();

  const reposQuery = useRepos(username);
  const starredQuery = useStarred(username);

  const data = useMemo(
    () => (activeTab === "starred" ? starredQuery.data ?? [] : reposQuery.data ?? []),
    [activeTab, starredQuery.data, reposQuery.data]
  );

  const counts = useMemo(
    () => ({
      repositories: Array.isArray(reposQuery.data) ? reposQuery.data.length : 0,
      starred: Array.isArray(starredQuery.data) ? starredQuery.data.length : 0,
    }),
    [reposQuery.data, starredQuery.data]
  );



  const filtered = useMemo(() => {
    if (!Array.isArray(data)) return [];

    let filteredData = data;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filteredData = filteredData.filter((r: GithubRepo) => {
        const title = (
          r.full_name ||
          `${r.owner?.login}/${r.name}` ||
          ""
        ).toLowerCase();
        const desc = (r.description || "").toLowerCase();
        return title.includes(q) || desc.includes(q);
      });
    }


    return filteredData;
  }, [data, searchQuery]);



  return (
    <section>
      <RepoHeader counts={counts} />


      <RepoList
        filtered={filtered}
        activeTab={activeTab}
  
      />


    </section>
  );
};
