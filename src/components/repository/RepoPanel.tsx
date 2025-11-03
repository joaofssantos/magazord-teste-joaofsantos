import { useMemo } from "react";
import { useRepos, useStarred } from "../../hooks/useGithubApi";
import { useGithubStore } from "../../store/useGithubStore";
import { useRepoFilters } from "../../hooks/useRepoFilters";
import { useRepoModal } from "../../hooks/useRepoModal";

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

  const { filtered, handleFilterChange } = useRepoFilters(data, searchQuery);

  const loading =
    activeTab === "starred" ? starredQuery.isLoading : reposQuery.isLoading;
  const error = activeTab === "starred" ? starredQuery.error : reposQuery.error;

  const { selectedRepo, isModalOpen, openModal, closeModal } = useRepoModal();

  return (
    <section>
      <RepoHeader counts={counts} />
      <RepoFilters data={data} onFilterChange={handleFilterChange} />

      <RepoList
        loading={loading}
        error={error}
        filtered={filtered}
        activeTab={activeTab}
        onItemClick={openModal}
      />

      <RepoModal repo={selectedRepo} isOpen={isModalOpen} onClose={closeModal} />
    </section>
  );
};
