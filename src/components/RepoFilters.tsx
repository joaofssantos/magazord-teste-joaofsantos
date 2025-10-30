import { useState, useMemo, useEffect } from "react";
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

  useEffect(() => {
    onFilterChange({ selectedTypes, selectedLanguages });
  }, [selectedTypes, selectedLanguages, onFilterChange]);

  return (
    <div className="mb-6 md:px-4 flex justify-between items-baseline xl:items-center  lg:flex-row flex-col-reverse">
      <div className="lg:max-w-[350px] xl:max-w-[450px] max-w-[unset] w-full border-b border-light flex items-center">
        <img src={SearchIcon} alt="Search" />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search here"
          className="flex-1 px-3 py-2 border-none focus:border-none text-base"
        />
      </div>
      <div className=" gap-4 flex justify-end lg:mb-0 mb-4 lg:flex-direction-row">
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
            <div
              className="absolute top-full left-0 md:right-0 mt-2  border border-secondary rounded-lg p-4 min-w-[200px] z-10
            bg-white
              sm:bg-blue-light"
            >
              {availableTypes.map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-2 pl-2  py-2 text-base hover:bg-[#ebf2fe] cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type)}
                    onChange={() => handleTypeChange(type)}
                    className="rounded w-5 h-5"
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
            <div
              className="absolute top-full left-0 md:right-0 mt-2 border border-secondary rounded-lg  p-4 min-w-[200px] z-10
            bg-white
              sm:bg-blue-light
            "
            >
              {availableLanguages.map((language) => (
                <label
                  key={language}
                  className="flex items-center gap-2 pl-2  py-2 text-base hover:bg-[#ebf2fe] cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedLanguages.includes(language)}
                    onChange={() => handleLanguageChange(language)}
                    className="rounded w-5 h-5 pl-2"
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
