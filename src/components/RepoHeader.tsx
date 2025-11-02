
import { useGithubStore } from "../store/useGithubStore";
import BookIcon from "../assets/Book.svg";
import BookInactiveIcon from "../assets/BookInactive.svg";
import StarIcon from "../assets/Star.svg";
import StarInactiveIcon from "../assets/StarInactive.svg";


type RepoHeaderProps = {
  counts: {
    repositories: number;
    starred: number;
  };
};

export const RepoHeader = ({ counts }: RepoHeaderProps) => {
  const { activeTab, setActiveTab } =
    useGithubStore();

  return (
    <>
      <div className="border-none mb-8 md:px-8">
        <nav className="flex gap-3 sm:gap-8 justify-between sm:justify-start">
          <button
            onClick={() => setActiveTab("repos")}
            className={`px-3 py-2 gap-2 sm:gap-4 border-2 flex justify-between items-center border-transparent sm:text-highlight text-base ${
              activeTab === "repos"
                ? "border-b-orange font-bold"
                : "text-light-dark"
            }`}
          >
            <img
              src={activeTab === "repos" ? BookIcon : BookInactiveIcon}
              alt="Repos"
              className="inline w-5 h-5 mr-1 mb-1"
            />
            Repositories
            <span className="bg-light leading-6 rounded-full border b-grey w-10 h-6 t text-short">
              {counts.repositories}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("starred")}
            className={`px-3 py-2 gap-2 sm:gap-4 border-2 flex justify-between items-center border-transparent  sm:text-highlight text-base ${
              activeTab === "starred"
                ? "border-b-orange font-bold"
                : "text-light-dark"
            }`}
          >
            <img
              src={activeTab === "starred" ? StarIcon : StarInactiveIcon}
              alt="Starred"
              className="inline w-5 h-5 mr-1 mb-1"
            />
            Starred
                     <span className="bg-light leading-6 rounded-full border b-grey w-10 h-6  t text-short">
              {counts.starred}
            </span>
          </button>
        </nav>
      </div>

    
    </>
  );
};
