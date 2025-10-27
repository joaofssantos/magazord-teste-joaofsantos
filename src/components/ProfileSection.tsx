import React from 'react'

import EnterpriseIcon from "../assets/Enterprise.svg"
import PinIcon from "../assets/Pin.svg"
import ChainIcon from "../assets/Chain.svg"
import SocialIcon from "../assets/Social.svg"
type User = {
  avatar_url?: string
  name?: string
  login?: string
  bio?: string
  company?: string
  location?: string
  blog?: string
  html_url?: string
}

const ProfileSection: React.FC<{ user?: User }> = ({ user }) => {
  const avatar = user?.avatar_url || 'https://joaodeveloper.com.br/wp-content/themes/portfolio-wordpress/assets/images/tungtungtungsahur.webp'
  const name = user?.name || user?.login || 'Unknown'
  const bio = user?.bio || 'No bio available.'

  return (
    <aside className="p-4 ">
      <div className="sticky top-4">
        <div className="relative group mb-4">
          <div className="relative items-center flex justify-center mx-auto">
            <img
              src={avatar}
              alt={name}
              className="w-[150px] h-[150px] rounded-full object-cover;"
            />
            <div className="shadow-[0_0_16px_0_#4F4F5026] bottom-0 absolute mr-[50%] right-[-60px] w-[40px] h-[40px] flex justify-center items-center bg-white rounded-full">

            
              <span role="img" aria-label="emoji">😎</span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h1 className="text-large text-center font-bold text-dark mb-1">{name}</h1>
          <p className="text-base text-center text-light-dark" dangerouslySetInnerHTML={{ __html: bio }} />
        </div>

        <div className="text-short space-y-1">
          {user?.company && (
            <a href="#" className="flex items-center gap-2 text-secondary hover:underline">
              <span className="w-4 h-4 flex items-center"><img src={EnterpriseIcon} alt="Company" /></span>
              {user.company}
            </a>
          )}
          {user?.location && (
            <a href="#" className="flex no-underline items-center gap-2 text-secondary hover:underline">
              <span className="w-4 h-4 flex items-center"><img src={PinIcon} alt="Location" /></span>
              {user.location}
            </a>
          )}
          {user?.blog && (
            <a href={user.blog} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-secondary hover:underline">
              <span className="w-4 h-4 flex items-center"><img src={ChainIcon} alt="Url" /></span>
              {user.blog}
            </a>
          )}
          {user?.html_url && (
            <a href={user.login} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-secondary hover:underline">
              <span className="w-4 h-4 flex items-center"><img src={SocialIcon} alt="Social" /></span>
              {user.login}
            </a>
          )}
        </div>
      </div>
    </aside>
  )
}

export default ProfileSection
