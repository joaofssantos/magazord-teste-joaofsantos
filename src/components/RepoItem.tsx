import React from "react";
import CommitIcon from "../assets/Commit.svg";
import StarFilledIcon from "../assets/StarFilled.svg";
import type { GithubRepo } from "../types/github";

type Props = {
  repo: GithubRepo;
  activeTab?: "repos" | "starred";
  onClick?: (repo: GithubRepo) => void;
};

export const RepoItem = ({ repo, activeTab, onClick }: Props) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onClick?.(repo)}
      onKeyDown={(e) => {
        if (e.key === "Enter") onClick?.(repo);
      }}
      className="py-4 border-b border-grey-08 last:border-0 cursor-pointer"
    >
      <h3 className="text-base font-semibold">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer noopener"
          className="no-underline hover:no-underline"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="font-light text-black">{repo.owner?.login} </span>
          / <span className="text-secondary ">{repo.name}</span>
        </a>
      </h3>
      <p className="text-[14px] text-light-dark my-2 p-0">{repo.description}</p>
      <div className="flex items-center text-[14px] gap-4 text-short text-black">
        <span className="flex items-center">
          {activeTab === "starred" ? (
            <>
              <img src={StarFilledIcon} alt="Stars" className="w-4 h-4 mr-2" />
              {repo.stargazers_count?.toLocaleString?.() ?? repo.stargazers_count}
            </>
          ) : (
            repo.language ? <span className="mr-2">{repo.language}</span> : null
          )}
        </span>

        <span className="flex items-center">
          <img src={CommitIcon} alt="Commit" className="w-4 h-4 mr-2" />
          {repo.forks_count?.toLocaleString?.() ?? repo.forks_count}
        </span>
      </div>
    </div>
  );
};

export default React.memo(RepoItem);
