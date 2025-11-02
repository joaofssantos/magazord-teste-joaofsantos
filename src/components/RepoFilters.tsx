import { useState, useMemo, useEffect } from "react";
import SearchIcon from "../assets/Search.svg";
import SearchBlueIcon from "../assets/SearchBlue.svg";
import { useGithubStore } from "../store/useGithubStore";
import type { GithubRepo } from "../types/github";
import { FilterDropdown } from "./FilterDropdown";
type RepoFiltersProps = {
  data: GithubRepo[];
  onFilterChange: (filters: {
    selectedTypes: string[];
    selectedLanguages: string[];
  }) => void;
};

export const RepoFilters = ({ data, onFilterChange }: RepoFiltersProps) => {
  const { searchQuery, setSearchQuery } = useGithubStore();
  const [isMobile, setIsMobile] = useState(false);
  const [searchMobile, setSearchMobile] = useState(false);
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

  const toggleFilter = (filter: "type" | "language") => {
    if (filter === "type") {
      setShowTypeFilter((prev) => !prev);
      setShowLanguageFilter(false);
    } else {
      setShowLanguageFilter((prev) => !prev);
      setShowTypeFilter(false);
    }
  };

  const toggleSearchVisibility = () => {
    setSearchMobile((prev) => !prev);
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
    const checkMobile = () => setIsMobile(window.innerWidth < 768);

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    onFilterChange({ selectedTypes, selectedLanguages });
  }, [selectedTypes, selectedLanguages, onFilterChange]);

  return (
    <div className="relative mb-6 md:pl-8 flex justify-between items-baseline xl:items-center  lg:flex-row flex-col-reverse">
      <div
        className={`${isMobile ? "absolute bg-light  h-14 ml-2" : "" } ${searchMobile ? "z-20" : ""}  lg:max-w-[350px] xl:max-w-[450px] max-w-[unset] w-full border-b border-light flex items-center`}
      >
        <img src={isMobile ? SearchBlueIcon : SearchIcon} alt="Search" onClick={() => isMobile ? toggleSearchVisibility() : null} />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search here"
          className={`${isMobile ? "bg-light" : ""} flex-1 px-3 py-2 border-none focus:border-none text-base`}
        />
      </div>

      {isMobile && (
        <div className="w-full h-14 bg-light relative ">
          <img
            src={SearchBlueIcon}
            onClick={toggleSearchVisibility}
            className="absolute right-4 top-0 bottom-0 m-auto "
            alt="Search Blue"
          />
        </div>
      )}

      <div
        className=" gap-4 pl-2 flex justify-end lg:mb-0 mb-4 lg:flex-direction-row
        md:relative absolute top-[12px] md:top-auto
      "
      >
        <FilterDropdown
          label="Type"
          isOpen={showTypeFilter}
          onToggle={() => toggleFilter("type")}
          options={availableTypes}
          selectedOptions={selectedTypes}
          onOptionChange={handleTypeChange}
          isMobile={isMobile}
        />

        <FilterDropdown
          label="Language"
          isOpen={showLanguageFilter}
          onToggle={() => toggleFilter("language")}
          options={availableLanguages}
          selectedOptions={selectedLanguages}
          onOptionChange={handleLanguageChange}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
};
