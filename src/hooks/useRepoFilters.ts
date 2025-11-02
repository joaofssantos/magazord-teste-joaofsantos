import { useState, useMemo, useCallback } from "react";
import type { GithubRepo } from "../types/github";

export const useRepoFilters = (data: GithubRepo[], searchQuery: string) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const filtered = useMemo(() => {
    if (!Array.isArray(data)) return [];

    let filteredData = data;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filteredData = filteredData.filter((repo) => {
        const title = (
          repo.full_name ||
          `${repo.owner?.login}/${repo.name}` ||
          ""
        ).toLowerCase();
        const desc = (repo.description || "").toLowerCase();
        return title.includes(query) || desc.includes(query);
      });
    }

    if (selectedLanguages.length > 0) {
      filteredData = filteredData.filter((repo) =>
        selectedLanguages.includes(repo.language || "No Language")
      );
    }

    if (selectedTypes.length > 0) {
      filteredData = filteredData.filter((repo) => {
        if (selectedTypes.includes("Fork") && repo.fork) return true;
        if (selectedTypes.includes("Archived") && repo.archived) return true;
        if (selectedTypes.includes("Private") && repo.private) return true;
        if (selectedTypes.includes("Public") && !repo.private) return true;
        return false;
      });
    }

    return filteredData;
  }, [data, searchQuery, selectedLanguages, selectedTypes]);

  const handleFilterChange = useCallback(
    ({
      selectedTypes: types,
      selectedLanguages: languages,
    }: {
      selectedTypes: string[];
      selectedLanguages: string[];
    }) => {
      setSelectedTypes(types);
      setSelectedLanguages(languages);
    },
    []
  );

  return {
    filtered,
    selectedTypes,
    selectedLanguages,
    handleFilterChange,
  };
};
