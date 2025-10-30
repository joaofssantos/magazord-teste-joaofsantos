 
import StarFilledIcon from "../assets/StarFilled.svg";
import CommitIcon from "../assets/Commit.svg";
import type { GithubRepo } from "../types/github";

type Props = {
  filtered: GithubRepo[];
  activeTab: "repos" | "starred";
  onItemClick?: (repo: GithubRepo) => void;
};

export const RepoList = ({ filtered, activeTab}: Props) => {


  return (
    <div className="space-y-4">
      {filtered.map((repo: GithubRepo, i: number) => (
        <div
          key={repo.id || i}
          className="py-4 border-b border-grey-08 last:border-0"
         
        >
          <h3 className="text-base font-semibold">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
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
                repo.language ? <span className="mr-2">{repo.language}</span> : null
              ) : (
                <>
                  <img src={StarFilledIcon} alt="Stars" className="w-4 h-4 mr-2" />
                  {repo.stargazers_count?.toLocaleString?.() ?? repo.stargazers_count}
                </>
              )}
            </span>
            <span className="flex items-center">
              <img src={CommitIcon} alt="Commit" className="w-4 h-4 mr-2" />
              {repo.forks_count?.toLocaleString?.() ?? repo.forks_count}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};


