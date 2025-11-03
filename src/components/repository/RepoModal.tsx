import { useRepoIssues, useUser } from "../../hooks/useGithubApi";
import ArrowIcon from "../../assets/Arrow.svg";
import { GithubRepo } from "../../types/github";

type Props = {
  repo: GithubRepo | null;
  isOpen: boolean;
  onClose: () => void;
};

export const RepoModal = ({ repo, isOpen, onClose }: Props) => {
  const owner = repo?.owner?.login;
  const name = repo?.name;

  const userQuery = useUser(owner);
  const issuesQuery = useRepoIssues(owner, name, isOpen && !!repo, { state: "open" });

  if (!isOpen || !repo) {
    document.body.style.overflow = "unset";
    return null;
  }
  
  document.body.style.overflow = "hidden";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-black/50 " onClick={onClose} />

      <div className="relative">
        <div
          className="relative p-6 z-10 bg-light  xl:w-[1200px] w-[100vw] md:w-[90vw] md:max-w-[100%] md:h-[90vh] h-[100vh] mx-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute border-none z-50 top-2 right-2 text-sm flex text-gray-600"
            onClick={onClose}
            aria-label="Close"
          >
            <img src={ArrowIcon} className="rotate-90 invert w-4" />
            Voltar
          </button>

          {userQuery.isSuccess && userQuery.data && (
            <a
              href={userQuery.data.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex hover:no-underline items-baseline md:items-center gap-8 md:gap-3 mb-5 hover:opacity-90 transition md:flex-row flex-col "
            >
              <div className="bg-slate-200 rounded-full lg:w-[128px] lg:h-[128px] md:w-[96px] md:h-[96px] w-[6rem] h-[6rem]">
                <img
                  src={userQuery.data.avatar_url}
                  alt={userQuery.data.login}
                  className="lg:w-[128px] lg:h-[128px] md:w-[96px] md:h-[96px] w-[6rem] h-[6rem] border-none rounded-full "
                />
              </div>
              <div className="flex flex-col ml-0 md:ml-8 min-h-6 md:min-h-20 ">
                <h2 className="lg:text-large text-base  font-bold mb-2">
                  {repo.owner?.login}  / {repo.name}
                </h2>
                <p className="lg:text-highlight text-base text-light-dark">
                  {repo.description}
                </p>
              </div>
            </a>
          )}

          <div className="flex text-sm my-16 gap-16 ml-4">
            <div>
              <div className="font-bold lg:text-[36px] md:text-[28px] text-[24px] mb-3">
                {repo.stargazers_count ?? 0}
              </div>
              <div className="text-base text-gray-500">Stars</div>
            </div>
            <div>
              <div className="font-bold lg:text-[36px] md:text-[28px] text-[24px] mb-3">
                {repo.forks_count ?? 0}
              </div>
              <div className="text-base text-gray-500">Forks</div>
            </div>
            <div>
              <div className="font-bold lg:text-[36px] md:text-[28px] text-[24px] mb-3">
                {repo.open_issues_count ?? "—"}
              </div>
              <div className="text-base text-gray-500">Issues abertas</div>
            </div>
          </div>

          <div className="mt-5">
            <ul className="flex flex-col gap-3 overflow-x-hidden md:max-h-[calc(100vh-30rem)] max-h-[calc(100vh-28rem)] ">
              {issuesQuery.isLoading && (
                <li className="text-sm text-light-dark">Carregando issues…</li>
              )}
              {issuesQuery.error && (
                <li className="text-sm text-red-600">Falha ao carregar issues.</li>
              )}
              {Array.isArray(issuesQuery.data) &&
                issuesQuery.data.length === 0 &&
                !issuesQuery.isLoading && (
                  <li className="text-sm text-light-dark">Não há issues abertas.</li>
                )}
              {Array.isArray(issuesQuery.data) &&
                issuesQuery.data.map((issue) => (
                  <li key={issue.id}>
                    <a
                      href={issue.html_url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group hover:no-underline w-full flex items-center justify-between bg-white px-4 py-3 hover:bg-white-light transition"
                    >
                      <div className="min-w-0">
                        <div className="md:text-highlight  text-base font-bold truncate">
                          {issue.title}
                        </div>
                        <div className=" text-short  md:mt-4 mt-2 text-light-dark">
                          {issue.user?.login}
                        </div>
                      </div>
                      <img
                        src={ArrowIcon}
                        alt=":"
                        className="w-4 h-4 invert -rotate-90"
                      />
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
