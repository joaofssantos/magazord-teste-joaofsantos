import { useMemo, useState } from "react";
import { useRepos, useStarred } from "../hooks/useGithubApi";
import { useGithubStore } from "../store/useGithubStore";
import type { GithubRepo } from "../types/github";

import { RepoList } from "./RepoList";
import { RepoModal } from "./RepoModal";
import { RepoHeader } from "./RepoHeader";
import { RepoFilters } from "./RepoFilters";

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

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);


  const filtered = useMemo(() => {
    if (!Array.isArray(data)) return [];

    let filteredData = data;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filteredData = filteredData.filter((response) => {
        const title = (
          response.full_name ||
          `${response.owner?.login}/${response.name}` ||
          ""
        ).toLowerCase();
        const desc = (response.description || "").toLowerCase();
        return title.includes(query) || desc.includes(query);
      });
    }

    if (selectedLanguages.length > 0) {
      filteredData = filteredData.filter((r) =>
        selectedLanguages.includes(r.language || "No Language")
      );
    }

    if (selectedTypes.length > 0) {
      filteredData = filteredData.filter((r) => {
        if (selectedTypes.includes("Fork") && r.fork) return true;
        if (selectedTypes.includes("Archived") && r.archived) return true;
        if (selectedTypes.includes("Private") && r.private) return true;
        if (selectedTypes.includes("Public") && !r.private) return true;
        return false;
      });
    }

    return filteredData;
  }, [data, searchQuery, selectedLanguages, selectedTypes]);

  const loading =
    activeTab === "starred" ? starredQuery.isLoading : reposQuery.isLoading;
  const error = activeTab === "starred" ? starredQuery.error : reposQuery.error;
const [selectedRepo, setSelectedRepo] = useState<GithubRepo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section>
      <RepoHeader counts={counts} />
      <RepoFilters
        data={data}
        onFilterChange={({ selectedTypes, selectedLanguages }) => {
          setSelectedTypes(selectedTypes);
          setSelectedLanguages(selectedLanguages);
        }}
      />

      <RepoList
        loading={loading}
        error={error}
        filtered={filtered}
        activeTab={activeTab}
        onItemClick={(repo) => {
          setSelectedRepo(repo);
          setIsModalOpen(true);
        }}
      />

      <RepoModal
        repo={selectedRepo}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};
