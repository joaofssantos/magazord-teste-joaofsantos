 
import StarFilledIcon from "../assets/StarFilled.svg";
import CommitIcon from "../assets/Commit.svg";
import type { GithubRepo } from "../types/github";

type Props = {
  loading: boolean;
  error: unknown;
  filtered: GithubRepo[];
  activeTab: "repos" | "starred";
  onItemClick?: (repo: GithubRepo) => void;
};

export const RepoList = ({ loading, error, filtered, activeTab, onItemClick }: Props) => {
  if (loading) {
    return <p className="text-short text-light-dark">Aguarde...</p>;
  }

  if (error) {
    return (
      <p className="text-short text-light-dark">Erro ao listar os repositorios.</p>
    );
  }

  if (!Array.isArray(filtered) || filtered.length === 0) {
    return (
      <p className="text-short text-light-dark">Não foram encontrados repositorios.</p>
    );
  }

  return (
    <div className="space-y-4">
      {filtered.map((repo, i: number) => (
        <div
          key={repo.id || i}
          className="py-4  md:px-4 border-b border-light sm:border-none last:border-0 hover:bg-light"
          onClick={() => onItemClick && onItemClick(repo)}
          role={onItemClick ? "button" : undefined}
        >
          <h3 className="text-base font-bold">
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


