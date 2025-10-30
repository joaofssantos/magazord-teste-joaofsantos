import EnterpriseIcon from "../assets/Enterprise.svg";
import PinIcon from "../assets/Pin.svg";
import ChainIcon from "../assets/Chain.svg";
import SocialIcon from "../assets/Social.svg";
type User = {
  avatar_url?: string;
  name?: string;
  login?: string;
  bio?: string;
  company?: string;
  location?: string;
  blog?: string;
  html_url?: string;
};

export const ProfileSection = ({ user }: { user?: User }) => {
  const avatar =
    user?.avatar_url ||
    "https://joaodeveloper.com.br/wp-content/themes/portfolio-wordpress/assets/images/tungtungtungsahur.webp";
  const name = user?.name || user?.login || "Desconhecido";
  const bio = user?.bio || "Sem bio disponível";

  return (
    <aside className="p-4 ">
      <div className="sticky top-4">
        <div className="relative group mb-4">
          <div className="relative items-center flex justify-center mx-auto">
            <img
              src={avatar}
              alt={name}
              className="w-[150px] h-[150px] rounded-full object-cover"
            />
            <div className="shadow-[0_0_16px_0_#4F4F5026] bottom-0 absolute mr-[50%] right-[-60px] w-[40px] h-[40px] flex justify-center items-center bg-white rounded-full">
              <span role="img" aria-label="emoji">
                😎
              </span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h1 className="text-large text-center font-semibold text-dark mb-1">
            {name}
          </h1>
          <p className="text-short text-center text-light-dark">{bio}</p>
        </div>

        <div className="text-short space-y-1">
          {user?.company && (
            <span className="flex items-center gap-2 text-secondary">
              <span className="w-4 h-4 flex items-center">
                <img src={EnterpriseIcon} alt="Company" />
              </span>
              {user.company}
            </span>
          )}
          {user?.location && (
            <span className="flex no-underline items-center gap-2 text-secondary">
              <span className="w-4 h-4 flex items-center">
                <img src={PinIcon} alt="Location" />
              </span>
              {user.location}
            </span>
          )}
          {user?.blog && (
            <a
              href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-secondary hover:underline"
            >
              <span className="w-4 h-4 flex items-center">
                <img src={ChainIcon} alt="Url" />
              </span>
              {user.blog}
            </a>
          )}
          {user?.html_url && (
            <a
               href={user.html_url.startsWith('http') ? user.html_url : `https://${user.html_url}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-secondary hover:underline"
            >
              <span className="w-4 h-4 flex items-center">
                <img src={SocialIcon} alt="Social" />
              </span>
              {user.login}
            </a>
          )}
        </div>
      </div>
    </aside>
  );
};
