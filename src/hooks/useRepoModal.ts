import { useState, useCallback } from "react";
import type { GithubRepo } from "../types/github";

export const useRepoModal = () => {
  const [selectedRepo, setSelectedRepo] = useState<GithubRepo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback((repo: GithubRepo) => {
    setSelectedRepo(repo);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedRepo(null), 300);
  }, []);

  return {
    selectedRepo,
    isModalOpen,
    openModal,
    closeModal,
  };
};
