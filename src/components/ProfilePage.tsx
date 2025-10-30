import { useEffect } from 'react'
import { ProfileSection } from './ProfileSection'
import { RepoPanel } from './RepoPanel'
import { useUser } from '../hooks/useGithubApi'
import { useGithubStore } from '../store/useGithubStore'

export const ProfilePage = ({ username }: { username: string }) => {

  const { setUsername, clearUsername, reset } = useGithubStore()
  const userQuery = useUser(username)

  useEffect(() => {
    setUsername(username)
    reset()
    return () => clearUsername()
  }, [username, setUsername, clearUsername, reset])


  const user = userQuery.data

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1280px] mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-3">
            <ProfileSection user={user} />
          </div>
          <div className="col-span-9">
            <RepoPanel username={username} />
          </div>
        </div>
      </div>
    </div>
  )
}
