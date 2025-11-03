import { useState } from "react";
import EnterpriseIcon from "../../assets/Enterprise.svg";
import PinIcon from "../../assets/Pin.svg";
import ChainIcon from "../../assets/Chain.svg";
import SocialIcon from "../../assets/Social.svg";
import ArrowBlueIcon from "../../assets/ArrowBlue.svg";
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
  
  const [showInfo, setShowInfo] = useState(false);

  const avatar =
    user?.avatar_url ||
    "https://joaodeveloper.com.br/wp-content/themes/portfolio-wordpress/assets/images/tungtungtungsahur.webp";
  const name = user?.name || user?.login || "Desconhecido";
  const bio = user?.bio || "Sem bio disponível";

  return (
    <aside className="md:p-4 py-4 ">
      <div className="sticky top-4">
        <div className="relative group mb-4">
          <div className="relative items-center flex justify-center mx-auto">
            <img
              src={avatar}
              alt={name}
              className="md:w-[150px] w-[104px] h:-[104px] md:h-[150px] rounded-full object-cover"
            />
            <div className="shadow-[0_0_16px_0_#4F4F5026] bottom-0 absolute mr-[50%] right-[-40px] sm:right-[-60px] w-7 h-7 md:w-[40px] md:h-[40px] flex justify-center items-center bg-white rounded-full">
              <span role="img" aria-label="emoji">
                😎
              </span>
            </div>
          </div>
        </div>

        <div className="mb-4 sm:w-full w-60 mx-auto">
          <h1 className="text-large text-center font-bold text-dark mb-1">
            {name}
          </h1>
          <p className="text-short text-center text-light-dark">{bio}</p>
        </div>

        <button
          onClick={() => setShowInfo(!showInfo)}
          className="md:hidden w-full flex items-center border-none flex-col justify-center gap-2 text-short text-secondary font-normal mb-2"
        >
          Informações Adicionais
          <img
            src={ArrowBlueIcon}
            alt="Arrow Blue"
            className={`transition-transform ${showInfo ? "rotate-180" : ""}`}
          />
        </button>

        <div className={`text-short mx-auto sm:bg-none p-4 md:block ${showInfo ? 'block bg-light' : 'hidden'}`}>
            {user?.company && (
              <span className="flex items-center gap-2 my-2 sm:my-1 text-secondary">
                <span className="w-4 h-4 flex items-center">
                  <img src={EnterpriseIcon} alt="Company" />
                </span>
                {user.company}
              </span>
            )}
            {user?.location && (
              <span className="flex no-underline items-center gap-2 my-2 sm:my-1 text-secondary">
                <span className="w-4 h-4 flex items-center">
                  <img src={PinIcon} alt="Location" />
                </span>
                {user.location}
              </span>
            )}
            {user?.blog && (
              <a
                href={
                  user.blog.startsWith("http")
                    ? user.blog
                    : `https://${user.blog}`
                }
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 my-2 sm:my-1 text-secondary hover:underline truncate w-52 text-ellipsis"
              >
                <span className="w-4 h-4 flex items-center">
                  <img src={ChainIcon} alt="Url" />
                </span>
                {user?.blog ? user.blog.replace(/^https?:\/\//, "") : ""}
              </a>
            )}
            {user?.html_url && (
              <a
                href={
                  user.html_url.startsWith("http")
                    ? user.html_url
                    : `https://${user.html_url}`
                }
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 my-2 sm:my-1 text-secondary hover:underline"
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
