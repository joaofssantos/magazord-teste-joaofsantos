
import GithubLogo from "../../assets/Github.svg"

type HeaderProps = {
  onLogoClick?: () => void
}

const Header = ({ onLogoClick }: HeaderProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onLogoClick?.()
  }

  return (
    <header className="w-full">
      <div className="w-full bg-primary border-b">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="h-[72px] flex items-center">
            <a href="/" onClick={handleClick} className="flex items-center gap-3 text-white">
              <img src={GithubLogo} alt="GitHub Logo" className="w-24 h-8" />
            </a>
            <nav className="ml-4 flex items-center h-full">
              <ul className="flex items-center gap-2 text-base text-white">
                <li className="px-2 text-[1rem] font-light text-white hover:text-light-dark cursor-pointer">/</li>
                <li className="px-2 text-[1rem] font-light text-white hover:text-light-dark cursor-pointer">
                     <a href="/" onClick={handleClick} className="text-white hover:text-light-dark hover:no-underline">
                  Profile
                  </a>
                  </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

