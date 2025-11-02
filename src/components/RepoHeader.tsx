
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
  const { activeTab, setActiveTab } = useGithubStore();

  const tabs = [
    {
      id: "repos" as const,
      label: "Repositories",
      icon: BookInactiveIcon,
      activeIcon: BookIcon,
      count: counts.repositories,
    },
    {
      id: "starred" as const,
      label: "Starred",
      icon: StarInactiveIcon,
      activeIcon: StarIcon,
      count: counts.starred,
    },
  ];

  return (
    <div className="border-none mb-8 md:px-8">
      <nav className="flex gap-3 sm:gap-8 justify-between sm:justify-start">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2 gap-2 sm:gap-4 border-2 flex justify-between items-center border-transparent sm:text-highlight text-base ${
                isActive ? "border-b-orange font-normal" : "text-light-dark"
              }`}
            >
              <img
                src={isActive ? tab.activeIcon : tab.icon}
                alt={tab.label}
                className="inline w-5 h-5 mr-1 mb-1"
              />
              {tab.label}
              <span className="bg-light leading-6 rounded-full border b-grey w-10 h-6 t text-short">
                {tab.count}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
