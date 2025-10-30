import { useState, useMemo } from "react";
import ArrowIcon from "../assets/Arrow.svg";
import SearchIcon from "../assets/Search.svg";
import { useGithubStore } from "../store/useGithubStore";
import type { GithubRepo } from "../types/github";

type RepoFiltersProps = {
  data: GithubRepo[];
  onFilterChange: (filters: {
    selectedTypes: string[];
    selectedLanguages: string[];
  }) => void;
};

export const RepoFilters = ({ data, onFilterChange }: RepoFiltersProps) => {
  const { searchQuery, setSearchQuery } = useGithubStore();

  const [showTypeFilter, setShowTypeFilter] = useState(false);
  const [showLanguageFilter, setShowLanguageFilter] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const availableLanguages = useMemo(() => {
    if (!Array.isArray(data)) return [];
    const languages = data
      .map((r: GithubRepo) => r.language)
      .filter((lang): lang is string => Boolean(lang))
      .filter((lang, index, arr) => arr.indexOf(lang) === index);
    return languages.sort();
  }, [data]);

  const availableTypes = useMemo(() => {
    if (!Array.isArray(data)) return [];
    const types = new Set<string>();
    data.forEach((r: GithubRepo) => {
      if (r.fork) types.add("Fork");
      if (r.archived) types.add("Archived");
      if (r.private) types.add("Private");
      else types.add("Public");
    });
    return Array.from(types).sort();
  }, [data]);

  const toggleTypeFilter = () => {
    setShowTypeFilter(!showTypeFilter);
    setShowLanguageFilter(false);
  };

  const toggleLanguageFilter = () => {
    setShowLanguageFilter(!showLanguageFilter);
    setShowTypeFilter(false);
  };

  const handleTypeChange = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(language)
        ? prev.filter((l) => l !== language)
        : [...prev, language]
    );
  };

  useMemo(() => {
    onFilterChange({ selectedTypes, selectedLanguages });
  }, [selectedTypes, selectedLanguages, onFilterChange]);

  return (
    <div className="mb-6 items-center flex justify-between md:flex-direction-row flex-col-reverse">
      <div className="w-[70%] max-w-[450px] border-b border-grey-light flex items-center">
        <img src={SearchIcon} alt="Search" />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search here"
          className="flex-1 px-3 py-2 border-none focus:border-none text-base"
        />
      </div>
      <div className=" gap-4 flex justify-end md:mb-0 mb-4 md:flex-direction-row">
        <div className="relative">
          <button
            onClick={toggleTypeFilter}
            className="pl-4 pr-6 py-1 text-highlight font-light bg-gradient text-white rounded-full"
          >
            <img
              src={ArrowIcon}
              alt="Arrow"
              className="inline w-4 h-4 mr-2 mb-1"
            />
            Type
          </button>
          {showTypeFilter && (
            <div className="absolute top-full left-0 mt-2 bg-white border border-grey-light rounded-lg shadow-lg p-4 min-w-[200px] z-10">
              <div className="text-sm font-semibold mb-2">Filter by Type</div>
              {availableTypes.map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-2 text-sm cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type)}
                    onChange={() => handleTypeChange(type)}
                    className="rounded"
                  />
                  {type}
                </label>
              ))}
            </div>
          )}
        </div>
        <div className="relative">
          <button
            onClick={toggleLanguageFilter}
            className="pl-4 pr-6 py-1 text-highlight font-light bg-gradient text-white rounded-full"
          >
            <img
              src={ArrowIcon}
              alt="Arrow"
              className="inline w-4 h-4 mr-2 mb-1"
            />
            Language
          </button>
          {showLanguageFilter && (
            <div className="absolute top-full left-0 mt-2 bg-white border border-grey-light rounded-lg shadow-lg p-4 min-w-[200px] z-10">
              <div className="text-sm font-semibold mb-2">
                Filter by Language
              </div>
              {availableLanguages.map((language) => (
                <label
                  key={language}
                  className="flex items-center gap-2 text-sm cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedLanguages.includes(language)}
                    onChange={() => handleLanguageChange(language)}
                    className="rounded"
                  />
                  {language}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
